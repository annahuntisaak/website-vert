import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import eyelinkImg from '../../assets/eyelink.jpg';
import firstImg from '../../assets/first.jpg';
import posterImg from '../../assets/poster.jpg';
import thesisCoverImg from '../../assets/thesis_cover.png';

const SLIDE_DECK_URL = '/slides.pdf';
const THESIS_URL = '/thesis.pdf';
const RESUME_URL = '/resume.pdf';

const crookImages = [
  { src: firstImg,  alt: 'Slide deck', downloadUrl: SLIDE_DECK_URL, downloadName: 'slides.pdf' },
  { src: posterImg, alt: 'Poster',     downloadUrl: '/poster.pdf',  downloadName: 'poster.pdf' },
];

// ── Timeline layout ───────────────────────────────────────────────────────────

const Intro = styled.p`
  line-height: 1.7;
  margin-bottom: 2.4rem;
`;

const ResumeButton = styled.button`
  display: block;
  margin: 0 auto 5rem;
  background: rgba(81, 56, 46, 0.08);
  border: 1px solid rgba(81, 56, 46, 0.5);
  border-radius: 50px;
  color: rgb(68, 33, 9);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  &:hover {
    background: rgba(81, 56, 46, 0.18);
  }
`;

const Timeline = styled.div`
  display: grid;
  grid-template-columns: 5rem 2rem 1fr;
  row-gap: 0;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const YearLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: 0.15em;
  color: rgba(81, 56, 46, 0.45);
  text-align: right;
  padding-right: 0.9rem;
  padding-top: 0;
  line-height: 1;

  @media (max-width: 700px) {
    display: ${(p) => (p.$hasYear ? 'flex' : 'none')};
    align-items: center;
    text-align: center;
    padding-right: 0;
    font-size: 1.1rem;
    gap: 0.75rem;
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(81, 56, 46, 0.3);
    }
  }
`;

const LineCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: rgb(81, 56, 46);
  flex-shrink: 0;
  margin-top: 3px;
`;

const VertLine = styled.div`
  flex: 1;
  width: 1px;
  background-color: rgba(81, 56, 46, 0.3);
  min-height: 0.5rem;
  margin-top: ${(p) => p.$mt ?? '6px'};
  margin-bottom: ${(p) => p.$mb ?? '6px'};
`;

const ContentCell = styled.div`
  padding: 0 0 ${(p) => p.$pb ?? '3.5rem'} 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 700px) {
    padding-left: 0;
    padding-bottom: 2rem;
  }
`;

const LabName = styled.h3`
  margin: 0;
  text-transform: none;
`;

const Field = styled.p`
  font-style: italic;
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.7;
`;

const MediaRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ImgCell = styled.div`
  flex: ${(props) => props.$ratio};

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 700px) {
    flex: none;
    width: 100%;
  }
`;

const HoverImgCell = styled.div`
  flex: ${(props) => props.$ratio};
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: opacity 0.3s ease;
  }

  &:hover img {
    opacity: 0.25;
  }

  &:hover > div {
    opacity: 1;
  }

  @media (max-width: 700px) {
    flex: none;
    width: 100%;
  }
`;

const ImgLink = styled.a`
  display: block;
  cursor: pointer;
`;

const ImgHoverLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 14px;
  font-weight: 300;
  font-family: var(--font-sans);
  letter-spacing: 0.12em;
  color: rgb(81, 56, 46);
  text-align: center;
  pointer-events: none;
  width: 80%;
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

const LightboxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

const LightboxImg = styled.img`
  max-width: 80vw;
  max-height: 62vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

const DownloadBtn = styled.button`
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

// ── helpers ───────────────────────────────────────────────────────────────────

const download = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};

// ── Component ─────────────────────────────────────────────────────────────────

const ExperienceBlock = () => {
  const [ratios, setRatios] = useState({ eyelink: 1.5, thesis: 1.5, first: 1.5, poster: 1.5 });
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLoad = useCallback((e, key) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [key]: naturalWidth / naturalHeight }));
    }
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    const onKey = (e) => {
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i < crookImages.length - 1 ? i + 1 : i));
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

  const entries = [
    {
      year: '2025',
      pb: '5rem',
      showLine: true,
      content: (
        <>
          <LabName>Mind, Machines, Body, Brain, and Behavior Lab</LabName>
          <Field>McGill University</Field>
          <Description>
            Through eye tracking experiments, we investigated evidence of trans-saccadic information transfer
            and the mechanisms underlying visual attention and decision-making. This work contributed to the
            ongoing development of a novel mathematical model of human choice behavior. My honor's thesis on
            this project is below.
          </Description>
          <MediaRow>
            {(() => {
              const total = ratios.eyelink + ratios.thesis;
              const scale = total < 1 ? 1 / total : 1;
              return (
                <>
                  <ImgCell $ratio={ratios.eyelink * scale}>
                    <img src={eyelinkImg} alt="EyeLink eye-tracking equipment" onLoad={(e) => handleLoad(e, 'eyelink')} />
                  </ImgCell>
                  <HoverImgCell $ratio={ratios.thesis * scale}>
                    <ImgLink
                      href={THESIS_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => download(THESIS_URL, 'thesis.pdf')}
                    >
                      <img src={thesisCoverImg} alt="Thesis cover" onLoad={(e) => handleLoad(e, 'thesis')} />
                    </ImgLink>
                    <ImgHoverLabel>
                      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="7" y1="1" x2="7" y2="9.5" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round"/>
                        <polyline points="4,7 7,10 10,7" fill="none" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="2" y1="13" x2="12" y2="13" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </ImgHoverLabel>
                  </HoverImgCell>
                </>
              );
            })()}
          </MediaRow>
        </>
      ),
    },
    {
      year: '2024',
      pb: '5rem',
      showLine: true,
      content: (
        <>
          <LabName>Crook Lab</LabName>
          <Field>National Science Foundation: Precision Microbiome Engineering</Field>
          <Description>
            We explored a designer plasmid and recombination-based system of genome editing in
            Enterobacter ludwigii, with the long-term goal of ultimately engineering this
            bacterial species to possess greater probiotic/antimicrobial characteristics. I
            developed a data analysis pipeline for identifying candidate locations for gene
            insertion and determining potential downstream effects of insertions. This work
            streamlined our subsequent wet lab experiments, enabling us to focus on three
            specific target locations. If you're interested in further details regarding this
            project, you can view the associated slide deck and poster below.
          </Description>
          <MediaRow>
            {(() => {
              const total = ratios.first + ratios.poster;
              const scale = total < 1 ? 1 / total : 1;
              return (
                <>
                  <HoverImgCell $ratio={ratios.first * scale} onClick={() => setActiveIndex(0)}>
                    <img src={firstImg} alt="Slide deck" onLoad={(e) => handleLoad(e, 'first')} />
                    <ImgHoverLabel />
                  </HoverImgCell>
                  <HoverImgCell $ratio={ratios.poster * scale} onClick={() => setActiveIndex(1)}>
                    <img src={posterImg} alt="Poster" onLoad={(e) => handleLoad(e, 'poster')} />
                    <ImgHoverLabel />
                  </HoverImgCell>
                </>
              );
            })()}
          </MediaRow>
        </>
      ),
    },
    {
      year: '2023',
      pb: '2rem',
      showLine: true,
      content: (
        <>
          <LabName>Dahan Lab</LabName>
          <Field>University of Pennsylvania</Field>
          <Description>
            We assessed conversational response patterns of participants engaged in a strategic,
            cooperation-based task to explore internal representations of implicit information
            and goals held by their task partner and/or shared between them. I contributed to
            the processing, computational analysis, and theoretical interpretation of auditory
            linguistic data, utilizing ELAN annotation software and R scripting.
          </Description>
        </>
      ),
    },
    {
      year: '',
      showDot: false,
      pb: '0',
      showLine: true,
      content: (
        <>
          <LabName>Penn Computational Cognitive Neuroscience Lab</LabName>
          <Field>University of Pennsylvania</Field>
          <Description>
            I gained foundational knowledge of conducting human subjects research, from experimental
            design (including the use of PsychoPy to design visual stimuli) to participant
            recruitment and data collection. This work centered on the processes of learning,
            memory, and the integration of new information with prior knowledge.
          </Description>
        </>
      ),
    },
  ];

  return (
    <div>
      <Intro>
        I've had the opportunity to explore several areas of research dedicated to better
        understanding various cognitive processes and developing methods to better address
        human/public health concerns. These experiences have helped solidify my interest in
        projects that utilize computational methods and models to explore human nature and
        our evolving relationship with machines.
      </Intro>
      <ResumeButton onClick={() => { window.open(RESUME_URL, '_blank'); download(RESUME_URL, 'resume.pdf'); }}>
        Download My Resume
      </ResumeButton>
      <Timeline>
        {entries.map((entry, i) => {
          const hasDot = entry.showDot !== false;
          const nextHasDot = i + 1 < entries.length ? entries[i + 1].showDot !== false : true;
          return (
            <React.Fragment key={i}>
              <YearLabel $hasYear={!!entry.year}>{entry.year}</YearLabel>
              <LineCell>
                {hasDot && <Dot />}
                {entry.showLine && (
                  <VertLine
                    $mt={hasDot ? '6px' : '0'}
                    $mb={nextHasDot ? '6px' : '0'}
                  />
                )}
              </LineCell>
              <ContentCell $pb={entry.pb}>{entry.content}</ContentCell>
            </React.Fragment>
          );
        })}
      </Timeline>

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
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxImg
              src={crookImages[activeIndex].src}
              alt={crookImages[activeIndex].alt}
            />
            <DownloadBtn
              aria-label="Download"
              onClick={() => download(crookImages[activeIndex].downloadUrl, crookImages[activeIndex].downloadName)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="1" x2="7" y2="9.5" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round"/>
                <polyline points="4,7 7,10 10,7" fill="none" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="2" y1="13" x2="12" y2="13" stroke="rgb(68,33,9)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </DownloadBtn>
          </LightboxContent>
          {activeIndex < crookImages.length - 1 && (
            <ArrowBtn
              $side="right"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => i + 1); }}
            />
          )}
        </Overlay>
      )}
    </div>
  );
};

export default ExperienceBlock;
