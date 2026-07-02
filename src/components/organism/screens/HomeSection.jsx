import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';

const StickySection = styled.section`
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
`;

const Hero = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff6f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeSection = () => (
  <StickySection id="home">
    <Hero>
      <LandingTitle />
    </Hero>
  </StickySection>
);

export default HomeSection;
