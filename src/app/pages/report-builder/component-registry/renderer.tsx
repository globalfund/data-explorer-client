import React from "react";
import { ReportBuilderPageGrid } from "../builder/components/grid";
import {
  ReportItemContent as LeafReportItemContent,
  ReportItemContentProps,
} from "./content";

export const ReportItemContent: React.FC<ReportItemContentProps> = (props) => {
  const { item, viewMode } = props;

  if (item.type === "grid") {
    return (
      <ReportBuilderPageGrid
        id={item.id}
        rows={item.data.rows}
        columns={item.data.columns}
        viewMode={viewMode}
      />
    );
  }

  if (item.type === "column") {
    return (
      <ReportBuilderPageGrid
        id={item.id}
        rows={1}
        columns={item.data.columns}
        viewMode={viewMode}
      />
    );
  }

  return <LeafReportItemContent {...props} />;
};
