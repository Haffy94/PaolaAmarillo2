import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MigrandoEmociones(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="migrandoEmociones" className="container-fluid">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img src="/images/migrandoemociones.png" alt="Migrando Emociones" className="img-profile" />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{t('MigrandoTitle')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('MigrandoText1') }} />
            <p>{t('MigrandoText2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

