import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { SankeyChartTooltipProps } from "app/components/charts/sankey/data";

export const SankeyChartTooltip: React.FC<SankeyChartTooltipProps> = (
  props: SankeyChartTooltipProps
) => {
  const value = React.useMemo(() => {
    let items = props.data.links.filter((link) => link.source === props.name);
    if (items.length === 0) {
      items = props.data.links.filter((link) => link.target === props.name);
    }
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [props.data, props.name]);

  const children = React.useMemo(() => {
    const returnItems: {
      value: number;
      name: string;
      color: string | undefined;
      percentage: string;
    }[] = [];
    const items = props.data.links.filter((link) => link.source === props.name);
    items.forEach((item) => {
      const node = props.data.nodes.find((node) => node.name === item.target);
      const itemValue = props.data.links
        .filter(
          (link) => link.target === item.target && link.source === props.name
        )
        .reduce((acc, item) => acc + item.value, 0);
      returnItems.push({
        value: itemValue,
        name: item.target,
        color: node?.itemStyle?.color,
        percentage: ((itemValue / value) * 100).toFixed(2).replace(".00", ""),
      });
    });
    return returnItems;
  }, [props.data, props.name, props.level]);

  const content = React.useMemo(() => {
    if (children.length === 0) {
      return (
        <React.Fragment>
          <Divider
            style={{
              margin: 0,
              width: "100%",
              borderStyle: "solid none none none",
              borderColor: appColors.TOOLTIP.BORDER_COLOR,
            }}
          />
          <Typography
            component="div"
            style={{
              width: "100%",
              fontSize: "12px",
              overflow: "hidden",
              whiteSpace: "wrap",
            }}
          >
            {props.name}
            {((value / props.totalValue) * 100).toFixed(2).replace(".00", "")}%
            of total budget
          </Typography>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Typography
          component="div"
          style={{
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          {props.name}
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="div"
            style={{
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Total amount
          </Typography>
          <Typography
            component="div"
            style={{
              fontSize: "12px",
            }}
          >
            {((value / props.totalValue) * 100).toFixed(2).replace(".00", "")}%
            of total budget - {formatFinancialValue(value)}
          </Typography>
        </Box>
        <Divider
          style={{
            margin: 0,
            width: "100%",
            borderStyle: "solid none none none",
            borderColor: appColors.TOOLTIP.BORDER_COLOR,
          }}
        />
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="div"
            style={{
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Component
          </Typography>
          <Typography
            component="div"
            style={{
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Amount
          </Typography>
        </Box>
        <Box
          style={{
            gap: "8px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {children.map((item) => (
            <Box
              key={item.name}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="div"
                style={{
                  gap: "12px",
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: item.color,
                  }}
                />
                <Box
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: "calc(100% - 20px)",
                  }}
                >
                  {item.name}
                </Box>
              </Typography>
              <Typography
                component="div"
                style={{
                  fontSize: "12px",
                }}
              >
                {item.percentage}% - {formatFinancialValue(item.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </React.Fragment>
    );
  }, [children, props.name, value, props.totalValue]);

  return (
    <Box
      style={{
        width: "390px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        gap: children.length > 0 ? "16px" : "10px",
      }}
    >
      <Typography
        component="div"
        style={{
          fontSize: "18px",
          maxWidth: "100%",
          fontWeight: "700",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {formatFinancialValue(value)}
      </Typography>
      {content}
    </Box>
  );
};
