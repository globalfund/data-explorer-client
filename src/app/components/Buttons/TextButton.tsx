/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import theme from 'app/theme';
import { NavLink } from 'react-router-dom';
import { css } from 'styled-components/macro';

interface TextButtonprops {
  label: string;
  path?: string;
  onClick?: Function;
}

const containercss = css`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #2e4063;
  letter-spacing: 1px;

  transition: color 150ms;

  &:hover {
    //color: ${theme.palette.text.secondary};
    color: ${theme.palette.primary.main};
  }
`;

export const TextButton = (props: TextButtonprops) => {
  return props.path ? (
    <NavLink to={props.path || ''} css={containercss}>
      {props.label}
    </NavLink>
  ) : (
    <div css={containercss} onClick={() => props.onClick && props.onClick()}>
      {props.label}
    </div>
  );
};
