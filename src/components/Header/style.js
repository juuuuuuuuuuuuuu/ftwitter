import { css } from '@emotion/react';
import theme from 'styles/theme';

export const styles = {
  header: css`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: ${theme.color.white};
    box-shadow: 0 0.5px currentColor;
    font-size: 19px;
  `,
  svg: css`
    margin-top: 14px;
  `,
  rightIcon: css`
    display: flex;
    align-items: baseline;
  `,
  rightPopup: css`
    position: relative;
    font-size: 13px;
  `,
  rightPopup_hide: css`
    display: none;
  `,
  rightPlus: css`
    font-size: 35px;
  `,
  rightItem: css`
    position: absolute;
    top: -5px;
    left: 4px;
    font-size: 13px;
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.grey};
  `,
  rightArrow: css`
    border-color: transparent transparent ${theme.color.grey} transparent;
    border-style: solid;
    border-width: 8px;
    position: absolute;
    top: -21px;
    left: 20px;
  `,
  profile: css`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    margin: 10px 10px;
  `,
  title: css`
    margin-left: -20px;
    margin-top: 10px;
  `,
};
