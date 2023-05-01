import React from "react";
import { useHistory } from "react-router-dom";
import { LogOutIcon, RightIcon } from "./component/icons";
import UserProfileLayout from "./layout";

export default function UserProfileModule() {
  const tabList = [
    {
      title: "profile",
      active: true,
      component: (active: boolean) => <RightIcon active={active} />,
    },
    {
      title: "settings",
      active: false,
      component: (active: boolean) => <RightIcon active={active} />,
    },
    {
      title: "billing",
      active: false,
      component: (active: boolean) => <RightIcon active={active} />,
    },
    {
      title: "Log Out",
      active: false,
      component: (active: boolean) => <LogOutIcon active={active} />,
    },
  ];
  const [tabstate, setTabState] = React.useState(tabList);

  return <UserProfileLayout tabstate={tabstate} setTabState={setTabState} />;
}
