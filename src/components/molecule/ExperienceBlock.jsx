import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import eyelinkImg from '../../assets/eyelink.jpg';
import firstImg from '../../assets/first.jpg';
import posterImg from '../../assets/poster.jpg';

// Replace with the actual slide deck URL (Google Slides, PDF, etc.)
const SLIDE_DECK_URL = '/slides.pdf';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Intro = styled.p`
  line-height: 1.7;
`;

const LabEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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

const InlineLink = styled.a`
  color: inherit;
`;

const MediaRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
  width: 100%;
`;

const ImgCell = styled.div`
  flex: ${(props) => props.$ratio};
`;

const ImgLink = styled.a`
  display: block;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const FullWidthImg = styled.img`
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
  margin-top: 0.5rem;
`;

const ExperienceBlock = () => {
  const [ratios, setRatios] = useState({ first: 1.5, poster: 1.5 });

  const handleLoad = useCallback((e, key) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setRatios((prev) => ({ ...prev, [key]: naturalWidth / naturalHeight }));
    }
  }, []);

  return (
    <Wrapper>
      <Intro>
        I've had the opportunity to explore several areas of research dedicated to better 
        understanding various cognitive processes and developing methods to better address 
        human/public health concerns. These experiences have helped solidify my interest in 
        projects that utilize computational methods and models to explore human nature and 
        our evolving relationship with machines.
      </Intro>

      <LabEntry>
        <LabName>Mind, Machines, Body, Brain, and Behavior Lab</LabName>
        <Field>McGill University | psychophysics</Field>
        <Description>
          I'm currently completing my honors research in the Mind, Machines,
          Brain, Body, Behavior (m2b3) Lab under the supervision of Dr. Krishna.
          Through psychophysics experiments, which involve eye tracking during
          visual search tasks, we investigate evidence of trans-saccadic
          information transfer and the mechanisms underlying choice. In time, we
          aim to develop a novel model of decision that can account for these
          observed phenomena.{' '}
          <InlineLink
            href="https://m2b3.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            m2b3 website
          </InlineLink>
        </Description>
        <FullWidthImg src={eyelinkImg} alt="EyeLink eye-tracking equipment" />
      </LabEntry>

      <LabEntry>
        <LabName>National Science Foundation: Precision Microbiome Engineering, Crook Lab</LabName>
        <Field>biological engineering</Field>
        <Description>
          We explored a designer plasmid and recombination-based system of
          genome editing in Enterobacter ludwigii, with the long-term goal of
          ultimately engineering this bacterial species to possess greater
          probiotic/antimicrobial characteristics. I developed a data analysis
          pipeline for identifying candidate locations for gene insertion and
          determining potential downstream effects of insertions. This work
          streamlined our subsequent wet lab experiments, enabling us to focus
          on three specific target locations. If you're interested in further
          details regarding this project, you can view the associated slide deck
          and poster below.
        </Description>
        <MediaRow>
          {(() => {
            const total = ratios.first + ratios.poster;
            const scale = total < 1 ? 1 / total : 1;
            return (
              <>
                <ImgCell $ratio={ratios.first * scale}>
                  <ImgLink href={SLIDE_DECK_URL} target="_blank" rel="noreferrer">
                    <img
                      src={firstImg}
                      alt="Slide deck"
                      onLoad={(e) => handleLoad(e, 'first')}
                    />
                  </ImgLink>
                </ImgCell>
                <ImgCell $ratio={ratios.poster * scale}>
                  <ImgLink href={posterImg} target="_blank" rel="noreferrer">
                    <img
                      src={posterImg}
                      alt="Poster"
                      onLoad={(e) => handleLoad(e, 'poster')}
                    />
                  </ImgLink>
                </ImgCell>
              </>
            );
          })()}
        </MediaRow>
      </LabEntry>

      <LabEntry>
        <LabName>Dahan Lab</LabName>
        <Field>University of Pennsylvania | psycholinguistics</Field>
        <Description>
          We assessed conversational response patterns of participants engaged
          in a strategic, cooperation-based task to explore internal
          representations of implicit information and goals held by their task
          partner and/or shared between them. I contributed to the processing,
          computational analysis, and theoretical interpretation of auditory
          linguistic data, utilizing ELAN annotation software and R scripting.{' '}
          <InlineLink href="/pub_assets/r_script.R" target="_blank" rel="noreferrer">
            Portion of R script for organizing annotated data
          </InlineLink>
        </Description>
      </LabEntry>

      <LabEntry>
        <LabName>University of Pennsylvania: Penn Computational Cognitive Neuroscience Lab</LabName>
        <Field>computational neuroscience</Field>
        <Description>
          I gained foundational knowledge of conducting human research, from
          experimental design (including the use of PsychoPy to design visual
          stimuli) to participant recruitment and data collection. This work
          centered on the processes of learning, memory, and the integration of
          new information with prior knowledge.
        </Description>
      </LabEntry>
    </Wrapper>
  );
};

export default ExperienceBlock;
