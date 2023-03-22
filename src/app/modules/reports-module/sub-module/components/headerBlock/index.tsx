import { Box } from "@material-ui/core";
import React from "react";
import { ReactComponent as ClockICon } from "./clock-img.svg";
import { headerBlockcss } from "./style";

interface Props {
  previewMode: boolean;
}

export default function HeaderBlock(props: Props) {
  return (
    <div css={headerBlockcss.container}>
      <div css={headerBlockcss.innerContainer}>
        <div>
          <input
            type="text"
            value={"Some climate data report"}
            disabled={props.previewMode}
          />
        </div>
        <Box height={17} />

        <div>
          <textarea
            name=""
            id=""
            rows={3}
            disabled={props.previewMode}
            value={"Some description for the report "}
          />
        </div>
        <div css={headerBlockcss.date}>
          <p>
            <ClockICon />{" "}
          </p>
          <p>Creation date: 28.02.2023</p>
        </div>
      </div>
    </div>
  );
}
