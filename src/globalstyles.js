import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
    background-color: #5c3bfe;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: auto;
  }
  p {
      margin:0;
    }
`;

export default GlobalStyle;
