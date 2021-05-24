import { Global, css } from "@emotion/react";

const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, input, textarea {
    border: none;
    background: none;
  }

  a {
    text-decoration: none;
  }

  ul, li {
    list-style: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />
}
export default GlobalStyle;