/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { InvestmentsBarPreview } from "app/assets/dataset-preview/investmentsBar";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { DocumentsTablePreview } from "app/assets/dataset-preview/documentsTable";

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
  {
    name: "Investments",
    link: "/viz/investments/time-cycle",
    group: "Finance",
    preview: <InvestmentsBarPreview />,
  },
  {
    name: "Allocations",
    link: "/viz/allocations",
    group: "Finance",
    preview: <AllocationsRadialPreview />,
  },
  {
    name: "Investments",
    link: "/viz/investments/disbursements",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  {
    name: "Eligibility",
    link: "/viz/eligibility",
    group: "Other",
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
          <Grid item sm={12} md={6} key={dataset.link}>
            <Link to={dataset.link} css="text-decoration: none;">
              <div
                css={`
                  width: 100%;
                  padding: 20px;
                  height: 370px;
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
                    border-color: #2e4df9;
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
