import React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import AssetsIcon from "app/assets/vectors/report-builder-responsive/assets.svg?react";
import ReportsIcon from "app/assets/vectors/report-builder-responsive/reports.svg?react";
import TemplatesIcon from "app/assets/vectors/report-builder-responsive/templates.svg?react";
import AssetsActiveIcon from "app/assets/vectors/report-builder-responsive/assets-active.svg?react";
import ReportsDefaultIcon from "app/assets/vectors/report-builder-responsive/reports-default.svg?react";
import TemplatesActiveIcon from "app/assets/vectors/report-builder-responsive/templates-active.svg?react";

export type ReportBuilderMobileSection =
  | "allReports"
  | "allAssets"
  | "templatesAndLayouts";

const items: {
  value: ReportBuilderMobileSection;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}[] = [
  {
    value: "allReports",
    label: "Reports",
    icon: <ReportsDefaultIcon width={18} height={18} />,
    activeIcon: <ReportsIcon width={18} height={18} />,
  },
  {
    value: "allAssets",
    label: "Assets",
    icon: <AssetsIcon width={18} height={18} />,
    activeIcon: <AssetsActiveIcon width={18} height={18} />,
  },
  {
    value: "templatesAndLayouts",
    label: "Templates",
    icon: <TemplatesIcon width={18} height={18} />,
    activeIcon: <TemplatesActiveIcon width={18} height={18} />,
  },
];

export const ReportBuilderMobileBottomBar: React.FC<{
  value: ReportBuilderMobileSection;
  onChange: (value: ReportBuilderMobileSection) => void;
}> = ({ value, onChange }) => {
  return (
    <Box
      component="nav"
      aria-label="Report builder sections"
      sx={{
        left: 0,
        bottom: 0,
        zIndex: 1000,
        width: "100%",
        height: "80px",
        px: "12px",
        py: "10px",
        gap: "24px",
        display: "flex",
        position: "fixed",
        overflow: "hidden",
        alignItems: "center",
        boxSizing: "border-box",
        justifyContent: "center",
        bgcolor: "#fff",
        border: "0.5px solid #98a1aa",
        borderRadius: "4px 4px 0 0",
        boxShadow: "0 0 9.8px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {items.map((item) => {
        const active = item.value === value;

        return (
          <ButtonBase
            key={item.value}
            aria-current={active ? "page" : undefined}
            onClick={() => onChange(item.value)}
            sx={{
              p: "6px",
              gap: "3px",
              width: "70px",
              height: "60px",
              minWidth: "70px",
              flex: "0 0 70px",
              display: "flex",
              position: "relative",
              color: active ? "#3154f4" : "#373d43",
              bgcolor: active ? "#eff1fe" : "transparent",
              borderRadius: "12px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                width: "18px",
                height: "18px",
                display: "flex",
                flex: "0 0 18px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {active ? item.activeIcon : item.icon}
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Box>
            {active && (
              <Box
                component="span"
                sx={{
                  left: "50%",
                  bottom: 0,
                  width: "40px",
                  height: "2px",
                  position: "absolute",
                  bgcolor: "#3154f4",
                  borderRadius: "12px 12px 0 0",
                  transform: "translateX(-50%)",
                }}
              />
            )}
          </ButtonBase>
        );
      })}
    </Box>
  );
};
