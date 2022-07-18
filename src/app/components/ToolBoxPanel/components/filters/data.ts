import { filter } from "lodash";

export interface FilterGroupOptionModel {
  label: string;
  value: string;
  subOptions?: FilterGroupOptionModel[];
}

export interface FilterGroupModel {
  name: string;
  enabled?: boolean;
  options: FilterGroupOptionModel[];
}

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
  "/viz/disbursements/map": filter(
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
  "/viz/signed/map": filter(
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
  "/viz/commitment/map": filter(
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
  "/viz/budgets/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Donors" && fg.name !== "Replenishment Periods"
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
  // location detail page
  "/location/<code>/overview": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  // "/location/<code>/overview": [],
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
  "/location/<code>/disbursements/map": filter(
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
  "/location/<code>/signed/map": filter(
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
  "/location/<code>/commitment/map": filter(
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
  "/location/<code>/budgets/map": filter(
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
  "/location/<code>/grants/list": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
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
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/disbursements/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/disbursements/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/disbursements/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/signed/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/signed/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/signed/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/signed/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/commitment/treemap": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/commitment/table": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/commitment/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/commitment/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/budgets/flow": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/budgets/time-cycle": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/budgets/map": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/grants": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
  "/partner/<code>/grants/list": filter(
    filtergroups,
    (fg: FilterGroupProps) =>
      fg.name !== "Locations" &&
      fg.name !== "Donors" &&
      fg.name !== "Replenishment Periods"
  ),
};
