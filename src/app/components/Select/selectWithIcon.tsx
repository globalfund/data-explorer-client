import { MenuItem } from "@material-ui/core";
import { StyledSelect, StyledInput } from "./style";

interface Props {
  value: string;
  width: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  menuItems: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];

  handleChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}
export function SelectWithIcon(props: Props) {
  return (
    <div>
      <StyledSelect
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={props.value}
        onChange={props.handleChange}
        input={<StyledInput />}
        width={props.width}
      >
        {props.menuItems.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            css={`
              display: flex;
              gap: 4px;
              align-items: center;
            `}
          >
            {item.icon} {item.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
}
