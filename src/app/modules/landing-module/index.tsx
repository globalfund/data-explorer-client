/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
/* project */

export default function Landing() {
  useTitle(`The Data Explorer - Home`);

  React.useEffect(() => {
    document.body.style.background = "#dfe3e6";
  }, []);

  return <LandingLayout />;
}
