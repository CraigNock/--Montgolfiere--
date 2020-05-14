import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';



const GlobalStyleGlobal = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Poppins', sans-serif;
  }

  html, body {
    max-width: 100vw;
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
    /* background: #2980b9; */
    background: 
    linear-gradient(180deg, 
      rgba(0,122,235,1) 0%, 
    rgba(157,207,255,1) 83%);
    /* background: linear-gradient(180deg, rgba(0,3,34,1) 0%, rgba(0,18,54,1) 83%); */
    overflow: hidden;
    color: whitesmoke;
    font-family: 'Poppins', sans-serif;
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