import { formatLocale } from "app/utils/formatLocale";
import _ from "lodash";
import {
  CellComponent,
  ColumnDefinition,
  TabulatorFull as Tabulator,
} from "tabulator-tables";

export interface TableProps {
  id: string;
  data: {
    [key: string]: string | number | boolean | null | object | Array<object>;
  }[];
  columns: ColumnDefinition[];
  dataTree?: boolean;
  dataTreeBranchElement?: boolean;
  dataTreeStartExpanded?: boolean;
  extraColumns?: ColumnDefinition[];
}

const cellBGColorFormatter = (cell: CellComponent) => {
  const cellValue = cell.getValue();
  let text = "";
  let backgroundColor = "#FFFFFF";
  if (!cellValue) {
    backgroundColor = "#DFE3E5";
  } else {
    switch (cellValue) {
      case "Eligible":
        backgroundColor = "#013E77";
        break;
      case "Transition Funding":
        backgroundColor = "#00B5AE";
        break;
      case "Not Eligible":
        backgroundColor = "#D9D9D9";
        break;
      case "High":
        backgroundColor = "#FA7355";
        break;
      case "Not High":
        backgroundColor = "#FFD646";
        break;
      case "Low":
        backgroundColor = "#FFD646";
        break;
      default:
        text = cellValue.toString();
        break;
    }
  }
  if (cell.getRow().getTreeChildren().length > 0) {
    cell.getElement().style.fontWeight = "bold";
    backgroundColor = "#FFFFFF";
  }
  cell.getElement().style.backgroundColor = backgroundColor;
  return text;
};

const financialFormatter = (cell: CellComponent) => {
  if (!cell.getValue()) {
    return cellBGColorFormatter(cell);
  }
  return formatLocale(cell.getValue());
};

export const TABLE_VARIATION_1_COLUMNS: ColumnDefinition[] = [
  { title: "Name", field: "name", width: "20%" },
  {
    title: "Years",
    columns: [
      { title: "2002", field: "2002" },
      { title: "2003", field: "2003" },
      { title: "2004", field: "2004" },
      { title: "2005", field: "2005" },
    ],
  },
  {
    title: "Components",
    columns: [
      { title: "HIV", field: "HIV" },
      { title: "Tuberculosis", field: "Tuberculosis" },
      { title: "Malaria", field: "Malaria" },
      { title: "Others", field: "Others" },
    ],
  },
];

export const TABLE_VARIATION_1_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "Africa",
    2002: 100,
    2003: 120,
    2004: 140,
    2005: 160,
    HIV: 10,
    Tuberculosis: 20,
    Malaria: 30,
    Others: 40,
    _children: [
      {
        name: "Eastern Africa",
        2002: 10,
        2003: 12,
        2004: 14,
        2005: 16,
        HIV: 1,
        Tuberculosis: 2,
        Malaria: 3,
        Others: 4,
        _children: [
          {
            name: "Kenya",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
          {
            name: "Uganda",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
        ],
      },
      {
        name: "Western Africa",
        2002: 10,
        2003: 12,
        2004: 14,
        2005: 16,
        HIV: 1,
        Tuberculosis: 2,
        Malaria: 3,
        Others: 4,
        _children: [
          {
            name: "Nigeria",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
          {
            name: "Ghana",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
        ],
      },
    ],
  },
  {
    name: "Asia",
    2002: 100,
    2003: 120,
    2004: 140,
    2005: 160,
    HIV: 10,
    Tuberculosis: 20,
    Malaria: 30,
    Others: 40,
    _children: [
      {
        name: "Eastern Asia",
        2002: 10,
        2003: 12,
        2004: 14,
        2005: 16,
        HIV: 1,
        Tuberculosis: 2,
        Malaria: 3,
        Others: 4,
        _children: [
          {
            name: "China",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
          {
            name: "Japan",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
        ],
      },
      {
        name: "Southern Asia",
        2002: 10,
        2003: 12,
        2004: 14,
        2005: 16,
        HIV: 1,
        Tuberculosis: 2,
        Malaria: 3,
        Others: 4,
        _children: [
          {
            name: "India",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
          {
            name: "Pakistan",
            2002: 1,
            2003: 1.2,
            2004: 1.4,
            2005: 1.6,
            HIV: 0.1,
            Tuberculosis: 0.2,
            Malaria: 0.3,
            Others: 0.4,
          },
        ],
      },
    ],
  },
];

export const TABLE_VARIATION_2_COLUMNS: ColumnDefinition[] = [
  { title: "Components", field: "components", formatter: cellBGColorFormatter },
  {
    title: "Submission Date",
    field: "submissionDate",
    formatter: cellBGColorFormatter,
  },
  { title: "Approach", field: "approach", formatter: cellBGColorFormatter },
  { title: "TRP Window", field: "trpWindow", formatter: cellBGColorFormatter },
  {
    title: "TRP Outcome",
    field: "trpOutcome",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Portfolio Categorization",
    field: "portfolioCategorization",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Board Approval",
    field: "boardApproval",
    formatter: cellBGColorFormatter,
  },
  {
    title: "GAC Meeting",
    field: "gacMeeting",
    formatter: cellBGColorFormatter,
  },
  { title: "Grant", field: "grant", formatter: cellBGColorFormatter },
  {
    title: "Starting date",
    field: "startingDate",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Ending date",
    field: "endingDate",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Principal Recipient",
    field: "principalRecipient",
    formatter: cellBGColorFormatter,
  },
  { title: "Component", field: "component", formatter: cellBGColorFormatter },
];

export const TABLE_VARIATION_2_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    components: "HIV",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
    ],
  },
  {
    components: "Malaria",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Malaria",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH002",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
    ],
  },
  {
    components: "Tuberculosis",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Tuberculosis",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH002",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Tuberculosis",
      },
    ],
  },
  {
    components: "HIV",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
    ],
  },
  {
    components: "Malaria",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Malaria",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH002",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "HIV",
      },
    ],
  },
  {
    components: "Tuberculosis",
    submissionDate: "23 March 2023",
    approach: "Program continuation",
    trpWindow: "B2",
    trpOutcome: "Grant making",
    portfolioCategorization: "--",
    boardApproval: "November 2023",
    _children: [
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH001",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Tuberculosis",
      },
      {
        gacMeeting: "November 2022",
        grant: "AFG-H-MOH002",
        startingDate: "31-12-2023",
        endingDate: "31-12-2025",
        principalRecipient: "Private health ministry of Ghana",
        component: "Tuberculosis",
      },
    ],
  },
];

export const TABLE_VARIATION_3_COLUMNS: ColumnDefinition[] = [
  { title: "Location", field: "name", formatter: cellBGColorFormatter },
  { title: "2023", field: "2023", formatter: cellBGColorFormatter },
  { title: "2022", field: "2022", formatter: cellBGColorFormatter },
  { title: "2021", field: "2021", formatter: cellBGColorFormatter },
  { title: "2020", field: "2020", formatter: cellBGColorFormatter },
  { title: "2019", field: "2019", formatter: cellBGColorFormatter },
];

export const TABLE_VARIATION_3_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "Algeria",
    _children: [
      {
        name: "HIV",
        2023: "Eligible",
        2022: "Eligible",
        2021: "Eligible",
        2020: "Eligible",
        2019: "Eligible",
        _children: [
          {
            name: "Burden Disease",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
          },
        ],
      },
    ],
  },
  {
    name: "Kenya",
    _children: [
      {
        name: "HIV",
        2023: "Eligible",
        2022: "Eligible",
        2021: "Eligible",
        2020: "Eligible",
        2019: "Eligible",
        _children: [
          {
            name: "Burden Disease",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
          },
        ],
      },
    ],
  },
];

export const TABLE_VARIATION_4_COLUMNS: ColumnDefinition[] = [
  {
    title: "Modules & Coverage Indicators",
    field: "name",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Reversed",
    columns: [
      {
        title: "Value",
        field: "reversed",
        formatter: cellBGColorFormatter,
      },
    ],
  },
  {
    title: "Geo. coverage",
    columns: [
      { title: "Value", field: "geoCoverage", formatter: cellBGColorFormatter },
    ],
  },
  {
    title: "Cumulation",
    columns: [
      { title: "Period", field: "cumulation", formatter: cellBGColorFormatter },
    ],
  },
  {
    title: "Baseline",
    columns: [
      {
        title: "Value",
        field: "baselineValue",
        formatter: cellBGColorFormatter,
      },
      {
        title: "Year",
        field: "baselineYear",
        formatter: cellBGColorFormatter,
      },
      {
        title: "Source",
        field: "baselineSource",
        formatter: cellBGColorFormatter,
      },
    ],
  },
  {
    title: "2020",
    field: "2020",
    formatter: (cell: CellComponent) => {
      var tableEl = document.createElement("div");
      cell.getElement().appendChild(tableEl);
      const data = cell.getValue();

      if (!cell.getValue()) {
        return "";
      }

      new Tabulator(tableEl, {
        data,
        layout: "fitDataTable",
        height: "fit-content",
        columns: [
          { title: "Target", field: "target" },
          { title: "Result", field: "result" },
          { title: "Achievement", field: "achievement" },
        ],
      });

      // cell.getElement().style.height = "max-content";
      cell.getElement().style.padding = "0";

      return tableEl;
    },
  },
  {
    title: "2021",
    field: "2021",
    formatter: (cell: CellComponent) => {
      var tableEl = document.createElement("div");
      cell.getElement().appendChild(tableEl);
      const data = cell.getValue();

      if (!cell.getValue()) {
        return "";
      }

      new Tabulator(tableEl, {
        data,
        layout: "fitDataTable",
        height: "fit-content",
        columns: [
          { title: "Target", field: "target" },
          { title: "Result", field: "result" },
          { title: "Achievement", field: "achievement" },
        ],
      });

      // cell.getElement().style.height = "max-content";
      cell.getElement().style.padding = "0";

      return tableEl;
    },
  },
];

export const TABLE_VARIATION_4_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "TB CARE AND PREVENTION",
    _children: [
      {
        name: "Number of notified cases of all forms of TB (i.e. bacteriologically confirmed + clinically diagnosed), new and relapse cases",
        _children: [
          {
            reversed: "No",
            geoCoverage: "National",
            cumulation: "Annually",
            baselineValue: "T:0.5%",
            baselineYear: "2018",
            baselineSource: "--",
            "2020": [
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
            ],
            "2021": [
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "TB CARE AND PREVENTION",
    _children: [
      {
        name: "Number of notified cases of all forms of TB (i.e. bacteriologically confirmed + clinically diagnosed), new and relapse cases",
        _children: [
          {
            reversed: "No",
            geoCoverage: "National",
            cumulation: "Annually",
            baselineValue: "T:0.5%",
            baselineYear: "2018",
            baselineSource: "--",
            "2020": [
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
            ],
            "2021": [
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
              {
                target: "T:0.5%",
                result: "T:0.5%",
                achievement: "100%",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const TABLE_VARIATION_5_COLUMNS: ColumnDefinition[] = [
  {
    title: "Grant ID",
    field: "grantId",
    formatter: (cell: CellComponent) =>
      `<a href="/grant/${cell.getValue()}">${cell.getValue()}</a>`,
  },
  {
    title: "Start/End date",
    field: "startEndDate",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Geography",
    field: "geography",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Component",
    field: "component",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Principal Recipient",
    field: "principalRecipient",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Status",
    field: "status",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Signed",
    field: "signed",
    formatter: financialFormatter,
  },
  {
    title: "Disbursed",
    field: "disbursed",
    formatter: financialFormatter,
  },
];

export const TABLE_VARIATION_5_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    grantId: "AFG-H-MOH001",
    startEndDate: "Jul 2023 - Dec 2023",
    geography: "Ghana",
    component: "HIV",
    principalRecipient: "Private health ministry of Ghana",
    status: "Active",
    signed: 1000000,
    disbursed: 1000000,
  },
  {
    grantId: "AFG-H-MOH001",
    startEndDate: "Jul 2023 - Dec 2023",
    geography: "Ghana",
    component: "HIV",
    principalRecipient: "Private health ministry of Ghana",
    status: "Active",
    signed: 1000000,
    disbursed: 1000000,
  },
];

export const TABLE_VARIATION_6_COLUMNS: ColumnDefinition[] = [
  {
    title: "Location",
    field: "name",
    width: "80%",
    formatter: cellBGColorFormatter,
  },
  {
    width: "20%",
    title: "Documents",
    field: "documents",
    formatter: (cell: CellComponent) => {
      if (typeof cell.getValue() === "string") {
        cell.getElement().style.textAlign = "right";
        return `<a href="${cell.getValue()}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1656 6.7063C10.2326 6.63597 10.3128 6.58 10.4013 6.54169C10.4899 6.50339 10.5851 6.48351 10.6813 6.48324C10.7775 6.48296 10.8728 6.50229 10.9615 6.54009C11.0503 6.5779 11.1308 6.6334 11.1982 6.70335C11.2656 6.7733 11.3186 6.85627 11.354 6.9474C11.3895 7.03852 11.4067 7.13595 11.4047 7.23395C11.4026 7.33195 11.3814 7.42855 11.3422 7.51807C11.303 7.60758 11.2466 7.6882 11.1763 7.75518L8.43516 10.509C8.30006 10.6442 8.11825 10.72 7.92886 10.72C7.73947 10.72 7.55766 10.6442 7.42255 10.509L4.7207 7.79046C4.58418 7.65377 4.50655 7.46743 4.50488 7.27242C4.50322 7.07742 4.57765 6.88973 4.71181 6.75064C4.84596 6.61155 5.02885 6.53245 5.22025 6.53075C5.41164 6.52906 5.59586 6.60489 5.73237 6.74158L7.21947 8.24338L7.23444 2.95417C7.24257 2.76358 7.323 2.58364 7.45879 2.45229C7.59457 2.32093 7.77511 2.24842 7.96234 2.25003C8.14957 2.25163 8.32888 2.32724 8.46248 2.4609C8.59607 2.59457 8.67352 2.77586 8.67849 2.96657L8.66445 8.21096L10.1656 6.7063ZM2.25 13.0453L2.25936 10.1676C2.25686 10.0688 2.27391 9.97051 2.3095 9.87858C2.34508 9.78664 2.39848 9.70295 2.46649 9.63248C2.5345 9.56202 2.61574 9.50624 2.70537 9.46845C2.795 9.43066 2.89117 9.41165 2.98817 9.41255C3.08516 9.41345 3.18098 9.43423 3.26992 9.47367C3.35886 9.51311 3.43909 9.57039 3.50584 9.64209C3.57259 9.7138 3.62448 9.79847 3.65842 9.89105C3.69236 9.98362 3.70766 10.0822 3.70341 10.181L3.69685 12.2787C6.56686 12.2844 9.43405 12.2844 12.2984 12.2787L12.305 10.1695C12.3067 9.97428 12.3845 9.78774 12.5212 9.65095C12.658 9.51415 12.8424 9.43829 13.034 9.44006C13.2256 9.44183 13.4087 9.52108 13.543 9.66039C13.6773 9.79969 13.7517 9.98763 13.75 10.1829L13.7406 13.0434H13.7322C13.7238 13.2314 13.645 13.409 13.512 13.5395C13.379 13.6701 13.2019 13.7437 13.0172 13.7452C9.6649 13.7516 6.31511 13.7516 2.96781 13.7452C2.78287 13.7447 2.60521 13.6718 2.4716 13.5415C2.33799 13.4112 2.25865 13.2336 2.25 13.0453Z" fill="#373D43"/>
      </svg>
      </a>`;
      }
      return cell.getValue();
    },
  },
];

export const TABLE_VARIATION_6_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "Algeria",
    documents: 19,
    _children: [
      {
        name: "Application",
        documents: 4,
        _children: [
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
        ],
      },
      {
        name: "Other documents",
        documents: 15,
        _children: [
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
          {
            name: "Combined Grant To Support HIV/AIDS, Tuberculosis & Malaria Programs And Healthcare",
            documents:
              "https://gfdatastore.blob.core.windows.net/files/Applications/Fast-track%20Covid%20Funding%20Requests/QPA/2021/NA/en/QPA-X_FastCovidFundingRequest_1_en.zip",
          },
        ],
      },
    ],
  },
];

export const TABLE_VARIATION_7_COLUMNS: ColumnDefinition[] = [
  {
    title: "Description",
    field: "description",
    formatter: cellBGColorFormatter,
  },
  { title: "Component", field: "component", formatter: cellBGColorFormatter },
  { title: "Result", field: "result", formatter: "money" },
];

export const TABLE_VARIATION_7_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    description: "People on antiretroviral therapy for HIV",
    component: "HIV",
    result: 1965401,
  },
  {
    description: "People with TB treated",
    component: "Tuberculosis",
    result: 1965401,
  },
  {
    description: "Mosquito nets distributed",
    component: "Malaria",
    result: 10000000,
  },
  {
    description: "Peopleusing pre-exposure prophylaxis",
    component: "HIV",
    result: 1000000,
  },
  {
    description:
      "Other vulnerable populations reached with HIV prevention programs",
    component: "HIV",
    result: 100000,
  },
  {
    description:
      "People in contact with TB patients received preventive therapy",
    component: "Tuberculosis",
    result: 100000,
  },
  {
    description: "Rifampicin - and/or multidrug-resistant TB cases notified",
    component: "Tuberculosis",
    result: 10000,
  },
  {
    description:
      "People in contact with TB patients received preventive therapy",
    component: "Tuberculosis",
    result: 200000,
  },
];

export const TABLE_VARIATION_8_COLUMNS: ColumnDefinition[] = [
  {
    title: "Donors Types & Donors",
    field: "name",
    formatter: cellBGColorFormatter,
    width: "50%",
  },
  { title: "Pledge", field: "pledge", formatter: "money", width: "25%" },
  { title: "Contribution", field: "contribution", formatter: "money" },
];

export const TABLE_VARIATION_8_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "Affordable Medicines Facility - malaria (AMFm)",
    pledge: 1000000,
    contribution: 1000000,
    _children: [
      {
        name: "AMFm Bill & Melinda Gates Foundation",
        pledge: 24365000,
        contribution: 24365000,
      },
      {
        name: "AMFm Canada",
        pledge: 39596763.03,
        contribution: 39596763.03,
      },
      {
        name: "AMFm United Kingdom",
        pledge: 273496422.4,
        contribution: 273496422.4,
      },
      {
        name: "AMFm World Health Organization-Unitaid",
        pledge: 200000000,
        contribution: 200000000,
      },
    ],
  },
  {
    name: "Debt2Health",
    pledge: 1000000,
    contribution: 1000000,
    _children: [
      {
        name: "Debt2Health - Australia-Indonesia",
        pledge: 35267489.57,
        contribution: 35267489.56,
      },
      {
        name: "Debt2Health - Germany - El Salvador",
        pledge: 11222085.1,
        contribution: 11222085.07,
      },
      {
        name: "Debt2Health - Germany-Côte d'Ivoire",
        pledge: 12540097.18,
        contribution: 12540096.85,
      },
      {
        name: "Debt2Health - Germany-Egypt",
        pledge: 4807118.2,
        contribution: 4807118.2,
      },
      {
        name: "Debt2Health - Germany-Indonesia",
        pledge: 90905435.51,
        contribution: 90905435.49,
      },
      {
        name: "Debt2Health - Germany-Pakistan",
        pledge: 26374033.3,
        contribution: 26374033.3,
      },
      {
        name: "Debt2Health - Germany-Sri Lanka",
        pledge: 22444170.2,
        contribution: 16114812.86,
      },
      {
        name: "Debt2Health - Jordan-Germany",
        pledge: 11222085.1,
        contribution: 11222085.09,
      },
      {
        name: "Debt2Health - Spain-Cameroon",
        pledge: 10456922.93,
        contribution: 10456922.93,
      },
      {
        name: "Debt2Health - Spain-Congo (Democratic Republic)",
        pledge: 3403543.45,
        contribution: 3403543.45,
      },
      {
        name: "Debt2Health - Spain-Ethiopia",
        pledge: 3581142.41,
        contribution: 3581142.41,
      },
    ],
  },
];

export const TABLE_VARIATION_9_COLUMNS: ColumnDefinition[] = [
  {
    title: "Years",
    field: "name",
    formatter: cellBGColorFormatter,
  },
  {
    title: "Total Number",
    field: "value",
    formatter: "money",
  },
];

export const TABLE_VARIATION_9_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "2022",
    _children: [
      {
        name: "HIV",
        itemStyle: {
          color: "#013E77",
        },
        _children: [
          {
            name: "Adolescent girls and young women (AGYW) reached with HIV prevention programs services",
            value: 3566170,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Adolescent girls and young women who initiated oral antiretroviral pre-exposure prophylaxis",
            value: 44273,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Care and support services provided to people living with HIV",
            value: 512946,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "HIV-positive pregnant women who received ART during pregnancy",
            value: 710418,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Infants tested for HIV",
            value: 473415,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Medical male circumcisions",
            value: 830749,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Men who have sex with men reached with HIV prevention programs",
            value: 2605902,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Men who have sex with men who initiated oral antiretroviral pre-exposure prophylaxis",
            value: 61811,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV positive tests",
            value: 1294853,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among adolescents and youth",
            value: 2127567,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among men who have sex with men",
            value: 2408640,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among other vulnerable population",
            value: 2294467,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among people who use drugs",
            value: 1034576,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among prisoners",
            value: 1532177,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among sex workers",
            value: 2198995,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Number of HIV tests taken among transgender population",
            value: 149303,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Other vulnerable populations reached with HIV prevention programs",
            value: 836845,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People aged 10–24 years reached with HIV prevention programs",
            value: 45863,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People newly diagnosed with HIV initiated on ART",
            value: 418533,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People on antiretroviral therapy for HIV",
            value: 24471293,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People receiving Opioid Substitution Therapy",
            value: 60441,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People using pre-exposure prophylaxis",
            value: 30167,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "People who use drugs reached with HIV prevention programs",
            value: 1083995,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Pregnant women tested for syphilis",
            value: 2647380,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Pregnant women who know their HIV status",
            value: 43943450,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Prisoners reached with HIV prevention programs",
            value: 204054,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Sex workers reached with HIV prevention programs",
            value: 2731926,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Sex workers who initiated oral antiretroviral pre-exposure prophylaxis",
            value: 198592,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Total number of HIV tests",
            value: 53074640,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Transgender people reached with HIV prevention programs",
            value: 159092,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Transgender people who initiated oral antiretroviral pre-exposure prophylaxis",
            value: 3134,
            itemStyle: {
              color: "#013E77",
            },
          },
          {
            name: "Young people aged 10-24 years reached by comprehensive sexuality education and/or life skills-based HIV education in or out of schools",
            value: 4001648,
            itemStyle: {
              color: "#013E77",
            },
          },
        ],
      },
      {
        name: "Malaria",
        itemStyle: {
          color: "#00B5AE",
        },
        _children: [
          {
            name: "Cases of malaria treated",
            value: 165297849,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Children who received seasonal malaria chemoprophylaxis",
            value: 37103714,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Confirmed malaria cases fully investigated and classified",
            value: 78347,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Households covered by Indoor Residual Spraying",
            value: 8451212,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Malaria foci fully investigated and classified",
            value: 38227,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Mosquito nets distributed",
            value: 219678398,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Population covered by Indoor Residual Spraying",
            value: 18516771,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Pregnant women attending antenatal clinics who received intermittent preventive treatment for malaria",
            value: 14620922,
            itemStyle: {
              color: "#00B5AE",
            },
          },
          {
            name: "Suspected malaria cases that received a parasitological test",
            value: 321018609,
            itemStyle: {
              color: "#00B5AE",
            },
          },
        ],
      },
      {
        name: "RSSH",
        itemStyle: {
          color: "#0A2840",
        },
        _children: [
          {
            name: "Number of community based organizations that received a pre-defined package of training",
            value: 109,
            itemStyle: {
              color: "#0A2840",
            },
          },
          {
            name: "Number of iCCM conditions treated among children under five in target areas",
            value: 2239104,
            itemStyle: {
              color: "#0A2840",
            },
          },
        ],
      },
      {
        name: "Tuberculosis",
        itemStyle: {
          color: "#D9D9D9",
        },
        _children: [
          {
            name: "Care and support services provided to TB patients",
            value: 93538,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "People in contact with TB patients received preventive therapy",
            value: 1542219,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "People with extensively drug-resistant TB on treatment",
            value: 435,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "People with TB treated",
            value: 6670422,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "Rifampicin- and/or multidrug-resistant TB cases notified",
            value: 118075,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "TB patients tested using WHO recommended rapid tests",
            value: 875351,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
          {
            name: "TB patients with drug-susceptibility testing result for at least Rifampicin",
            value: 961896,
            itemStyle: {
              color: "#D9D9D9",
            },
          },
        ],
      },
    ],
  },
];

export const TABLE_VARIATION_10_COLUMNS: ColumnDefinition[] = [
  {
    title: "Geography",
    field: "name",
    formatter: cellBGColorFormatter,
    width: "20%",
  },
  { title: "2023", field: "2023", formatter: cellBGColorFormatter },
  { title: "2022", field: "2022", formatter: cellBGColorFormatter },
  { title: "2021", field: "2021", formatter: cellBGColorFormatter },
  { title: "2020", field: "2020", formatter: cellBGColorFormatter },
  { title: "2019", field: "2019", formatter: cellBGColorFormatter },
  { title: "2018", field: "2018", formatter: cellBGColorFormatter },
  { title: "2017", field: "2017", formatter: cellBGColorFormatter },
  { title: "2016", field: "2016", formatter: cellBGColorFormatter },
  { title: "2015", field: "2015", formatter: cellBGColorFormatter },
  { title: "2014", field: "2014", formatter: cellBGColorFormatter },
  { title: "2013", field: "2013", formatter: cellBGColorFormatter },
  { title: "2012", field: "2012", formatter: cellBGColorFormatter },
  { title: "2011", field: "2011", formatter: cellBGColorFormatter },
  { title: "2010", field: "2010", formatter: cellBGColorFormatter },
];

export const TABLE_VARIATION_10_DATA: {
  [key: string]: string | number | boolean | null | object | Array<object>;
}[] = [
  {
    name: "Algeria",
    _children: [
      {
        name: "Income Level",
        2023: "Low Income",
        2022: "Low Income",
        2021: "Low Income",
        2020: "Low Income",
        2019: "Low Income",
        2018: "Low Income",
        2017: "Low Income",
        2016: "Low Income",
        2015: "Low Income",
        2014: "Low Income",
        2013: "Low Income",
        2012: "Low Income",
        2011: "Low Income",
        2010: "Low Income",
      },
      {
        name: "HIV",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
      {
        name: "Malaria",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
      {
        name: "Tuberculosis",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
    ],
  },
  {
    name: "Afghanistan",
    _children: [
      {
        name: "Income Level",
        2023: "Low Income",
        2022: "Low Income",
        2021: "Low Income",
        2020: "Low Income",
        2019: "Low Income",
        2018: "Low Income",
        2017: "Low Income",
        2016: "Low Income",
        2015: "Low Income",
        2014: "Low Income",
        2013: "Low Income",
        2012: "Low Income",
        2011: "Low Income",
        2010: "Low Income",
      },
      {
        name: "HIV",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
      {
        name: "Malaria",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
      {
        name: "Tuberculosis",
        _children: [
          {
            name: "Disease Burden",
            2023: "Low",
            2022: "Low",
            2021: "Low",
            2020: "Low",
            2019: "Low",
            2018: "Low",
            2017: "Low",
            2016: "Low",
            2015: "Low",
            2014: "Low",
            2013: "Low",
            2012: "Low",
            2011: "Low",
            2010: "Low",
          },
          {
            name: "Eligibility",
            2023: "Eligible",
            2022: "Eligible",
            2021: "Eligible",
            2020: "Eligible",
            2019: "Eligible",
            2018: "Eligible",
            2017: "Eligible",
            2016: "Eligible",
            2015: "Eligible",
            2014: "Eligible",
            2013: "Eligible",
            2012: "Eligible",
            2011: "Eligible",
            2010: "Eligible",
          },
        ],
      },
    ],
  },
];
