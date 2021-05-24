import { firebaseInstance } from 'fbase';
import Form from './Form';
 /** @jsxImportSource @emotion/react */
 import { css, jsx } from '@emotion/react';
import { styles } from './style';

function Login() {
  const onExtraLogin = async (e) => {
    const { name } = e.target;

    const provider =
      name === 'google'
        ? new firebaseInstance.auth.GoogleAuthProvider()
        : new firebaseInstance.auth.GithubAuthProvider();
    await firebaseInstance.auth().signInWithPopup(provider);
  };

  return (
    <div css={styles.form}>
      {/* 외부 로그인 */}
      <div css={styles.external}>
        {/* 구글 로그인 */}
        <button css={styles.button} name="google" onClick={onExtraLogin}>
          Google로 계속하기
        </button>
        {/* 깃헙 로그인 */}
        <button css={styles.button} name="github" onClick={onExtraLogin}>
          Github으로 계속하기
        </button>
      </div>
      <div css={styles.line}>
        <span css={styles.border}></span>
        <div css={styles.text}>
          <span>또는</span>
        </div>
      </div>
      {/* 로그인폼 */}
      <Form />
    </div>
  );
}
export default Login;
