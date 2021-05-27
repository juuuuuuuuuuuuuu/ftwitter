import Header from "components/Header";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

function Comment() {
  const history = useHistory();

  const docId = useMemo(() => history.location.search.split('?docId=')[1], []);

  return (
  <div>
    <Header
      title="댓글"
      leftIcon={<i className="fas fa-chevron-left" css={styles.leftIcon}></i>}
    />
  </div>)
}
export default Comment;

const styles = {
  leftIcon: css`
  margin: 10px;
  `
}