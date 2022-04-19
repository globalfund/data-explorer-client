import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { styles } from "app/modules/data-themes-module/components/tabs/styles";

export function DataThemesTabs() {
  const [items, setItems] = React.useState(["Tab 1"]);
  const [activeItem, setActiveItem] = React.useState(items[0]);

  function onAdd() {
    setItems([...items, "Tab " + (items.length + 1)]);
  }

  function onTabClick(tab: string) {
    setActiveItem(tab);
  }

  return (
    <div css={styles.container}>
      <div css={styles.innertabscontainer}>
        {items.map((item: string) => (
          <div
            key={item}
            css={styles.tab(item === activeItem)}
            onClick={() => onTabClick(item)}
          >
            {item}
            <KeyboardArrowDownIcon htmlColor="#262c34" />
          </div>
        ))}
      </div>
      <div css={styles.addbtn} onClick={onAdd}>
        <AddCircleOutlineIcon htmlColor="#262c34" />
      </div>
    </div>
  );
}
