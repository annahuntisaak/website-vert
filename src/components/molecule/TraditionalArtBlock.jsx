import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import les from '../../assets/les.jpeg';
import line from '../../assets/line.jpeg';
import driveway from '../../assets/driveway.jpeg';
import pools from '../../assets/pools.jpg';
import hand from '../../assets/hand.jpeg';
import still from '../../assets/still.jpeg';
import maine from '../../assets/maine.jpg';

// Each piece has a src and a lines array — one string per caption line.
const rows = [
  [{ src: les,      lines: ['cotton linter, acrylic', '21.5 x 27.5'] }],
  [{ src: line,     lines: ['gouache, colored pencil, chalk pastel'] }],
  [{ src: driveway, lines: ['chalk pastel', '6.5 x 6.5'] }, { src: pools, lines: ['lithographic ink', '8 x 6'] }],
  [{ src: hand,     lines: ['colored pencil, gouache'] }],
  [{ src: still,    lines: ['chalk pastel'] }, { src: maine, lines: ['linocuts, acrylic'] }],
];

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

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

  &:hover div {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
`;

const HoverLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.75rem;
  text-align: center;
  pointer-events: none;
  width: 90%;
`;

const CaptionLine = styled.span`
  display: block;
  line-height: 1.6;
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
                  alt={piece.lines.join(', ')}
                  onLoad={(e) => handleLoad(e, piece.src)}
                />
                <HoverLabel>
                  {piece.lines.map((line, i) => (
                    <CaptionLine key={i}>{line}</CaptionLine>
                  ))}
                </HoverLabel>
              </Cell>
            ))}
          </Row>
        );
      })}
    </Gallery>
  );
};

export default TraditionalArtBlock;
