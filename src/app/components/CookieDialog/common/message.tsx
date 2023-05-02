import React from "react";
import styled from "styled-components/macro";
import { useMediaQuery, Box } from "@material-ui/core";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

const Button = styled((props) => <button type="button" {...props} />)`
  color: #fff;
  padding: 5px 16px;
  line-height: 17px;
  font-weight: bold;
  border-style: none;
  border-radius: 20px;
  background: #231d2c;
  text-transform: unset;
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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

  > * {
    @supports (-webkit-touch-callout: none) and (not (translate: none)) {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`;

type MessageProps = {
  handleAccept: () => void;
  handleReject: () => void;
};

export const Message = (props: MessageProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });
  const cookieMessage = {
    __html: get(cmsData, "componentsCookieDialog.message", ""),
  };

  return (
    <Box display="flex" flexDirection="column">
      <div
        css={`
          color: #231d2c;
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 15px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "componentsCookieDialog.title", "")}
      </div>
      <Box display="flex" flexDirection={!isSmallScreen ? "row" : "column"}>
        <div
          css={`
            color: #262c34;
            font-size: 12px;
            line-height: 20px;

            > a {
              color: #262c34;
            }

            @media (min-width: 960px) {
              margin-right: 32px;
            }
          `}
        >
          <div dangerouslySetInnerHTML={cookieMessage} />
        </div>
        {isSmallScreen && <div css="width: 100%;height: 15px;" />}
        <Buttons>
          <Button
            test-id="main-page-accept"
            onClick={() => props.handleAccept()}
          >
            {get(cmsData, "componentsCookieDialog.accept", "")}
          </Button>
          <Button
            test-id="main-page-close"
            onClick={() => props.handleReject()}
          >
            {get(cmsData, "componentsCookieDialog.close", "")}
          </Button>
        </Buttons>
      </Box>
    </Box>
  );
};
