/* third-party */
import React from "react";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import Divider from "@material-ui/core/Divider";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import {
  chartTypes,
  echartTypes,
  ChartTypeModel,
  ChartBuilderChartTypeProps,
} from "app/modules/chart-module/routes/chart-type/data";

export function ChartBuilderChartType(props: ChartBuilderChartTypeProps) {
  useTitle("DX DataXplorer - Chart Type");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const chartType = useStoreState((state) => state.charts.chartType.value);
  const dataset = useStoreState((state) => state.charts.dataset.value);
  const setChartType = useStoreActions(
    (actions) => actions.charts.chartType.setValue
  );
  const clearMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Chart Type component is rendered, we are at step 2.
    setActivePanels(2);
  }, []);

  const onChartTypeChange =
    (chartTypeId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      clearMapping();
      setChartType(chartType === chartTypeId ? null : chartTypeId);
    };

  if (dataset === null && !props.loading) {
    history.push(`/chart/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <Grid
          container
          spacing={2}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <Grid container item spacing={2}>
            {echartTypes.map((ct: ChartTypeModel) => (
              <Grid item xs={12} sm={6} md={4} key={ct.id}>
                <div
                  onClick={onChartTypeChange(ct.id)}
                  css={`
                    width: 100%;
                    height: 64px;
                    display: flex;
                    padding: 0 15px;
                    user-select: none;
                    border-radius: 8px;
                    flex-direction: row;
                    align-items: center;
                    background: ${chartType === ct.id ? "#cfd4da" : "#dfe3e6"};
                    border: 1px solid
                      ${chartType === ct.id ? "#262c34" : "#dfe3e6"};

                    &:hover {
                      cursor: pointer;
                      background: #cfd4da;
                      border-color: #262c34;
                    }
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
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {ct.label}
                    </div>
                    <div
                      css={`
                        font-size: 12px;
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {ct.categories.join(", ")}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          <Divider
            css={`
              margin: 8px 0 8px 8px;
              width: calc(100% - 16px);
            `}
          />
          <Grid container item spacing={2}>
            {chartTypes.map((ct: ChartTypeModel) => (
              <Grid item xs={12} sm={6} md={4} key={ct.id}>
                <div
                  onClick={onChartTypeChange(ct.id)}
                  css={`
                    width: 100%;
                    height: 64px;
                    display: flex;
                    padding: 0 15px;
                    user-select: none;
                    border-radius: 8px;
                    flex-direction: row;
                    align-items: center;
                    background: ${chartType === ct.id ? "#cfd4da" : "#dfe3e6"};
                    border: 1px solid
                      ${chartType === ct.id ? "#262c34" : "#dfe3e6"};

                    &:hover {
                      cursor: pointer;
                      background: #cfd4da;
                      border-color: #262c34;
                    }
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
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {ct.label}
                    </div>
                    <div
                      css={`
                        font-size: 12px;
                        font-family: "Inter", "Helvetica Neue", sans-serif;
                      `}
                    >
                      {ct.categories.join(", ")}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
