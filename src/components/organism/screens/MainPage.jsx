import React from 'react';
import styled from 'styled-components';
import LandingPageHeader from '../../molecule/LandingPageHeader';
import HomeSection from './HomeSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import TraditionalArtSection from './TraditionalArtSection';
import PhotographySection from './PhotographySection';
import ContactSection from './ContactSection';
// Pulled up by 100vh so it starts sliding into view from the bottom
// as soon as the user begins scrolling the hero. z-index: 1 ensures it
// paints in front of the sticky hero (which has no stacking context).
const ContentSections = styled.div`
  position: relative;
  z-index: 1;
  margin-top: calc(-100vw * 1975 / 2113);
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
