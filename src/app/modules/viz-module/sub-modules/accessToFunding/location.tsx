import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useRecoilState } from "recoil";
import { HIV } from "app/assets/icons/HIV";
import { useCMSData } from "app/hooks/useCMSData";
import { Malaria } from "app/assets/icons/Malaria";
import { Tuberculosis } from "app/assets/icons/TB";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { locationAccessToFundingCycleAtom } from "app/state/recoil/atoms";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { AccessToFundingRequestTableWrapper } from "app/modules/viz-module/sub-modules/accessToFunding/fundingRequest/tableWrapper";
import { AccessToFundingEligibilityTableWrapper } from "app/modules/viz-module/sub-modules/accessToFunding/eligibility/tableWrapper";
import {
  vizcss,
  chipcss,
  descriptioncss,
} from "app/modules/viz-module/sub-modules/accessToFunding/style";

interface Props {
  code: string;
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export default function LocationAccessToFundingWrapper(props: Props) {
  const cmsData = useCMSData({ returnData: true });

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

  function getAllocationIcon(key: string) {
    if (key === "HIV") {
      return <HIV />;
    }
    if (key === "Malaria") {
      return <Malaria />;
    }
    if (key === "Tuberculosis") {
      return <Tuberculosis />;
    }
    return null;
  }

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
        <Box height={30} />
        <h1>
          <b>Access to Funding</b>
        </h1>
        <h3>
          <b>Allocation, Funding Requests & Eligibility</b>
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
              {c}
            </div>
          ))}
        </div>
      </div>
      <div css={vizcss}>
        <Box height={35} />
        <div>
          <h4>
            <b>Allocation</b>
          </h4>
          <hr />
          <div
            css={`
              display: flex;
              min-height: 350px;
              position: relative;
              align-items: center;
              justify-content: center;
            `}
          >
            {!isLoading && (
              <div>
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
                    gap: 100px;
                    margin: auto;
                    display: flex;
                    margin-top: 40px;
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
                      {getAllocationIcon(keys[index])}
                      <div
                        css={`
                          font-size: 24px;
                          margin-top: 10px;
                        `}
                      >
                        <b>
                          {formatLargeAmountsWithPrefix(val)
                            .replace("$", "")
                            .replace("bln", "billion")
                            .replace("mln", "million")}
                        </b>
                      </div>
                      {keys[index]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>
            <b>Funding Requests</b>
          </h4>
          <hr
            css={`
              margin-bottom: 48px;
            `}
          />
          <div
            css={`
              width: 90%;
              margin: 0 auto;
              font-size: 14px;
              line-height: 17px;
              text-align: center;
            `}
          >
            {get(cmsData, "modulesFundingRequests.tableDisclaimer", "")}
          </div>
          <div css="width: 100%;height: 40px;" />
          <AccessToFundingRequestTableWrapper
            code={props.code}
            codeParam={props.codeParam}
            filterGroups={props.filterGroups}
          />
        </div>
        {props.code.length === 3 && (
          <div>
            <Box height={35} />
            <h4>
              <b>Eligibility </b>
            </h4>
            <hr
              css={`
                margin-bottom: 48px;
              `}
            />
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
            <AccessToFundingEligibilityTableWrapper
              forceExpand
              code={props.code}
            />
          </div>
        )}
      </div>
      <Box height={25} />
    </>
  );
}
