import Logo from 'components/Logo';
import Login from 'components/Login';

 /** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

const divStyle = css`
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

const logoStyle = css`
  margin-top: 87px;
  align-self: center;
`;

function Auth() {
  return (
    <div css={divStyle}>
      {/* 로고 이미지 */}
      <div css={logoStyle}>
        <Logo />
      </div>
      <Login />
    </div>
  );
}
export default Auth;
