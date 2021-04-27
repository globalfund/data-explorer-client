/* third-party */
import React from "react";
// import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { PageHeader } from "app/components/PageHeader";
// import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
/* project */

export default function Datasets() {
  useTitle(`The Data Explorer - Datasets`);

  React.useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.background = "#F5F5F7";
    }
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
        title="Datasets"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            // menuitems: [
            //   <Link
            //     to="/datasets"
            //     css={`
            //       display: flex;
            //       align-items: center;

            //       > svg {
            //         margin-right: 16px;
            //         transform: rotate(-180deg) scale(0.5);

            //         > path {
            //           fill: #13183f;
            //         }
            //       }
            //     `}
            //   >
            //     <ArrowForwardIcon />
            //     <b>Datasets</b>
            //   </Link>,
            //   <Link to="/viz/finance/investments">
            //     <b>Finance</b>-Investments
            //   </Link>,
            //   <Link to="/viz/finance/budgets">
            //     <b>Finance</b>-Budgets
            //   </Link>,
            //   <Link to="/viz/finance/allocation">
            //     <b>Finance</b>-Allocation
            //   </Link>,
            //   <Link to="/viz/finance/eligibility">
            //     <b>Finance</b>-Eligibility
            //   </Link>,
            //   <Link to="/grants">
            //     <b>Grants</b>
            //   </Link>,
            //   <Link to="/results">
            //     <b>Results</b>
            //   </Link>,
            //   <Link to="/documents">
            //     <b>Documents</b>
            //   </Link>,
            // ],
          },
        ]}
        // drilldowns={[
        //   { name: "Dataset" },
        //   { name: "Drill down level one" },
        //   { name: "Drill down level two" },
        // ]}
      />
    </div>
  );
}
