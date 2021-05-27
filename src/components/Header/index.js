/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { styles } from './style';

function Header(props) {
  const { leftIcon, title, rightIcon } = props;

  return (
    <header css={styles.header}>
      <div css={styles.leftIcon}>{leftIcon}</div>
      <div css={styles.title}>
        <span>{title}</span>
      </div>
      <div css={styles.rightIcon}>{rightIcon}</div>
    </header>
  );
}
export default Header;
