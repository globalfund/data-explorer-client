import filter from "lodash/filter";

export interface FilterGroupOptionModel {
  label: string;
  value: string;
  subOptions?: FilterGroupOptionModel[];
}

export interface FilterGroupModel {
  name: string;
  options: FilterGroupOptionModel[];
}

export const componentsMockFilterOptions: FilterGroupModel = {
  name: "Partner types",
  options: [
    {
      label: "Community Sector",
      value: "Community Sector",
      subOptions: [
        {
          label: "Community Based Organization",
          value: "CBO",
        },
        {
          label: "Faith Based Organization",
          value: "FBO",
        },
        {
          label: "International Faith Based Organization",
          value: "INTFBO",
        },
        {
          label: "International NGO",
          value: "INTNGO",
        },
        {
          label: "Local Faith Based Organization",
          value: "LOCFBO",
        },
        {
          label: "Local NGO",
          value: "LOCNGO",
        },
        {
          label: "NGO/CBO/Academic",
          value: "NGO",
        },
        {
          label: "Other Community Sector Entity",
          value: "OTH",
        },
      ],
    },
    {
      label: "Governmental",
      value: "Governmental",
      subOptions: [
        {
          label: "Ministry of Finance",
          value: "MOF",
        },
        {
          label: "Ministry of Health",
          value: "MOH",
        },
        {
          label: "Other Governmental",
          value: "OTH",
        },
      ],
    },
    {
      label: "Multilateral",
      value: "Multilateral",
      subOptions: [
        {
          label: "Other Multilateral Organization",
          value: "OTH",
        },
        {
          label: "UN Agency",
          value: "UN",
        },
      ],
    },
    {
      label: "Other",
      value: "Other",
      subOptions: [
        {
          label: "Other Entity",
          value: "OTH",
        },
      ],
    },
    {
      label: "Private Sector",
      value: "Private Sector",
      subOptions: [
        {
          label: "Private Sector Entity",
          value: "PS",
        },
      ],
    },
  ],
};

export interface FilterGroupProps {
  name: string;
  addSubOptionFilters?: boolean;
}

export interface FilterOptionProps extends FilterGroupOptionModel {
  level: number;
  selected: boolean;
  forceExpand: boolean;
  selectedOptions: string[];
  onOptionChange: (
    checked: boolean,
    option: FilterGroupOptionModel,
    level: number
  ) => void;
}

export const filtergroups: FilterGroupProps[] = [
  // {
  //   name: "Period",
  //   addSubOptionFilters: false,
  // },
  {
    name: "Locations",
    addSubOptionFilters: true,
  },
  {
    name: "Components",
    addSubOptionFilters: false,
  },
  {
    name: "Partner Types",
    addSubOptionFilters: false,
  },
  {
    name: "Grant Status",
    addSubOptionFilters: false,
  },
  {
    name: "Donors",
    addSubOptionFilters: true,
  },
  {
    name: "Replenishment Periods",
    addSubOptionFilters: false,
  },
  {
    name: "Document Types",
    addSubOptionFilters: false,
  },
  {
    name: "Portfolio Categorization",
    addSubOptionFilters: false,
  },
  {
    name: "TRP Window",
    addSubOptionFilters: true,
  },
];

export const expendituresFilterGroups: FilterGroupProps[] = [
  {
    name: "Investment Landscapes",
    addSubOptionFilters: true,
  },
  {
    name: "Modules & Interventions",
    addSubOptionFilters: true,
  },
  {
    name: "Years",
    addSubOptionFilters: false,
  },
  {
    name: "Locations",
    addSubOptionFilters: true,
  },
  {
    name: "Components",
    addSubOptionFilters: false,
  },
  {
    name: "Partner Types",
    addSubOptionFilters: false,
  },
  {
    name: "Grant Cycle",
    addSubOptionFilters: false,
  },
];

export const fundingRequestFilterGroups: FilterGroupProps[] = [
  {
    name: "Components",
    addSubOptionFilters: false,
  },
  {
    name: "Locations",
    addSubOptionFilters: true,
  },
  {
    name: "Portfolio Categorization",
    addSubOptionFilters: false,
  },
  {
    name: "TRP Window",
    addSubOptionFilters: true,
  },
];

export const accessToFundingEligibilityFilterGroups: FilterGroupProps[] = [
  {
    name: "Year",
    addSubOptionFilters: true,
  },
  {
    name: "Components",
    addSubOptionFilters: false,
  },
  {
    name: "Eligibility Status",
    addSubOptionFilters: false,
  },
  {
    name: "Portfolio Categorization",
    addSubOptionFilters: false,
  },
  {
    name: "TRP Window",
    addSubOptionFilters: true,
  },
];

export const pathnameToFilterGroups = {
  // independent data pages
  grants: filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  documents: filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" ||
      fg.name === "Components" ||
      fg.name == "Document Types"
  ),
  results: filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  // viz data pages
  "/viz/disbursements/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/disbursements/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/signed/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/commitment/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/budgets/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/viz/allocations": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/allocations/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/allocations/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/eligibility": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/eligibility/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/pledges-contributions/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  "/viz/pledges-contributions/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  "/viz/pledges-contributions/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  "/viz/pledges-contributions/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  "/viz/funding-requests/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Grant Status" &&
      fg.name !== "Partner Types"
  ),
  "/viz/expenditures": expendituresFilterGroups,
  // location detail page
  "/location/<code>/overview": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  // "/location/<code>/overview": [],
  "/location/<code>/disbursements/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/disbursements/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/signed/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/commitment/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/budgets/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),

  "/location/<code>/allocations": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/allocations/map": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/eligibility": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/eligibility/table": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/documents": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Components" || fg.name === "Document Types"
  ),
  "/location/<code>/grants": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/grants/list": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/location/<code>/results": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  // partner detail page
  "/partner/<code>/disbursements/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/disbursements/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/signed/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/commitment/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/budgets/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/grants": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
  "/partner/<code>/grants/list": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods" &&
      fg.name !== "Document Types" &&
      fg.name !== "Portfolio Categorization" &&
      fg.name !== "TRP Window"
  ),
};
