import React from "react";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import Box from "@mui/material/Box";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import isNumber from "lodash/isNumber";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { pickTextColorBasedOnBgColorAdvanced } from "app/utils/pickTextColorBasedOnBgColorAdvanced";
import {
  ItemModel,
  HeatmapProps,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  Row,
  RowCol,
  RowName,
  ColName,
  Container,
  Scrollable,
} from "app/components/charts/heatmap/styles";

export function Heatmap(props: HeatmapProps) {
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
      ).sort((a, b) => {
        if (a.name === "Income Level") return 1;
        if (b.name === "Income Level") return -1;
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      })
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
    let sortedVisibleRows = visibleRows;
    if (!props.noItemOrdering) {
      sortedVisibleRows = orderBy(visibleRows, "name", "asc");
      if (props.rowCategory === "period") {
        sortedVisibleRows = orderBy(
          visibleRows,
          (item) => parseInt(item.name, 10),
          "desc"
        );
      } else if (props.rowCategory === "grantCycle") {
        sortedVisibleRows = orderBy(
          visibleRows,
          (item) => parseInt(item.name.split(",")[0], 10),
          "desc"
        );
      }
    }
    sortedVisibleRows.forEach((row) => {
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
    return result;
  }, [visibleRows, expandedRows]);

  const flatVisibleColumns = React.useMemo(() => {
    const result: ItemModel[] = [];
    let sortedVisibleColumns = visibleColumns;
    if (!props.noItemOrdering) {
      sortedVisibleColumns = orderBy(visibleColumns, "name", "asc");
      if (props.columnCategory === "period") {
        sortedVisibleColumns = orderBy(
          visibleColumns,
          (item) => parseInt(item.name, 10),
          "desc"
        );
      } else if (props.columnCategory === "grantCycle") {
        sortedVisibleColumns = orderBy(
          visibleColumns,
          (item) => parseInt(item.name.split(",")[0], 10),
          "desc"
        );
      }
    }
    sortedVisibleColumns.forEach((column) => {
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
    return result;
  }, [visibleColumns, expandedColumns]);

  const rowNameWidth = React.useMemo(() => {
    if (props.contentProp === "diseaseBurden") {
      return "100px";
    }
    if (props.rowCategory === "period") {
      return "50px";
    }
    if (
      props.rowCategory === "modules" ||
      props.rowCategory === "investmentLandscape" ||
      props.rowCategory === "principalRecipient"
    ) {
      return "450px";
    }
    return "400px";
  }, [props.rowCategory]);

  return (
    <Box
      padding="10px"
      maxWidth="100%"
      maxHeight="60vh"
      position="relative"
      borderRadius="16px"
      bgcolor={props.bgColor}
    >
      {props.rowHeader && (
        <Typography
          top="0px"
          fontSize="10px"
          fontWeight="700"
          paddingLeft="20px"
          left={rowNameWidth}
          position="absolute"
        >
          {props.rowHeader}
        </Typography>
      )}
      <Scrollable>
        <Container
          style={flatVisibleColumns.length < 10 ? { width: "100%" } : {}}
        >
          <Row
            style={{
              zIndex: 2,
              top: "-10px",
              position: "sticky",
              background: appColors.HEATMAP.CHART_BG_COLOR,
            }}
          >
            <RowName
              theme={{ width: rowNameWidth }}
              style={{ fontWeight: "700" }}
            >
              {props.columnHeader}
            </RowName>
            {flatVisibleColumns.map((column) => (
              <ColName
                key={column.name}
                style={{
                  fontWeight: column.expanded ? 700 : 400,
                  // background: appColors.HEATMAP.CHART_BG_COLOR,
                  width: props.itemWidth
                    ? `${props.itemWidth}px`
                    : `calc((100% - 112px) / ${flatVisibleColumns.length})`,
                  minWidth: props.itemWidth ? `${props.itemWidth}px` : "92px",
                }}
              >
                {column.name}
                {column.children && (
                  <IconButton
                    onClick={onColumnExpandClick(column.name)}
                    sx={{
                      padding: "4px",
                      transform: `rotate(${column.expanded ? 180 : 0}deg)`,
                    }}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                )}
              </ColName>
            ))}
          </Row>
          {flatVisibleRows.map((row) => (
            <Row key={row.name}>
              <RowName
                theme={{ width: rowNameWidth }}
                style={row.expanded ? { fontWeight: 700 } : {}}
              >
                {row.children ? (
                  <IconButton
                    onClick={onRowExpandClick(row.name)}
                    sx={{
                      padding: "4px",
                      transform: `rotate(${row.expanded ? -90 : 90}deg)`,
                    }}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                ) : (
                  <React.Fragment>
                    {props.contentProp !== "diseaseBurden" && (
                      <Box minWidth="28px" minHeight="28px" />
                    )}
                  </React.Fragment>
                )}
                {row.name}
              </RowName>
              {flatVisibleColumns.map((column) => {
                const data = props.data.find(
                  (d) => d.row === row.name && d.column === column.name
                );
                const color = props.getItemColor(data);
                let value: number | string = get(data, props.contentProp, 0);
                if (isNumber(value)) {
                  if ((value as number) > 0) {
                    value = (value as number).toFixed(2).replace(".00", "");
                  } else {
                    value = "N/A";
                  }
                  if (value !== "N/A") {
                    if (props.valueType === "percentage") {
                      value = value + "%";
                    } else {
                      value = formatFinancialValue(
                        parseInt(value.toString(), 10)
                      );
                    }
                  }
                }
                let opacity = props.hoveredLegend === color ? 1 : 0.5;
                if (!props.hoveredLegend) opacity = 1;
                return (
                  <RowCol
                    key={column.name}
                    style={{
                      opacity,
                      // color: pickTextColorBasedOnBgColorAdvanced(
                      //   color,
                      //   "#fff",
                      //   "#000"
                      // ),
                      color: "#000",
                      background: color,
                      width: props.itemWidth
                        ? `${props.itemWidth}px`
                        : `calc((100% - 112px) / ${flatVisibleColumns.length})`,
                      minWidth: props.itemWidth
                        ? `${props.itemWidth}px`
                        : "92px",
                    }}
                  >
                    {value}
                  </RowCol>
                );
              })}
            </Row>
          ))}
        </Container>
      </Scrollable>
    </Box>
  );
}
