import { Box } from "@material-ui/core";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import React from "react";
import { AllocationsModule } from "../allocations";

import { chipcss, descriptioncss } from "./style";
import { AccessToFundingEligibilityTableWrapper } from "./table/eligibility/tableWrapper";
import { AccessToFundingRequestTableWrapper } from "./table/fundingRequest/tableWrapper";

interface Props {
  code: string;
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export default function LocationAccessToFundingWrapper(props: Props) {
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);
  return (
    <>
      <div css={descriptioncss}>
        <h1>
          <b>Access to Funding</b>
        </h1>
        <h3>
          <b>Eligibility, Allocation & Funding Requests</b>
        </h3>
        <p>
          Description of Access to Funding / eligibility / FR: We unite the
          world to find solutions that have the most impact, and we take them to
          scale worldwide. It’s working. We won’t stop until the job is
          finished.
        </p>
      </div>
      <Box height={26} />

      <div>
        <p
          css={`
            text-align: center;
          `}
        >
          <b>Period / Cycle</b>
        </p>
        <div
          css={`
            display: flex;
            justify-content: center;
            gap: 0.7rem;
            margin-top: 1rem;
          `}
        >
          <div css={chipcss}>All</div>
          <div css={chipcss}>2011/2013</div>
          <div css={chipcss}>2014/2016</div>
          <div css={chipcss}>2017/2019</div>
          <div css={chipcss}>2020/2022</div>
          <div css={chipcss}>2023/2025</div>
        </div>
      </div>

      <div>
        <h4
          css={`
            font-size: 18px;
            color: #252c34;
            margin-bottom: 0;
            font-family: "Gotham Narrow";
          `}
        >
          <b>Eligibility </b>
        </h4>
        <hr
          css={`
            border: 0.5px solid #000000;
            width: 100%;
            height: 0px;
            margin-bottom: 3rem;
          `}
        />
        <AccessToFundingEligibilityTableWrapper
          code={props.code}
          codeParam={props.codeParam}
        />
      </div>

      <div>
        <h4
          css={`
            font-size: 18px;
            color: #252c34;
            margin-bottom: 0;
            font-family: "Gotham Narrow";
          `}
        >
          <b> Allocation</b>
        </h4>
        <hr
          css={`
            border: 0.5px solid #000000;
            width: 100%;
            height: 0px;
            margin-bottom: 3rem;
          `}
        />
        <AllocationsModule
          code={props.code}
          toolboxOpen={openToolboxPanel}
          setOpenToolboxPanel={setOpenToolboxPanel}
        />
      </div>

      <div>
        <h4
          css={`
            font-size: 18px;
            color: #252c34;
            margin-bottom: 0;
            font-family: "Gotham Narrow";
          `}
        >
          <b>Funding Requests</b>
        </h4>
        <hr
          css={`
            border: 0.5px solid #000000;
            width: 100%;
            height: 0px;
            margin-bottom: 3rem;
          `}
        />
        <AccessToFundingRequestTableWrapper
          code={props.code}
          codeParam={props.codeParam}
          filterGroups={props.filterGroups}
        />
      </div>

      <Box height={26} />
    </>
  );
}
