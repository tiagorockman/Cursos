import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

body {
    background: #100936;
    color: #F9f9f9;
    -webkit-font-smoothing: antialiased;
    width: 1100px;
    margin: 0 auto;
}

body, input, button {
    font: 16px "Roboto Condensed", sans-serif;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 700;
}

button {
    cursor: pointer;
    outline: 0;
}


`;
