import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  top: 1.25rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  pointer-events: none;
`;

const NavPill = styled.nav`
  display: flex;
  gap: 5rem;
  padding: 0.8rem 3.5rem;
  background: rgba(255, 246, 242, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 50px;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.07);
  pointer-events: auto;

  a {
    text-decoration: none;
    color: rgb(81, 56, 46);
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    word-spacing: 0.08em;
  }
`;

const sections = [
  { label: 'Home',           id: 'home' },
  { label: 'Experience',     id: 'experience' },
  { label: 'Traditional Art', id: 'traditional-art' },
  { label: 'Photography',    id: 'photography' },
  { label: 'Contact',        id: 'contact' },
];

const LandingPageHeader = () => {
  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NavWrapper>
      <NavPill>
        {sections.map(({ label, id }) => (
          <a key={id} href={`#${id}`} onClick={(e) => handleClick(e, id)}>
            {label}
          </a>
        ))}
      </NavPill>
    </NavWrapper>
  );
};

export default LandingPageHeader;
