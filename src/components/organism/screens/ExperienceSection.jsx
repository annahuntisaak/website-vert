import React from 'react';
import styled from 'styled-components';
import ExperienceBlock from '../../molecule/ExperienceBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Outer = styled.section`
  width: 100%;
  background-color: #fff6f2;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 6rem 2rem;

  @media (max-width: 700px) {
    padding: 5rem 1.5rem 4rem;
  }
`;

const ExperienceSection = () => {
  return (
    <Outer id="experience">
      <Inner>
        <SectionTitleImage src="/titles/experience.png" alt="Research Experience" />
        <ExperienceBlock />
      </Inner>
    </Outer>
  );
};

export default ExperienceSection;
