import { css } from '@emotion/react';
import theme from 'styles/theme';

export const styles = {
  top: css`
    display: flex;
    align-items: center;
  `,
  listCenter: css`
    width: 100;
  `,
  centerImg: css`
    width: 100%;
  `,
  actionIcon: css`
    margin: 0 5px;
    font-size: 20px;
  `,
  id: css`
    margin: 0 5px;
    font-weight: 600;
  `,
  comment: css`
    margin-left: 5px;
  `,
  date: css`
    font-size: 10px;
    margin: 10px 5px;
    color: ${theme.color.grey};
  `,
  profile: css`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin: 10px 10px;
  `,
  like: css`
    color: red;
  `,
  likecnt: css`
    margin: 5px;
    font-weight: 600;
    font-size: 15px;
  `,
};
