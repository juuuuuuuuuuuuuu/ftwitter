import { authService } from 'fbase';
import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { styles } from './style';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const onCreateAccount = () => {
    if (!email || !password) {
      alert('생성할 id와 pw 입력해주세요');
      return;
    }

    try {
      authService.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onDoLogin = async () => {
    await authService.signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      {/* 로그인창 */}
      <div css={styles.loginForm}>
        <input
          css={styles.input}
          type="text"
          name="email"
          placeholder="아이디를 입력하세요"
          value={email}
          onChange={onChangeInput}
        />
        <input
          css={styles.input}
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={onChangeInput}
        />
      </div>
      <button css={styles.login} onClick={onDoLogin}>
        로그인
      </button>
      <div css={styles.create}>
        <span>계정이 없으신가요?</span>
        <button css={styles.createButton} onClick={onCreateAccount}>
          가입하기
        </button>
      </div>
    </>
  );
}
export default Form;
