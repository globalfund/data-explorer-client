import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Close from "@mui/icons-material/Close";
import { ItemInterface } from "react-sortablejs";
import IconButton from "@mui/material/IconButton";
import { Dropdown } from "app/components/dropdown";
import { ReactComponent as HandleIcon } from "app/assets/vectors/ChartSettingsOrderListItemHandle.svg";

export interface OrderListProps {
  items: ItemInterface[];
  setItems: (value: ItemInterface[]) => void;
  dropdownSetSelected?: (name: string, value: string) => void;
}

interface ChartSettingsOrderListItemProps extends ItemInterface {
  dropdown?: {
    selected: string;
    items: { value: string; label: string }[];
  };
  dropdownSetSelected?: (name: string, value: string) => void;
}

export const ChartSettingsOrderListItem: React.FC<
  ChartSettingsOrderListItemProps
> = (props: ChartSettingsOrderListItemProps) => {
  const handleRemove = () => {
    props.onRemove(props.id);
  };

  const handleDropdownChange = (value: string) => {
    if (props.dropdownSetSelected) {
      props.dropdownSetSelected(props.name, value);
    }
  };

  return (
    <Box
      sx={{
        gap: "10px",
        display: "flex",
        margin: "5px 0",
        alignItems: "center",
        flexDirection: "row",
        "> svg": {
          cursor: "grab",
        },
      }}
    >
      <HandleIcon />
      <Box
        sx={{
          fontSize: "12px",
          padding: "2px 10px",
          borderRadius: "4px",
          background: "#E0E0E0",
        }}
      >
        {props.name}
      </Box>
      {props.dropdown && props.dropdownSetSelected && (
        <Dropdown
          compact
          width={150}
          height={22}
          dropdownItems={props.dropdown.items}
          dropdownSelected={props.dropdown.selected}
          handleDropdownChange={handleDropdownChange}
        />
      )}
      <IconButton size="small" onClick={handleRemove}>
        <Close fontSize="small" htmlColor={colors.primary.black} />
      </IconButton>
    </Box>
  );
};
