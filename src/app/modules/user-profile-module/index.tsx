import React from "react";
import UserProfileLayout from "./layout";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutIcon, RightIcon } from "./component/icons";

const tabList = [
  // {
  //   title: "profile",
  //   active: true,
  //   component: (active: boolean) => <RightIcon active={active} />,
  // },
  // {
  //   title: "settings",
  //   active: false,
  //   component: (active: boolean) => <RightIcon active={active} />,
  // },
  // {
  //   title: "billing",
  //   active: false,
  //   component: (active: boolean) => <RightIcon active={active} />,
  // },
  {
    title: "Log Out",
    active: false,
    component: (active: boolean) => <LogOutIcon active={active} />,
  },
];

export default function UserProfileModule() {
  const history = useHistory();
  const { isAuthenticated, isLoading } = useAuth0();
  const [tabstate, setTabState] = React.useState(tabList);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push("/");
    }
  }, [isLoading, isAuthenticated]);

  return <UserProfileLayout tabstate={tabstate} setTabState={setTabState} />;
}
