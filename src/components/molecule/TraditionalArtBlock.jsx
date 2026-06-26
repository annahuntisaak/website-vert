import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import les from '../../assets/les.jpeg';
import line from '../../assets/line.jpeg';
import driveway from '../../assets/driveway.jpeg';
import pools from '../../assets/pools.jpg';
import hand from '../../assets/hand.jpeg';
import still from '../../assets/still.jpeg';
import maine from '../../assets/maine.jpg';

const rows = [
  [{ src: les,      title: 'cotton linter, acrylic' }],
  [{ src: line,     title: 'gouache, colored pencil, chalk pastel' }],
  [{ src: driveway, title: 'chalk pastel' }, { src: pools, title: 'lithographic ink' }],
  [{ src: hand,     title: 'colored pencil, gouache' }],
  [{ src: still,    title: 'chalk pastel' }, {src: maine, title: 'linocuts, acrylic' }],
];

const Intro = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

// Each row is the same fixed width and centered. flex: ratio sizes the cell
// proportionally so multi-image rows share one height without distortion.
const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const Cell = styled.div`
  flex: ${(props) => props.$ratio};
  position: relative;

  &:hover img {
    opacity: 0.25;
  }

  &:hover span {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
`;

const HoverLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.75rem;
  text-align: center;
  pointer-events: none;
  white-space: nowrap;
`;

const DEFAULT_RATIO = 1.5;

const TraditionalArtBlock = () => {
  const [ratios, setRatios] = useState(() =>
    Object.fromEntries(rows.flat().map((p) => [p.src, DEFAULT_RATIO]))
  );

  const handleLoad = useCallback((e, src) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [src]: naturalWidth / naturalHeight }));
    }
  }, []);

  return (
    <div>
      {/* <Intro>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Intro> */}
      <Gallery>
        {rows.map((row, rowIndex) => {
          const total = row.reduce((sum, p) => sum + ratios[p.src], 0);
          const scale = total < 1 ? 1 / total : 1;
          return (
            <Row key={rowIndex}>
              {row.map((piece) => (
                <Cell key={piece.src} $ratio={ratios[piece.src] * scale}>
                  <Img
                    src={piece.src}
                    alt={piece.title}
                    onLoad={(e) => handleLoad(e, piece.src)}
                  />
                  <HoverLabel>{piece.title}</HoverLabel>
                </Cell>
              ))}
            </Row>
          );
        })}
      </Gallery>
    </div>
  );
};

export default TraditionalArtBlock;
