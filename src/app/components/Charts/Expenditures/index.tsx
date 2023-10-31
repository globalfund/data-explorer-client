import React from "react";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import IconButton from "@material-ui/core/IconButton";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  rowCSS,
  rowColCSS,
  rowNameCSS,
  containerCSS,
  scrollableCSS,
  colNameCSS,
} from "app/components/Charts/Expenditures/styles";

interface ExpendituresChartProps {
  data: {
    row: string;
    column: string;
    budget: number;
    expenditure: number;
    percentage: number;
    parentRow?: string;
    parentColumn?: string;
  }[];
  rowCategory: string;
  columnCategory: string;
  hoveredLegend: string | null;
  valueType: "percentage" | "amount";
}

function getPercentageColor(value: number) {
  if (!value || value > 100) {
    return appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[4];
  }
  if (value >= 85) {
    return appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[0];
  }
  if (value >= 75) {
    return appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[1];
  }
  if (value >= 65) {
    return appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[2];
  }
  return appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[3];
}

interface ItemModel {
  name: string;
  expanded: boolean;
  children?: ItemModel[];
}

export function ExpendituresChart(props: ExpendituresChartProps) {
  const [visibleRows, setVisibleRows] = React.useState<ItemModel[]>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<ItemModel[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
  const [expandedColumns, setExpandedColumns] = React.useState<string[]>([]);

  const rootData = React.useMemo(() => {
    return props.data.filter((d) => !d.parentRow && !d.parentColumn);
  }, [props.data]);

  const onRowExpandClick = (value: string) => () => {
    if (expandedRows.includes(value)) {
      setExpandedRows(expandedRows.filter((item) => item !== value));
    } else {
      setExpandedRows([...expandedRows, value]);
    }
  };

  const onColumnExpandClick = (value: string) => () => {
    if (expandedColumns.includes(value)) {
      setExpandedColumns(expandedColumns.filter((item) => item !== value));
    } else {
      setExpandedColumns([...expandedColumns, value]);
    }
  };

  React.useEffect(() => {
    setExpandedRows([]);
    setExpandedColumns([]);
  }, [props.data, props.rowCategory, props.columnCategory]);

  React.useEffect(() => {
    setVisibleRows(
      uniqBy(
        rootData.map((d) => {
          const name = d.row;
          const children = uniqBy(
            props.data
              .filter((item) => item.parentRow === name)
              .map((item) => {
                const name = item.row;
                const children = uniqBy(
                  props.data
                    .filter((subitem) => subitem.parentRow === name)
                    .map((subitem) => ({
                      name: subitem.row,
                      expanded: false,
                    })),
                  "name"
                );
                return {
                  name,
                  expanded: expandedRows.includes(name),
                  children: children.length > 0 ? children : undefined,
                };
              }),
            "name"
          );
          return {
            name,
            expanded: expandedRows.includes(name),
            children: children.length > 0 ? children : undefined,
          };
        }),
        "name"
      )
    );
  }, [rootData, expandedRows]);

  React.useEffect(() => {
    setVisibleColumns(
      uniqBy(
        rootData.map((d) => {
          const name = d.column;
          const children = uniqBy(
            props.data
              .filter((item) => item.parentColumn === name)
              .map((item) => {
                const name = item.column;
                const children = uniqBy(
                  props.data
                    .filter((subitem) => subitem.parentColumn === name)
                    .map((subitem) => ({
                      name: subitem.column,
                      expanded: false,
                    })),
                  "name"
                );
                return {
                  name,
                  expanded: expandedColumns.includes(name),
                  children: children.length > 0 ? children : undefined,
                };
              }),
            "name"
          );
          return {
            name,
            expanded: expandedColumns.includes(name),
            children: children.length > 0 ? children : undefined,
          };
        }),
        "name"
      )
    );
  }, [rootData, expandedColumns]);

  const flatVisibleRows = React.useMemo(() => {
    const result: ItemModel[] = [];
    visibleRows.forEach((row) => {
      result.push(row);
      if (row.children && row.expanded) {
        row.children.forEach((child) => {
          result.push(child);
          if (child.children && child.expanded) {
            child.children.forEach((subchild) => result.push(subchild));
          }
        });
      }
    });
    if (expandedRows.length === 0) {
      if (props.rowCategory === "period") {
        return orderBy(result, (item) => parseInt(item.name, 10), "desc");
      }
      if (props.rowCategory === "grantCycle") {
        return orderBy(
          result,
          (item) => parseInt(item.name.split(",")[0], 10),
          "desc"
        );
      }
      return orderBy(result, "name", "asc");
    }
    return result;
  }, [visibleRows, expandedRows]);

  const flatVisibleColumns = React.useMemo(() => {
    const result: ItemModel[] = [];
    visibleColumns.forEach((column) => {
      result.push(column);
      if (column.children && column.expanded) {
        column.children.forEach((child) => {
          result.push(child);
          if (child.children && child.expanded) {
            child.children.forEach((subchild) => result.push(subchild));
          }
        });
      }
    });
    if (expandedColumns.length === 0) {
      if (props.columnCategory === "period") {
        return orderBy(result, (item) => parseInt(item.name, 10), "desc");
      }
      if (props.columnCategory === "grantCycle") {
        return orderBy(
          result,
          (item) => parseInt(item.name.split(",")[0], 10),
          "desc"
        );
      }
      return orderBy(result, "name", "asc");
    }
    return result;
  }, [visibleColumns, expandedColumns]);

  return (
    <div
      css={`
        padding: 20px;
        max-width: 100%;
        max-height: 60vh;
        border-radius: 16px;
        background: ${appColors.EXPENDITURES.CHART_BG_COLOR};
      `}
    >
      <div css={scrollableCSS}>
        <div css={containerCSS}>
          <div css={rowCSS}>
            <div css={rowNameCSS}></div>
            {flatVisibleColumns.map((column) => (
              <div key={column.name} css={colNameCSS}>
                {column.name}
                {column.children && (
                  <IconButton
                    onClick={onColumnExpandClick(column.name)}
                    css={`
                      padding: 4px;
                      transform: rotate(${column.expanded ? 180 : 0}deg);
                    `}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
          {flatVisibleRows.map((row) => (
            <div key={row.name} css={rowCSS}>
              <div
                css={rowNameCSS}
                style={row.expanded ? { fontWeight: 700 } : {}}
              >
                {row.name}
                {row.children ? (
                  <IconButton
                    onClick={onRowExpandClick(row.name)}
                    css={`
                      padding: 4px;
                      transform: rotate(${row.expanded ? -90 : 90}deg);
                    `}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                ) : (
                  <div
                    css={`
                      min-width: 40px;
                      min-height: 40px;
                    `}
                  />
                )}
              </div>
              {flatVisibleColumns.map((column) => {
                const data = props.data.find(
                  (d) => d.row === row.name && d.column === column.name
                );
                const percentage = get(data, "percentage", 0)
                  .toFixed(2)
                  .replace(".00", "");
                let value: number | string = get(
                  data,
                  props.valueType === "percentage"
                    ? "percentage"
                    : "expenditure",
                  0
                );
                if (value > 0) {
                  value = value.toFixed(2).replace(".00", "");
                } else {
                  value = "--";
                }
                const color = getPercentageColor(parseFloat(percentage));
                let opacity = props.hoveredLegend === color ? 1 : 0.5;
                if (!props.hoveredLegend) opacity = 1;
                return (
                  <div
                    key={column.name}
                    css={rowColCSS}
                    style={{
                      opacity,
                      background: color,
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
