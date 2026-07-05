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
  color: #aebec4;
  mix-blend-mode: difference;
  animation: ${slideUp} 600ms ease-out both;
  animation-delay: 0s;

  @media (max-width: ${BREAK}) {
    position: static;
    font-size: clamp(2.5rem, 11vw, 6rem);
    text-align: center;
    color: inherit;
    mix-blend-mode: normal;
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
    max-width: calc(100vw - 5rem);
    order: 2;
  }
`;

// Defined before BottomGroup* so it can be used as a component selector inside them.
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

// Back layer: z-index 0, paints before HeroImg (same z-index, earlier in DOM)
// so the image sits on top of it. Shows HUNT-ISAAK in blue on the cream
// background; hidden underneath the image wherever they overlap.
const BottomGroupBack = styled.div`
  position: absolute;
  left: 3rem;
  top: 50%;
  z-index: 0;

  ${BottomLine} {
    color: #aebec4;
  }

  @media (max-width: ${BREAK}) {
    position: static;
    text-align: center;
    order: 3;

    ${BottomLine} {
      color: inherit;
    }
  }
`;

// Blend layer: z-index 1, above the image. Same source color as TopLine
// (#aebec4 + difference) so the inversion over the photo is identical to
// ANNA ROSE. Clipped via JS to only show within the image bounds.
// Never uses display:none — that would reset child animations on resize.
// On mobile it stays position:absolute (out of flex flow) and the clip-path
// keeps it fully hidden.
const BottomGroupBlend = styled.div`
  position: absolute;
  left: 3rem;
  top: 50%;
  z-index: 1;
  color: #aebec4;
  mix-blend-mode: difference;
`;

const HomeSection = () => {
  const topRef              = useRef(null);
  const bottomLineRef       = useRef(null);
  const bottomGroupRef      = useRef(null);
  const captionRef          = useRef(null);
  const imgRef              = useRef(null);
  const bottomGroupBlendRef = useRef(null);

  const [mobileImgWidth,    setMobileImgWidth]    = useState(null);
  const [mobileCaptionSize, setMobileCaptionSize] = useState(null);
  const [blendClip,         setBlendClip]         = useState(null);

  const measure = useCallback(() => {
    // ── Desktop: compute clip-path to restrict blend layer to image bounds ────
    if (window.innerWidth > BREAK_PX) {
      setMobileImgWidth(null);
      setMobileCaptionSize(null);

      const img   = imgRef.current;
      const group = bottomGroupBlendRef.current;
      if (img && group) {
        const iR = img.getBoundingClientRect();
        const gR = group.getBoundingClientRect();
        // inset() values clip inward from each edge of the element
        const top    = Math.max(0, iR.top    - gR.top);
        const bottom = Math.max(0, gR.bottom - iR.bottom);
        const left   = Math.max(0, iR.left   - gR.left);
        const right  = Math.max(0, gR.right  - iR.right);
        setBlendClip(`inset(${top}px ${right}px ${bottom}px ${left}px)`);
      }
      return;
    }

    // ── Mobile: size image and scale caption ──────────────────────────────────
    setBlendClip(null);

    const top         = topRef.current;
    const bottomLine  = bottomLineRef.current;
    const bottomGroup = bottomGroupRef.current;
    const caption     = captionRef.current;
    const img         = imgRef.current;

    if (!top || !bottomLine || !bottomGroup || !caption || !img) return;
    if (!img.naturalWidth || !img.naturalHeight) return;

    const bottomLineW = bottomLine.getBoundingClientRect().width;
    const textWidth   = Math.max(top.getBoundingClientRect().width, bottomLineW);

    const captionW      = caption.getBoundingClientRect().width;
    const captionFontPx = parseFloat(getComputedStyle(caption).fontSize);
    if (captionW > 0) {
      setMobileCaptionSize(captionFontPx * (bottomLineW / captionW));
    }

    const aspectRatio  = img.naturalWidth / img.naturalHeight;
    const topH         = top.getBoundingClientRect().height;
    const bottomGroupH = bottomGroup.getBoundingClientRect().height;
    const rootFontPx   = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gapPx        = 2 * rootFontPx;
    const vertCushion  = 2.5 * rootFontPx;

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

  const imgStyle     = mobileImgWidth    != null ? { width: `${mobileImgWidth}px`, height: 'auto' } : {};
  const captionStyle = mobileCaptionSize != null ? { fontSize: `${mobileCaptionSize}px` }           : {};
  // Hidden until clip is computed to avoid a flash of unclipped blend text
  const blendStyle   = { clipPath: blendClip ?? 'inset(0 0 0 100%)' };

  return (
    <StickySection id="home">
      <Hero>
        <TopLine ref={topRef}>ANNA ROSE</TopLine>

        {/* Back layer: blue HUNT-ISAAK visible on cream, hidden under image */}
        <BottomGroupBack ref={bottomGroupRef}>
          <BottomLine ref={bottomLineRef}>HUNT{'‑'}ISAAK</BottomLine>
          <Caption ref={captionRef} style={captionStyle}>Researcher · Designer · Artist</Caption>
        </BottomGroupBack>

        <HeroImg ref={imgRef} src={bokehImg} alt="" style={imgStyle} onLoad={measure} />

        {/* Blend layer: same inversion as ANNA ROSE, clipped to image area */}
        <BottomGroupBlend ref={bottomGroupBlendRef} style={blendStyle}>
          <BottomLine>HUNT{'‑'}ISAAK</BottomLine>
          <Caption>Researcher · Designer · Artist</Caption>
        </BottomGroupBlend>
      </Hero>
    </StickySection>
  );
};

export default HomeSection;
