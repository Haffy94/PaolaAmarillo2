import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutMe(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="AboutMe" className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-7 order-2 order-md-1">
          <p>{t('AboutMeParagraph1')}</p>
          <p>{t('AboutMeParagraph2')}</p>
        </div>
        <div className="col-md-5 order-1 order-md-2 text-center">
          <img src="/images/paolaPerfil03.png" alt="Paola Amarillo" className="img-profile" />
        </div>
      </div>
    </div>
  );
}

