import React from "react";
import { useStoreState } from "app/state/store/hooks";
import { ChartLoader } from "app/modules/common/page-loader";
import { ReactComponent as LogoIcon } from "app/modules/report-module/asset/logo.svg";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import GeomapPlaceholder from "app/modules/chart-module/components/placeholder/geomapPlaceholder";
import { ReactComponent as LinechartPlaceholderImage } from "app/modules/chart-module/assets/lineChartPlaceholder.svg";
import { ReactComponent as BigNumberPlaceholderImage } from "app/modules/chart-module/assets/bigNumberPlaceholder.svg";
import { ReactComponent as BarChartPlaceholderImage } from "app/modules/chart-module/assets/barChartPlaceholder.svg";
import { ReactComponent as SankeyPlaceholderImage } from "app/modules/chart-module/assets/sankeyPlaceholder.svg";
import { ReactComponent as TreemapPlaceholderImage } from "app/modules/chart-module/assets/treemapPlaceholder.svg";

export default function ChartPlaceholder(props: {
  datasetName?: string;
  loading?: boolean;
}) {
  const chartType = useStoreState((state) => state.charts.chartType.value);
  const activePanels = useStoreState(
    (state) => state.charts.activePanels.value
  );

  const chartPlaceholders = [
    {
      id: "echartsBarchart",
      placeholder: (
        <div
          css={`
            padding-right: 60px;
            svg {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={`
              height: 100px;
            `}
          />
          <BarChartPlaceholderImage />
        </div>
      ),
    },
    {
      id: "echartsGeomap",
      placeholder: (
        <GeomapPlaceholder datasetName={props.datasetName as string} />
      ),
    },
    {
      id: "echartsLinechart",
      placeholder: (
        <div
          css={`
            padding-right: 60px;

            svg {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={`
              height: 100px;
            `}
          />
          <LinechartPlaceholderImage />
        </div>
      ),
    },
    {
      id: "echartsSankey",
      placeholder: (
        <div
          css={`
            padding-right: 60px;

            svg {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={`
              height: 100px;
            `}
          />
          <SankeyPlaceholderImage />
        </div>
      ),
    },
    {
      id: "echartsTreemap",
      placeholder: (
        <div
          css={`
            padding-right: 60px;

            svg {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={`
              height: 100px;
            `}
          />
          <TreemapPlaceholderImage />
        </div>
      ),
    },
    {
      id: "bigNumber",
      placeholder: (
        <div
          css={`
            padding-right: 60px;

            svg {
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={`
              height: 100px;
            `}
          />
          <BigNumberPlaceholderImage />
        </div>
      ),
    },
  ];

  const getChartPlaceholder = () => {
    const placeholder = chartPlaceholders.find(
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
            {chartType !== null && getChartPlaceholder()}
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
              {!props.loading && <div>{getChartPlaceholder()}</div>}
              <div
                css={`
                  position: absolute;
                  top: 30%;
                  left: calc(50% - 234px);
                  width: 469px;
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
                {props.loading && (
                  <>
                    <div>
                      <p>Mapping..</p>
                      <ChartLoader />
                    </div>
                  </>
                )}
                {!props.loading && (
                  <>
                    <p>
                      Now, select your <b>dimensions</b> for each field, this
                      task can be done manually
                    </p>
                    <p>
                      <p>
                        or using <b>auto mapping with AI</b> to get an accurate
                        representation of your data.
                      </p>
                      <br />
                      <p>
                        Pick your option, but remember, always keep it simple
                        and understandable!
                      </p>
                    </p>
                  </>
                )}
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
