/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import useTitle from "react-use/lib/useTitle";
/* project */
import { useRecoilState } from "recoil";
import { useCMSData } from "app/hooks/useCMSData";
import { breadCrumbItems } from "app/state/recoil/atoms";
import { LandingLayout } from "app/modules/landing-module/layout";

export default function Landing() {
  const cmsData = useCMSData({ returnData: true });
  useTitle(get(cmsData, "modulesLanding.title", ""));

  const [_, setBreadCrumbList] = useRecoilState(breadCrumbItems);

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.SECONDARY_COLOR_7;
    setBreadCrumbList([]);
  }, []);

  return <LandingLayout />;
}
