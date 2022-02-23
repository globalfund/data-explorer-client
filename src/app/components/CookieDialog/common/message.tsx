import React from "react";
import styled from "styled-components/macro";
import { useMediaQuery, Box } from "@material-ui/core";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

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
  const cookieMessage = {__html: (get(cmsData, "componentsCookieDialog.message", ""))};

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
        {get(cmsData, "componentsCookieDialog.cookies", "")}
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
