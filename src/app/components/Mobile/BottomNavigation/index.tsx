import React from "react";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { useCMSData } from "app/hooks/useCMSData";
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

export function createActionButtons() {
  const cmsData = useCMSData({ returnData: true });

  return [
    {
      label: get(cmsData, "componentsMobile.appbarLabelHome", ""),
      icon: <HomeIcon />,
      path: "/",
    },
    {
      label: get(cmsData, "componentsMobile.appbarLabelExplore", ""),
      icon: <ExploreIcon />,
      path: "/datasets",
    },
    {
      label: get(cmsData, "componentsMobile.appbarLabelAbout", ""),
      icon: <InfoIcon />,
      path: "/about",
    },
  ];
}

export function MobileBottomNavigation() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const actionButtons = createActionButtons();

  function getIsActive(path: string) {
    switch (path) {
      case "/":
        return history.location.pathname === "/";
      case "/datasets":
        return (
          history.location.pathname !== "/" &&
          history.location.pathname !== "/about"
        );
      case "/about":
        return history.location.pathname === "/about";
      default:
        return false;
    }
  }

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
      {actionButtons.map((btn: any) => {
        const isActive = getIsActive(btn.path);

        return (
          <BottomNavigationAction
            key={btn.path}
            icon={btn.icon}
            label={btn.label}
            css={`
              && {
                color: ${isActive ? "#231d2c" : "#70777e"};

                svg {
                  fill: ${isActive ? "#231d2c" : "#70777e"};
                }
              }
            `}
          />
        );
      })}
    </BottomNavigation>
  );
}
