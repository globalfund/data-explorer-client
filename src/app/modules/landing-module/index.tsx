/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
/* project */

export default function Landing() {
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);
  // useTitle(`The Data Explorer - Home`);

  // React.useEffect(() => {
  //   document.body.style.background = "#dfe3e6";
  // }, []);

  // return <LandingLayout />;
  return (
    <ToolBoxPanel
      open={openToolboxPanel}
      filterGroups={pathnameToFilterGroups.results}
      onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
    />
  );
}
