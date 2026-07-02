import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';

const Hero = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff6f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeSection = () => (
  <section id="home">
    <Hero>
      <LandingTitle />
    </Hero>
  </section>
);

export default HomeSection;
