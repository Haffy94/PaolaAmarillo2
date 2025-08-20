import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Status = { type: 'idle' | 'success' | 'error' | 'sending'; text?: string };

export default function Contact(): JSX.Element {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ type: 'sending', text: t('ContactSending') ?? 'Enviando…' });


    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setStatus({ type: 'success', text: t('ContactSuccess') ?? '¡Gracias! Tu mensaje fue enviado.' });
        form.reset();
      } else {
        const msg = data?.error || t('ContactError') || 'No se pudo enviar. Probá de nuevo.';
        setStatus({ type: 'error', text: msg });
      }
    } catch {
      setStatus({ type: 'error', text: t('ContactUnexpected') ?? 'Error inesperado. Probá más tarde.' });
    }
  }

  const sending = status.type === 'sending';

  return (
    <div id="contact" className="container py-5">
      <h2 className="text-center mb-4">{t('ContactTitle')}</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="p-4 rounded-4 shadow-sm bg-white">
            <form id="contactForm" onSubmit={onSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">{t('ContactNameLabel')}</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="name"
                  required
                  placeholder={t('ContactNamePlaceholder')}
                  disabled={sending}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">{t('ContactEmailLabel')}</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  placeholder={t('ContactEmailPlaceholder')}
                  disabled={sending}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">{t('ContactMessageLabel')}</label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  name="message"
                  rows={5}
                  required
                  placeholder={t('ContactMessagePlaceholder')}
                  disabled={sending}
                />
              </div>

              {/* Honeypot anti-spam (oculto) */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, padding: 0, margin: 0, border: 0 }}
                aria-hidden="true"
              />

              <div className="text-center">
                <button type="submit" id="submitBtn" className="btn btn-primary px-4" disabled={sending}>
                  {sending ? (t('ContactSending') ?? 'Enviando…') : t('ContactButton')}
                </button>
              </div>

              <div id="formMessage" className="mt-3 text-center">
                {status.type !== 'idle' && (
                  <div
                    className={`alert ${status.type === 'success'
                      ? 'alert-success'
                      : status.type === 'error'
                      ? 'alert-danger'
                      : 'alert-info'
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.text}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
