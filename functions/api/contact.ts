// /functions/api/contact.ts
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '', email = '', message = '', trap = '';

    if (contentType.includes('multipart/form-data')) {
      const data = await request.formData();
      name = String(data.get('name') || '').trim();
      email = String(data.get('email') || '').trim();
      message = String(data.get('message') || '').trim();
      trap = String(data.get('website') || '').trim(); // honeypot
    } else if (contentType.includes('application/json')) {
      const data = await request.json();
      name = String(data.name || '').trim();
      email = String(data.email || '').trim();
      message = String(data.message || '').trim();
      trap = String(data.website || '').trim();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const data = new URLSearchParams(await request.text());
      name = String(data.get('name') || '').trim();
      email = String(data.get('email') || '').trim();
      message = String(data.get('message') || '').trim();
      trap = String(data.get('website') || '').trim();
    } else {
      return json({ ok: false, error: 'Content-Type no soportado' }, 415);
    }

    // anti-spam básico
    if (trap) return json({ ok: true }); // parecer éxito pero descartar

    // validación simple
    if (!name || !email || !message) {
      return json({ ok: false, error: 'Faltan campos' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'Email inválido' }, 400);
    }
    // limitar tamaño del mensaje
    if (message.length > 5000) {
      return json({ ok: false, error: 'Mensaje demasiado largo' }, 413);
    }

    // armar payload para Resend
    const subject = `Nuevo contacto: ${name}`;
    const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `
      <h2>Nuevo contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
    `;

    const toList = env.RESEND_TO.split(',').map(s => s.trim()).filter(Boolean);

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: toList,
        subject,
        text,
        html
      }),
    });

    if (!r.ok) {
      const err = await safeText(r);
      return json({ ok: false, error: `Resend error: ${err}` }, 502);
    }

    return json({ ok: true });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || 'Error inesperado' }, 500);
  }
};

// Tipos de entorno
interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM: string; // ej. 'Contacto <noreply@tu-dominio.com>'
  RESEND_TO: string;   // ej. 'yo@ejemplo.com,otra@ejemplo.com'
}

// helpers
function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]!));
}
async function safeText(r: Response) {
  try { return await r.text(); } catch { return `${r.status}`; }
}
