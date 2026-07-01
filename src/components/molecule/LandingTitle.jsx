import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import bokehImg from '../../assets/bokeh.jpg';

const MAX_FONT_REM = 8;
const MIN_LINE_PX  = 24;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Name = styled.h1`
  font-family: 'novantique-serif-display', sans-serif;
  font-weight: 300;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin-bottom: 2.5rem;
`;

const AnimLine = styled.span`
  display: block;
  width: fit-content;
  margin: 0 auto;
  white-space: nowrap;
  animation: ${slideUp} 0.7s ease-out both;
  animation-delay: ${props => props.$delay}s;
`;

const InlinePhoto = styled.img`
  display: inline-block;
  height: 0.75em;
  width: auto;
  vertical-align: baseline;
  object-fit: cover;
  margin: 0 0.06em;
`;

const CaptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  animation: ${slideUp} 0.7s ease-out both;
  animation-delay: 0.6s;
`;

const Rule = styled.div`
  flex: 1;
  height: 1px;
  background-color: currentColor;
  opacity: 0.5;
`;

const CaptionText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
`;

const LandingTitle = () => {
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const captionRef = useRef(null);
  const [fontSize,   setFontSize]   = useState(MAX_FONT_REM);
  const [titleWidth, setTitleWidth] = useState(0);
  const [showRules,  setShowRules]  = useState(false);

  const measure = useCallback(() => {
    if (!line1Ref.current || !line2Ref.current || !captionRef.current) return;

    const w1 = line1Ref.current.getBoundingClientRect().width;
    const w2 = line2Ref.current.getBoundingClientRect().width;
    const currentMaxW = Math.max(w1, w2);
    if (!currentMaxW) return;

    const currentFontPx = parseFloat(getComputedStyle(line1Ref.current).fontSize);
    const available     = window.innerWidth * 0.88;
    const maxFontPx     = MAX_FONT_REM * 16;

    const targetFontPx  = Math.min(currentFontPx * (available / currentMaxW), maxFontPx);
    const newTitleWidth = currentMaxW * (targetFontPx / currentFontPx);

    const captionW  = captionRef.current.getBoundingClientRect().width;
    const ruleSpace = (newTitleWidth - captionW) / 2;

    setFontSize(targetFontPx / 16);
    setTitleWidth(newTitleWidth);
    setShowRules(ruleSpace >= MIN_LINE_PX);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <Wrapper>
      <Name style={{ fontSize: `${fontSize}rem` }}>
        <AnimLine ref={line1Ref} $delay={0}>
          {'ANNA'}<InlinePhoto src={bokehImg} alt="" />{'ROSE'}
        </AnimLine>
        <AnimLine ref={line2Ref} $delay={0.3}>HUNT{'‑'}ISAAK</AnimLine>
      </Name>
      <CaptionRow style={titleWidth ? { width: titleWidth } : undefined}>
        {showRules && <Rule />}
        <CaptionText ref={captionRef}>Researcher · Designer · Artist</CaptionText>
        {showRules && <Rule />}
      </CaptionRow>
    </Wrapper>
  );
};

export default LandingTitle;
