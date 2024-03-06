import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { Dropdown } from "app/components/dropdown";
import { DetailPageTabsProps } from "app/components/detail-page-tabs/data";

const ButtonTab = styled(NavLink)`
  font-size: 14px;
  padding: 7px 24px;
  border-radius: 8px;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: ${({ theme }) => (theme.active ? "#fff" : "#000")};
  font-weight: ${({ theme }) => (theme.active ? "700" : "400")};
  background: ${({ theme }) => (theme.active ? "#000" : "#F1F3F4")};

  &:hover {
    color: #fff;
    background: #000;
  }
`;

export const DetailPageTabs: React.FC<DetailPageTabsProps> = (
  props: DetailPageTabsProps
) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      sx={{
        "> button": {
          width: "fit-content",
        },
      }}
    >
      {props.dropdown && (
        <Dropdown
          width={237}
          dropdownItems={props.dropdown.dropdownItems}
          dropdownSelected={props.dropdown.dropdownSelected}
          handleDropdownChange={props.dropdown.handleDropdownChange}
        />
      )}
      <Box gap="16px" display="flex">
        {props.tabs.map((tab) => (
          <ButtonTab key={tab.label} to={tab.link}>
            {tab.label}
          </ButtonTab>
        ))}
      </Box>
    </Box>
  );
};
