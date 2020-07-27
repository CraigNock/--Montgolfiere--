
import { createGlobalStyle } from 'styled-components';

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vw = window.innerWidth * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vw', `${vw}px`);


const GlobalStyleGlobal = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Poppins', sans-serif;
  }
  html {
    font-size: 16px;
    @media (max-width: 400px) {
      font-size: 14px;
    }
    @media (max-width: 350px) {
      font-size: 12px;
    }
  }
  html, body {
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
    
  }
  

  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-family: 'Poppins', sans-serif;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  body {
    line-height: 1.25;
    width:100vw;
    height:100vh;
    min-width: 1000px;
    min-height: 700px;
    background: black;
    color: whitesmoke;
    font-family: 'Poppins', sans-serif;
    @media(max-width: 950px) {
    min-width: 100vw;
    min-height: 100vh;
  }
  }
  button {
    font-family: 'Poppins', sans-serif;
  }

  /* for map sizing */
  .leaflet-container {
    width: 100%;
    height: 100%;
  }



`;


export default GlobalStyleGlobal;