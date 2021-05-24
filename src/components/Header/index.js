import { authService } from 'fbase';
import { useMemo } from 'react';
 /** @jsxImportSource @emotion/react */
 import { css, jsx } from '@emotion/react';
import { styles } from './style';

import Logo from 'components/Logo';

function Header({ onOpen }) {
  const photoUrl = useMemo(() => authService.currentUser.photoURL, []);

  const onSingOut = () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?');

    if (!result) { return; }

    authService.signOut();
    window.location.reload();
  };

  return (
    <header css={styles.header}>
      <Logo width={150} height={30} style={{marginTop: '14px'}} />
      <div css={styles.rightIcon}>
        <i className="fas fa-plus" css={styles.rightPlus} onClick={onOpen}></i>
        <img css={styles.profile} src={photoUrl} onClick={onSingOut} alt="" />
      </div>
    </header>
  );
}
export default Header;
