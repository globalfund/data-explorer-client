export interface ExpandableTableRowDocProps {
  title: string;
  link: string;
}

export interface ExpandableTableRowDocCategoryProps {
  name: string;
  count: number;
  docs: ExpandableTableRowDocProps[];
}

export interface ExpandableTableRowProps {
  name: string;
  link?: string;
  count?: number;
  docCategories?: ExpandableTableRowProps[];
  docs?: {
    title: string;
    link: string;
  }[];
}

export interface ExpandableTableProps {
  columns: string[];
  rows: ExpandableTableRowProps[];
}

export const docsmockdata: ExpandableTableRowProps[] = [
  {
    name: "Afghanistan",
    count: 15,
    docCategories: [
      {
        name: "Applications",
        count: 15,
        docs: [
          {
            title: "App uno",
            link:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Funding%20Requests/AFG/2020/Malaria/en/AFG-M_FundingRequest_1_en.zip",
          },
        ],
      },
    ],
  },
];
