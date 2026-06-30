import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  line-height: 1.7;

  p + p {
    margin-top: 1.2rem;
  }
`;

const AboutMe = () => (
  <Text>
    <p>
      I'm Anna Rose Hunt-Isaak, a researcher and artist fascinated by the complex
      intersections of human cognition and behavior, technology, and design. I have a passion
      for the research and development of technologies that foster close, reciprocal relationships 
      with their users and for exploring the role that human-centered design has to play in such systems.
    </p>
    <p>
      At McGill University, I earned my BASc in Cognitive Science, with concentrations in 
      neuroscience and computer science.  Now based in Toronto, I'm always looking for opportunities
      to get involved in interesting projects!
    </p>
  </Text>
);

export default AboutMe;
