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

  const level1Items = React.useMemo(() => {
    if (props.level < 2) return [];
    const items = props.data.links.filter((link) => link.target === props.name);
    if (props.level === 2) {
      return items.map((item) => {
        const node = props.data.nodes.find((node) => node.name === item.source);
        const itemValue = props.data.links
          .filter((link) => link.source === item.source)
          .reduce((acc, item) => acc + item.value, 0);
        return {
          value,
          name: item.source,
          color: node?.itemStyle?.color,
          percentage: ((value / itemValue) * 100).toFixed(0),
        };
      });
    }
    const returnItems: {
      value: number;
      name: string;
      color: string | undefined;
      percentage: string;
    }[] = [];
    items.forEach((item) => {
      const node = props.data.nodes.find((node) => node.name === item.source);
      if (node && node.level === 1) {
        const itemValue = props.data.links
          .filter((link) => link.source === item.source)
          .reduce((acc, item) => acc + item.value, 0);
        returnItems.push({
          value,
          name: item.source,
          color: node.itemStyle?.color,
          percentage: ((value / itemValue) * 100).toFixed(0),
        });
      } else {
        const items2 = props.data.links.filter(
          (link) => link.target === item.source
        );
        items2.forEach((item2) => {
          const alreadyIn = returnItems.find((i) => i.name === item2.source);
          const node2 = props.data.nodes.find(
            (node) => node.name === item2.source
          );
          const itemValue = props.data.links
            .filter((link) => link.source === item2.source)
            .reduce((acc, item) => acc + item.value, 0);
          if (!alreadyIn) {
            returnItems.push({
              value,
              name: item2.source,
              color: node2?.itemStyle?.color,
              percentage: ((value / itemValue) * 100).toFixed(0),
            });
          }
        });
      }
    });
    return returnItems;
  }, [props.data, props.name, props.level]);

  const content = React.useMemo(() => {
    if (level1Items.length === 0) {
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
            {props.name} - {((value / props.totalValue) * 100).toFixed(0)}% of
            total budget
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
            {((value / props.totalValue) * 100).toFixed(0)}% of total budget -{" "}
            {formatFinancialValue(props.totalValue)}
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
          {level1Items.map((item) => (
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
  }, [level1Items, props.name, value, props.totalValue]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        gap: level1Items.length > 0 ? "16px" : "10px",
        width: level1Items.length > 0 ? "390px" : "210px",
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
