import React from 'react';
import styled from 'styled-components';
import SectionTitleImage from '../../molecule/SectionTitleImage';
import AboutMe from '../../molecule/AboutMe';

const Outer = styled.section`
  width: 100%;
  background-color: rgb(26, 13, 7);
  display: flex;
  justify-content: center;

  h1, h2, h3, p, a, span, label {
    color: #fff6f2;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 6rem 2rem;

  @media (max-width: 700px) {
    padding: 4rem 1.5rem 4rem;
  }
`;

const AboutSection = () => {
  return (
    <Outer id="about">
      <Inner>
        <SectionTitleImage src="/titles/about.png" alt="About" />
        <AboutMe />
      </Inner>
    </Outer>
  );
};

export default AboutSection;
