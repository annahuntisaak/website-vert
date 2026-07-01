import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';

const StickyWrapper = styled.div`
  height: calc(200vh);
`;

const Hero = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HeroInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const TitleOverlay = styled.div`
  position: absolute;
  top: 38%;
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
            <HeroVideo
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
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
