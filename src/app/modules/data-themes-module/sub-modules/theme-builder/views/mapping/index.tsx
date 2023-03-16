/* third-party */
import React from "react";
import get from "lodash/get";
import { useDrop } from "react-dnd";
import isEmpty from "lodash/isEmpty";
import uniqueId from "lodash/uniqueId";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import {
  getTypeName,
  chart as rawChart,
  getAggregatorNames,
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { DataThemesToolBoxMappingItem } from "app/modules/data-themes-module/components/toolbox/views/steps/panels-content/Mapping";
import {
  arrayMove,
  getRequiredFieldsAndErrors,
  handleReplaceLocalMapping,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/utils";
import {
  DataThemesBuilderMappingDimensionProps,
  DataThemesBuilderMappingMessageProps,
  DataThemesBuilderMappingProps,
  typeIcon,
} from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/data";
import { DataThemesCommonChart } from "app/modules/data-themes-module/components/common-chart";

export function DataThemesBuilderMapping(props: DataThemesBuilderMappingProps) {
  useTitle("Data Themes - Mapping");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [nextEnabled, setNextEnabled] = React.useState<boolean>(false);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );
  const setActivePanels = useStoreActions(
    (state) => state.dataThemes.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Mapping component is rendered, we are at step 3.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 3,
    });
  }, []);

  const replaceDimension = React.useCallback(
    (
      fromDimension: string,
      toDimension: string,
      fromIndex: number,
      toIndex: number,
      multiple?: boolean
    ) => {
      const mappingFromStorage = get(
        JSON.parse(
          sessionStorage.getItem(
            "[EasyPeasyStore][0][dataThemes.sync.mapping]"
          ) || ""
        ),
        "data.value",
        {}
      ) as { [key: string]: any };
      const nextId = uniqueId();
      if (multiple) {
        setDraggingId(nextId);
      }
      setMapping({
        tab: activeTabIndex,
        viz: activeVizIndex,
        mapping: handleReplaceLocalMapping(
          nextId,
          isEmpty(mapping[activeTabIndex][activeVizIndex])
            ? mappingFromStorage[activeTabIndex][activeVizIndex]
            : mapping[activeTabIndex][activeVizIndex],
          fromDimension,
          toDimension,
          fromIndex,
          toIndex,
          props.dimensions,
          props.dataTypes
        ),
      });
    },
    [mapping, props.dataTypes, props.dimensions, setMapping]
  );

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(
        mapping[activeTabIndex][activeVizIndex],
        props.dimensions
      );

    setNextEnabled(
      updRequiredFields.length === 0 &&
        updErrors.length === 0 &&
        updMinValuesFields.length === 0
    );
  }, [mapping, props.dimensions]);

  if (
    stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset === null &&
    !props.loading
  ) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <div
            css={`
              font-size: 14px;
              margin-bottom: 16px;
              font-family: "Inter", "Helvetica Neue", sans-serif;
            `}
          >
            <b> Chart variables</b>
          </div>
          <Grid container spacing={2}>
            {props.dimensions.map((dimension: any) => (
              <DataThemesBuilderMappingDimension
                key={dimension.id}
                dimension={dimension}
                dataTypes={props.dataTypes}
                replaceDimension={replaceDimension}
              />
            ))}
          </Grid>
          <DataThemesBuilderMappingMessage dimensions={props.dimensions} />
          <DataThemesCommonChart
            containerRef={containerRef}
            renderedChart={props.renderedChart}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
            renderedChartSsr={props.renderedChartSsr}
            renderedChartMappedData={props.renderedChartMappedData}
          />
        </div>
      </div>
    </div>
  );
}

function DataThemesBuilderMappingDimension(
  props: DataThemesBuilderMappingDimensionProps
) {
  const { dimension, dataTypes, replaceDimension } = props;

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );

  const dimensionMapping = get(
    mapping[activeTabIndex][activeVizIndex],
    dimension.id,
    {}
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["column", "card"],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: any) => {
      // console.log("drop 1");
      // console.log("drop 1 item", item);
      // console.log("drop 1 dimension", dimension);
      const mappingFromStorage = get(
        JSON.parse(
          sessionStorage.getItem(
            "[EasyPeasyStore][0][dataThemes.sync.mapping]"
          ) || ""
        ),
        "data.value",
        {}
      ) as { [key: string]: any };
      const localDimensionMapping = get(
        mappingFromStorage[activeTabIndex][activeVizIndex],
        dimension.id,
        {}
      );
      if (item.type === "column") {
        const defaulAggregation = dimension.aggregation
          ? getDefaultDimensionAggregation(dimension, dataTypes[item.id])
          : null;
        const columnDataType = getTypeName(dataTypes[item.id]);
        const isValid =
          dimension.validTypes?.length === 0 ||
          dimension.validTypes?.includes(columnDataType);
        setMapping({
          tab: activeTabIndex,
          viz: activeVizIndex,
          mapping: {
            [dimension.id]: {
              ids: (localDimensionMapping.ids || []).concat(uniqueId()),
              value: [...(localDimensionMapping.value || []), item.id],
              isValid: isValid,
              mappedType: columnDataType,
              config: dimension.aggregation
                ? {
                    aggregation: [
                      ...(get(localDimensionMapping, "config.aggregation") ||
                        []),
                      defaulAggregation,
                    ],
                  }
                : undefined,
            },
          },
        });
      } else if (item.dimensionId !== dimension.id) {
        replaceDimension(
          item.dimensionId,
          dimension.id,
          item.index,
          localDimensionMapping.value ? localDimensionMapping.value.length : 0
        );
      }
    },
  }));

  const setAggregation = React.useCallback(
    (newAggregations) => {
      setMapping({
        tab: activeTabIndex,
        viz: activeVizIndex,
        mapping: {
          [dimension.id]: {
            ...dimensionMapping,
            config: {
              aggregation: [...newAggregations],
            },
          },
        },
      });
    },
    [mapping, setMapping, activeTabIndex, activeVizIndex, dimensionMapping]
  );

  const aggregators = getAggregatorNames();
  let aggregationsMappedHere = get(mapping, "config.aggregation", []);

  const onChangeAggregation = React.useCallback(
    (i, aggregatorName) => {
      const newAggregations = [...aggregationsMappedHere];
      newAggregations[i] = aggregatorName;
      setAggregation(newAggregations);
    },
    [aggregationsMappedHere, setAggregation]
  );

  const onDeleteItem = React.useCallback(
    (i: number) => {
      let nextConfig;
      if (dimensionMapping.config) {
        nextConfig = {
          ...dimensionMapping.config,
          aggregation: dimensionMapping.config.aggregation.filter(
            (col: any, j: number) => j !== i
          ),
        };
      }

      let nextDimensionMapping = {
        ...dimensionMapping,
        ids: dimensionMapping.ids.filter((col: any, j: number) => j !== i),
        value: dimensionMapping.value.filter((col: any, j: number) => j !== i),
        isValid: true,
        config: nextConfig,
      };
      if (nextDimensionMapping.ids.length === 0) {
        nextDimensionMapping = undefined;
      }
      setMapping({
        tab: activeTabIndex,
        viz: activeVizIndex,
        mapping: { [dimension.id]: nextDimensionMapping },
      });
    },
    [dimensionMapping, setMapping]
  );

  const onMove = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      console.log("onMove");
      let nextConfig;
      if (dimensionMapping.config) {
        nextConfig = {
          ...dimensionMapping.config,
          aggregation: arrayMove(
            dimensionMapping.config.aggregation,
            dragIndex,
            hoverIndex
          ),
        };
      }

      let nextDimensionMapping = {
        ...dimensionMapping,
        ids: arrayMove(dimensionMapping.ids, dragIndex, hoverIndex),
        value: arrayMove(dimensionMapping.value, dragIndex, hoverIndex),
        config: nextConfig,
      };
      if (nextDimensionMapping.ids.length === 0) {
        nextDimensionMapping = undefined;
      }

      setMapping({
        tab: activeTabIndex,
        viz: activeVizIndex,
        mapping: { [dimension.id]: nextDimensionMapping },
      });
    },
    [dimensionMapping, setMapping]
  );

  const onChangeDimension = React.useCallback(
    (i: number, newCol: any) => {
      // console.log("onChangeDimension");
      const defaulAggregation = dimension.aggregation
        ? getDefaultDimensionAggregation(dimension, dataTypes[newCol.id])
        : null;
      const columnDataType = getTypeName(dataTypes[newCol.id]);
      const isValid =
        dimension.validTypes?.length === 0 ||
        dimension.validTypes?.includes(columnDataType);
      let nextDimensionMapping = {
        ...dimensionMapping,
        value: dimensionMapping.value.map((col: any, j: number) =>
          j === i ? newCol.id : col
        ),
        isValid: isValid,
        mappedType: columnDataType,
        config: dimension.aggregation
          ? {
              aggregation: [
                ...(get(dimensionMapping, "config.aggregation") || []),
                defaulAggregation,
              ],
            }
          : undefined,
      };
      if (nextDimensionMapping.ids.length === 0) {
        nextDimensionMapping = undefined;
      }

      setMapping({
        tab: activeTabIndex,
        viz: activeVizIndex,
        mapping: { [dimension.id]: nextDimensionMapping },
      });
    },
    [dimensionMapping, setMapping]
  );

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        css={`
          width: 100%;
          display: flex;
          padding: 16px;
          min-height: 87px;
          border-radius: 11px;
          background: #f1f3f5;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            margin-bottom: 7px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
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
            {dimension.validTypes.map((type: "string" | "number" | "date") => (
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
            ))}
          </div>
          <div
            css={`
              font-size: 14px;
            `}
          >
            {dimension.name}
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
        {dimensionMapping.ids &&
          dimensionMapping.ids.map((id: string, index: number) => {
            const columnId = dimensionMapping.value[index];
            let type = props.dataTypes[columnId];
            const columnDataType = getTypeName(type);
            const relatedAggregation = dimension?.aggregation
              ? dimensionMapping.config.aggregation[index] ||
                getDefaultDimensionAggregation(dimension, columnDataType)
              : undefined;
            const isValid =
              dimension.validTypes?.length === 0 ||
              dimension.validTypes?.includes(columnDataType);

            if (typeof props.dataTypes[columnId] === "object") {
              type = props.dataTypes[columnId].type;
            }

            return (
              <DataThemesToolBoxMappingItem
                key={id}
                type={type}
                index={index}
                onMove={onMove}
                isValid={isValid}
                dimension={dimension}
                dataTypeName={columnId}
                aggregators={aggregators}
                replaceDimension={replaceDimension}
                onChangeDimension={onChangeDimension}
                relatedAggregation={relatedAggregation}
                onDeleteItem={() => onDeleteItem(index)}
                onChangeAggregation={onChangeAggregation}
                backgroundColor={isValid ? undefined : "#fa7355"}
                marginBottom={!dimension.multiple ? "0px" : "16px"}
              />
            );
          })}
        {(dimension.multiple ||
          get(dimensionMapping, "value", []).length === 0) && (
          <div
            ref={drop}
            css={`
              width: 100%;
              height: 32px;
              display: flex;
              font-size: 14px;
              user-select: none;
              border-radius: 36px;
              align-items: center;
              justify-content: center;
              border: 1px dashed #262c34;
              color: ${isOver ? "#fff" : "#868e96"};
              background: ${isOver ? "#adb5bd" : "#dfe3e6"};
            `}
          >
            Drop dimension here
          </div>
        )}
      </div>
    </Grid>
  );
}

function DataThemesBuilderMappingMessage(
  props: DataThemesBuilderMappingMessageProps
) {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [requiredFields, setRequiredFields] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [minValuesFields, setMinValuesFields] = React.useState<
    { id: string; name: string; minValues: number }[]
  >([]);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(
        mapping[activeTabIndex][activeVizIndex],
        props.dimensions
      );

    setRequiredFields(updRequiredFields);
    setErrors(updErrors);
    setMinValuesFields(updMinValuesFields);
  }, [mapping, props.dimensions]);

  return (
    <div
      css={`
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        min-height: 40px;
        margin-top: 72px;
        padding: 10px 20px;
        border-radius: 43px;
        color: ${errors.length > 0 ? "#fff" : "#262c34"};
        background: ${errors.length > 0 ? "#fa7355" : "#dfe3e6"};
        display: ${requiredFields.length > 0 ||
        errors.length > 0 ||
        minValuesFields.length > 0
          ? "block"
          : "none"};
      `}
    >
      {requiredFields.length > 0 && errors.length === 0 && (
        <React.Fragment>
          Required chart variables: you need to map{" "}
          <b>
            {requiredFields
              .map((f: { id: string; name: string }) => f.name)
              .join(", ")}
          </b>
        </React.Fragment>
      )}
      {minValuesFields.length > 0 &&
        errors.length === 0 &&
        requiredFields.length === 0 && (
          <React.Fragment>
            {minValuesFields.map(
              (f: { id: string; name: string; minValues: number }) => (
                <div key={f.id}>
                  Please map at least <b>{f.minValues}</b> dimensions on{" "}
                  <b>{f.name}</b>
                </div>
              )
            )}
          </React.Fragment>
        )}
      {errors.length > 0 && (
        <React.Fragment>
          {errors.map((error: string) => (
            <b key={error}>{error}</b>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
