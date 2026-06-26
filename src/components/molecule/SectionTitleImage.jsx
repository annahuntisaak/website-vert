import React, { useState } from 'react';
import styled from 'styled-components';

const TitleImg = styled.img`
  display: block;
  margin: 0 auto 3.5rem;
  max-height: 2.5rem;
  width: auto;
`;

const FallbackTitle = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  margin-bottom: 3.5rem;
`;

// Loads a custom image from public/titles/<name>.
// Falls back to an h2 text title until the image file is uploaded.
const SectionTitleImage = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <FallbackTitle>{alt}</FallbackTitle>;
  return <TitleImg src={src} alt={alt} onError={() => setFailed(true)} />;
};

export default SectionTitleImage;
