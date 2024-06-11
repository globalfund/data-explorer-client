import React from "react";
import Box from "@mui/material/Box";
import { styled } from "styled-components";
import { Dropdown } from "app/components/dropdown";
import { NavLink, useParams } from "react-router-dom";
import { DetailPageTabsProps } from "app/components/detail-page-tabs/data";

const ButtonTab = styled(NavLink)`
  font-size: 14px;
  font-weight: 400;
  padding: 5px 24px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: ${({ theme }) => (theme.active ? "#fff" : "#000")};
  background: ${({ theme }) => (theme.active ? "#000" : "#fff")};
  border: 1px solid ${({ theme }) => (theme.active ? "#000" : "#DFE3E5")};

  &:hover {
    color: #fff;
    background: #000;
  }
`;

export const DetailPageTabs: React.FC<DetailPageTabsProps> = (
  props: DetailPageTabsProps
) => {
  const params = useParams<{ id: string; tab: string }>();

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
          width={223}
          dropdownItems={props.dropdown.dropdownItems}
          dropdownSelected={props.dropdown.dropdownSelected}
          handleDropdownChange={props.dropdown.handleDropdownChange}
        />
      )}
      <Box gap="16px" display="flex">
        {props.tabs.map((tab) => (
          <ButtonTab
            key={tab.label}
            to={`${props.baseRoute}/${params.id}${tab.link}`}
            theme={{
              active: props.activeTab === tab.link.replace("/", ""),
            }}
          >
            {tab.label}
          </ButtonTab>
        ))}
      </Box>
    </Box>
  );
};
