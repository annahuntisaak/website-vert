import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// ── Desktop nav ──────────────────────────────────────────────────────────────

const NavWrapper = styled.div`
  position: fixed;
  top: 1.25rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  pointer-events: none;

  @media (max-width: 700px) {
    display: none;
  }
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
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.12em;
    word-spacing: 0.08em;
  }
`;

// ── Mobile hamburger ──────────────────────────────────────────────────────────

const MobileNav = styled.div`
  display: none;
  position: fixed;
  top: 1.25rem;
  left: 1.25rem;
  z-index: 100;

  @media (max-width: 700px) {
    display: block;
  }
`;

const HamburgerBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 42px;
  height: 42px;
  padding: 0 13px;
  background: rgba(255, 246, 242, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.07);
`;

const Bar = styled.span`
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: rgb(81, 56, 46);
  border-radius: 2px;
`;

const unfurl = keyframes`
  from { clip-path: inset(0 0 100% 0 round 14px); }
  to   { clip-path: inset(0 0 0%   0 round 14px); }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  background: rgba(255, 246, 242, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 160px;
  padding: 0.45rem 0;
  animation: ${unfurl} 0.22s ease-out;

  a {
    display: block;
    text-decoration: none;
    color: rgb(81, 56, 46);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    padding: 0.7rem 1.25rem;

    &:active {
      background: rgba(81, 56, 46, 0.08);
    }
  }
`;

// ── Sections ──────────────────────────────────────────────────────────────────

const sections = [
  { label: 'Home',          id: 'home' },
  { label: 'About',         id: 'about' },
  { label: 'Experience',    id: 'experience' },
  { label: 'Traditional Art', id: 'traditional-art' },
  { label: 'Photography',   id: 'photography' },
  { label: 'Contact',       id: 'contact' },
];

// ── Component ─────────────────────────────────────────────────────────────────

const LandingPageHeader = () => {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef(null);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <NavWrapper data-header>
        <NavPill>
          {sections.map(({ label, id }) => (
            <a key={id} href={`#${id}`} onClick={(e) => scrollTo(e, id)}>
              {label}
            </a>
          ))}
        </NavPill>
      </NavWrapper>

      {/* Mobile */}
      <MobileNav data-header ref={mobileRef}>
        <HamburgerBtn onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Bar />
          <Bar />
          <Bar />
        </HamburgerBtn>
        {open && (
          <Dropdown>
            {sections.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { scrollTo(e, id); setOpen(false); }}
              >
                {label}
              </a>
            ))}
          </Dropdown>
        )}
      </MobileNav>
    </>
  );
};

export default LandingPageHeader;
