/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { DocumentsTablePreview } from "app/assets/dataset-preview/documentsTable";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";

interface DatasetItemModel {
  name: string;
  link: string;
  group: string;
  preview: JSX.Element;
}

const datasets: DatasetItemModel[] = [
  {
    name: "Budgets",
    link: "/viz/budgets/flow",
    group: "Finance",
    preview: <BudgetFlowPreview />,
  },
  // {
  //   name: "Budgets Time cycle",
  //   link: "/viz/budgets/time-cycle",
  //   group: "Finance",
  //   preview: <InvestmentsBarPreview />,
  // },
  // {
  //   name: "Budgets Map",
  //   link: "/viz/budgets/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Disbursements",
    link: "/viz/disbursements/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  // {
  //   name: "Disbursements Time cycle",
  //   link: "/viz/disbursements/time-cycle",
  //   group: "Finance",
  //   preview: <InvestmentsBarPreview />,
  // },
  // {
  //   name: "Disbursements Map",
  //   link: "/viz/disbursements/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Signed",
    link: "/viz/signed/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  // {
  //   name: "Signed Time cycle",
  //   link: "/viz/signed/time-cycle",
  //   group: "Finance",
  //   preview: <InvestmentsBarPreview />,
  // },
  // {
  //   name: "Signed Map",
  //   link: "/viz/signed/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Commitments",
    link: "/viz/commitment/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  // {
  //   name: "Commitments Time cycle",
  //   link: "/viz/commitment/time-cycle",
  //   group: "Finance",
  //   preview: <InvestmentsBarPreview />,
  // },
  // {
  //   name: "Commitments Map",
  //   link: "/viz/commitment/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Pledges & Contributions",
    link: "/viz/pledges-contributions/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  // {
  //   name: "Pledges & Contributions Time cycle",
  //   link: "/viz/pledges-contributions/time-cycle",
  //   group: "Finance",
  //   preview: <InvestmentsBarPreview />,
  // },
  // {
  //   name: "Pledges & Contributions Map",
  //   link: "/viz/pledges-contributions/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Allocations",
    link: "/viz/allocations",
    group: "Access to Funding",
    preview: <AllocationsRadialPreview />,
  },
  // {
  //   name: "Allocations Map",
  //   link: "/viz/allocations/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
  {
    name: "Eligibility",
    link: "/viz/eligibility",
    group: "Access to Funding",
    preview: <EligibilityDotsPreview />,
  },
  {
    name: "",
    link: "/grants",
    group: "Grants",
    preview: <GrantsListPreview />,
  },
  {
    name: "",
    link: "/results",
    group: "Results",
    preview: <ResultsListPreview />,
  },
  {
    name: "",
    link: "/documents",
    group: "Documents",
    preview: <DocumentsTablePreview />,
  },
];

export default function Datasets() {
  useTitle(`The Data Explorer - Datasets`);

  React.useEffect(() => {
    document.body.style.background = "#F5F5F7";
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
          },
        ]}
      />
      <div css="width: 100%;height: 25px;" />
      <Grid container spacing={4}>
        {datasets.map((dataset: DatasetItemModel) => (
          <Grid item xs={12} sm={6} md={6} key={dataset.link}>
            <Link to={dataset.link} css="text-decoration: none;">
              <div
                css={`
                  @media screen and (min-width: 900px) {
                    height: 370px !important;
                  }
                  width: 100%;
                  padding: 20px;
                  height: 22vh;
                  color: #262c34;
                  background: #fff;
                  border-radius: 20px;
                  border: 2px solid #fff;

                  > div {
                    margin-bottom: 10px;
                  }

                  > svg {
                    width: calc(100% - 20px);
                    height: calc(100% - 30px);
                  }

                  &:hover {
                    border-color: #13183f;
                  }
                `}
              >
                <div>
                  <b>{dataset.group}</b> {dataset.name.length > 0 ? "·" : ""}{" "}
                  {dataset.name}
                </div>
                {dataset.preview}
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div css="width: 100%;height: 50px;" />
    </div>
  );
}
