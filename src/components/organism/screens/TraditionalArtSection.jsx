import React from 'react';
import styled from 'styled-components';
import TraditionalArtBlock from '../../molecule/TraditionalArtBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Outer = styled.section`
  width: 100%;
  background-color: #fff6f2;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 2rem;

  @media (max-width: 700px) {
    padding: 1.5rem 1.5rem;
  }
`;

const TraditionalArtSection = () => {
  return (
    <Outer id="traditional-art">
      <Inner>
        <SectionTitleImage src="/titles/traditional-art.png" alt="Traditional Art" />
        <TraditionalArtBlock />
      </Inner>
    </Outer>
  );
};

export default TraditionalArtSection;
