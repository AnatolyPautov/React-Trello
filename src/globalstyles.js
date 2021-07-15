import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
    background-color: #5c3bfe;
    box-sizing: border-box;
    padding: 0;
    height: 100%;
    overflow-x: auto;
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
  p {
      margin:0;
    }
`;

export default GlobalStyle;
