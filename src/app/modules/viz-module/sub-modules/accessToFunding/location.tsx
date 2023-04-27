import React from "react";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import { useRecoilState } from "recoil";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { locationAccessToFundingCycleAtom } from "app/state/recoil/atoms";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import RadialChart from "app/modules/viz-module/sub-modules/accessToFunding/allocations/radialChart";
import {
  vizcss,
  chipcss,
  descriptioncss,
} from "app/modules/viz-module/sub-modules/accessToFunding/style";
import { AccessToFundingRequestTableWrapper } from "app/modules/viz-module/sub-modules/accessToFunding/fundingRequest/tableWrapper";
import { AccessToFundingEligibilityTableWrapper } from "app/modules/viz-module/sub-modules/accessToFunding/eligibility/tableWrapper";
import { Link } from "react-router-dom";

interface Props {
  code: string;
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export default function LocationAccessToFundingWrapper(props: Props) {
  const [cycle, setCycle] = useRecoilState(locationAccessToFundingCycleAtom);

  const grantCycles = useStoreState(
    (state) =>
      get(
        state.LocationAccessToFunding.GrantCycles,
        "data.data",
        []
      ) as string[]
  );
  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      id: "",
      locationName: "",
      disbursed: 0,
      committed: 0,
      signed: 0,
      countries: [],
      multicountries: [],
      portfolioManager: "",
      portfolioManagerEmail: "",
    })
  );

  // Allocation data
  const total = useStoreState(
    (state) => get(state.Allocations.data, "total", []) as number
  );
  const keys = useStoreState(
    (state) => get(state.Allocations.data, "keys", []) as string[]
  );
  const values = useStoreState(
    (state) => get(state.Allocations.data, "values", []) as number[]
  );
  const fetchData = useStoreActions((store) => store.Allocations.fetch);
  const isLoading = useStoreState((state) => state.Allocations.loading);
  const colors = ["#E4EBF8", "#C9CAD4", "#F1ECEC"];

  React.useEffect(() => {
    return () => {
      setCycle(null);
    };
  }, []);

  React.useEffect(() => {
    if (cycle) {
      fetchData({
        filterString: `locations=${props.code}&${
          cycle !== "All" ? `periods=${cycle}` : ""
        }`,
      });
    }
  }, [props.code, cycle]);

  React.useEffect(() => {
    if (grantCycles.length > 0) {
      setCycle(grantCycles[grantCycles.length - 1]);
    }
  }, [grantCycles]);

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
          Eligibility for Global Fund support is determined by the income
          classification and disease burden of a country or region. Resources
          are allocated to eligible countries or regions with the highest
          disease burden, the least economic capacity, and where key and
          vulnerable populations are disproportionately affected by the three
          diseases.
        </p>
      </div>
      <Box height={25} />
      <div>
        <p
          css={`
            text-align: center;
          `}
        >
          <b>Cycle</b>
        </p>
        <div
          css={`
            display: flex;
            justify-content: center;
            gap: 0.7rem;
            margin-top: 1rem;
          `}
        >
          <div css={chipcss(cycle === "All")} onClick={() => setCycle("All")}>
            All
          </div>
          {grantCycles.map((c) => (
            <div key={c} css={chipcss(cycle === c)} onClick={() => setCycle(c)}>
              {c.replace("-", "/")}
            </div>
          ))}
        </div>
      </div>
      <div css={vizcss}>
        {props.code.length === 3 && (
          <div>
            <h4>
              <b>Eligibility </b>
            </h4>
            <hr />
            <div css={descriptioncss}>
              <p>
                Below are the components which are eligible for an allocation
                for the selected allocation period, according to the Global Fund
                Eligibility Policy. Eligibility does not guarantee a funding
                allocation. Learn more about Eligibility{" "}
                <a
                  target="_blank"
                  href="https://www.theglobalfund.org/en/applying-for-funding/understand-and-prepare/eligibility/"
                >
                  here
                </a>{" "}
                or{" "}
                <Link to={`/viz/eligibility/table?locations=${props.code}`}>
                  see the full history of eligibility for this country.
                </Link>
              </p>
            </div>
            <Box height="50px" />
            <AccessToFundingEligibilityTableWrapper code={props.code} />
          </div>
        )}
        <div>
          <h4>
            <b>Allocation</b>
          </h4>
          <hr />
          <div
            css={`
              gap: 1rem;
              display: flex;
              position: relative;
              align-items: center;
              justify-content: space-evenly;
            `}
          >
            <RadialChart
              total={total}
              values={values}
              keys={keys}
              isLoading={isLoading}
            />
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
                  <b>{formatFinancialValue(total)}</b>
                </p>
                <p
                  css={`
                    font-size: 14px;
                    color: #252c34;
                    text-align: center;
                    margin-top: 5px;
                  `}
                >
                  Allocated to {locationInfoData.locationName} for{" "}
                  <b>{cycle}</b>
                </p>
              </div>
              <div
                css={`
                  gap: 2rem;
                  margin: auto;
                  display: flex;
                  margin-top: 3rem;
                  text-align: center;
                  align-items: center;
                  justify-content: center;
                `}
              >
                {values.map((val, index) => (
                  <div
                    key={keys[index]}
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
                        font-size: 18px;
                      `}
                    >
                      <b>
                        {formatLargeAmountsWithPrefix(val)
                          .replace("$", "")
                          .replace("bln", "billion")
                          .replace("mln", "million")}
                        <br />
                        {keys[index]}
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
      <Box height={25} />
    </>
  );
}
