/* third-party */
import React from "react";
/* project */
import { ChartExporter } from "app/modules/chart-module/components/exporter";

interface ChartToolBoxExportProps {
  rawViz: any;
}

export function ChartToolBoxExport(props: ChartToolBoxExportProps) {
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
      <ChartExporter rawViz={props.rawViz} />
    </div>
  );
}
