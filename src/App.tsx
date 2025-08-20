import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import AboutMe from './sections/AboutMe';
import Graphology from './sections/Graphology';
import NeurolinguisticProgramming from './sections/NeurolinguisticProgramming';
import Rrhh from './sections/Rrhh';
import Administrative from './sections/Administrative';
import MigrandoEmociones from './sections/MigrandoEmociones';
import Contact from './sections/Contact';

export default function App(): JSX.Element {
  useTranslation();
  return (
    <Layout>
      <AboutMe />
      <Graphology />
      <NeurolinguisticProgramming />
      <Rrhh />
      <Administrative />
      <MigrandoEmociones />
      <Contact />
    </Layout>
  );
}

