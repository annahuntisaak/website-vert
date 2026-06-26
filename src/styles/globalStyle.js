import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-sans: 'Roboto Mono', monospace;
    --font-mono: 'Roboto Mono', monospace;
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
    font-family: var(--font-mono);
    font-weight: 400;
    font-size: 13px;
    background-color: #fff6f2;
    color: rgb(81, 56, 46);
    letter-spacing: 0.08em;
    word-spacing: 0.05em;
  }

  h1 {
    font-family: var(--font-mono);
    font-weight: 500;
    color: rgb(68, 33, 9);
    letter-spacing: 0.1em;
  }

  h2, h3 {
    font-family: var(--font-mono);
    font-weight: 500;
    color: rgb(68, 33, 9);
    letter-spacing: 0.1em;
  }

  p {
    color: rgb(81, 56, 46);
  }
`;
