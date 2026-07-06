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

// ── Mobile-only elements ──────────────────────────────────────────────────────

const TopLine = styled.div`
  ${titleFont}
  font-size: clamp(3rem, 10vw, 16rem);
  position: absolute;
  left: 8rem;
  bottom: 70%;
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

  @media (min-width: ${BREAK_PX + 1}px) {
    display: none;
  }
`;

const BottomLine = styled.div`
  ${titleFont}
  font-size: clamp(3rem, 10vw, 16rem);
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

const BottomGroupBack = styled.div`
  position: absolute;
  left: 23rem;
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

  @media (min-width: ${BREAK_PX + 1}px) {
    display: none;
  }
`;

// ── Desktop-only elements ─────────────────────────────────────────────────────

const DesktopTitleRow = styled.div`
  ${titleFont}
  font-size: clamp(3rem, 8vw, 16rem);
  line-height: 0.9;
  animation: ${slideUp} 600ms ease-out both;
  animation-delay: ${props => props.$delay}s;
`;

// Anna + Rose: top-left corner, 8rem from each edge.
// mix-blend-mode: difference → brown on cream, inverted over image.
const DesktopBrownGroup = styled.div`
  position: absolute;
  left: 16.5vw;
  top: 8vh;
  z-index: 1;
  color: #aebec4;
  mix-blend-mode: difference;

  @media (max-width: ${BREAK}) {
    display: none;
  }
`;

// Hunt + Isaak back layer: z-index 0, before image in DOM.
// Shows blue on cream; hidden under image wherever they overlap.
const DesktopBlueGroup = styled.div`
  position: absolute;
  right: 15vw;
  bottom: 6vh;
  z-index: 0;
  color: #aebec4;

  @media (max-width: ${BREAK}) {
    display: none;
  }
`;

// Hunt + Isaak blend layer: z-index 1, after image in DOM.
// Same source color as DesktopBrownGroup — identical inversion over the photo.
// Clipped via JS to only show within the image bounds.
const DesktopBlueBlendGroup = styled.div`
  position: absolute;
  right: 15vw;
  bottom: 6vh;
  z-index: 1;
  color: #aebec4;
  mix-blend-mode: difference;

  @media (max-width: ${BREAK}) {
    display: none;
  }
`;

// Caption shown on desktop only.
// right matches Hunt/Isaak groups; bottom set via JS so its bottom edge
// sits exactly at the top of the HUNT row.
// Direct brown colour (= what #aebec4 + difference blend looks like on cream).
const DesktopCaption = styled.div`
  position: absolute;
  z-index: 1;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgb(81, 56, 46);
  animation: ${slideUp} 1.2s ease-out both;
  animation-delay: 1.0s;

  @media (max-width: ${BREAK}) {
    display: none;
  }
`;

// ── Image ─────────────────────────────────────────────────────────────────────

const HeroImg = styled.img`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  width: 27vw;
  height: auto;
  max-height: 82vh;
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

// ── Component ─────────────────────────────────────────────────────────────────

// Character counts used in the equal-width letter-spacing formula.
const ROW_CHARS = [4, 4, 4, 5]; // ANNA, ROSE, HUNT, ISAAK

const HomeSection = () => {
  const topRef         = useRef(null);
  const bottomLineRef  = useRef(null);
  const bottomGroupRef = useRef(null);
  const captionRef     = useRef(null);
  const imgRef         = useRef(null);
  const blueBlendRef   = useRef(null);

  // Desktop title-row refs: anna, rose, hunt, isaak
  const annaRef  = useRef(null);
  const roseRef  = useRef(null);
  const huntRef  = useRef(null);
  const isaakRef = useRef(null);
  const rowRefs  = [annaRef, roseRef, huntRef, isaakRef];

  const [mobileImgWidth,    setMobileImgWidth]    = useState(null);
  const [mobileCaptionSize, setMobileCaptionSize] = useState(null);
  const [blendClip,         setBlendClip]         = useState(null);
  // letter-spacing override per desktop row; null = use CSS default
  const [rowLS,             setRowLS]             = useState([null, null, null, null]);
  // desktop caption: bottom flush with HUNT row top, left at image right edge + cushion
  const [deskCapBottom,     setDeskCapBottom]     = useState(null);
  const [deskCapLeft,       setDeskCapLeft]       = useState(null);

  const measure = useCallback(() => {
    // ── Desktop ───────────────────────────────────────────────────────────────
    if (window.innerWidth > BREAK_PX) {
      setMobileImgWidth(null);
      setMobileCaptionSize(null);

      // Blend clip-path: restrict Hunt/Isaak blend layer to image bounds.
      const img   = imgRef.current;
      const group = blueBlendRef.current;
      if (img && group) {
        const iR = img.getBoundingClientRect();
        const gR = group.getBoundingClientRect();
        const top    = Math.max(0, iR.top    - gR.top);
        const bottom = Math.max(0, gR.bottom - iR.bottom);
        const left   = Math.max(0, iR.left   - gR.left);
        const right  = Math.max(0, gR.right  - iR.right);
        setBlendClip(`inset(${top}px ${right}px ${bottom}px ${left}px)`);
      }

      // Caption: bottom flush with HUNT row top, left edge at image right + cushion.
      if (huntRef.current && imgRef.current) {
        const hR     = huntRef.current.getBoundingClientRect();
        const iR     = imgRef.current.getBoundingClientRect();
        const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        setDeskCapBottom(window.innerHeight - hR.top + 0.5 * rootPx);
        setDeskCapLeft(iR.right + 2 * rootPx);
      }

      // Equal-width rows: clear any inline letter-spacing, measure natural
      // widths (with the CSS 0.02em base), then compute extra spacing so all
      // rows render at the same width as the widest one.
      if (rowRefs.every(r => r.current)) {
        const saved = rowRefs.map(r => r.current.style.letterSpacing);
        rowRefs.forEach(r => { r.current.style.letterSpacing = ''; });
        void rowRefs[0].current.offsetWidth; // force reflow
        const widths = rowRefs.map(r => r.current.getBoundingClientRect().width);
        rowRefs.forEach((r, i) => { r.current.style.letterSpacing = saved[i]; });

        const maxW = Math.max(...widths);
        setRowLS(widths.map((w, i) => {
          const extra = (maxW - w) / ROW_CHARS[i];
          return extra > 0.01 ? `calc(0.02em + ${extra}px)` : '0.02em';
        }));
      }
      return;
    }

    // ── Mobile ────────────────────────────────────────────────────────────────
    setBlendClip(null);
    setRowLS([null, null, null, null]);
    setDeskCapBottom(null);
    setDeskCapLeft(null);

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

  const imgStyle        = mobileImgWidth    != null ? { width: `${mobileImgWidth}px`, height: 'auto' } : {};
  const captionStyle    = mobileCaptionSize != null ? { fontSize: `${mobileCaptionSize}px` }           : {};
  const blendStyle      = { clipPath: blendClip ?? 'inset(0 0 0 100%)' };
  const deskCapStyle    = deskCapBottom != null
    ? { bottom: `${deskCapBottom}px`, left: `${deskCapLeft}px` }
    : {};

  const ls = (i) => rowLS[i] ? { letterSpacing: rowLS[i] } : {};

  return (
    <StickySection id="home">
      <Hero>
        {/* Mobile only */}
        <TopLine ref={topRef}>ANNA ROSE</TopLine>
        <BottomGroupBack ref={bottomGroupRef}>
          <BottomLine ref={bottomLineRef}>HUNT{'‑'}ISAAK</BottomLine>
          <Caption ref={captionRef} style={captionStyle}>Researcher · Designer · Artist</Caption>
        </BottomGroupBack>

        {/* Desktop: Hunt/Isaak back layer — behind image, shows blue on cream */}
        <DesktopBlueGroup>
          <DesktopTitleRow ref={rowRefs[2]} $delay={0.4} style={ls(2)}>HUNT</DesktopTitleRow>
          <DesktopTitleRow ref={rowRefs[3]} $delay={0.6} style={ls(3)}>ISAAK</DesktopTitleRow>
        </DesktopBlueGroup>

        <HeroImg ref={imgRef} src={bokehImg} alt="" style={imgStyle} onLoad={measure} />

        {/* Desktop: Anna/Rose — above image, blend mode */}
        <DesktopBrownGroup>
          <DesktopTitleRow ref={rowRefs[0]} $delay={0}   style={ls(0)}>ANNA</DesktopTitleRow>
          <DesktopTitleRow ref={rowRefs[1]} $delay={0.2} style={ls(1)}>ROSE</DesktopTitleRow>
        </DesktopBrownGroup>

        {/* Desktop: Hunt/Isaak blend layer — above image, clipped to image bounds */}
        <DesktopBlueBlendGroup ref={blueBlendRef} style={blendStyle}>
          <DesktopTitleRow $delay={0.4} style={ls(2)}>HUNT</DesktopTitleRow>
          <DesktopTitleRow $delay={0.6} style={ls(3)}>ISAAK</DesktopTitleRow>
        </DesktopBlueBlendGroup>

        {/* Desktop caption — top-left corner aligned with image top-right */}
        <DesktopCaption style={deskCapStyle}>Researcher · Designer · Artist</DesktopCaption>
      </Hero>
    </StickySection>
  );
};

export default HomeSection;
