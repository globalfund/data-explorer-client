import React from "react";
import { ReactComponent as GeomapChartPlaceholder } from "app/modules/chart-module/assets/geomapPlaceholder.svg";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ToolboxNavType } from "../toolbox/views/steps/navbar";
import { ReactComponent as LogoIcon } from "app/modules/report-module/asset/logo.svg";
import { useStoreState } from "app/state/store/hooks";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import { get } from "lodash";
import { DEFAULT_DATASETS } from "../toolbox/views/steps/panels-content/SelectDataset";

const chartPlaceholderImages = [
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

export default function ChartPlaceholder() {
  const dataset = useStoreState((state) => state.charts.dataset.value);
  const chartType = useStoreState((state) => state.charts.chartType.value);
  const activePanels = useStoreState(
    (state) => state.charts.activePanels.value
  );

  const datasetsFromApi = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        DEFAULT_DATASETS
      ) as DatasetListItemAPIModel[]
  );

  const datasetName = datasetsFromApi.find((d) => d.id === dataset)?.name;
  const getPlaceholder = () => {
    const placeholder = chartPlaceholderImages.find(
      (chartPlaceholder) => chartPlaceholder.id === chartType
    );
    return placeholder?.placeholder;
  };

  const displayPlaceholder = () => {
    switch (activePanels) {
      case "selectDataset":
        return (
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
              <p>Start building your interactive chart</p>
              <p>
                Please start by <b>selecting a dataset</b> in the right hand
                side panel
              </p>
            </div>
          </>
        );
      case "chart":
        return (
          <>
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
                      <div key={`${"index" + index}`}>
                        <div
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
                      </div>
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
          </>
        );
      case "mapping":
        return (
          <>
            <div
              css={`
                position: relative;
              `}
            >
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
                    <div key={`${"index" + index}`}>
                      <div
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
                    </div>
                  ))}
                </div>
              </div>
              <div
                css={`
                  height: 20px;
                `}
              />
              <div>{getPlaceholder()}</div>
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
                  Now, select your <b>dimensions</b> for each field, this task
                  can be done manually
                </p>
                <p>
                  <p>
                    or using<b>auto mapping with AI</b> to get an accurate
                    representation of your data.
                  </p>
                  <br />
                  <p>
                    Pick your option, but remember, always keep it simple and
                    understandable!
                  </p>
                </p>
              </div>
            </div>
          </>
        );

      default:
        return;
    }
  };
  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>{displayPlaceholder()}</div>
    </div>
  );
}
