/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
import { Redirect, useHistory, useParams } from "react-router-dom";
/* project */
import Skeleton from "@material-ui/lab/Skeleton";
import { PageLoader } from "app/modules/common/page-loader";
import { CHART_DEFAULT_WIDTH } from "app/modules/chart-module/data";
import { useDataThemesEchart } from "app/hooks/useDataThemesEchart";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import {
  ChartBuilderPreviewThemeProps,
  ChartBuilderPreviewThemePageProps,
} from "app/modules/chart-module/routes/preview-theme/data";

export function ChartBuilderPreviewThemePage(
  props: ChartBuilderPreviewThemePageProps
) {
  const { page } = useParams<{ page: string }>();

  const activePanels = useStoreState(
    (state) => state.charts.activePanels.value
  );

  if (
    page === "new" &&
    activePanels < 3 &&
    (activePanels > 1 ? !props.validMapping : true)
  ) {
    return <Redirect to="/chart/new/data" />;
  }

  if (props.loading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      {props.renderedCharts[0].map((_, vizIndex) => (
        <ChartBuilderPreviewTheme
          key={Math.random().toString(36).substring(7)}
          editable={props.isEditMode}
          loading={props.loading}
          visualOptions={props.visualOptions}
          setVisualOptions={props.setVisualOptions}
          renderedChart={props.renderedCharts[0][vizIndex]}
          renderedChartSsr={props.renderedChartsSsr[0][vizIndex]}
          renderedChartMappedData={props.renderedChartsMappedData[0][vizIndex]}
        />
      ))}
    </React.Fragment>
  );
}

export function ChartBuilderPreviewTheme(props: ChartBuilderPreviewThemeProps) {
  useTitle("DX DataXplorer - Preview Chart");

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { page } = useParams<{ page: string }>();
  const history = useHistory();
  const { render } = useDataThemesEchart();

  const { visualOptions, setVisualOptions } = props;

  const mapping = useStoreState((state) => state.charts.mapping.value);
  const selectedChartType = useStoreState(
    (state) => state.charts.chartType.value
  );

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      get(visualOptions, "width", 100) === CHART_DEFAULT_WIDTH
    ) {
      const tmpVisualOptions = {
        ...visualOptions,
        width: containerRef.current.clientWidth,
      };
      setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (
      domRef &&
      domRef.current &&
      !isEmpty(mapping) &&
      !isEmpty(visualOptions)
    ) {
      try {
        const loader = document.getElementById("chart-placeholder");

        new Promise((resolve, reject) => {
          try {
            if (loader) {
              loader.style.display = "flex";
            }
            if (props.renderedChartSsr) {
              const element = document.createElement("div");
              element.innerHTML = props.renderedChart.trim();
              // @ts-ignore
              domRef.current.appendChild(element.firstChild || element);
            } else {
              render(
                props.renderedChartMappedData,
                // @ts-ignore
                domRef.current,
                selectedChartType || "echartsBarchart",
                visualOptions
              );
            }
            resolve(1);
          } catch (e) {
            if (process.env.NODE_ENV === "development") {
              console.log("chart error", e);
            }

            if (loader) {
              loader.style.display = "none";
            }
            reject(0);
          }
        })
          .then(() => {
            if (loader) {
              loader.style.display = "none";
            }
          })
          .catch(() => {
            if (loader) {
              loader.style.display = "none";
            }
          });
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [
    mapping,
    visualOptions,
    props.renderedChart,
    props.renderedChartSsr,
    props.renderedChartMappedData,
  ]);

  const handleVizClick = () => {
    if (page === "new" || props.editable) {
      history.push(`/chart/${page}/customize`);
    }
  };

  return (
    <div css={commonStyles.container}>
      <div
        id="chart-placeholder"
        css={`
          display: flex;
          padding: 0 24px;
          margin-top: 20px;
          max-width: 1280px;
          align-items: center;
          align-self: flex-start;
          justify-content: center;
          height: ${get(visualOptions, "height", 100)}px;
          width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 24px);

          @media (max-width: 1280px) {
            width: calc(100vw - 400px);
          }

          .MuiSkeleton-wave::after {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(223, 227, 230, 1),
              transparent
            );
          }

          .MuiSkeleton-root {
            background: transparent;
          }
        `}
      >
        <Skeleton animation="wave" variant="rect" width="100%" height="100%" />
      </div>

      <div css={commonStyles.previewInnercontainer(props.editable)}>
        <div
          ref={containerRef}
          css={`
            position: relative;
            width: calc(100% - 24px);
          `}
        >
          <div
            ref={domRef}
            onClick={handleVizClick}
            id="common-chart-render-container"
            css={`
              ${props.renderedChartSsr
                ? `overflow-x: auto;`
                : `height: ${get(visualOptions, "height", 500)}px;`}

              * {
                font-family: "Inter", "Helvetica Neue", sans-serif !important;
              }
            `}
          />
        </div>
      </div>
    </div>
  );
}
