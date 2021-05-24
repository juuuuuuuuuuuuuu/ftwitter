import { css } from '@emotion/react';
import theme from 'styles/theme';

export const styles = {
  form: css`
    display: flex;
    flex-direction: column;
  `,
  external: css`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
  `,
  button: css`
    margin-top: 10px;
    background-color: ${theme.color.blue};
    color: ${theme.color.white};
    padding: 6px;
    border-radius: 3px;
    font-size: ${theme.font.medium};
  `,
  line: css`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    position: relative;
    color: ${theme.color.grey};
  `,
  border: css`
    border: 0.5px solid ${theme.color.lightgrey};
  `,
  text: css`
    position: absolute;
    top: -4px;
    align-self: center;
    background-color: ${theme.color.white};
    width: 65px;
    text-align: center;
    font-size: ${theme.font.small};
  `,
  loginForm: css`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  `,
  input: css`
    background-color: ${theme.color.lightgrey};
    height: 39px;
    margin-top: 14px;
    padding: 10px;
  `,
  login: css`
    margin-top: 50px;
  `,
  create: css`
    margin-top: 20px;
    text-align: center;
    font-size: ${theme.font.small};
  `,
  createButton: css`
    margin-left: 7px;
    color: ${theme.color.blue};
  `,
};
