import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-family: 'novantique-serif-display', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 2.5rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto ${props => props.$mb ?? '3.5rem'};
  line-height: 1.1;

  @media (max-width: 700px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const SectionTitleImage = ({ alt }) => <Title>{alt}</Title>;

export default SectionTitleImage;
