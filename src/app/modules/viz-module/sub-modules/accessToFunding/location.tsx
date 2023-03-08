import { Box } from "@material-ui/core";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import React, { useState } from "react";
import { AllocationsModule } from "../allocations";

import { chipcss, descriptioncss, vizcss } from "./style";
import { AccessToFundingEligibilityTableWrapper } from "./eligibility/tableWrapper";
import { AccessToFundingRequestTableWrapper } from "./fundingRequest/tableWrapper";
import RadialChart from "./allocations/radialChart";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { get } from "lodash";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

interface Props {
  code: string;
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export default function LocationAccessToFundingWrapper(props: Props) {
  const fetchData = useStoreActions((store) => store.Allocations.fetch);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelAllocationsPeriodState.value
  );

  const total = useStoreState(
    (state) => get(state.Allocations.data, "total", []) as number
  );
  const keys = useStoreState(
    (state) => get(state.Allocations.data, "keys", []) as string[]
  );

  const values = useStoreState(
    (state) => get(state.Allocations.data, "values", []) as number[]
  );

  const colors = ["#E4EBF8", "#C9CAD4", "#F1ECEC"];

  React.useEffect(() => {
    fetchData({
      filterString: "periods=2023 - 2025",
    });
  }, [props.code, appliedFilters, selectedPeriod]);
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
      <div css={vizcss}>
        <div>
          <h4>
            <b>Eligibility </b>
          </h4>
          <hr />
          <AccessToFundingEligibilityTableWrapper
            code={props.code}
            codeParam={props.codeParam}
          />
        </div>

        <div>
          <h4>
            <b> Allocation</b>
          </h4>
          <hr />
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 3rem;
            `}
          >
            <RadialChart total={total} values={values} keys={keys} />
            <div
              css={`
                /* background: pink; */
              `}
            >
              <div>
                <p
                  css={`
                    font-size: 24px;
                    color: #252c34;
                    text-align: center;
                    margin-bottom: 0px;
                  `}
                >
                  <b>{total} USD</b>
                </p>
                <p
                  css={`
                    font-size: 14px;
                    color: #252c34;
                    text-align: center;
                    margin-top: 5px;
                  `}
                >
                  Total funds allocated in Kenya for<b>2023/2025</b>{" "}
                </p>
              </div>
              <div
                css={`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  width: 90%;
                  /* background: yellow; */
                  margin: auto;
                  margin-top: 3rem;
                `}
              >
                {values.map((val, index) => (
                  <div
                    css={`
                      display: flex;
                      align-items: center;

                      flex-direction: column;
                      justify-content: center;
                    `}
                  >
                    <div
                      css={`
                        width: 31px;
                        height: 31px;
                        border-radius: 50%;
                        background: ${colors[index]};
                      `}
                    />
                    <p
                      css={`
                        width: 63%;
                        font-size: 18px;
                      `}
                    >
                      <b>
                        {val} million {keys[index]} funds
                      </b>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4>
            <b>Funding Requests</b>
          </h4>
          <hr />
          <AccessToFundingRequestTableWrapper
            code={props.code}
            codeParam={props.codeParam}
            filterGroups={props.filterGroups}
          />
        </div>
      </div>

      <Box height={26} />
    </>
  );
}
