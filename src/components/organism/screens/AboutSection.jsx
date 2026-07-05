import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import AboutMe from '../../molecule/AboutMe';
import aboutImg from '../../../assets/about.webp';

const GAP = 96; // 6rem — space between photo right edge and content column
const MOBILE_BREAK = 700;

const Outer = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: rgb(26, 13, 7);
  display: flex;
  justify-content: center;

  h1, h2, h3, p, a, span, label {
    color: #fff6f2;
  }

  @media (max-width: ${MOBILE_BREAK}px) {
    flex-direction: column;
  }
`;

const MobilePhoto = styled.img`
  display: none;

  @media (max-width: ${MOBILE_BREAK}px) {
    display: block;
    width: calc(100% - 3rem);
    height: auto;
    margin: 2rem 1.5rem 0;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 8rem 2rem;

  @media (max-width: ${MOBILE_BREAK}px) {
    padding: 4rem 1.5rem 4rem;
  }
`;

/* div instead of img: non-replaced elements reliably stretch with top:0/bottom:0 */
const Photo = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-image: url(${aboutImg});
  background-size: cover;
  background-position: 80% center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  width: fit-content;
  font-family: 'novantique-serif-display', sans-serif;
  font-weight: 300;
  font-style: normal;
  font-size: 2.5rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.1;
  margin: 0 0 3.5rem;
  color: #fff6f2;

  @media (max-width: ${MOBILE_BREAK}px) {
    font-size: 2rem;
    margin: 0 auto 2rem;
  }
`;

const AboutSection = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const titleRef = useRef(null);
  const [layout, setLayout] = useState({ photoWidth: 0, contentMarginLeft: 0 });

  const measure = useCallback(() => {
    if (!outerRef.current || !innerRef.current || !titleRef.current) return;

    if (window.innerWidth <= MOBILE_BREAK) {
      setLayout({ photoWidth: 0, contentMarginLeft: 0 });
      return;
    }

    const outerRect = outerRef.current.getBoundingClientRect();
    const innerRect = innerRef.current.getBoundingClientRect();

    const cs = getComputedStyle(innerRef.current);
    const padLeft  = parseFloat(cs.paddingLeft);
    const padRight = parseFloat(cs.paddingRight);
    const W = innerRef.current.clientWidth - padLeft - padRight;
    const T = titleRef.current.offsetWidth;

    const contentColFromInnerContent = Math.max(0, (W - T) / 2);
    const contentColFromOuter =
      (innerRect.left - outerRect.left) + padLeft + contentColFromInnerContent;

    setLayout({
      photoWidth:        Math.max(0, contentColFromOuter - GAP),
      contentMarginLeft: contentColFromInnerContent,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const { photoWidth, contentMarginLeft } = layout;

  return (
    <Outer id="about" ref={outerRef}>
      <MobilePhoto src={aboutImg} alt="Anna Hunt-Isaak" loading="lazy" decoding="async" />
      {photoWidth > 0 && (
        <Photo style={{ width: photoWidth }} />
      )}
      <Inner ref={innerRef}>
        <div style={{ marginLeft: contentMarginLeft || undefined }}>
          <Title ref={titleRef}>About</Title>
          <AboutMe />
        </div>
      </Inner>
    </Outer>
  );
};

export default AboutSection;
