import type { Post } from "../[slug]/page";

const post: Post = {
slug: "como-criar-etl-com-python-e-postgresql",
tag: "Business Intelligence",
title: "Como criar um ETL simples com Python e PostgreSQL — do zero ao dado limpo",
description: "Tutorial completo para construir um pipeline ETL (Extract, Transform, Load) usando Python, pandas e PostgreSQL — sem ferramentas pagas, sem complexidade desnecessária.",
keywords: ["ETL Python PostgreSQL", "pipeline de dados Python", "pandas ETL tutorial", "como criar ETL", "data pipeline simples"],
readTime: "11 min",
publishedAt: "2026-02-26",
updatedAt: "2026-02-26",
author: { name: "Yuri Francis", role: "Fundador, NuPtechs" },
keyTakeaways: [
  "ETL = Extract (buscar dados), Transform (limpar e formatar), Load (gravar no destino)",
  "Stack mínima: Python 3.11 + pandas + SQLAlchemy + psycopg2 + python-dotenv",
  "Nunca misture lógica de extração com transformação — separe em funções distintas",
  "Use upsert (INSERT ON CONFLICT DO UPDATE) para idempotência — rodar duas vezes não gera duplicatas",
  "Agende com CRON no Linux ou Task Scheduler no Windows — sem Airflow para ETLs simples",
],
sections: [
  {
    id: "o-que-e-etl",
    heading: "O que é ETL e quando você precisa de um",
    content: `<p>ETL significa <strong>Extract, Transform, Load</strong>. É o processo de pegar dados de uma ou mais fontes, transformá-los no formato que você precisa e carregá-los em um banco de dados analítico.</p>
<p>Você precisa de um ETL quando:</p>
<ul>
  <li>Tem dados em múltiplos sistemas (CRM + ERP + planilha) e precisa unificá-los.</li>
  <li>O sistema de origem não tem a estrutura ideal para análise — precisa transformar.</li>
  <li>Precisa de histórico — sistemas transacionais sobrescrevem dados; o ETL guarda o histórico.</li>
  <li>Quer alimentar um dashboard com dados atualizados periodicamente.</li>
</ul>`,
  },
  {
    id: "estrutura-projeto",
    heading: "Estrutura do projeto",
    content: `<pre><code>etl-projeto/
├── .env                 # credenciais (não versionar)
├── requirements.txt
├── extract/
│   ├── __init__.py
│   ├── api_source.py    # extrai de API REST
│   └── csv_source.py    # extrai de arquivos CSV/Excel
├── transform/
│   ├── __init__.py
│   └── normalize.py     # limpeza e padronização
├── load/
│   ├── __init__.py
│   └── postgres.py      # grava no PostgreSQL
└── main.py              # orquestra o pipeline</code></pre>
<pre><code class="language-bash"># requirements.txt
pandas==2.2.1
sqlalchemy==2.0.29
psycopg2-binary==2.9.9
python-dotenv==1.0.1
requests==2.31.0
openpyxl==3.1.2</code></pre>`,
  },
  {
    id: "extract",
    heading: "Extract: buscando dados de fontes diferentes",
    content: `<pre><code class="language-python"># extract/api_source.py
import requests
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

def extract_from_api(endpoint: str, params: dict = {}) -> pd.DataFrame:
"""Extrai dados de uma API REST e retorna DataFrame."""
headers = {"Authorization": f"Bearer {os.getenv('API_TOKEN')}"}
response = requests.get(endpoint, headers=headers, params=params, timeout=30)
response.raise_for_status()
data = response.json()
# Normaliza JSON aninhado automaticamente
return pd.json_normalize(data if isinstance(data, list) else data.get("items", []))

# extract/csv_source.py
def extract_from_csv(filepath: str) -> pd.DataFrame:
"""Extrai de CSV com detecção automática de encoding."""
for encoding in ["utf-8", "latin-1", "cp1252"]:
    try:
        return pd.read_csv(filepath, encoding=encoding)
    except UnicodeDecodeError:
        continue
raise ValueError(f"Não foi possível ler {filepath} com os encodings tentados")</code></pre>`,
  },
  {
    id: "transform",
    heading: "Transform: limpeza e normalização",
    content: `<pre><code class="language-python"># transform/normalize.py
import pandas as pd

def normalize_customers(df: pd.DataFrame) -> pd.DataFrame:
"""Normaliza tabela de clientes — aplicar após extract."""
df = df.copy()

# Padronizar nomes de colunas
df.columns = [col.lower().strip().replace(" ", "_") for col in df.columns]

# Limpar CPF/CNPJ (remover pontuação)
if "documento" in df.columns:
    df["documento"] = df["documento"].str.replace(r"[.\-/]", "", regex=True)

# Normalizar datas (múltiplos formatos possíveis)
if "data_cadastro" in df.columns:
    df["data_cadastro"] = pd.to_datetime(df["data_cadastro"], dayfirst=True, errors="coerce")

# Remover duplicatas (pelo documento mais recente)
if "documento" in df.columns:
    df = df.sort_values("data_cadastro", ascending=False)
    df = df.drop_duplicates(subset=["documento"], keep="first")

# Preencher valores nulos
df["cidade"] = df.get("cidade", pd.Series()).fillna("Não informado")

# Adicionar timestamp de processamento
df["etl_loaded_at"] = pd.Timestamp.utcnow()

return df</code></pre>`,
  },
  {
    id: "load-upsert",
    heading: "Load: gravando com upsert (sem duplicatas)",
    content: `<pre><code class="language-python"># load/postgres.py
from sqlalchemy import create_engine, text
import pandas as pd
import os

def get_engine():
url = (f"postgresql+psycopg2://{os.getenv('PG_USER')}:{os.getenv('PG_PASSWORD')}"
       f"@{os.getenv('PG_HOST')}:{os.getenv('PG_PORT')}/{os.getenv('PG_DATABASE')}")
return create_engine(url, pool_pre_ping=True)

def upsert_dataframe(df: pd.DataFrame, table: str, pk_columns: list[str]) -> int:
"""
Upsert: INSERT ON CONFLICT DO UPDATE
Idempotente — rodar 2x não gera duplicatas.
Retorna o número de linhas afetadas.
"""
engine = get_engine()

# Gravar em tabela temporária
temp_table = f"_temp_{table}"
df.to_sql(temp_table, engine, if_exists="replace", index=False)

# Colunas para atualizar (tudo exceto as PKs)
update_cols = [c for c in df.columns if c not in pk_columns]
update_stmt = ", ".join(f"{c} = EXCLUDED.{c}" for c in update_cols)
pk_stmt = ", ".join(pk_columns)

upsert_sql = f"""
INSERT INTO {table}
SELECT * FROM {temp_table}
ON CONFLICT ({pk_stmt}) DO UPDATE SET {update_stmt};

DROP TABLE {temp_table};
"""

with engine.connect() as conn:
    result = conn.execute(text(upsert_sql))
    conn.commit()
    return result.rowcount</code></pre>`,
  },
  {
    id: "agendar-cron",
    heading: "Agendando com CRON",
    content: `<p>Para rodar o ETL automaticamente todo dia às 6h da manhã:</p>
<pre><code class="language-bash"># Editar crontab
crontab -e

# Adicionar linha (roda às 06:00 todo dia)
0 6 * * * cd /opt/etl-projeto && /usr/bin/python3 main.py >> /var/log/etl.log 2>&1</code></pre>
<p>O <code>>>></code> acumula logs sem sobrescrever. Monitore com <code>tail -f /var/log/etl.log</code>.</p>
<p>Para alertas de falha, adicione ao <code>main.py</code>:</p>
<pre><code class="language-python">try:
run_pipeline()
except Exception as e:
requests.post(SLACK_WEBHOOK, json={"text": f"❌ ETL falhou: {e}"})</code></pre>`,
  },
],
callouts: [
  { type: "tip", title: "Idempotência é obrigatória", body: "Um ETL bem feito pode ser executado várias vezes sem consequência. Use sempre upsert (INSERT ON CONFLICT) em vez de INSERT simples. Você vai precisar reprocessar dados mais vezes do que pensa." },
  { type: "warning", title: "Nunca comite .env", body: "Adicione .env ao .gitignore no primeiro commit. Credenciais de banco em repositório git são o vetor de ataque número 1 em projetos pequenos. Use .env.example como documentação das variáveis necessárias." },
  { type: "insight", title: "Airflow só quando necessário", body: "Airflow é poderoso mas adiciona complexidade real: Docker, Redis, serviço web, banco de metadados. Para ETLs simples (menos de 10 pipelines, sem dependências complexas entre eles), CRON + logs resolve 100%." },
],
mindMap: {
  label: "ETL Python + PostgreSQL",
  children: [
    { label: "Extract", children: [
      { label: "API REST (requests)" },
      { label: "CSV/Excel (pandas)" },
      { label: "Banco legado (SQLAlchemy)" },
    ]},
    { label: "Transform", children: [
      { label: "Normalizar colunas" },
      { label: "Limpar duplicatas" },
      { label: "Converter tipos" },
    ]},
    { label: "Load", children: [
      { label: "Upsert (idempotente)" },
      { label: "Staging table" },
      { label: "ON CONFLICT UPDATE" },
    ]},
    { label: "Orquestração", children: [
      { label: "CRON (simples)" },
      { label: "Logs + alertas" },
      { label: "Airflow (complexo)" },
    ]},
  ],
},
mnemonic: {
  acronym: "ETAL",
  breakdown: [
    { letter: "E", word: "Extract com retry", hint: "raise_for_status() + timeout em toda request" },
    { letter: "T", word: "Transform isolado", hint: "Função pura: recebe df, retorna df" },
    { letter: "A", word: "Agendamento CRON", hint: "Simples antes de precisar de Airflow" },
    { letter: "L", word: "Load com upsert", hint: "INSERT ON CONFLICT = idempotente" },
  ],
},
relatedSlugs: ["dashboard-bi-para-pmes", "grafana-vs-metabase-vs-superset"],
};

export default post;
