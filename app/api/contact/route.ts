import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, company, challenge } = body as {
      name: string;
      email: string;
      company?: string;
      challenge: string;
    };

    // Basic validation
    if (!name || !email || !challenge) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes: name, email, challenge." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    // Send notification to NuPtechs team
    await resend.emails.send({
      from: "NuPtechs Site <noreply@nuptechs.com.br>",
      to: "nuptechs@nuptechs.com",
      replyTo: email,
      subject: `[Diagnóstico] ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0f; color: #e5e7eb; border-radius: 12px;">
          <div style="margin-bottom: 24px;">
            <span style="background: #7c3aed22; color: #a78bfa; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Nova solicitação de diagnóstico</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 24px; color: #ffffff;">Novo contato via site</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #9ca3af; font-size: 13px; width: 120px;">Nome</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; font-size: 14px; color: #f9fafb;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #9ca3af; font-size: 13px;">E-mail</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; font-size: 14px; color: #f9fafb;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; color: #9ca3af; font-size: 13px;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid #1f1f2e; font-size: 14px; color: #f9fafb;">${company}</td></tr>` : ""}
            <tr><td style="padding: 10px 0; color: #9ca3af; font-size: 13px; vertical-align: top;">Desafio</td><td style="padding: 10px 0; font-size: 14px; color: #f9fafb; line-height: 1.6;">${challenge}</td></tr>
          </table>
          <div style="margin-top: 32px; padding: 16px; background: #111118; border-radius: 8px; border-left: 3px solid #7c3aed;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">Responder em até 2h úteis. Manter padrão de diagnóstico em 24h.</p>
          </div>
        </div>
      `
    });

    // Send confirmation to the prospect
    await resend.emails.send({
      from: "NuPtechs <noreply@nuptechs.com.br>",
      to: email,
      subject: "Recebemos seu pedido de diagnóstico — NuPtechs",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0f; color: #e5e7eb; border-radius: 12px;">
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px; color: #ffffff;">Olá, ${name} 👋</h1>
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 24px;">Recebemos sua solicitação de diagnóstico.</p>
          <div style="background: #111118; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #1f1f2e;">
            <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.06em;">O que acontece agora</p>
            <ul style="margin: 0; padding: 0 0 0 18px; color: #d1d5db; font-size: 14px; line-height: 2;">
              <li>Nossa equipe analisa seu desafio</li>
              <li>Você recebe um plano técnico objetivo em <strong style="color: #ffffff;">até 24h úteis</strong></li>
              <li>Sem compromisso — é 100% gratuito</li>
            </ul>
          </div>
          <p style="font-size: 14px; color: #9ca3af; margin: 0 0 24px;">Se quiser agilizar, responda este e-mail ou ligue direto: <a href="tel:+5561993691692" style="color: #7c3aed;">+55 (61) 99369-1692</a></p>
          <hr style="border: none; border-top: 1px solid #1f1f2e; margin: 24px 0;"/>
          <p style="font-size: 12px; color: #4b5563; margin: 0;">NuPtechs · Brasília, DF · Brasil<br/>Seus dados estão protegidos conforme a LGPD.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Erro interno. Tente novamente." }, { status: 500 });
  }
}
