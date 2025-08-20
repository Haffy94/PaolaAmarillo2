import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Graphology(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="Graphology" className="container-fluid">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img src="/images/grafologia.png" alt="grafologia" className="img-fluid rounded-3 shadow" style={{ maxHeight: 350 }} />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{t('GraphologyTitle')}</h2>
            <p><strong>{t('GraphologySection1Title')}</strong></p>
            <p>{t('GraphologySection1Text')}</p>
            <p><strong>{t('GraphologySection2Title')}</strong></p>
            <p>{t('GraphologySection2Text')}</p>
            <p><strong>{t('GraphologySection3Title')}</strong></p>
            <ul>
              <li>{t('GraphologyList1')}</li>
              <li>{t('GraphologyList2')}</li>
              <li>{t('GraphologyList3')}</li>
              <li>{t('GraphologyList4')}</li>
            </ul>
            <p><strong>{t('GraphologySection4Title')}</strong></p>
            <p>{t('GraphologySection4Text')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

