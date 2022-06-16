/* third-party */
import React from "react";
import get from "lodash/get";
import map from "lodash/map";
import find from "lodash/find";
import { useStoreState } from "app/state/store/hooks";
// @ts-ignore
import { getOptionsConfig, getEnabledOptions } from "@rawgraphs/rawgraphs-core";
/* project */
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import {
  chartTypes,
  ChartTypeModel,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/chart-type/data";
import {
  getDefaultForRepeat,
  getPartialMappedData,
  getPartialMapping,
  WrapControlComponent,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/utils";

interface DataThemesToolBoxCustomizeProps {
  mappedData?: any;
  currentChart?: any;
  visualOptions?: any;
  currentChartData?: any;
  setVisualOptions?: (value: any) => void;
}

export function DataThemesToolBoxCustomize(
  props: DataThemesToolBoxCustomizeProps
) {
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const fChartType = find(
    chartTypes,
    (chartType: ChartTypeModel) =>
      chartType.id === selectedChartType[activeTabIndex][activeVizIndex]
  );

  const optionsConfig = React.useMemo(() => {
    return getOptionsConfig(props.currentChart?.visualOptions);
  }, [props.currentChart]);

  const [collapseStatus, setCollapseStatus] = React.useState(() => {
    const groups = {};
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group;
      if (!groups.hasOwnProperty(group)) {
        // @ts-ignore
        groups[group] = true;
      }
    }
    return groups;
  });

  const enabledOptions = React.useMemo(() => {
    return getEnabledOptions(
      optionsConfig,
      props.visualOptions
        ? props.visualOptions[activeTabIndex][activeVizIndex]
        : {},
      mapping[activeTabIndex][activeVizIndex]
    );
  }, [optionsConfig, props.visualOptions, mapping]);

  const optionsDefinitionsByGroup = React.useMemo(() => {
    let index = 0;
    const groups = {};
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group;
      if (!groups.hasOwnProperty(group) && index === 0) {
        // @ts-ignore
        groups[group] = true;
      }
      index += 1;
    }
    setCollapseStatus(groups);
    return Object.keys(optionsConfig).reduce((acc, optionId) => {
      const option = optionsConfig[optionId];
      const group = option?.group || "";
      // @ts-ignore
      if (!acc[group]) {
        // @ts-ignore
        acc[group] = {};
      }
      // @ts-ignore
      acc[group][optionId] = option;
      return acc;
    }, {});
  }, [optionsConfig]);

  console.log("DataThemesToolBoxCustomize", props.visualOptions);

  return (
    <div
      className="chart-options"
      css={`
        width: 100%;
        display: flex;
        overflow-y: auto;
        padding-right: 15px;
        flex-direction: column;
        max-height: calc(100vh - 456px);

        * {
          font-size: 14px;
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
        }
      `}
    >
      {map(optionsDefinitionsByGroup, (options, groupName) => {
        // @ts-ignore
        const expanded = collapseStatus[groupName];

        return (
          <div
            key={groupName}
            css={`
              width: 100%;
              display: flex;
              padding: 16px 0;
              flex-direction: column;
              border-bottom: 1px solid #cfd4da;
            `}
          >
            <button
              onClick={() =>
                setCollapseStatus({
                  ...collapseStatus,
                  [groupName]: !expanded,
                })
              }
              css={`
                padding: 0;
                width: 100%;
                height: 16px;
                display: flex;
                font-size: 14px;
                cursor: pointer;
                border-style: none;
                flex-direction: row;
                align-items: center;
                background: transparent;
                text-transform: uppercase;
                justify-content: space-between;

                > svg {
                  transform: rotate(${expanded ? "0deg" : "180deg"});
                }
              `}
            >
              {groupName} <TriangleXSIcon />
            </button>
            {expanded && (
              <div
                css={`
                  padding-top: 12px;
                `}
              >
                {map(options, (def: any, optionId: any) => {
                  // repeated options: notice that value is set to a default if undefined
                  // this is caused by changes in shapes of the mapping object
                  // (when a new value is dragged to the dimension that repeats the option)
                  // the same approach is applied in option validation by the raw core lib
                  return def.repeatFor ? (
                    get(
                      mapping[activeTabIndex][activeVizIndex],
                      `[${def.repeatFor}].value`,
                      []
                    ).map((v: any, repeatIndex: number) => (
                      <WrapControlComponent
                        className="chart-option"
                        key={optionId + repeatIndex}
                        repeatIndex={repeatIndex}
                        {...def}
                        optionId={optionId}
                        // error={error?.errors?.[optionId + repeatIndex]}
                        value={
                          props.visualOptions[activeTabIndex][activeVizIndex]?.[
                            optionId
                          ]?.[repeatIndex] ??
                          getDefaultForRepeat(def, repeatIndex)
                        }
                        mapping={
                          def.type === "colorScale"
                            ? getPartialMapping(
                                mapping[activeTabIndex][activeVizIndex],
                                def.repeatFor,
                                repeatIndex
                              )
                            : undefined
                        }
                        chart={
                          def.type === "colorScale"
                            ? props.currentChart
                            : undefined
                        }
                        dataset={
                          def.type === "colorScale"
                            ? props.currentChartData?.dataset
                            : undefined
                        }
                        dataTypes={
                          def.type === "colorScale"
                            ? props.currentChartData?.dataTypes
                            : undefined
                        }
                        visualOptions={
                          def.type === "colorScale"
                            ? props.visualOptions[activeTabIndex][
                                activeVizIndex
                              ]
                            : undefined
                        }
                        mappedData={getPartialMappedData(
                          props.mappedData,
                          def.repeatFor,
                          repeatIndex
                        )}
                        allVisualOptions={props.visualOptions}
                        setVisualOptions={props.setVisualOptions}
                        isEnabled={enabledOptions[optionId]}
                      />
                    ))
                  ) : (
                    <WrapControlComponent
                      className="chart-option"
                      key={optionId}
                      {...def}
                      optionId={optionId}
                      // error={error?.errors?.[optionId]}
                      value={
                        props.visualOptions
                          ? props.visualOptions[activeTabIndex][
                              activeVizIndex
                            ]?.[optionId]
                          : undefined
                      }
                      mapping={
                        def.type === "colorScale"
                          ? mapping[activeTabIndex][activeVizIndex]
                          : undefined
                      }
                      chart={
                        def.type === "colorScale"
                          ? props.currentChart
                          : undefined
                      }
                      dataset={
                        def.type === "colorScale"
                          ? props.currentChartData?.dataset
                          : undefined
                      }
                      dataTypes={
                        def.type === "colorScale"
                          ? props.currentChartData?.dataTypes
                          : undefined
                      }
                      visualOptions={
                        def.type === "colorScale"
                          ? props.visualOptions[activeTabIndex][activeVizIndex]
                          : undefined
                      }
                      mappedData={props.mappedData}
                      allVisualOptions={props.visualOptions}
                      setVisualOptions={props.setVisualOptions}
                      isEnabled={enabledOptions[optionId]}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
