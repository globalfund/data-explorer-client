import React from "react";
import Tab from "./component/tab";
import Profile from "./sub-module/profile";
import Settings from "./sub-module/settings";
import { bigAvicss, layoutcss } from "./style";
import { Box, Container, Grid } from "@material-ui/core";
import LogOutDialog from "app/components/Dialogs/logOutDialog";
import { Route, Switch, useHistory } from "react-router-dom";
import { PageTopSpacer } from "../common/page-top-spacer";

interface UserProfileLayoutProps {
  tabstate: {
    title: string;
    active: boolean;
    component: (active: boolean) => JSX.Element;
  }[];
  setTabState: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        active: boolean;
        component: (active: boolean) => JSX.Element;
      }[]
    >
  >;
}
export default function UserProfileLayout(props: UserProfileLayoutProps) {
  const history = useHistory();
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const handleTabClick = (index: number, title: string) => {
    const newTabState = props.tabstate.map((tab, i) => {
      if (i === index) {
        return {
          ...tab,
          active: true,
        };
      } else {
        return {
          ...tab,
          active: false,
        };
      }
    });
    props.setTabState(newTabState);

    if (title === "Log Out") {
      setModalDisplay(true);
    } else {
      history.push(`/user-management/${title}`);
    }
  };

  return (
    <div css={layoutcss}>
      <Container maxWidth="lg">
        <PageTopSpacer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Box height={20} />
            <div css={bigAvicss}>
              <p>VI</p>
            </div>
            <Box height={60} />
            <div>
              {props.tabstate.map((tab, index) => (
                <div key={tab.title}>
                  <Tab
                    title={tab.title}
                    active={tab.active}
                    handleClick={() => handleTabClick(index, tab.title)}
                    component={() => tab.component(tab.active)}
                  />
                  <Box height={10} />
                </div>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={5} lg={6}>
            <Switch>
              <Route path="/user-management/profile">
                <Profile />
              </Route>
              <Route path="/user-management/settings">
                <Settings />
              </Route>
            </Switch>
          </Grid>
          <LogOutDialog
            modalDisplay={modalDisplay}
            setModalDisplay={setModalDisplay}
          />
        </Grid>
      </Container>
    </div>
  );
}
