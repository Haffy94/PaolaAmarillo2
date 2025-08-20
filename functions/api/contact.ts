// /functions/api/contact.ts

export const onRequestGet: PagesFunction = async () => {
  // Health check: /api/contact debe responder con { "alive": true }
  return json({ alive: true });
};

export const onRequestOptions: PagesFunction = async () => {
  // Preflight CORS (si el front está en otro origen)
  return new Response(null, { status: 204, headers: corsHeaders() });
};

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
      name = String((data as any).name || '').trim();
      email = String((data as any).email || '').trim();
      message = String((data as any).message || '').trim();
      trap = String((data as any).website || '').trim();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const data = new URLSearchParams(await request.text());
      name = String(data.get('name') || '').trim();
      email = String(data.get('email') || '').trim();
      message = String(data.get('message') || '').trim();
      trap = String(data.get('website') || '').trim();
    } else {
      return json({ ok: false, error: 'Content-Type no soportado' }, 415);
    }

    // Anti-spam simple (honeypot)
    if (trap) return json({ ok: true });

    // Validaciones básicas
    if (!name || !email || !message) return json({ ok: false, error: 'Faltan campos' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'Email inválido' }, 400);
    if (message.length > 5000) return json({ ok: false, error: 'Mensaje demasiado largo' }, 413);

    const subject = `Nuevo contacto: ${name}`;
    const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
    const html = `
      <h2>Nuevo contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <pre style="white-space:pre-wrap">${escapeHtml(message)}</pre>
    `;

    // Chequeo de variables de entorno (evita 502 si falta algo)
    const missing: string[] = [];
    if (!env.RESEND_API_KEY) missing.push('RESEND_API_KEY');
    if (!env.RESEND_FROM)   missing.push('RESEND_FROM');
    if (!env.RESEND_TO)     missing.push('RESEND_TO');

    console.log('env presence:', {
      has_api: !!env.RESEND_API_KEY,
      has_from: !!env.RESEND_FROM,
      has_to: !!env.RESEND_TO,
      dry_run: (env as any).DRY_RUN ?? '(none)',
    });

    if (missing.length) {
      return json({ ok: false, error: `Faltan variables: ${missing.join(', ')}` }, 500);
    }

    const toList = (env.RESEND_TO || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!toList.length) {
      return json({ ok: false, error: 'RESEND_TO está vacío' }, 500);
    }

    // Bypass de envío (testing)
    if ((env as any).DRY_RUN === '1') {
      return json({ ok: true, note: 'Bypassed email (DRY_RUN)' });
    }

    // Envío con Resend
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM, // ej: 'Contacto <noreply@tu-dominio.com>'
        to: toList,            // uno o varios destinatarios
        subject,
        text,
        html,
        reply_to: email,       // poder responder directo al visitante
      }),
    });

    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      console.error('Resend error:', r.status, errBody);
      return json({ ok: false, error: `Resend error: ${errBody || r.status}` }, 502);
    }

    return json({ ok: true });
  } catch (e: any) {
    console.error('Function error:', e?.message);
    return json({ ok: false, error: e?.message || 'Error inesperado' }, 500);
  }
};

// Tipos de entorno
interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM: string; // ej. 'Contacto <noreply@tu-dominio.com>' (dominio verificado)
  RESEND_TO: string;   // ej. 'yo@ejemplo.com,otra@ejemplo.com'
  DRY_RUN?: string;    // '1' para bypass de pruebas
}

// Helpers
function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function corsHeaders() {
  // Si tu front está en el MISMO dominio, podés devolver {}.
  return {
    'Access-Control-Allow-Origin': '*', // o tu dominio exacto
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]!));
}
