/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import get from "lodash/get";
import { LandingLayout } from "app/modules/landing-module/layout";
import { useCMSData } from "app/hooks/useCMSData";
/* project */

export default function Landing() {
  const cmsData = useCMSData({ returnData: true });

  useTitle(get(cmsData, "modulesLanding.title", ""));

  React.useEffect(() => {
    document.body.style.background = "#dfe3e6";
  }, []);

  return <LandingLayout />;
}
