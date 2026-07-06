import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import les from '../../assets/les.webp';
import line from '../../assets/line.webp';
import driveway from '../../assets/driveway.webp';
import pools from '../../assets/pools.webp';
import hand from '../../assets/hand.webp';
import still from '../../assets/still.webp';

// Each piece has a src and a lines array — one string per caption line.
const rows = [
  [{ src: les,      lines: ['cotton linter, acrylic', '21.5 x 27.5'] }],
  [{ src: still,    lines: ['chalk pastel', '11 x 14'] }, { src: hand, lines: ['colored pencil, gouache', '12 x 19.75'] }],
  [{ src: line,     lines: ['gouache, colored pencil, chalk pastel', '10.25 x 13.25'] }],
  [{ src: driveway, lines: ['chalk pastel', '6.5 x 6.5'] }, { src: pools, lines: ['lithographic ink', '8 x 6'] }],
];

// Flat ordered list used for lightbox navigation.
const allImages = rows.flat();

// ── Gallery ───────────────────────────────────────────────────────────────────

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
  opacity: ${p => p.$visible ? 1 : 0};
  transform: ${p => p.$visible ? 'translateY(0)' : 'translateY(14px)'};
  transition: opacity 1.2s ease, transform 1.2s ease;

  @media (max-width: 700px) {
    flex-direction: column;
    max-width: 100%;
    gap: 12px;
  }
`;

const Cell = styled.div`
  flex: ${(props) => props.$ratio};
  position: relative;

  &:hover img {
    opacity: 0.1;
  }

  &:hover div {
    opacity: 1;
  }

  @media (max-width: 700px) {
    flex: none;
    width: 100%;
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
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  pointer-events: none;
  width: 90%;
`;

const CaptionLine = styled.span`
  display: block;
  line-height: 1.6;
`;

// ── Lightbox ──────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(255, 246, 242, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImg = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 2.4rem;
  right: 2.4rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: rgba(68, 33, 9, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease, background 0.2s ease;

  &:hover {
    opacity: 1;
    background: rgba(68, 33, 9, 0.22);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 1.5px;
    background: rgb(68, 33, 9);
    border-radius: 2px;
  }
  &::before { transform: rotate(45deg); }
  &::after  { transform: rotate(-45deg); }
`;

const ArrowBtn = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.$side === 'left' ? 'left: 3rem;' : 'right: 3rem;')}
  background: none;
  border: none;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.65;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &::before {
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    border-top: 1.5px solid rgb(68, 33, 9);
    border-right: 1.5px solid rgb(68, 33, 9);
    transform: ${(p) => (p.$side === 'left' ? 'rotate(-135deg) translateY(-50%)' : 'rotate(45deg) translateY(-50%)')};
  }

  @media (max-width: 700px) {
    top: auto;
    transform: none;
    bottom: 2.5rem;
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const DEFAULT_RATIO = 1.5;

const TraditionalArtBlock = () => {
  const [ratios, setRatios] = useState(() =>
    Object.fromEntries(allImages.map((p) => [p.src, DEFAULT_RATIO]))
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleRows, setVisibleRows] = useState(() => Array(rows.length).fill(false));
  const rowRefs = useRef([]);

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleRows(prev => prev.map((v, j) => j === i ? true : v));
          obs.disconnect();
        }
      }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleLoad = useCallback((e, src) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [src]: naturalWidth / naturalHeight }));
    }
  }, []);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    const onKey = (e) => {
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i < allImages.length - 1 ? i + 1 : i));
      else if (e.key === 'ArrowLeft')
        setActiveIndex((i) => (i > 0 ? i - 1 : i));
      else if (e.key === 'Escape')
        setActiveIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('lightbox-open');
    };
  }, [activeIndex]);

  return (
    <>
      <Gallery>
        {rows.map((row, rowIndex) => {
          const total = row.reduce((sum, p) => sum + ratios[p.src], 0);
          const scale = total < 1 ? 1 / total : 1;
          return (
            <Row key={rowIndex} $visible={visibleRows[rowIndex]} ref={el => { rowRefs.current[rowIndex] = el; }}>
              {row.map((piece) => (
                <Cell
                  key={piece.src}
                  $ratio={ratios[piece.src] * scale}
                  onClick={() => setActiveIndex(allImages.findIndex((p) => p.src === piece.src))}
                >
                  <Img
                    src={piece.src}
                    alt={piece.lines.join(', ')}
                    loading="lazy"
                    decoding="async"
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

      {activeIndex !== null && (
        <Overlay onClick={() => setActiveIndex(null)}>
          <CloseBtn
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
          />
          {activeIndex > 0 && (
            <ArrowBtn
              $side="left"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => i - 1); }}
            />
          )}
          <LightboxImg
            src={allImages[activeIndex].src}
            alt={allImages[activeIndex].lines.join(', ')}
            onClick={(e) => e.stopPropagation()}
          />
          {activeIndex < allImages.length - 1 && (
            <ArrowBtn
              $side="right"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => i + 1); }}
            />
          )}
        </Overlay>
      )}
    </>
  );
};

export default TraditionalArtBlock;
