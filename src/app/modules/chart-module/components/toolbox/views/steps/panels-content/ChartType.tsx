/* third-party */
import React from "react";

import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import {
  echartTypes,
  ChartTypeModel,
} from "app/modules/chart-module/routes/chart-type/data";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import ToolboxSubHeader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";

export function ChartToolBoxChartType() {
  const chartType = useStoreState((state) => state.charts.chartType.value);

  const setChartType = useStoreActions(
    (actions) => actions.charts.chartType.setValue
  );
  const clearMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const onChartTypeChange = (chartTypeId: string) => () => {
    clearMapping();
    setChartType(chartType === chartTypeId ? null : chartTypeId);
  };

  return (
    <div
      css={`
        height: 100%;
        margin-bottom: 100px;
      `}
    >
      <ToolboxSubHeader name="Chart type" level={2} />

      <div
        css={`
          width: 90%;
          margin: auto;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            width: 100%;
            background: #dfe3e5;
            border-radius: 24px;
            height: 34px;
            padding-right: 5px;
            margin: 16px 0;

            input {
              border: none;
              background: transparent;
              width: 90%;
              height: 100%;
              padding-left: 16px;
            }
          `}
        >
          <input type="text" />
          <SearchIcon />
        </div>
        <Grid container item spacing={2} direction="column">
          {echartTypes(false).map((ct: ChartTypeModel) => (
            <Grid item xs={12} sm={12} md={12} key={ct.id}>
              <div
                css={`
                  background: ${chartType === ct.id ? "#262C34" : "#dfe3e6"};
                  width: 100%;
                  padding: 0 15px;
                  border-radius: 8px;

                  color: ${chartType === ct.id ? "#fff" : "#231D2C"};
                  ${ct.label === "" &&
                  `pointer-events: none;background: #f1f3f5;`}
                  svg {
                    path {
                      fill: ${chartType === ct.id ? "#fff" : "#262c34"};
                    }
                  }
                  &:hover {
                    cursor: ${ct.label !== "" ? "pointer" : "auto"};
                    background: #262c34;
                    color: #fff;
                    svg {
                      path {
                        fill: #fff;
                      }
                    }
                  }
                `}
                onClick={ct.label === "" ? () => {} : onChartTypeChange(ct.id)}
              >
                <div
                  css={`
                    height: 64px;
                    display: flex;
                    user-select: none;
                    flex-direction: row;
                    align-items: center;
                  `}
                >
                  {ct.icon}
                  <div
                    css={`
                      display: flex;
                      margin-left: 15px;
                      flex-direction: column;
                    `}
                  >
                    <div
                      css={`
                        font-size: 14px;
                      `}
                    >
                      <b>{ct.label}</b>
                    </div>
                    <div
                      css={`
                        font-size: 12px;
                        font-family: "GothamNarrow-Book", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {ct.categories.join(", ")}
                    </div>
                  </div>
                </div>
                {chartType === ct.id && (
                  <>
                    <div
                      css={`
                        height: 150px;
                      `}
                    >
                      {ct.preview}
                    </div>
                    <p
                      css={`
                        font-family: "Gotham Narrow", sans-serif;
                        font-size: 10px;
                        line-height: normal;
                        padding-bottom: 17px;
                      `}
                    >
                      {ct.description}
                    </p>
                  </>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
