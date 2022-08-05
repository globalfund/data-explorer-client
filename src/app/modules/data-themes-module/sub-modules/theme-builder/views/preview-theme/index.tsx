/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
// @ts-ignore
import { chart as rawChart } from "@rawgraphs/rawgraphs-core";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import Skeleton from "@material-ui/lab/Skeleton";
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesUtilsPopover } from "app/modules/data-themes-module/components/utils-popover";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { RichEditor } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text/RichEditor";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { DataThemesBuilderPreviewThemeProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme/data";

export function DataThemesBuilderPreviewTheme(
  props: DataThemesBuilderPreviewThemeProps
) {
  useTitle("Data Themes - Preview Theme");

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { page } = useParams<{ page: string }>();
  const history = useHistory();

  const { visualOptions, setVisualOptions } = props;

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDeleteItem() {
    props.deleteViz(props.tabIndex, props.vizIndex);
    handleClose();
  }

  function handleDuplicateItem() {
    props.duplicateViz(props.tabIndex, props.vizIndex);
    handleClose();
  }

  function handleEdit() {
    if (vizIsTextContent[props.tabIndex][props.vizIndex]) {
      handleTextClick();
    } else {
      handleVizClick();
    }
  }

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      visualOptions[props.tabIndex][props.vizIndex].width ===
        CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...visualOptions];
      tmpVisualOptions[props.tabIndex][props.vizIndex] = {
        ...visualOptions[props.tabIndex][props.vizIndex],
        width: containerRef.current.clientWidth,
      };
      setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (
      !vizIsTextContent[props.tabIndex][props.vizIndex] &&
      domRef &&
      domRef.current &&
      !isEmpty(mapping[props.tabIndex][props.vizIndex]) &&
      !isEmpty(visualOptions[props.tabIndex][props.vizIndex])
    ) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping[props.tabIndex][props.vizIndex],
          visualOptions: visualOptions[props.tabIndex][props.vizIndex],
          dataTypes: props.currentChartData.dataTypes,
        });

        const vizData = viz._getVizData();

        const loader = document.getElementById(
          `chart-placeholder-${props.tabIndex}-${props.vizIndex}`
        );

        new Promise((resolve, reject) => {
          try {
            if (loader) {
              loader.style.display = "flex";
            }
            const rawViz = viz.renderToDOM(domRef.current, vizData);
            resolve(1);
          } catch (e) {
            if (process.env.NODE_ENV === "development") {
              console.log("chart error", e);
              reject(0);
            }
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
  }, [props.currentChart, props.currentChartData, mapping, visualOptions]);

  const handleVizClick = () => {
    if (page === "new" || props.editable) {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/customize`);
    }
  };

  const handleTextClick = () => {
    if (page === "new" || props.editable) {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/text`);
    }
  };

  return (
    <div css={props.vizIndex === 0 ? commonStyles.container : ""}>
      <div
        id={`chart-placeholder-${props.tabIndex}-${props.vizIndex}`}
        css={`
          display: flex;
          padding: 0 24px;
          margin-top: 20px;
          max-width: 1280px;
          align-items: center;
          align-self: flex-start;
          justify-content: center;
          width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 24px);
          height: ${visualOptions[props.tabIndex][props.vizIndex].height}px;

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
      {vizIsTextContent[props.tabIndex][props.vizIndex] ? (
        <div
          css={commonStyles.previewInnercontainer(props.editable)}
          onClick={() => {
            handleTextClick();
          }}
        >
          {props.editable && <div onClick={handleClick} />}
          <RichEditor
            editMode={false}
            tabIndex={props.tabIndex}
            vizIndex={props.vizIndex}
          />
        </div>
      ) : (
        <div css={commonStyles.previewInnercontainer(props.editable)}>
          {props.editable && <div onClick={handleClick} />}
          <div
            ref={containerRef}
            css={`
              width: calc(100% - 24px);
            `}
          >
            <div
              onClick={() => {
                handleVizClick();
              }}
              ref={domRef}
              css={`
                overflow-x: auto;

                * {
                  font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
                }
              `}
            />
          </div>
        </div>
      )}
      <DataThemesUtilsPopover
        anchorEl={anchorEl}
        onEdit={handleEdit}
        handleClose={handleClose}
        deleteItem={handleDeleteItem}
        duplicateItem={handleDuplicateItem}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      />
    </div>
  );
}
