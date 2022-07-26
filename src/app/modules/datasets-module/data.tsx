import { BudgetFlowPreview } from "app/assets/dataset-preview/budgetFlow";
import { GrantsListPreview } from "app/assets/dataset-preview/grantsList";
import { ResultsListPreview } from "app/assets/dataset-preview/resultsList";
import { DocumentsTablePreview } from "app/assets/dataset-preview/documentsTable";
import { EligibilityDotsPreview } from "app/assets/dataset-preview/eligibilityDots";
import { AllocationsRadialPreview } from "app/assets/dataset-preview/allocationsRadial";
import { InvestmentsTreemapPreview } from "app/assets/dataset-preview/investmentsTreemap";

export interface DatasetItemModel {
  name: string;
  link: string;
  group: string;
  preview: JSX.Element;
}

export const datasets: DatasetItemModel[] = [
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
