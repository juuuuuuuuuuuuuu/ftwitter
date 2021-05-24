import { css } from '@emotion/react';
import theme from 'styles/theme';

export const styles = {
  popup: css`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 450px;
    background-color: ${theme.color.white};
    border-radius: 20px;
  `,
  title: css`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    font-size: 16px;
  `,
  title_icon: css`
    margin: 0 10px;
  `,
  titleText: css`
    font-weight: 600;
  `,
  posting: css`
    color: ${theme.color.blue};
    margin: 0 10px;
  `,
  content: css`
    height: 100%;
    background-color: ${theme.color.lightgrey};
    margin-top: 10px;
  `,
  inputForm: css`
    display: flex;
    height: 150px;
    background-color: ${theme.color.white};
  `,
  textarea: css`
    width: 85%;
    margin: 10px;
  `,
  picture: css`
    width: 50px;
    height: 50px;
    margin: 10px;
  `,
  img: css`
    width: 100%;
  `,
  gallery: css`
    padding: 13px;
    border: 1px solid ${theme.color.lightgrey};
    background-color: ${theme.color.ivory};
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  `,
};
