export const fundingRequestColumns = [
  {
    key: "name",
    name: "Location",
    col: [
      {
        key: "component",
        name: "Component",
        col: [
          {
            key: "gac",
            name: "",
          },
          {
            key: "board",
            name: "",
          },
          {
            key: "grant",
            name: "",
          },
          {
            key: "start",
            name: "",
          },
          {
            key: "end",
            name: "",
          },
          // {
          //   key: "recipient",
          //   name: "",
          // },
          {
            key: "component",
            name: "",
          },
        ],
      },
      {
        key: "date",
        name: "Submission Date",
      },
      {
        key: "approach",
        name: "Approach",
      },
      {
        key: "window",
        name: "TRP Window",
      },
      {
        key: "outcome",
        name: "TRP Outcome",
      },
      {
        key: "portfolioCategory",
        name: "Portfolio Categorization",
      },
    ],
  },
];

export const cellData = [
  "Component",
  "Submission date",
  "Approach",
  "TRP Window",
  "TRP Outcome",
  "Portfolio Categorization",
];

export const cellData2 = [
  "GAC Meeting",
  "Board Approval",
  "Grant",
  "Starting Date",
  "End Date",
  "Component",
];
