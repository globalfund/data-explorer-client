export interface IReport {
  id: string;
  title: string;
  editedDate: Date;
  createdDate: Date;
  imagePath: string;
  description: string;
  owner?: string;
}

export const ReportBuilderLibraryItems: IReport[] = [
  {
    id: "R1",
    title: "WMOP Air Quality and Climate Bulletin",
    createdDate: new Date("2023-01-01"),
    editedDate: new Date("2023-01-02"),
    imagePath: "/static/images/example-report-1.png",
    description: "A report on WMO and its results.",
  },
  {
    id: "R2",
    title: "Results Report 2024",
    createdDate: new Date("2023-02-01"),
    editedDate: new Date("2023-02-02"),
    imagePath: "/static/images/example-report-2.png",
    description: "The Global Fund results report for 2024.",
  },
  {
    id: "R3",
    title: "Malaria Eradication by 2030",
    createdDate: new Date("2023-03-01"),
    editedDate: new Date("2023-03-02"),
    imagePath: "/static/images/example-report-3.png",
    description: "Report to showcase Malaria’s life-threatening consequences.",
  },
  {
    id: "R4",
    title: "Global Financial Stability Report",
    createdDate: new Date("2023-04-01"),
    editedDate: new Date("2023-04-02"),
    imagePath: "/static/images/example-report-4.png",
    description:
      "Global Financial Stability Report for 2021 October, Key Insights.",
  },
  {
    id: "R5",
    title: "The Global Fund Impact Report",
    createdDate: new Date("2023-05-01"),
    editedDate: new Date("2023-05-02"),
    imagePath: "/static/images/example-report-5.png",
    description: "Scaling innovations in global health since 2002.",
  },
];

export const ReportBuilderLibraryTemplates: IReport[] = [
  {
    id: "T1",
    title: "Country Program Progress Report Template",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/template-placeholder.png",
    description:
      "Template for program achievements, indicators, and challenges.",
    owner: "Global Fund Team",
  },
  {
    id: "T2",
    title: "Donor & Partner Impact Report",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/template-placeholder.png",
    description: "Highlights outcomes, stories, and impact for donors.",
    owner: "Global Fund Team",
  },
  {
    id: "T3",
    title: "Thematic Analysis Report",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/template-placeholder.png",
    description: "Focuses on one issue like HIV, TB, or malaria.",
    owner: "Global Fund Team",
  },
  {
    id: "T4",
    title: "Financial & Resource Allocation Report",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/template-placeholder.png",
    description: "Shows charts for budgets, disbursements, and funding gaps.",
    owner: "Global Fund Team",
  },
  {
    id: "T5",
    title: "Annual Results & Insights Report",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/template-placeholder.png",
    description: "Summarizes yearly progress and strategic insights.",
    owner: "Global Fund Team",
  },
];

export const ReportBuilderLibraryLayouts: IReport[] = [
  {
    id: "L1",
    title: "Executive Summary Section",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "One-page overview of main findings.",
    owner: "Global Fund Team",
  },
  {
    id: "L2",
    title: "Key Metrics Dashboard",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "Visuals showing key performance indicators.",
    owner: "Global Fund Team",
  },
  {
    id: "L3",
    title: "Case Study / Story from the Field",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "Human story illustrating program impact.",
    owner: "Global Fund Team",
  },
  {
    id: "L4",
    title: "Challenges & Lessons Learned",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "Barriers faced and lessons for the future.",
    owner: "Global Fund Team",
  },
  {
    id: "L5",
    title: "Introductory Section",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "Title, subtitle and Global Fund Icon inserted.",
    owner: "Global Fund Team",
  },
  {
    id: "L6",
    title: "Appendices / Technical Annex",
    editedDate: new Date(),
    createdDate: new Date(),
    imagePath: "/static/images/layout-placeholder.png",
    description: "Extra data, tables, and methodology.",
    owner: "Global Fund Team",
  },
];
