import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import eyelinkImg from '../../assets/eyelink.jpg';
import firstImg from '../../assets/first.jpg';
import posterImg from '../../assets/poster.jpg';
import thesisCoverImg from '../../assets/thesis_cover.png';

const SLIDE_DECK_URL = '/slides.pdf';
const THESIS_URL = '/thesis.pdf';
const RESUME_URL = '/resume.pdf';

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

// Plain flex cell — for non-downloadable images (eyelink).
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

// Hoverable flex cell — for downloadable images.
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

const download = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};

const ExperienceBlock = () => {
  const [ratios, setRatios] = useState({ eyelink: 1.5, thesis: 1.5, first: 1.5, poster: 1.5 });

  const handleLoad = useCallback((e, key) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [key]: naturalWidth / naturalHeight }));
    }
  }, []);

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
                    <ImgHoverLabel>Click to download</ImgHoverLabel>
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
                  <HoverImgCell $ratio={ratios.first * scale}>
                    <ImgLink href={SLIDE_DECK_URL} target="_blank" rel="noreferrer" onClick={() => download(SLIDE_DECK_URL, 'slides.pdf')}>
                      <img src={firstImg} alt="Slide deck" onLoad={(e) => handleLoad(e, 'first')} />
                    </ImgLink>
                    <ImgHoverLabel>Click to download</ImgHoverLabel>
                  </HoverImgCell>
                  <HoverImgCell $ratio={ratios.poster * scale}>
                    <ImgLink href={posterImg} target="_blank" rel="noreferrer" onClick={() => download(posterImg, 'poster.jpg')}>
                      <img src={posterImg} alt="Poster" onLoad={(e) => handleLoad(e, 'poster')} />
                    </ImgLink>
                    <ImgHoverLabel>Click to download</ImgHoverLabel>
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
    </div>
  );
};

export default ExperienceBlock;
