import React from 'react';
import styled from 'styled-components';
import ContactForm from '../../molecule/ContactForm';
import Socials from '../../molecule/Socials';
import SectionTitleImage from '../../molecule/SectionTitleImage';

const Outer = styled.section`
  width: 100%;
  background-color: rgb(26, 13, 7);
  display: flex;
  justify-content: center;

  /* override all text colors for the dark background */
  h1, h2, h3, p, a, span, label, input, textarea, button {
    color: #fff6f2;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 7rem 3rem 6rem;
`;

const Intro = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const ContactSection = () => {
  return (
    <Outer id="contact">
      <Inner>
        <SectionTitleImage src="/titles/contact.png" alt="Contact" />
        <Intro>
          I'd love to hear from you!  Feel free to reach out using the form below, directly
          via email, or by connecting on social media platforms.
        </Intro>
        <ContactForm />
        <Socials />
      </Inner>
    </Outer>
  );
};

export default ContactSection;
