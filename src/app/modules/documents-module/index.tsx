/* third-party */
import React from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { useTitle, useDebounce, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { DocumentsSubModule } from "app/modules/common/documents";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

export default function DocumentsModule() {
  useTitle("The Data Explorer - Documents");
  const [search, setSearch] = React.useState("");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  // api call & data
  const fetchData = useStoreActions((store) => store.Documents.fetch);
  const data = useStoreState(
    (state) =>
      get(state.Documents.data, "data", []) as ExpandableTableRowProps[]
  );
  const isLoading = useStoreState((state) => state.Documents.loading);

  React.useEffect(() => {
    document.body.style.background = "#fff";
    if (data.length === 0) {
      fetchData({});
    }
  }, []);

  useUpdateEffect(() => {
    if (search.length === 0) fetchData({});
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        fetchData({ filterString: `q=${search}` });
      }
    },
    500,
    [search]
  );

  if (isLoading) {
    return <PageLoader />;
  }

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
        title="Documents"
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
          { name: "Documents" },
        ]}
      />
      <ToolBoxPanel
        open={openToolboxPanel}
        onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
      />
      <DocumentsSubModule
        data={data}
        search={search}
        setSearch={setSearch}
        columns={["Location", "Documents"]}
      />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 10;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${openToolboxPanel ? 1 : 0};
          visibility: ${openToolboxPanel ? "visible" : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
