import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Administrative(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="administrative" className="container py-5">
      <div className="row align-items-center">
        {/* Texto: segundo en móviles, primero en md+ */}
        <div className="col-md-7 order-2 order-md-1">
          <h2 className="fw-bold mb-3">{t('AdminTitle')}</h2>
          <p>
            <strong>{t('AdminSubtitle')}</strong>
          </p>
          <p>{t('AdminText1')}</p>
          <p>{t('AdminText2')}</p>
          <p>{t('AdminText3')}</p>
        </div>

        {/* Imagen: primero en móviles, segundo en md+ */}
        <div className="col-md-5 order-1 order-md-2 text-center">
          <img
            src="/images/legal.png"
            alt="legal"
            className="img-fluid rounded-3 shadow"
            style={{ maxHeight: 350 }}
          />
        </div>
      </div>
    </div>
  );
}
