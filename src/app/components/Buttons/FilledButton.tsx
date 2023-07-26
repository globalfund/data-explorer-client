/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import theme from 'app/theme';

interface GeneralButtonProps {
  label: string;
  onClick?: Function;
  backgroundColor?: string;
  disabled?: boolean;
}

export const FilledButton = (props: GeneralButtonProps) => {
  // tidy up and make re-useable
  const backgroundColor = () => {
    if (props.disabled) return '#B6B6B6';
    if (props.backgroundColor) return props.backgroundColor;
    return theme.palette.primary.main;
  };

  return (
    <div
      onClick={() => props.onClick && !props.disabled && props.onClick()}
      css={`
        padding-left: 24px;
        padding-right: 24px;
        height: 32px;
        background: ${backgroundColor};
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: ${props.disabled ? 'unset' : 'pointer'};
        user-select: none;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1.25397px;
        color: ${theme.palette.common.white};
        transition: color 150ms;
        white-space: nowrap;

        &:hover {
          opacity: ${props.disabled ? 'unset' : '0.7'};
        }
      `}
    >
      {props.label}
    </div>
  );
};
