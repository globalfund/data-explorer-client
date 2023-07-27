import React from "react";
import get from "lodash/get";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { filter, isEmpty, uniqueId } from "lodash";
import ToolboxSubheader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";
import { Button } from "@material-ui/core";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  getTypeName,
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
import { handleReplaceLocalMapping } from "app/modules/chart-module/routes/mapping/utils";
import { ReactComponent as DateIcon } from "app/modules/chart-module/assets/date.svg";

interface ChartToolBoxMappingProps {
  dataTypes: any;
  dimensions: any[];
}

const typeIcon = {
  string: <p>Aa</p>,
  number: <p>#</p>,
  date: <DateIcon />,
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
  const [nonStaticDimensions, setNonStaticDimensions] = React.useState(
    filter(props.dimensions, (d: any) => !d.static).map((d: any) => {
      return {
        ...d,
        mappedValue: null,
        mapValuesDisplayed: true,
      };
    })
  );

  const mapping = useStoreState((state) => state.charts.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );

  const handleButtonToggle = (id: string) => {
    setNonStaticDimensions((prev) => {
      const tempPrev = prev.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            mapValuesDisplayed: !data.mapValuesDisplayed,
          };
        }
        return data;
      });
      return tempPrev;
    });
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

  React.useEffect(() => {
    setNonStaticDimensions(
      filter(props.dimensions, (d: any) => !d.static).map((d: any) => {
        return {
          ...d,
          mappedValue: null,
          mapValuesDisplayed: true,
        };
      })
    );
  }, [props.dimensions]);

  React.useEffect(() => {
    const updatedNonStaticDimensions = [...nonStaticDimensions];
    Object.keys(mapping).forEach((dimensionId: string) => {
      const nonStaticDimensionIndex = updatedNonStaticDimensions.findIndex(
        (d) => d.id === dimensionId
      );
      if (nonStaticDimensionIndex !== -1) {
        updatedNonStaticDimensions[nonStaticDimensionIndex].mappedValue =
          mapping[dimensionId].value[0];
      }
    });
    setNonStaticDimensions(updatedNonStaticDimensions);
  }, [mapping]);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
      `}
    >
      <ToolboxSubheader name="Mapping" level={3} />
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
          {nonStaticDimensions.map((dimension: any) => (
            <div
              key={`${dimension.id}`}
              css={`
                width: 100%;
                padding: 16px 16px 8px 16px;
                height: 100%;

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
                      gap: 5px;
                      p {
                        margin: 0;
                      }
                      svg {
                        margin-top: 6px;
                      }
                    `}
                  >
                    {dimension.validTypes.map(
                      (type: "string" | "number" | "date") => (
                        <p key={type}>{typeIcon[type]}</p>
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
                    onClick={() => handleButtonToggle(dimension.id)}
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
                      border: ${dimension.mappedValue &&
                      !dimension.mapValuesDisplayed
                        ? "none"
                        : "0.722px dashed #262c34"};
                      background: ${dimension.mappedValue &&
                      !dimension.mapValuesDisplayed
                        ? "#262c34"
                        : "#dfe3e5"};
                      text-transform: capitalize;
                      justify-content: space-between;
                      color: ${dimension.mappedValue &&
                      !dimension.mapValuesDisplayed
                        ? "#fff"
                        : "#868e96"};

                      &:hover {
                        background: #262c34;
                        color: #fff;
                        svg {
                          path {
                            fill: #fff;
                          }
                        }
                      }

                      svg {
                        margin-left: 10px;
                        transition: all 0.2s ease-in-out;
                        transform: rotate(
                          ${dimension.mapValuesDisplayed ? "180" : "0"}deg
                        );
                        > path {
                          fill: ${dimension.mappedValue &&
                          !dimension.mapValuesDisplayed
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
                    max-height: 253px;

                    ::-webkit-scrollbar {
                      width: 0px;
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
                          key={dataTypeName}
                          testId={`mapping-item-${dataTypeName}`}
                          type={type}
                          index={index}
                          marginBottom="16px"
                          dataTypeName={dataTypeName}
                          dimension={dimension}
                          replaceDimension={replaceDimension}
                          setNonStaticDimensions={setNonStaticDimensions}
                          dataTypes={props.dataTypes}
                          nonStaticDimensionsIndex={dimension.id}
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
  nonStaticDimensionsIndex: number;
  setNonStaticDimensions: React.Dispatch<React.SetStateAction<any[]>>;

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
  const { index, dimension, dataTypes } = props;

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
    const columnDataType = getTypeName(dataTypes[item.id as any]);

    const isValid =
      dimension.validTypes?.length === 0 ||
      dimension.validTypes?.includes(columnDataType);
    if (isValid) {
      props.setNonStaticDimensions((prev) => {
        const tempPrev = prev.map((data) => {
          if (data.id === props.nonStaticDimensionsIndex) {
            return {
              ...data,
              mappedValue: props.dataTypeName,
              mapValuesDisplayed: false,
            };
          }
          return data;
        });
        return tempPrev;
      });

      const mappingFromStorage = get(
        JSON.parse(
          sessionStorage.getItem("[EasyPeasyStore][0][charts.mapping]") ?? ""
        ),
        "data.value",
        {}
      ) as { [key: string]: any };

      const localDimensionMapping = get(mappingFromStorage, dimension.id, {});
      const defaulAggregation = dimension.aggregation
        ? getDefaultDimensionAggregation(dimension, dataTypes[item.id as any])
        : null;

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
    }
  };

  return (
    <div
      key={props.dataTypeName}
      id={props.testId}
      css={`
        height: 31px;
        display: flex;
        gap: 13px;
        min-height: 31px;
        position: relative;
        padding-left: 16px;
        align-items: center;
        border-radius: 25px;
        z-index: 10;
        transform: translate(0px, 0px);
        margin-bottom: ${props.marginBottom};
        color: #262c34;
        background: ${props.backgroundColor ?? "#cfd4da"};
        ${props.dimension.mappedValue === props.dataTypeName &&
        "background: #262c34; color: #fff;"}
        p {
          font-family: "Roboto", sans-serif;
          font-size: 14px;
        }
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
      <p>{typeIcon[props.type]}</p>

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
