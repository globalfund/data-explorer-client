import React from "react";
import { useStoreState } from "app/state/store/hooks";
import { PageLoader } from "app/modules/common/page-loader";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";

interface Props {
  visualOptions: any;
  renderedChart: string;
  setRawViz?: React.Dispatch<any>;
  setVisualOptions: (value: any) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function DataThemesCommonChart(props: Props) {
  const domRef = React.useRef<HTMLDivElement>(null);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );

  useUpdateEffectOnce(() => {
    if (
      props.containerRef.current &&
      props.visualOptions[activeTabIndex][activeVizIndex].width ===
        CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...props.visualOptions];
      tmpVisualOptions[activeTabIndex][activeVizIndex] = {
        ...props.visualOptions[activeTabIndex][activeVizIndex],
        width: props.containerRef.current.clientWidth,
      };
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [props.containerRef]);

  React.useEffect(() => {
    if (domRef && domRef.current) {
      try {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
      } catch (e) {}
      try {
        const element = document.createElement("div");
        element.innerHTML = props.renderedChart.trim();
        const newRawViz = domRef.current.appendChild(
          element.firstChild || element
        );
        props.setRawViz && props.setRawViz(newRawViz);
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [props.renderedChart]);

  return (
    <>
      <div
        id="extra-loader"
        css={`
          display: none;
        `}
      >
        <PageLoader />
      </div>
      <div
        ref={domRef}
        css={`
          overflow-x: auto;
          margin-top: 40px;

          * {
            font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
          }
        `}
      />
    </>
  );
}
