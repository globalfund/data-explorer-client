/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { LandingLayout } from "app/modules/landing-module/layout";
import { useRecoilState } from "recoil";
import { breadCrumbItems } from "app/state/recoil/atoms";

export default function Landing() {
  const cmsData = useCMSData({ returnData: true });

  useTitle(get(cmsData, "modulesLanding.title", ""));
  const [breadCrumbList, setBreadCrumList] = useRecoilState(breadCrumbItems);

  React.useEffect(() => {
    document.body.style.background = "#dfe3e6";
    setBreadCrumList([]);
  }, []);

  return <LandingLayout />;
}
