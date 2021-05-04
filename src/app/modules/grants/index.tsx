/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { grantsmockitems } from "app/modules/grants/data";
import { Search } from "app/modules/grants/components/Search";
import { GrantsList } from "app/modules/grants/components/List";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

export default function GrantsModule() {
  useTitle("The Data Explorer - Grants");

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageHeader
        title="Grants"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: [
              <Link
                to="/datasets"
                css={`
                  display: flex;
                  align-items: center;

                  > svg {
                    margin-right: 16px;
                    transform: rotate(-180deg) scale(0.5);

                    > path {
                      fill: #13183f;
                    }
                  }
                `}
              >
                <ArrowForwardIcon />
                <b>Datasets</b>
              </Link>,
              <Link to="/viz/investments/disbursements">
                <b>Finance</b>-Investments/Disbursements
              </Link>,
              <Link to="/viz/investments/time-cycle">
                <b>Finance</b>-Investments/Time-Cycle
              </Link>,
              <Link to="/viz/budgets/flow">
                <b>Finance</b>-Budgets Flow
              </Link>,
              <Link to="/viz/budgets/time-cycle">
                <b>Finance</b>-Budgets Time Cycle
              </Link>,
              <Link to="/viz/allocations">
                <b>Finance</b>-Allocations
              </Link>,
              <Link to="/viz/eligibility">
                <b>Finance</b>-Eligibility
              </Link>,
              <Link to="/viz/pledges-contributions/time-cycle">
                <b>Finance</b>-Pledges & Contributions Time Cycle
              </Link>,
              <Link to="/grants">
                <b>Grants</b>
              </Link>,
              <Link to="/results">
                <b>Results</b>
              </Link>,
              <Link to="/documents">
                <b>Documents</b>
              </Link>,
            ],
          },
        ]}
      />
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          width: 100%;
        `}
      >
        <Search />
        <div css="width: 100%;height: 25px;" />
        <GrantsList listitems={grantsmockitems} />
      </div>
      <div css="width: 100%;height: 25px;" />
    </div>
  );
}
