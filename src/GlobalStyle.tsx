import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  input {
    all: unset;
    box-sizing: border-box;
    appearance: none;
  }

  body {
    background-color: rgba(0, 0, 0, 0.7);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: white;
  }

  button {
    background-color: white;
    color: black;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  form {
    width: 100%;
  }
  /* other styles */
`;

export default GlobalStyle;
