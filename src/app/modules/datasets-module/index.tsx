/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageHeader } from "app/components/PageHeader";

export default function Datasets() {
  useTitle(`The Data Explorer - Datasets`);

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
        title="Datasets"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
          },
        ]}
      />
      <div css="width: 100%;height: 25px;" />
    </div>
  );
}
