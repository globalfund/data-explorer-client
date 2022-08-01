/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { LandingLayout } from "app/modules/landing-module/layout";

export default function Landing() {
  const cmsData = useCMSData({ returnData: true });

  useTitle(get(cmsData, "modulesLanding.title", ""));

  React.useEffect(() => {
    document.body.style.background = "#dfe3e6";
  }, []);

  return <LandingLayout />;
}
