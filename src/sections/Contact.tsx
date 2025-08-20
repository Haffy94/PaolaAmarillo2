import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact(): JSX.Element {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [messageHtml, setMessageHtml] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setMessageHtml(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/Contact/SendEmail', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setMessageHtml(`<div class="alert alert-success">${data.message}</div>`);
        form.reset();
      } else {
        setMessageHtml(`<div class="alert alert-danger">${data.message}</div>`);
      }
      setTimeout(() => setSending(false), 5000);
    } catch (err) {
      setMessageHtml('<div class="alert alert-danger">Unexpected error</div>');
      setSending(false);
    }
  }

  return (
    <div id="contact" className="container py-5">
      <h2 className="text-center mb-4">{t('ContactTitle')}</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="p-4 rounded-4 shadow-sm bg-white">
            <form id="contactForm" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">{t('ContactNameLabel')}</label>
                <input type="text" className="form-control" id="nombre" name="Nombre" required placeholder={t('ContactNamePlaceholder')} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">{t('ContactEmailLabel')}</label>
                <input type="email" className="form-control" id="email" name="Email" required placeholder={t('ContactEmailPlaceholder')} />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">{t('ContactMessageLabel')}</label>
                <textarea className="form-control" id="mensaje" name="Mensaje" rows={5} required placeholder={t('ContactMessagePlaceholder')}/>
              </div>
              <div className="text-center">
                <button type="submit" id="submitBtn" className="btn btn-primary px-4" disabled={sending}>{t('ContactButton')}</button>
              </div>
              <div id="formMessage" className="mt-3 text-center" dangerouslySetInnerHTML={{ __html: messageHtml ?? '' }} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

