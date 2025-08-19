export interface IReport {
  id: string;
  title: string;
  editedDate: Date;
  createdDate: Date;
  imagePath: string;
  description: string;
}

export const ReportBuilderLibraryItems: IReport[] = [
  {
    id: "1",
    title: "WMOP Air Quality and Climate Bulletin",
    createdDate: new Date("2023-01-01"),
    editedDate: new Date("2023-01-02"),
    imagePath: "/static/images/example-report-1.png",
    description: "A report on WMO and its results.",
  },
  {
    id: "2",
    title: "Results Report 2024",
    createdDate: new Date("2023-02-01"),
    editedDate: new Date("2023-02-02"),
    imagePath: "/static/images/example-report-2.png",
    description: "The Global Fund results report for 2024.",
  },
  {
    id: "3",
    title: "Malaria Eradication by 2030",
    createdDate: new Date("2023-03-01"),
    editedDate: new Date("2023-03-02"),
    imagePath: "/static/images/example-report-3.png",
    description: "Report to showcase Malaria’s life-threatening consequences.",
  },
  {
    id: "4",
    title: "Global Financial Stability Report",
    createdDate: new Date("2023-04-01"),
    editedDate: new Date("2023-04-02"),
    imagePath: "/static/images/example-report-4.png",
    description:
      "Global Financial Stability Report for 2021 October, Key Insights.",
  },
  {
    id: "5",
    title: "The Global Fund Impact Report",
    createdDate: new Date("2023-05-01"),
    editedDate: new Date("2023-05-02"),
    imagePath: "/static/images/example-report-5.png",
    description: "Scaling innovations in global health since 2002.",
  },
];
