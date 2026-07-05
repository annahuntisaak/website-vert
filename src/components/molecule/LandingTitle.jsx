import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div``;

const Name = styled.h1`
  font-family: 'novantique-serif-display', sans-serif;
  font-weight: 300;
  font-style: normal;
  line-height: 1.05;
  letter-spacing: 0.02em;
  font-size: clamp(3rem, 13vw, 16rem);
  margin-bottom: 1.5rem;
  white-space: nowrap;
`;

const AnimLine = styled.span`
  display: block;
  animation: ${slideUp} 600ms ease-out both;
  animation-delay: ${props => props.$delay}s;
`;

const Caption = styled.div`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  animation: ${slideUp} 1.2s ease-out both;
  animation-delay: 1.0s;
`;

const LandingTitle = () => (
  <Wrapper>
    <Name>
      <AnimLine $delay={0}>ANNA ROSE</AnimLine>
      <AnimLine $delay={0.5}>HUNT{'‑'}ISAAK</AnimLine>
    </Name>
    <Caption>Researcher · Designer · Artist</Caption>
  </Wrapper>
);

export default LandingTitle;
