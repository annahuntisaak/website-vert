import React from 'react';
import styled from 'styled-components';
import PhotographyBlock from '../../molecule/PhotographyBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Section = styled.section`
  width: 100%;
  background-color: #fff6f2;
  padding: 7rem 6rem 10rem;

  @media (max-width: 700px) {
    padding: 5rem 1.5rem 6rem;
  }
`;

const PhotographySection = () => {
  return (
    <Section id="photography">
      <SectionTitleImage src="/titles/photography.png" alt="Photography" />
      <PhotographyBlock />
    </Section>
  );
};

export default PhotographySection;
