/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import useTitle from "react-use/lib/useTitle";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { useStoreActions } from "app/state/store/hooks";
import { LandingLayout } from "app/modules/landing-module/layout";

export default function Landing() {
  const cmsData = useCMSData({ returnData: true });
  useTitle(get(cmsData, "modulesLanding.title", ""));

  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.SECONDARY_COLOR_7;
    setDataPathSteps([]);
  }, []);

  return <LandingLayout />;
}
