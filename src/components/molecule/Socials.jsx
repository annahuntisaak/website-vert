import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const EMAIL = 'annahuntisaak@gmail.com';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  gap: 0.75rem;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #fff6f2;
    font-size: 2.5rem;
    line-height: 1;
    transition: color 0.2s ease, transform 0.1s ease;

    &:hover {
      color: rgba(255, 246, 242, 0.4);
    }

    &:active {
      transform: scale(0.88);
    }
  }
`;

const EmailText = styled.span`
  color: #fff6f2;
  font-size: 14px;
  cursor: copy;
  user-select: none;

  &:hover {
    color: rgba(255, 246, 242, 0.75);
  }
`;

const Tooltip = styled.span`
  color: rgba(255, 246, 242, 0.45);
  font-size: 11px;
  letter-spacing: 0.08em;
`;

const Socials = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Wrapper>
      <IconRow>
        <a href="https://www.linkedin.com/in/anna-rose-hunt-isaak" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://www.instagram.com/annameigui/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <EmailText onClick={handleCopy} title="Click to copy">
          {EMAIL}
        </EmailText>
      </IconRow>
      {copied && <Tooltip>copied</Tooltip>}
    </Wrapper>
  );
};

export default Socials;
