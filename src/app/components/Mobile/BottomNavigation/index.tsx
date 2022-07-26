import React from "react";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ExploreIcon from "@material-ui/icons/Explore";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const useStyles = makeStyles({
  root: {
    left: 0,
    bottom: 0,
    zIndex: 100,
    width: "100%",
    position: "fixed",
    borderTop: "1px solid #dfe3e6",
  },
});

const actionButtons = [
  {
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    label: "Explore",
    icon: <ExploreIcon />,
    path: "/datasets",
  },
  {
    label: "About",
    icon: <InfoIcon />,
    path: "/about",
  },
];

export function MobileBottomNavigation() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    history.listen((location: any) => {
      const path = location.pathname;
      const fActionIndex = findIndex(actionButtons, { path });
      if (fActionIndex) {
        setValue(fActionIndex);
      } else {
        setValue(0);
      }
    });
  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(actionButtons[newValue].path);
      }}
      showLabels
      className={classes.root}
    >
      {actionButtons.map((btn: any) => (
        <BottomNavigationAction
          key={btn.label}
          icon={btn.icon}
          label={btn.label}
        />
      ))}
    </BottomNavigation>
  );
}
