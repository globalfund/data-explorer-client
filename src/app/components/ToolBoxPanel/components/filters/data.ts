import { filter } from "lodash";

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
    addSubOptionFilters: false,
  },
  {
    name: "Replenishment Periods",
    addSubOptionFilters: false,
  },
];

export const pathnameToFilterGroups = {
  // independent data pages
  grants: filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  documents: filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
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
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/disbursements/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/signed/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/commitment/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/budgets/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
  ),
  "/viz/allocations": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/allocations/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/eligibility": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Locations" || fg.name === "Components"
  ),
  "/viz/pledges-contributions/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  "/viz/pledges-contributions/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name === "Donors" || fg.name === "Replenishment Periods"
  ),
  // location detail page
  "/location/<code>/overview": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/disbursements/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/disbursements/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/signed/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/commitment/geomap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/location/<code>/allocation": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/eligibility": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/documents": filter(
    filtergroups,
    (fg: FilterGroupProps) => fg.name === "Components"
  ),
  "/location/<code>/grants": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
};
