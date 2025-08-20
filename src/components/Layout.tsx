import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props): JSX.Element {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: 'es' | 'en' | 'it') => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm mb-3 fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item"><a className="nav-link" href="#AboutMe">{t('AboutMe')}</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownServicios" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('Services')}</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownServicios">
                    <li><a className="dropdown-item" href="#Graphology">{t('ServiceGraphology')}</a></li>
                    <li><a className="dropdown-item" href="#Nlp">{t('ServiceNlp')}</a></li>
                    <li><a className="dropdown-item" href="#rrhh">{t('ServiceHr')}</a></li>
                    <li><a className="dropdown-item" href="#administrative">{t('ServiceAdmin')}</a></li>
                  </ul>
                </li>
                <li className="nav-item"><a className="nav-link" href="#migrandoEmociones">{t('MigrandoEmociones')}</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">{t('Contact')}</a></li>
                <li className="nav-item dropdown ms-3">
                  <button className="btn btn-outline-primary btn-sm btn-language dropdown-toggle" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-globe"></i> {i18n.language?.toUpperCase() || 'ES'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                    <li><button className="dropdown-item" onClick={() => changeLanguage('es')}>Español</button></li>
                    <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
                    <li><button className="dropdown-item" onClick={() => changeLanguage('it')}>Italiano</button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="hero-banner position-relative">
        <div className="banner-container">
          <div className="banner-text">
            <h1>Paola Amarillo</h1>
            <p>{t('HeroDescription')}</p>
          </div>
          <div className="social-floating">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <main role="main" className="pb-3">
          {children}
        </main>
        <footer className="footer text-muted row align-items-center py-3 position-relative">
          <div className="col-md-6 text-start">
            &copy; 2025 - PaolaAmarillo - <a href="#" className="privacy" data-bs-toggle="modal" data-bs-target="#privacyModal">Privacy</a>
          </div>
        </footer>
      </div>
    </>
  );
}

