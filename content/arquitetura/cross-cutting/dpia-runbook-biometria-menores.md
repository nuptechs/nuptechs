# Runbook de DPIA / RIPD — Biometria de Menores (NuP-School)

> **Relatório de Impacto à Proteção de Dados Pessoais (RIPD / DPIA).** Runbook para conduzir a avaliação obrigatória do tratamento de **biometria facial de menores** no NuP-School (foto-prova / face-match). Endereça o **risco R5** (catastrófico/regulatório) do [Risk Register](risk-register.md) e o requisito **REQ-PRIV-02**.

**Por que é obrigatório:** o tratamento combina os dois fatores de maior risco da LGPD — **dado pessoal sensível** (biometria, Art. 11) e **dado de menor** (Art. 14, princípio do melhor interesse). A ANPD trata esse caso como de alto risco; o RIPD é exigência prática antes de qualquer escrutínio (auditoria, cliente público, incidente).

**Evidência do tratamento:** `NuP-School/server/modules/edu/use-cases/listar-foto-prova-runs.ts`, `edu/prompts.ts`, `edu/domain.ts` + `server/application/ports/guardian.port.ts`.

---

## 1. Escopo do RIPD

| Campo | Conteúdo a preencher |
|---|---|
| **Tratamento** | Captura e comparação facial (face-match) de alunos para prova de presença/identidade em avaliações ("foto-prova") |
| **Titulares** | Alunos (menores) + responsáveis |
| **Dado sensível** | Imagem facial / template biométrico (Art. 11) |
| **Menor** | Sim — Art. 14 (consentimento do responsável + melhor interesse) |
| **Finalidade** | Verificação de identidade em avaliação escolar |
| **Controlador** | A escola (cliente); NuPTechs = operador |
| **Operador** | NuP-School (NuPTechs) |

---

## 2. Passos do runbook

### Passo 1 — Mapear o fluxo do dado biométrico (evidência técnica)
Responder, com `path:linha`:
- [ ] **Onde a imagem é capturada?** (app/web; qualidade; consentimento no momento)
- [ ] **A imagem é armazenada ou só o template?** (minimização — preferir template/hash, descartar a imagem)
- [ ] **Onde persiste?** (tabela, criptografia em repouso?)
- [ ] **Quem acessa?** (RBAC/ReBAC — só o professor da turma? bypass admin?)
- [ ] **Por quanto tempo é retido?** (`DataRetentionPolicy`? descarte após a prova?)
- [ ] **Há processamento por IA/terceiro?** (o face-match usa serviço externo? envia a imagem para fora?)
- [ ] **Transferência internacional?** (se o serviço de visão é estrangeiro)

### Passo 2 — Avaliar necessidade e proporcionalidade (o teste mais importante)
- [ ] **A biometria é necessária?** Existe meio menos invasivo de provar presença (QR + senha, presença do professor, foto sem match)? — LGPD exige minimização. **Se há alternativa, o face-match deve ser evitado.**
- [ ] Se necessário, o benefício supera o risco ao menor? Documentar a justificativa.

### Passo 3 — Base legal e consentimento
- [ ] Base legal definida (consentimento do responsável, Art. 7º I + Art. 14 §1º; ou tutela/política pública se aplicável).
- [ ] **Fluxo de consentimento do responsável** explícito, granular, revogável, registrado (não enterrado em termo geral).
- [ ] Informação clara ao responsável: o que é coletado, por quê, por quanto tempo, com quem.

### Passo 4 — Salvaguardas técnicas (verificar/implementar)
- [ ] **Criptografia em repouso** do dado biométrico.
- [ ] **Acesso mínimo** (só quem precisa; sem bypass admin amplo) — RBAC/ReBAC.
- [ ] **Retenção limitada** + descarte automático após a finalidade (a prova).
- [ ] **Trilha de auditoria** (cadeia HMAC) de todo acesso à imagem/template.
- [ ] **Sem envio para fora** sem base legal (se usa serviço externo de visão, avaliar on-prem).
- [ ] **Isolamento multi-tenant** (escola A não vê dado de B) — depende de RLS (T1).

### Passo 5 — Riscos residuais e medidas
Para cada risco (vazamento, uso indevido, viés do face-match, falso match), registrar: probabilidade, impacto, medida mitigadora, risco residual.

### Passo 6 — Decisão e revisão
- [ ] Conclusão: tratamento **prossegue / prossegue-com-mudanças / não-prossegue**.
- [ ] Plano de ação datado para as mudanças necessárias.
- [ ] Revisão periódica (anual ou a cada mudança no tratamento).

---

## 3. Estrutura do documento RIPD (entregável)

> O easynup já tem modelos de RIPD/ETP/TR como pitch (`nuptechs/public/easynup2/docs/ripd-modelo.html`) — reusar a estrutura.

1. Identificação (controlador/operador/encarregado)
2. Descrição do tratamento e finalidade
3. Necessidade e proporcionalidade (Passo 2)
4. Base legal e consentimento (Passo 3)
5. Riscos aos titulares + salvaguardas (Passos 4–5)
6. Conclusão e plano de ação (Passo 6)
7. Aprovação (Encarregado/DPO)

---

## 4. Ações imediatas (antes do RIPD completo)

Mitigações que não dependem do relatório formal:
1. **Confirmar se a imagem é descartável** — se hoje persiste a foto, avaliar guardar só o template e descartar a imagem.
2. **Verificar criptografia em repouso** do dado biométrico.
3. **Verificar se há envio para serviço externo** de visão (e onde fica).
4. **Restringir acesso** (sem bypass admin amplo à foto de menor).
5. Documentar o **fluxo de consentimento** do responsável atual.

---

## 5. Conexão com a arquitetura

| Salvaguarda | Pilar/EA que habilita |
|---|---|
| Acesso mínimo | NuPIdentify RBAC/ReBAC (PA-01) |
| Isolamento entre escolas | RLS (WP-RLS, T1) |
| Trilha de acesso | `@nuptechs/audit-chain` (ADR-EA-004) |
| Retenção/descarte | `DataRetentionPolicy` (padrão easynup, reusar) |
| Direito do titular (responsável) | `exerciseDataSubjectRight` (padrão easynup, reusar) |

> **Mensagem-chave:** o RIPD não é burocracia — é o que protege a NuPTechs (operador) e a escola (controlador) num tratamento de **risco máximo**. A maior alavanca é o **Passo 2**: se a presença pode ser provada sem face-match de menor, a decisão arquiteturalmente correta é **não tratar biometria** (minimização). Conduzir antes de qualquer expansão do NuP-School ou escrutínio público.
