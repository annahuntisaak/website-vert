import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-sans: 'Josefin Sans', sans-serif;
    --font-mono: 'Josefin Sans', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-padding-top: 50px;
    overscroll-behavior-y: none;
  }

  body {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 14px;
    background-color: #fff6f2;
    color: rgb(81, 56, 46);
    letter-spacing: 0.12em;
    word-spacing: 0.08em;
  }

  h1 {
    font-family: var(--font-sans);
    font-weight: 500;
    color: rgb(68, 33, 9);
    letter-spacing: 0.15em;
  }

  h2, h3 {
    font-family: var(--font-sans);
    font-weight: 500;
    color: rgb(68, 33, 9);
    letter-spacing: 0.15em;
  }

  p {
    color: rgb(81, 56, 46);
  }

  @media (max-width: 700px) {
    body {
      font-size: 13px;
    }
    h2, h3 {
      font-size: 1.1rem;
    }
  }

  body.lightbox-open [data-header] {
    display: none !important;
  }
`;
