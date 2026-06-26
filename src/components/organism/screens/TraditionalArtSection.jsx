import React from 'react';
import styled from 'styled-components';
import TraditionalArtBlock from '../../molecule/TraditionalArtBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Section = styled.section`
  width: 100%;
  max-width: 1000px;
  padding: 4rem 2rem;
`;

const TraditionalArtSection = () => {
  return (
    <Section id="traditional-art">
      <SectionTitleImage src="/titles/traditional-art.png" alt="Traditional Art" />
      <TraditionalArtBlock />
    </Section>
  );
};

export default TraditionalArtSection;
