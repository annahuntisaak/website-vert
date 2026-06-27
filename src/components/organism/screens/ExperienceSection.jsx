import React from 'react';
import styled from 'styled-components';
import ExperienceBlock from '../../molecule/ExperienceBlock';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 6rem 2rem;
`;

const ResumeButton = styled.button`
  display: block;
  margin: 0 auto 3rem;
  background: rgba(81, 56, 46, 0.08);
  border: 1px solid rgba(81, 56, 46, 0.5);
  border-radius: 50px;
  color: rgb(68, 33, 9);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  padding: 0.5rem 1.5rem;
  cursor: pointer;

  &:hover {
    background: rgba(81, 56, 46, 0.18);
  }
`;

const RESUME_URL = '/resume.pdf';

const handleResumeClick = () => {
  window.open(RESUME_URL, '_blank');
  const a = document.createElement('a');
  a.href = RESUME_URL;
  a.download = 'resume.pdf';
  a.click();
};

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <SectionTitleImage src="/titles/experience.png" alt="Experience" />
      <ResumeButton onClick={handleResumeClick}>Download My Resume</ResumeButton>
      <ExperienceBlock />
    </Section>
  );
};

export default ExperienceSection;
