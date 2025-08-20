import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Rrhh(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="rrhh" className="container-fluid">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img src="/images/rrhh2.png" alt="rrhh" className="img-fluid rounded-3 shadow" />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{t('HrTitle')}</h2>
            <p><strong>{t('HrQuestion')}</strong></p>
            <p>{t('HrText')}</p>
            <p><strong>{t('HrBenefitsTitle')}</strong></p>
            <ul>
              <li>{t('HrBenefit1')}</li>
              <li>{t('HrBenefit2')}</li>
              <li>{t('HrBenefit3')}</li>
              <li>{t('HrBenefit4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

