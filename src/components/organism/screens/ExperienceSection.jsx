import React from 'react';
import styled from 'styled-components';
import ExperienceBlock from '../../molecule/ExperienceBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 6rem 2rem;
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
