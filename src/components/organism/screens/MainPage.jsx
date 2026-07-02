import React from 'react';
import styled from 'styled-components';
import LandingPageHeader from '../../molecule/LandingPageHeader';
import HomeSection from './HomeSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import TraditionalArtSection from './TraditionalArtSection';
import PhotographySection from './PhotographySection';
import ContactSection from './ContactSection';

const ContentSections = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgb(26, 13, 7);
`;

const MainPage = () => {
  return (
    <>
      <LandingPageHeader />
      <HomeSection />
      <ContentSections>
        <AboutSection />
        <ExperienceSection />
        <TraditionalArtSection />
        <PhotographySection />
        <ContactSection />
      </ContentSections>
    </>
  );
};

export default MainPage;
