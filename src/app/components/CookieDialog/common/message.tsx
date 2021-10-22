import React from "react";
import styled from "styled-components/macro";
import { useMediaQuery, Box } from "@material-ui/core";

const Button = styled((props) => <button type="button" {...props} />)`
  color: #fff;
  padding: 9px 16px;
  line-height: 17px;
  font-weight: bold;
  border-radius: 20px;
  background: #495057;
  text-transform: unset;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    max-width: 74px;
  }
`;

const Buttons = styled.div`
  gap: 10px;
  display: flex;
  align-self: baseline;
`;

type MessageProps = {
  handleAccept: () => void;
  handleReject: () => void;
};

export const Message = (props: MessageProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  return (
    <Box display="flex" flexDirection="column">
      <div
        css={`
          color: #495057;
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 15px;
        `}
      >
        Cookies
      </div>
      <Box display="flex" flexDirection={!isSmallScreen ? "row" : "column"}>
        <div
          css={`
            color: #495057;
            font-size: 14px;
            line-height: 20px;

            > a {
              color: #495057;
            }

            @media (min-width: 960px) {
              margin-right: 32px;
            }
          `}
        >
          The Global Fund uses cookies for anonymised statistics on website use
          and content performance to help us improve and adapt the website. To
          consent to the use of cookies, please click “Accept”. To learn more
          about your rights and options, please read our{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.theglobalfund.org/en/legal/privacy-statement/"
          >
            Privacy Statement
          </a>
        </div>
        {isSmallScreen && <div css="width: 100%;height: 15px;" />}
        <Buttons>
          <Button
            test-id="main-page-accept"
            onClick={() => props.handleAccept()}
          >
            Accept
          </Button>
          <Button
            test-id="main-page-close"
            onClick={() => props.handleReject()}
          >
            Close
          </Button>
        </Buttons>
      </Box>
    </Box>
  );
};
