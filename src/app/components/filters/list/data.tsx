import { appColors } from "app/theme";
import styled from "styled-components";

export interface FilterModel {
  name: string;
  value: string;
  options?: FilterModel[];
}

export interface FilterGroupModel {
  name: string;
  options: FilterModel[];
}

export interface FilterListItemContentProps {
  name: string;
  level: number;
  withSearch?: boolean;
  options?: FilterModel[];
}

export interface FilterListProps {
  groups: FilterGroupModel[];
}

export const STORY_DATA_VARIANT_1: FilterGroupModel[] = [
  {
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
    name: "Principal Recipient",
    options: [],
  },
  {
    name: "Component",
    options: [],
  },
  {
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
