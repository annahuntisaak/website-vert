import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import bokehImg from '../../../assets/bokeh.jpg';

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const BREAK_PX = 900;
const BREAK = `${BREAK_PX}px`;

const StickySection = styled.section`
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff6f2;
  overflow: hidden;

  @media (max-width: ${BREAK}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2.5rem 0;
    box-sizing: border-box;
  }
`;

const titleFont = `
  font-family: 'novantique-serif-display', sans-serif;
  font-weight: 300;
  font-style: normal;
  line-height: 1.05;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const TopLine = styled.div`
  ${titleFont}
  font-size: clamp(3rem, 13vw, 16rem);
  position: absolute;
  left: 3rem;
  bottom: 50%;
  z-index: 1;
  animation: ${slideUp} 600ms ease-out both;
  animation-delay: 0s;

  @media (max-width: ${BREAK}) {
    position: static;
    font-size: clamp(2.5rem, 11vw, 6rem);
    text-align: center;
  }
`;

const HeroImg = styled.img`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  height: calc(100vh - 5rem);
  width: auto;
  display: block;
  z-index: 0;

  @media (max-width: ${BREAK}) {
    position: static;
    transform: none;
    height: auto;
    width: auto;
  }
`;

const BottomGroup = styled.div`
  position: absolute;
  left: 3rem;
  top: 50%;
  z-index: 1;

  @media (max-width: ${BREAK}) {
    position: static;
    text-align: center;
  }
`;

const BottomLine = styled.div`
  ${titleFont}
  font-size: clamp(3rem, 13vw, 16rem);
  animation: ${slideUp} 600ms ease-out both;
  animation-delay: 0.5s;

  @media (max-width: ${BREAK}) {
    font-size: clamp(2.5rem, 11vw, 6rem);
  }
`;

const Caption = styled.div`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-top: 1.5rem;
  animation: ${slideUp} 1.2s ease-out both;
  animation-delay: 1.0s;

  @media (max-width: ${BREAK}) {
    margin-top: 2rem;
  }
`;

const HomeSection = () => {
  const topRef         = useRef(null);
  const bottomLineRef  = useRef(null);
  const bottomGroupRef = useRef(null);
  const captionRef     = useRef(null);
  const imgRef         = useRef(null);
  const [mobileImgWidth,    setMobileImgWidth]    = useState(null);
  const [mobileCaptionSize, setMobileCaptionSize] = useState(null);

  const measure = useCallback(() => {
    if (window.innerWidth > BREAK_PX) {
      setMobileImgWidth(null);
      setMobileCaptionSize(null);
      return;
    }

    const top         = topRef.current;
    const bottomLine  = bottomLineRef.current;
    const bottomGroup = bottomGroupRef.current;
    const caption     = captionRef.current;
    const img         = imgRef.current;

    if (!top || !bottomLine || !bottomGroup || !caption || !img) return;
    if (!img.naturalWidth || !img.naturalHeight) return;

    const bottomLineW = bottomLine.getBoundingClientRect().width;
    const textWidth   = Math.max(top.getBoundingClientRect().width, bottomLineW);

    // ── Caption font size ──────────────────────────────────────────────────────
    // Scale the caption so its rendered width matches HUNT-ISAAK's width.
    // Font size and text width scale linearly for the same string/font, so one
    // multiplication gets the exact target size.
    const captionW       = caption.getBoundingClientRect().width;
    const captionFontPx  = parseFloat(getComputedStyle(caption).fontSize);
    if (captionW > 0) {
      setMobileCaptionSize((captionFontPx * (bottomLineW / captionW)));
    }

    // ── Image width ────────────────────────────────────────────────────────────
    const aspectRatio  = img.naturalWidth / img.naturalHeight;
    const topH         = top.getBoundingClientRect().height;
    const bottomGroupH = bottomGroup.getBoundingClientRect().height;
    const rootFontPx   = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gapPx        = 2 * rootFontPx;

    const vertCushion = 2.5 * rootFontPx;
    const imgHAtTextW = textWidth / aspectRatio;
    const availableH  = window.innerHeight - 2 * vertCushion - topH - gapPx * 2 - bottomGroupH;

    const finalWidth = imgHAtTextW <= availableH
      ? textWidth
      : Math.max(availableH * aspectRatio, 0);

    setMobileImgWidth(finalWidth > 0 ? finalWidth : null);
  }, []);

  useLayoutEffect(() => {
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const imgStyle     = mobileImgWidth    != null ? { width: `${mobileImgWidth}px`,      height: 'auto' } : {};
  const captionStyle = mobileCaptionSize != null ? { fontSize: `${mobileCaptionSize}px`                } : {};

  return (
    <StickySection id="home">
      <Hero>
        <TopLine ref={topRef}>ANNA ROSE</TopLine>
        <HeroImg ref={imgRef} src={bokehImg} alt="" style={imgStyle} onLoad={measure} />
        <BottomGroup ref={bottomGroupRef}>
          <BottomLine ref={bottomLineRef}>HUNT{'‑'}ISAAK</BottomLine>
          <Caption ref={captionRef} style={captionStyle}>Researcher · Designer · Artist</Caption>
        </BottomGroup>
      </Hero>
    </StickySection>
  );
};

export default HomeSection;
