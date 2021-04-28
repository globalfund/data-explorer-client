/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { PageHeader } from "app/components/PageHeader";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
/* project */

export default function About() {
  useTitle(`The Data Explorer - About`);

  React.useEffect(() => {
    document.body.style.background = "#F5F5F7";
  }, []);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageHeader
        title="About"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "About",
          },
        ]}
      />
    </div>
  );
}
