import React from 'react';
import styled from 'styled-components';
import ExperienceBlock from '../../molecule/ExperienceBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Section = styled.section`
  width: 100%;
  max-width: 900px;
  padding: 6rem 2rem;

  @media (max-width: 700px) {
    padding: 0.5rem 1.5rem 4rem;
  }
`;

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <SectionTitleImage src="/titles/experience.png" alt="Experience" />
      <ExperienceBlock />
    </Section>
  );
};

export default ExperienceSection;
