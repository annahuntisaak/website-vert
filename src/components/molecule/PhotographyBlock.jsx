import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import annex from '../../assets/annex.webp';
import backyard from '../../assets/backyard.webp';
import beach from '../../assets/beach.webp';
import bottle from '../../assets/bottle.webp';
import cat from '../../assets/cat.webp';
import chair from '../../assets/chair.webp';
import golden from '../../assets/golden.webp';
import grammy from '../../assets/grammy.webp';
import house from '../../assets/house.webp';
import kitchen from '../../assets/kitchen.webp';
import mountain from '../../assets/mountain.webp';
import mtl_night from '../../assets/mtl_night.webp';
import museum_dark from '../../assets/museum_dark.webp';
import museum_light from '../../assets/museum_light.webp';
import noah_stairs from '../../assets/noah_stairs.webp';
import one_tree from '../../assets/one_tree.webp';
import plants from '../../assets/plants.webp';
import pond from '../../assets/pond.webp';
import street from '../../assets/street.webp';
import sunset from '../../assets/sunset.webp';
import tea from '../../assets/tea.webp';
import tree_water from '../../assets/tree_water.webp';
import trees from '../../assets/trees.webp';
import trinity from '../../assets/trinity.webp';
import village from '../../assets/village.webp';
import wedding from '../../assets/wedding.webp';
import zoe from '../../assets/zoe.webp';

const p = (src, title) => ({ src, title });

const rows = [
  [p(plants, 'Plants'), p(trinity, 'Trinity'), p(chair, 'Chair')],
  [p(grammy, 'Grammy')],
  [p(mtl_night, 'Montreal Night'), p(house, 'House')],
  [p(wedding, 'Wedding'), p(noah_stairs, 'Noah Stairs')],
  [p(zoe, 'Zoe')],
  [p(museum_dark, 'Museum Dark'), p(museum_light, 'Museum Light')],
  [p(one_tree, 'One Tree'), p(trees, 'Trees'), p(backyard, 'Backyard')],
  [p(bottle, 'Bottle'), p(annex, 'Annex')],
  [p(tree_water, 'Tree Water')],
  [p(village, 'Village'), p(cat, 'Cat')],
  [p(beach, 'Beach'), p(tea, 'Tea'), p(sunset, 'Sunset')],
  [p(mountain, 'Mountain')],
  [p(golden, 'Golden'), p(street, 'Street')],
];

// Flat ordered list used for lightbox navigation.
const allPhotos = rows.flat();

// ── Gallery ───────────────────────────────────────────────────────────────────

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  @media (max-width: 700px) {
    gap: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Cell = styled.div`
  flex: ${(props) => props.$ratio};
  position: relative;

  &:hover img {
    opacity: 0.45;
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

// Placeholder for future caption text — currently empty.
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

  &:hover { opacity: 1; }

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

const PhotographyBlock = () => {
  const [ratios, setRatios] = useState(() => {
    const init = {};
    allPhotos.forEach((photo) => { init[photo.title] = DEFAULT_RATIO; });
    return init;
  });
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLoad = useCallback((e, title) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [title]: naturalWidth / naturalHeight }));
    }
  }, []);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    const onKey = (e) => {
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i < allPhotos.length - 1 ? i + 1 : i));
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
      <div>
        <Gallery>
          {rows.map((row, rowIndex) => {
            const total = row.reduce((sum, p) => sum + ratios[p.title], 0);
            const scale = total < 1 ? 1 / total : 1;
            return (
              <Row key={rowIndex}>
                {row.map((photo) => (
                  <Cell
                    key={photo.title}
                    $ratio={ratios[photo.title] * scale}
                    onClick={() => setActiveIndex(allPhotos.findIndex((p) => p.title === photo.title))}
                  >
                    <Img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => handleLoad(e, photo.title)}
                    />
                    <HoverLabel />
                  </Cell>
                ))}
              </Row>
            );
          })}
        </Gallery>
      </div>

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
            src={allPhotos[activeIndex].src}
            alt={allPhotos[activeIndex].title}
            onClick={(e) => e.stopPropagation()}
          />
          {activeIndex < allPhotos.length - 1 && (
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

export default PhotographyBlock;
