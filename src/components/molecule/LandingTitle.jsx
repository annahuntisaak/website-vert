import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Name = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.2rem;

  @media (max-width: 700px) {
    font-size: 2.2rem;
    font-weight: 600;
  }
`;

const Caption = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const LandingTitle = () => {
  return (
    <Wrapper>
      <Name>Anna Rose Hunt{'‑'}Isaak</Name>
      <Caption>Researcher · Designer · Artist</Caption>
    </Wrapper>
  );
};

export default LandingTitle;
