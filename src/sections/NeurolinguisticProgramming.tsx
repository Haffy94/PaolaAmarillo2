import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NeurolinguisticProgramming(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div id="Nlp" className="container py-5">
      <div className="row align-items-center">
        {/* Texto: segundo en móviles, primero en md+ */}
        <div className="col-md-7 order-2 order-md-1">
          <h2 className="fw-bold mb-3">{t('NlpTitle')}</h2>
          <p className="lead">{t('NlpLead')}</p>
          <p>{t('NlpSection1Title')}</p>
          <p>{t('NlpSection1Text')}</p>
          <p>{t('NlpSection2Title')}</p>
          <p>{t('NlpSection2Text')}</p>
          <ul>
            <li>{t('NlpList1')}</li>
            <li>{t('NlpList2')}</li>
            <li>{t('NlpList3')}</li>
            <li>{t('NlpList4')}</li>
          </ul>
          <p>{t('NlpSection3Title')}</p>
          <ul>
            <li>{t('NlpTech1')}</li>
            <li>{t('NlpTech2')}</li>
            <li>{t('NlpTech3')}</li>
            <li>{t('NlpTech4')}</li>
          </ul>
          <p>{t('NlpSection4Title')}</p>
          <p>{t('NlpSection4Text')}</p>
        </div>

        {/* Imagen: primero en móviles, segundo en md+ */}
        <div className="col-md-5 order-1 order-md-2 text-center">
          <img
            src="/images/cerebro5.png"
            alt="NlpImg"
            className="img-fluid rounded-3 shadow img-nlp"
          />
        </div>
      </div>
    </div>
  );
}
