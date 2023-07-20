import React from "react";
import get from "lodash/get";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { filter, isEmpty, uniqueId } from "lodash";
import SubHeader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";
import { Button } from "@material-ui/core";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  getTypeName,
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
import { handleReplaceLocalMapping } from "app/modules/chart-module/routes/mapping/utils";

interface ChartToolBoxMappingProps {
  dataTypes: any;
  dimensions: any[];
}

const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};

export const AGGREGATIONS_LABELS = {
  count: "Count",
  mean: "Average",
  median: "Median",
  max: "Max",
  min: "Min",
  countDistinct: "Count unique",
  sum: "Sum",
  csv: "CSV",
  csvDistinct: "CSV (unique)",
};

export function ChartToolBoxMapping(props: ChartToolBoxMappingProps) {
  const nonStaticDimensions = filter(
    props.dimensions,
    (d: any) => !d.static
  ).map((d: any) => {
    return {
      ...d,
      mappedValue: null,
      mapValuesDisplayed: true,
    };
  });
  const [mapValuesDisplayed, setMapValuesDisplayed] = React.useState(true);
  const [mappedValue, setMappedValue] = React.useState<any>(null);
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );
  const handleButtonToggle = () => {
    setMapValuesDisplayed(!mapValuesDisplayed);
  };

  const replaceDimension = React.useCallback(
    (
      fromDimension: string,
      toDimension: string,
      fromIndex: number,
      toIndex: number
    ) => {
      const mappingFromStorage = get(
        JSON.parse(
          sessionStorage.getItem("[EasyPeasyStore][0][charts.mapping]") ?? ""
        ),
        "data.value",
        {}
      ) as { [key: string]: any };
      const nextId = uniqueId();
      setMapping(
        handleReplaceLocalMapping(
          nextId,
          isEmpty(mapping) ? mappingFromStorage : mapping,
          fromDimension,
          toDimension,
          fromIndex,
          toIndex,
          props.dimensions,
          props.dataTypes
        )
      );
    },
    [mapping, props.dataTypes, props.dimensions, setMapping]
  );

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
      `}
    >
      <SubHeader name="Mapping" level={3} />

      <div
        css={`
          width: 90%;
          margin: auto;
        `}
      >
        <div
          css={`
            z-index: 1030;
            position: relative;
          `}
        >
          {nonStaticDimensions.map((dimension: any, index) => (
            <div
              key={`${dimension.id + index}`}
              css={`
                width: 100%;
                padding: 16px;
                min-height: 89px;
                height: ${mapValuesDisplayed ? "344px" : "100%"};
                overflow-y: hidden;
                border-radius: 11px;
                background: #dfe3e5;
                margin-top: 16px;
              `}
            >
              <div>
                <div
                  css={`
                    width: 100%;
                    display: flex;
                    margin-bottom: 4px;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    font-family: "Gotham Narrow", sans-serif; ;
                  `}
                >
                  <div
                    css={`
                      width: 72px;
                      opacity: 0.5;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    `}
                  >
                    {dimension.validTypes.map(
                      (type: "string" | "number" | "date") => (
                        <span
                          key={type}
                          css={`
                            width: 16px;
                            height: 16px;
                            background-size: contain;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-image: url(${typeIcon[type]});

                            &:not(:last-child) {
                              margin-right: 8px;
                            }
                          `}
                        />
                      )
                    )}
                  </div>
                  <div
                    css={`
                      font-size: 14px;
                      color: #262c34;
                    `}
                  >
                    <b> {dimension.name}</b>
                  </div>
                  <div
                    css={`
                      width: 72px;
                      color: #ef1320;
                      font-size: 32px;
                      text-align: right;
                      margin-bottom: -12px;
                      visibility: ${dimension.required ? "visible" : "hidden"};
                    `}
                  >
                    *
                  </div>
                </div>
                <div
                  css={`
                    > label {
                      margin: 0;
                      width: 100%;
                      display: flex;
                      justify-content: space-between;

                      > span {
                        font-size: 14px;
                      }
                    }
                  `}
                >
                  <Button
                    disableTouchRipple
                    onClick={handleButtonToggle}
                    css={`
                      width: 100%;
                      display: flex;
                      font-size: 14px;
                      padding: 12px 16px;
                      margin-bottom: 16px;
                      margin-top: 6px;
                      flex-direction: row;
                      height: 31px;
                      border-radius: 36px;
                      border: ${mappedValue && !mapValuesDisplayed
                        ? "none"
                        : "0.722px dashed #262c34"};
                      background: ${mappedValue && !mapValuesDisplayed
                        ? "#262c34"
                        : "#dfe3e5"};
                      text-transform: capitalize;
                      justify-content: space-between;
                      color: ${mappedValue && !mapValuesDisplayed
                        ? "#fff"
                        : "#868e96"};

                      &:hover {
                        background: #262c34;
                        color: #fff;
                      }

                      svg {
                        margin-left: 10px;
                        transition: all 0.2s ease-in-out;
                        transform: rotate(
                          ${mapValuesDisplayed ? "180" : "0"}deg
                        );
                        > path {
                          fill: ${mappedValue && !mapValuesDisplayed
                            ? "#fff"
                            : "#262c34"};
                        }
                      }
                    `}
                  >
                    <span
                      css={`
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-family: "GothamNarrow-Book", "Helvetica Neue",
                          sans-serif;
                      `}
                    >
                      {dimension.mappedValue || "Select dimension"}
                    </span>
                    <ArrowDropUpIcon />
                  </Button>
                </div>
              </div>

              {dimension.mapValuesDisplayed && (
                <div
                  css={`
                    height: 100%;
                    overflow-y: scroll;
                    padding-bottom: 80px;

                    ::-webkit-scrollbar {
                      visibility: hidden;
                    }
                  `}
                >
                  {Object.keys(props.dataTypes)?.map(
                    (dataTypeName: string, index: number) => {
                      let type = props.dataTypes[dataTypeName];
                      if (typeof props.dataTypes[dataTypeName] === "object") {
                        type = props.dataTypes[dataTypeName].type;
                      }
                      return (
                        <ChartToolBoxMappingItem
                          setMapValuesDisplayed={setMapValuesDisplayed}
                          mappedValue={mappedValue}
                          setMappedValue={setMappedValue}
                          testId={`mapping-item-${dataTypeName}`}
                          type={type}
                          index={index}
                          key={dataTypeName}
                          marginBottom="16px"
                          dataTypeName={dataTypeName}
                          dimension={dimension}
                          replaceDimension={replaceDimension}
                          dataTypes={props.dataTypes}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ChartToolBoxMappingItemProps {
  index: number;
  dimension?: any;
  testId: string;
  dataTypeName: string;
  dataTypes: any[];
  marginBottom: string;
  backgroundColor?: string;
  onDeleteItem?: () => void;
  type: "string" | "number" | "date";
  relatedAggregation?: any;
  aggregators?: any;
  isValid?: boolean;
  mappedValue: string;
  setMapValuesDisplayed: (value: React.SetStateAction<boolean>) => void;
  setMappedValue: (value: React.SetStateAction<any>) => void;
  onChangeAggregation?: (index: number, value: any) => void;
  onChangeDimension?: (index: number, item: any) => void;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
  replaceDimension: (
    fromDimension: string,
    toDimension: string,
    fromIndex: number,
    toIndex: number,
    multiple?: boolean
  ) => void;
}

export function ChartToolBoxMappingItem(props: ChartToolBoxMappingItemProps) {
  const {
    index,
    dimension,

    replaceDimension,
    dataTypes,
  } = props;

  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );

  const item = dimension
    ? {
        type: "card",
        index,
        id: props.dataTypeName,
        dimensionId: dimension.id,
      }
    : { id: props.dataTypeName, type: "column" };

  const handleClick = () => {
    props.setMapValuesDisplayed(false);
    props.setMappedValue(props.dataTypeName);

    const mappingFromStorage = get(
      JSON.parse(
        sessionStorage.getItem("[EasyPeasyStore][0][charts.mapping]") ?? ""
      ),
      "data.value",
      {}
    ) as { [key: string]: any };

    const localDimensionMapping = get(mappingFromStorage, dimension.id, {});
    if (item.type === "column") {
      const defaulAggregation = dimension.aggregation
        ? getDefaultDimensionAggregation(dimension, dataTypes[item.id as any])
        : null;
      const columnDataType = getTypeName(dataTypes[item.id as any]);
      const isValid =
        dimension.validTypes?.length === 0 ||
        dimension.validTypes?.includes(columnDataType);
      setMapping({
        [dimension.id]: {
          ids: (localDimensionMapping.ids || []).concat(uniqueId()),
          value: [...(localDimensionMapping.value || []), item.id],
          isValid: isValid,
          mappedType: columnDataType,
          config: dimension.aggregation
            ? {
                aggregation: [
                  ...(get(localDimensionMapping, "config.aggregation") || []),
                  defaulAggregation,
                ],
              }
            : undefined,
        },
      });
    } else if (item.dimensionId !== dimension.id) {
      replaceDimension(
        item.dimensionId,
        dimension.id,
        item.index as number,
        localDimensionMapping.value ? localDimensionMapping.value.length : 0
      );
    }
  };
  return (
    <div
      key={props.dataTypeName}
      id={props.testId}
      css={`
        height: 31px;
        display: flex;
        min-height: 31px;
        position: relative;
        padding-left: 16px;
        align-items: center;
        border-radius: 25px;
        z-index: 10;
        transform: translate(0px, 0px);
        margin-bottom: ${props.marginBottom};
        background: ${props.backgroundColor ?? "#cfd4da"};
        ${props.mappedValue === props.dataTypeName &&
        "background: #262c34; color: #fff;"}
        &:last-child {
          margin-bottom: 0px;
        }
        &:hover {
          background: #262c34;
          color: #fff;
          svg {
            path {
              fill: #fff;
            }
          }
        }
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      <div
        css={`
          width: 16px;
          height: 16px;
          min-width: 16px;
          margin-right: 13px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${typeIcon[props.type]});
        `}
      />

      <div
        css={`
          overflow: clip;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: calc(100% - 40px);
          text-transform: capitalize;
        `}
      >
        {props.dataTypeName}
      </div>
    </div>
  );
}
