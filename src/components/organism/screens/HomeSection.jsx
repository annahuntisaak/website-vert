import React from 'react';
import styled from 'styled-components';
import homeImg from '../../../assets/home.jpg';
import LandingTitle from '../../molecule/LandingTitle';

// Hero natural height at full viewport width = 100vw * (1975/2113).
// StickyWrapper must be 2x that so the hero sticks for exactly one hero-height
// of scrolling before ContentSections fully covers it.
const StickyWrapper = styled.div`
  height: calc(100vw * 1975 / 2113 * 2);
`;

// position: sticky keeps the image locked at the top while scrolling.
// position: relative allows the title to be absolutely centred over the img.
const Hero = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
`;

const HeroInner = styled.div`
  position: relative;
  width: 100%;
`;

const HeroImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const TitleOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const HomeSection = () => {
  return (
    <section id="home">
      <StickyWrapper>
        <Hero>
          <HeroInner>
            <HeroImg src={homeImg} alt="Home" />
            <TitleOverlay>
              <LandingTitle />
            </TitleOverlay>
          </HeroInner>
        </Hero>
      </StickyWrapper>
    </section>
  );
};

export default HomeSection;
