/* third-party */
import React from "react";
/* project */
import { DataThemesExporter } from "app/modules/data-themes-module/components/exporter";

interface DataThemesToolBoxExportProps {
  rawViz: any;
}

export function DataThemesToolBoxExport(props: DataThemesToolBoxExportProps) {
  return (
    <div
      className="chart-options"
      css={`
        width: 100%;
        display: flex;
        overflow-y: auto;
        padding-right: 15px;
        flex-direction: column;
        max-height: calc(100vh - 456px);

        * {
          font-size: 14px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
        }
      `}
    >
      <DataThemesExporter rawViz={props.rawViz} />
    </div>
  );
}
