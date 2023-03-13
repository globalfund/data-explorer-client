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

        * {
          font-size: 14px;
          font-family: "Inter", "Helvetica Neue", sans-serif !important;
        }
      `}
    >
      <DataThemesExporter rawViz={props.rawViz} />
    </div>
  );
}
