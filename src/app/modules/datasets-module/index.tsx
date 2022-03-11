/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import get from "lodash/get";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { DocumentsTablePreview } from "app/assets/dataset-preview/documentsTable";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";
import { useCMSData } from "app/hooks/useCMSData";

interface DatasetItemModel {
  name: string;
  link: string;
  group: string;
  preview: JSX.Element;
}

const datasets: DatasetItemModel[] = [
  {
    name: "Pledges & Contributions",
    link: "/viz/pledges-contributions/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  {
    name: "Signed",
    link: "/viz/signed/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  {
    name: "Commitments",
    link: "/viz/commitment/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  {
    name: "Disbursements",
    link: "/viz/disbursements/treemap",
    group: "Finance",
    preview: <InvestmentsTreemapPreview />,
  },
  {
    name: "Budgets",
    link: "/viz/budgets/flow",
    group: "Finance",
    preview: <BudgetFlowPreview />,
  },
  {
    name: "Eligibility",
    link: "/viz/eligibility",
    group: "Access to Funding",
    preview: <EligibilityDotsPreview />,
  },
  {
    name: "Allocations",
    link: "/viz/allocations",
    group: "Access to Funding",
    preview: <AllocationsRadialPreview />,
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
  // {
  //   name: "Allocations Map",
  //   link: "/viz/allocations/map",
  //   group: "Finance",
  //   preview: <GeomapPreview />,
  // },
];

export default function Datasets() {
  const cmsData = useCMSData({ returnData: true });
  useTitle(get(cmsData, "modulesDatasets.title", ""));
  const isMobile = useMediaQuery("(max-width: 767px)");

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
      {!isMobile && (
        <PageHeader
          title={get(cmsData, "modulesDatasets.titleShort", "")}
          breadcrumbs={[
            { name: get(cmsData, "modulesDatasets.home", ""), link: "/" },
            {
              name: get(cmsData, "modulesDatasets.titleShort", ""),
            },
          ]}
        />
      )}
      <PageTopSpacer />
      <Grid container spacing={4}>
        {datasets.map((dataset: DatasetItemModel) => (
          <Grid item xs={12} sm={6} md={6} key={dataset.link}>
            <Link to={dataset.link} css="text-decoration: none;">
              <div
                css={`
                  width: 100%;
                  height: 28vh;
                  padding: 20px;
                  color: #262c34;
                  background: #fff;
                  border-radius: 20px;
                  border: 2px solid #fff;

                  @media screen and (min-width: 900px) {
                    height: 370px;
                  }

                  @media screen and (max-width: 767px) {
                    height: 227px;
                  }

                  > div {
                    font-weight: bold;
                    margin-bottom: 10px;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  }

                  > svg {
                    width: 100%;
                    height: calc(100% - 30px);
                  }

                  &:hover {
                    border-color: #13183f;
                  }
                `}
              >
                <div>
                  {dataset.group} {dataset.name.length > 0 ? "·" : ""}{" "}
                  {dataset.name}
                </div>
                {dataset.preview}
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div
        css={`
          width: 100%;
          height: 50px;

          @media (max-width: 767px) {
            height: 90px;
          }
        `}
      />
    </div>
  );
}
