import { appColors } from "app/theme";
import styled from "styled-components";
import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export interface FilterModel {
  name: string;
  value: string;
  options?: FilterModel[];
}

export interface FilterGroupModel {
  id: string;
  name: string;
  options: FilterModel[];
}

export interface FilterListItemContentProps {
  id: string;
  name: string;
  level: number;
  collapseAll: boolean;
  withSearch?: boolean;
  forceExpand?: boolean;
  options?: FilterModel[];
  appliedFiltersData?: AppliedFiltersModel;
  setCollapseAll: (collapseAll: boolean) => void;
  toggleFilter?: (checked: boolean, value: string, type: string) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setPageSearchValue: (value: React.SetStateAction<number>) => void;
}

export interface FilterListProps {
  collapseAll: boolean;
  groups: FilterGroupModel[];
  appliedFiltersData?: AppliedFiltersModel;
  setCollapseAll: (collapseAll: boolean) => void;
  toggleFilter?: (checked: boolean, value: string, type: string) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setPageSearchValue: (value: React.SetStateAction<number>) => void;
}

export const STORY_DATA_VARIANT_1: FilterGroupModel[] = [
  {
    id: "geography",
    name: "Geography",
    options: [
      {
        name: "Africa",
        value: "QPA",
        options: [
          {
            name: "Eastern Africa",
            value: "QPB",
          },
        ],
      },
      {
        name: "Asia",
        value: "QSA",
        options: [
          {
            name: "Eastern Asia",
            value: "QSB",
          },
        ],
      },
    ],
  },
  {
    id: "principalRecipient",
    name: "Principal Recipient",
    options: [],
  },
  {
    id: "component",
    name: "Component",
    options: [],
  },
  {
    id: "grantStatus",
    name: "Grant Status",
    options: [],
  },
];

export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  font-size: 12px;
  font-weight: 400;
  border-radius: 5px;
  border-style: none;
  padding: 4px 8px 4px 28px !important;
  color: ${appColors.SEARCH.INPUT_COLOR};
  background: ${appColors.SEARCH.INPUT_BACKGROUND_COLOR};

  &::placeholder {
    color: #373d43;
  }

  &:focus::placeholder {
    opacity: 0.3;
  }
`;

export function getAppliedFilters(
  appliedFilters: AppliedFiltersModel,
  type: string,
  level: number
) {
  switch (type) {
    case "geography":
      return appliedFilters.locations;
    case "principalRecipient":
      if (level === 0) return appliedFilters.principalRecipientTypes;
      if (level === 1) return appliedFilters.principalRecipientSubTypes;
      return appliedFilters.principalRecipients;
    case "component":
      return appliedFilters.components;
    case "status":
    case "grantStatus":
      return appliedFilters.status;
    case "donor":
      if (level === 0) return appliedFilters.donorTypes;
      return appliedFilters.donors;
    case "replenishmentPeriod":
      return appliedFilters.replenishmentPeriods;
    case "cycle":
      return appliedFilters.cycles;
    default:
      return [];
  }
}
