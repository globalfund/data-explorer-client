import React from "react";
import Box from "@material-ui/core/Box";
import styled from "styled-components/macro";
import Typography from "@material-ui/core/Typography";

const MessageContainer = styled((props) => <Box {...props} />)`
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: normal;
  }
`;

const Typo = styled((props) => <Typography {...props} />)`
  && {
    margin-right: 32px;
    align-self: center;
    @media (max-width: 960px) {
      margin-bottom: 8px;
    }
  }
`;

const Button = styled.button`
  padding: 12px 27px;
  border-radius: 30px;
  background: #231d2c;
  color: #fff;
  width: 113px;
  height: 41px;
  outline: none;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 960px) {
    margin-bottom: 8px;
  }
`;

type MessageProps = {
  onClose?: () => void;
};

export const Message = (props: MessageProps) => {
  return (
    <MessageContainer display="flex">
      <Typo
        variant="body1"
        css={`
          color: #231d2c;

          a {
            color: #231d2c;
          }
        `}
      >
        The website makes use of{" "}
        <a
          href={`https://drive.google.com/file/d/1andhlQEoaEq5qDxMbtnApXiZborsg-bG/view?usp=drive_link`}
          target="_blank"
          rel="noopener noreferrer"
        >
          cookies
        </a>
        . Review{" "}
        <a
          href={`https://drive.google.com/file/d/1andhlQEoaEq5qDxMbtnApXiZborsg-bG/view?usp=drive_link`}
          target="_blank"
          rel="noopener noreferrer"
        >
          data privacy
        </a>{" "}
        for more details.
      </Typo>
      <Button data-cy="cookie-btn" type="button" onClick={props.onClose}>
        {" "}
        Accept
      </Button>
    </MessageContainer>
  );
};
