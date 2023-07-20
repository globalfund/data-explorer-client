/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ChartBuilderChartTypeProps } from "app/modules/chart-module/routes/chart-type/data";
import { ReactComponent as LogoIcon } from "app/modules/report-module/asset/logo.svg";
import { ReactComponent as GeomapChartPlaceholder } from "app/modules/chart-module/assets/geomapPlaceholder.svg";
import { get } from "lodash";
import { DEFAULT_DATASETS } from "../../components/toolbox/views/steps/panels-content/SelectDataset";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";

export function ChartBuilderChartType(props: ChartBuilderChartTypeProps) {
  useTitle("DX DataXplorer - Chart Type");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const chartType = useStoreState((state) => state.charts.chartType.value);
  const dataset = useStoreState((state) => state.charts.dataset.value);

  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Chart Type component is rendered, we are at step 2.
    setActivePanels(2);
  }, []);

  const datasetsFromApi = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        DEFAULT_DATASETS
      ) as DatasetListItemAPIModel[]
  );
  const datasetName = datasetsFromApi.find((d) => d.id === dataset)?.name;

  if (dataset === null && !props.loading) {
    history.push(`/chart/${page}/data`);
  }
  const chartPlaceholders = [
    {
      id: "echartsBarchart",
      placeholder: <div></div>,
    },
    {
      id: "echartsGeomap",
      placeholder: <GeomapChartPlaceholder />,
    },
    {
      id: "echartsLinechart",
      placeholder: <div></div>,
    },
    {
      id: "echartsSankey",
      placeholder: <div></div>,
    },
    {
      id: "echartsTreemap",
      placeholder: <div></div>,
    },
    {
      id: "bigNumber",
      placeholder: <div></div>,
    },
  ];
  const getPlaceholder = () => {
    const placeholder = chartPlaceholders.find(
      (chartPlaceholder) => chartPlaceholder.id === chartType
    );
    return placeholder?.placeholder;
  };

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        {chartType === null && (
          <>
            <div
              css={`
                height: 209px;
              `}
            />
            <div
              css={`
                width: 100%;
                height: 362px;
                font-family: "Gotham Narrow", sans-serif;
                text-align: center;
                line-height: normal;
                font-size: 14px;
                p {
                  margin: 0;
                }
              `}
            >
              <LogoIcon />
              <div
                css={`
                  height: 42px;
                `}
              />
              <p>
                {" "}
                Next, select a <b>chart type</b> to represent your data,
              </p>
              <p>
                Pick your option, but remember, always keep it simple and
                understandable!
              </p>
            </div>
          </>
        )}
        {chartType !== null && (
          <div>
            <div>
              <p
                css={`
                  font-family: "Gotham Narrow", sans-serif;
                  font-size: 12px;
                  margin-bottom: 0px;
                `}
              >
                <b>{datasetName}</b>
              </p>
              <div
                css={`
                  display: flex;
                  gap: 4px;
                  width: 250px;
                  align-items: center;
                `}
              >
                {[...Array(5).keys()].map((_, index) => (
                  <>
                    <div
                      key={`${"index" + index}`}
                      css={`
                        border-radius: 20px;
                        background: linear-gradient(
                            0deg,
                            #e8eef5 0%,
                            #e8eef5 100%
                          ),
                          #343a40;
                        width: 47px;
                        height: 6px;
                      `}
                    ></div>
                    <p>{index === 0 && "Nil"}</p>
                  </>
                ))}
              </div>
            </div>
            <div
              css={`
                height: 20px;
              `}
            />
            <div>{getPlaceholder()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
