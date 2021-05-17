import Logo from 'components/Logo';
import { authService, firebaseInstance } from 'fbase';
import { useState } from 'react';

function Auth() {
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

  const onExtraLogin = async (e) => {
    const { name } = e.target;

    const provider =
      name === 'google'
        ? new firebaseInstance.auth.GoogleAuthProvider()
        : new firebaseInstance.auth.GithubAuthProvider();
    await firebaseInstance.auth().signInWithPopup(provider);
  };

  const onDoLogin = async () => {
    await authService.signInWithEmailAndPassword(email, password);
  }

  return (
    <div className="content">
      {/* 로고 이미지 */}
      <div className="logo">
        <Logo />
      </div>
      <div className="form">
        {/* 외부 로그인 */}
        <div className="external_login">
          {/* 구글 로그인 */}
          <button className="button" name="google" onClick={onExtraLogin}>
            Google로 계속하기
          </button>
          {/* 깃헙 로그인 */}
          <button className="button" name="github" onClick={onExtraLogin}>
            Github으로 계속하기
          </button>
        </div>
        <div className="line">
          <span className="border"></span>
          <div className="text">
            <span>또는</span>
          </div>
        </div>
        {/* 로그인창 */}
        <div className="loginForm">
          <input
            type="text"
            name="email"
            placeholder="아이디를 입력하세요"
            value={email}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onChangeInput}
          />
        </div>
        <button className="login button" onClick={onDoLogin}>로그인</button>
        <div className="create">
          <span>계정이 없으신가요?</span>
          <button onClick={onCreateAccount}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Auth;
