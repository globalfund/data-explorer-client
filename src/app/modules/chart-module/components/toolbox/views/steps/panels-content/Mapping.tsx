import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import { useDebounce } from "react-use";
import { Dropdown } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ChartAPIModel, emptyChartAPI } from "app/modules/chart-module/data";
import { mappingStyles } from "app/modules/chart-module/components/toolbox/styles";
import { ReactComponent as DateIcon } from "app/modules/chart-module/assets/date.svg";
import ToolboxSubheader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";
import {
  getTypeName,
  getAggregatorNames,
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";

interface ChartToolBoxMappingProps {
  dataTypes: any;
  dimensions: any[];
}
interface ChartToolBoxMappingItemProps {
  index: number;
  dimension?: any;
  testId: string;
  mappingItemValue: string;
  dataTypes: any[];
  marginBottom: string;
  backgroundColor?: string;
  type: "string" | "number" | "date";
  nonStaticDimensionsId: number;
  nonStaticDimensionsIndex: number;
  setNonStaticDimensions: React.Dispatch<React.SetStateAction<any[]>>;
  nonStaticDimensions: any[];
  displayCloseButton?: boolean;
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

export function ChartToolBoxMapping(props: Readonly<ChartToolBoxMappingProps>) {
  const staticDimensions = filter(props.dimensions, (d: any) => d.static);
  const [nonStaticDimensions, setNonStaticDimensions] = React.useState(
    filter(props.dimensions, (d: any) => !d.static).map((d: any) => {
      return {
        ...d,
        mappedValues: [],
        mapValuesDisplayed: false,
      };
    })
  );

  const mapping = useStoreState((state) => state.charts.mapping.value);
  const handleButtonToggle = (id: string) => {
    setNonStaticDimensions((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            mapValuesDisplayed: !data.mapValuesDisplayed,
          };
        }
        return data;
      });
    });
  };

  React.useEffect(() => {
    //updates non static dimension with mapped values
    let updatedNonStaticDimensions = [...nonStaticDimensions];
    const mappingKeys = Object.keys(mapping);
    mappingKeys.forEach((dimensionId: string) => {
      const nonStaticDimensionIndex = updatedNonStaticDimensions.findIndex(
        (d) => d.id === dimensionId
      );
      if (nonStaticDimensionIndex !== -1) {
        updatedNonStaticDimensions[nonStaticDimensionIndex].mappedValues =
          mapping[dimensionId].value;
      }
    });

    setNonStaticDimensions(updatedNonStaticDimensions);
  }, [mapping]);

  const getValidDataTypes = (dimensionTypes: string[], searchValue: string) => {
    const validDataTypes: any = {};
    //get valid data types for the current dimension
    //filter data types by search value
    Object.keys(props.dataTypes)
      ?.filter((dt) => dt.toLowerCase().includes(searchValue.toLowerCase()))
      .map((dataTypeName: string, index: number) => {
        let type = props.dataTypes[dataTypeName];

        if (typeof props.dataTypes[dataTypeName] === "object") {
          type = props.dataTypes[dataTypeName].type;
        }
        //if the data type is valid for the current dimension, add it to the validDataTypes object
        if (dimensionTypes?.includes(type)) {
          validDataTypes[dataTypeName] = type;
        }
      });
    return validDataTypes;
  };

  const getSelectButtonLabel = (
    mappedValues: (string | number)[],
    multiple: boolean
  ) => {
    if (multiple) {
      if (mappedValues.length === 0) {
        return "Select dimension";
      } else {
        return "Select another dimension";
      }
    } else {
      return mappedValues.length > 0 ? mappedValues[0] : "Select dimension";
    }
  };

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
          {nonStaticDimensions?.map(
            (dimension: any, dimensionIndex: number) => (
              <NonStaticDimensionContainer
                dataTypes={props.dataTypes}
                key={dimension.id}
                dimension={dimension}
                dimensionIndex={dimensionIndex}
                nonStaticDimensions={nonStaticDimensions}
                setNonStaticDimensions={setNonStaticDimensions}
                nonStaticDimensionsId={dimension.id}
                getValidDataTypes={getValidDataTypes}
                getSelectButtonLabel={getSelectButtonLabel}
                handleButtonToggle={handleButtonToggle}
              />
            )
          )}
          {staticDimensions &&
            staticDimensions.map((dimension: any) => (
              <StaticDimensionContainer
                key={dimension.id}
                dimension={dimension}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const NonStaticDimensionContainer = (props: {
  dimension: any;
  dimensionIndex: number;
  nonStaticDimensions: any[];
  setNonStaticDimensions: React.Dispatch<React.SetStateAction<any[]>>;
  nonStaticDimensionsId: number;
  dataTypes: any[];
  getValidDataTypes: (dimensionTypes: string[], searchValue: string) => any;
  getSelectButtonLabel: (
    mappedValues: (string | number)[],
    multiple: boolean
  ) => any;
  handleButtonToggle: (id: string) => void;
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div
      key={`${props.dimension.id}`}
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
            {props.dimension.validTypes.map(
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
            <b> {props.dimension.name}</b>
          </div>
          <div
            css={`
              width: 72px;
              color: #ef1320;
              font-size: 32px;
              text-align: right;
              margin-bottom: -12px;
              visibility: ${props.dimension.required ? "visible" : "hidden"};
            `}
          >
            *
          </div>
        </div>

        {!!props.dimension?.multiple &&
          Object.keys(
            props.getValidDataTypes(props.dimension.validTypes, searchValue)
          )
            ?.filter((mappingItemValue: string) =>
              props.dimension.mappedValues.includes(mappingItemValue)
            )
            .map((mappingItemValue: string, index: number) => {
              let type = props.getValidDataTypes(
                props.dimension.validTypes,
                ""
              )[mappingItemValue];
              return (
                <ChartToolBoxMappingItem
                  key={mappingItemValue}
                  testId={`mapping-item-${mappingItemValue}`}
                  type={type}
                  index={index}
                  marginBottom="16px"
                  mappingItemValue={mappingItemValue}
                  dimension={props.dimension}
                  setNonStaticDimensions={props.setNonStaticDimensions}
                  dataTypes={props.dataTypes}
                  nonStaticDimensionsId={props.dimension.id}
                  nonStaticDimensionsIndex={props.dimensionIndex}
                  nonStaticDimensions={props.nonStaticDimensions}
                  displayCloseButton
                />
              );
            })}

        <DimensionSelect
          dimension={props.dimension}
          getSelectButtonLabel={props.getSelectButtonLabel}
          handleButtonToggle={props.handleButtonToggle}
          index={0}
        />
      </div>
      {props.dimension?.mapValuesDisplayed && (
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
          <div
            css={`
              display: flex;
              align-items: center;
              width: 100%;
              background: #f1f3f5;
              border-radius: 24px;
              height: 31px;
              padding-right: 5px;

              margin-bottom: 12px;

              input {
                border: none;
                background: transparent;
                width: 90%;
                height: 100%;
                padding-left: 16px;
              }
            `}
          >
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchIcon htmlColor="#868E96" />
          </div>
          {Object.keys(
            props.getValidDataTypes(props.dimension.validTypes, searchValue)
          )?.map((mappingItemValue: string, index: number) => {
            let type = props.getValidDataTypes(
              props.dimension.validTypes,
              searchValue
            )[mappingItemValue];

            return (
              <ChartToolBoxMappingItem
                key={mappingItemValue}
                testId={`mapping-item-${mappingItemValue}`}
                type={type}
                index={index}
                marginBottom="16px"
                mappingItemValue={mappingItemValue}
                dimension={props.dimension}
                setNonStaticDimensions={props.setNonStaticDimensions}
                dataTypes={props.dataTypes}
                nonStaticDimensionsId={props.dimension.id}
                nonStaticDimensionsIndex={props.dimensionIndex}
                nonStaticDimensions={props.nonStaticDimensions}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const DimensionSelect = (props: {
  dimension: any;
  getSelectButtonLabel: (
    mappedValues: (string | number)[],
    multiple: boolean
  ) => any;
  handleButtonToggle: (id: string) => void;
  index: number;
}) => {
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );
  const aggregators = getAggregatorNames();
  const removeMappingValue = useStoreActions(
    (state) => state.charts.mapping.removeMappingValue
  );

  let aggregationsMappedHere = get(mapping, "config.aggregation", []);
  const dimensionMapping = get(mapping, props.dimension.id, {});
  const setAggregation = React.useCallback(
    (newAggregations) => {
      setMapping({
        [props.dimension.id]: {
          ...dimensionMapping,
          config: {
            aggregation: [...newAggregations],
          },
        },
      });
    },
    [mapping, setMapping, dimensionMapping]
  );
  const onChangeAggregation = React.useCallback(
    (i, aggregatorName) => {
      const newAggregations = [...aggregationsMappedHere];
      newAggregations[i] = aggregatorName;
      setAggregation(newAggregations);
    },
    [aggregationsMappedHere, setAggregation]
  );
  const relatedAggregation = React.useMemo(() => {
    if (props.dimension?.aggregation) {
      return dimensionMapping.config?.aggregation[props.index] || "sum";
    } else {
      return null;
    }
  }, [props.dimension, props.index, dimensionMapping]);

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    removeMappingValue({
      id: props.dimension.id,
      value: props.dimension.mappedValues[0],
    });
  };

  return (
    <div
      css={`
        > span {
          font-size: 14px;
        }
        position: relative;
      `}
    >
      <Button
        disableTouchRipple
        onClick={() => props.handleButtonToggle(props.dimension.id)}
        css={mappingStyles.selectedButtoncss(props.dimension)}
      >
        <span>
          {props.getSelectButtonLabel(
            props.dimension.mappedValues,
            !!props.dimension?.multiple
          )}
        </span>
        {!props.dimension.multiple &&
        props.dimension.mappedValues.length > 0 ? (
          <span
            onClick={onDeleteItem}
            css={`
              margin-top: 6px;
              margin-right: -4px;
            `}
          >
            <CloseIcon fontSize="small" />
          </span>
        ) : (
          <ArrowDropUpIcon
            css={`
              margin-right: -7px;
            `}
          />
        )}
      </Button>
      {props.dimension &&
        !!props.dimension?.aggregation &&
        props.dimension.mappedValues.length > 0 &&
        relatedAggregation &&
        aggregators &&
        onChangeAggregation && (
          <Dropdown
            className="d-inline-block ml-2 raw-dropdown"
            id="rb-dropdown-menu"
            css={`
              margin-right: -7px;
              position: absolute;
              right: 55px;
              top: 2px;
              z-index: 2;
            `}
          >
            <Dropdown.Toggle
              css={`
                width: 110px;
                color: #262c34;
                font-size: 14px;
                border-style: none;
                border-radius: 26px;
                padding-right: 16px;
                background: #cfd4da;
                box-shadow: none !important;
                pointer-events: ${props.dimension.mapValuesDisplayed
                  ? "auto"
                  : "none"};

                &:hover,
                &:active,
                &:focus {
                  color: #262c34;
                  background: #cfd4da;
                }
              `}
            >
              {get(AGGREGATIONS_LABELS, relatedAggregation, relatedAggregation)}
            </Dropdown.Toggle>
            <Dropdown.Menu
              css={`
                min-width: 110px;
                background: #dfe3e6;
                border-radius: 13px;
                box-shadow: none !important;
                overflow: scroll;
              `}
            >
              {aggregators.map((aggregatorName: string) => (
                <Dropdown.Item
                  key={aggregatorName}
                  onClick={() =>
                    onChangeAggregation &&
                    onChangeAggregation(props.index, aggregatorName)
                  }
                  css={`
                    color: #262c34;
                    font-size: 14px;
                    padding: 6px 12px !important;
                    border-bottom: 1px solid rgba(173, 181, 189, 0.5);
                  `}
                >
                  {get(AGGREGATIONS_LABELS, aggregatorName, aggregatorName)}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
    </div>
  );
};

function ChartToolBoxMappingItem(
  props: Readonly<ChartToolBoxMappingItemProps>
) {
  const { index, dimension, dataTypes } = props;

  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );

  const removeMappingValue = useStoreActions(
    (state) => state.charts.mapping.removeMappingValue
  );

  const item = {
    type: "card",
    index,
    id: props.mappingItemValue,
    dimensionId: dimension.id,
  };
  const columnDataType = getTypeName(dataTypes[item.id as any]);

  const handleClick = () => {
    const isValid =
      dimension.validTypes?.length === 0 ||
      dimension.validTypes?.includes(columnDataType);

    if (isValid) {
      props.setNonStaticDimensions((prev) => {
        return prev.map((data) => {
          if (data.id === props.nonStaticDimensionsId) {
            return {
              ...data,
              mappedValues: [...data.mappedValues, props.mappingItemValue],
              mapValuesDisplayed: false,
            };
          }
          return data;
        });
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

      if (
        props.nonStaticDimensions[props.nonStaticDimensionsIndex]
          .mappedValues &&
        !props.nonStaticDimensions[props.nonStaticDimensionsIndex]?.multiple
      ) {
        //replace mapping
        setMapping({
          [dimension.id]: {
            ids: [uniqueId()],
            value: [item.id],
            isValid: isValid,
            mappedType: columnDataType,
            config: dimension.aggregation
              ? {
                  aggregation: [defaulAggregation],
                }
              : undefined,
          },
        });
      } else {
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
    }
  };
  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    removeMappingValue({ id: dimension.id, value: props.mappingItemValue });
  };

  return (
    <div
      key={props.mappingItemValue}
      id={props.testId}
      css={mappingStyles.mappingItemcss(props)}
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
        {props.mappingItemValue}
      </div>

      {props.displayCloseButton && (
        <IconButton onClick={onDeleteItem}>
          <CloseIcon htmlColor="#fff" fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}

const StaticDimensionContainer = (props: { dimension: any }) => {
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.charts.mapping.setValue
  );
  const loadedChart = useStoreState(
    (state) =>
      (state.charts.ChartGet.crudData ?? emptyChartAPI) as ChartAPIModel
  );
  const loadedChartMappingValue = get(
    loadedChart,
    `mapping.${props.dimension.id}.value[0]`,
    ""
  );
  const [valueCount, setValueCount] = React.useState(0);
  const [value, setValue] = React.useState(
    //for the case of BNC, mapping doesn't come with complete values, hence we fallback to the loaded chart mapping.
    //TODO: replace loadedChartMappingValue with ""  when mapping for BNC is fixed
    get(mapping, `${props.dimension.id}.value[0]`, loadedChartMappingValue)
  );

  const onValueChange = (value: string) => {
    const mappingFromStorage = get(
      JSON.parse(
        sessionStorage.getItem("[EasyPeasyStore][0][charts.mapping]") ?? ""
      ),
      "data.value",
      {}
    ) as { [key: string]: any };
    const localDimensionMapping = get(
      mappingFromStorage,
      props.dimension.id,
      {}
    );
    setMapping({
      [props.dimension.id]: {
        ids: (localDimensionMapping.ids || []).concat(uniqueId()),
        value: [value],
        isValid: true,
        mappedType: "string",
      },
    });
  };
  const [,] = useDebounce(() => onValueChange(value), 1000, [value]);
  return (
    <div
      key={`${props.dimension.id}`}
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
            <p>{typeIcon["string"]}</p>
          </div>
          <div
            css={`
              font-size: 14px;
              color: #262c34;
            `}
          >
            <b> {props.dimension.name}</b>
          </div>
          <div
            css={`
              width: 72px;
              color: #ef1320;
              font-size: 32px;
              text-align: right;
              margin-bottom: -12px;
              visibility: ${props.dimension.required ? "visible" : "hidden"};
            `}
          >
            *
          </div>
        </div>
      </div>
      <div
        css={`
          position: relative;
        `}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setValueCount(e.target.value.length);
          }}
          maxLength={50}
          minLength={6}
          css={`
            width: 100%;
            min-height: 40px;
            resize: vertical;
            padding: 14px 8px;
            border-radius: 11px;
            border: 1px solid #231d2c;
          `}
        />
        <span
          css={`
            position: absolute;
            bottom: 4px;
            right: 13px;
            font-size: 12px;
          `}
        >
          {valueCount}/50
        </span>
      </div>
      <div
        css={`
          color: #231d2c;
          font-size: 12px;
          margin-top: 2px;
          font-weight: 400;
          line-height: 15px;
        `}
      >
        The {props.dimension.name} must be between 6 and 50 characters in
        length.
      </div>
    </div>
  );
};
