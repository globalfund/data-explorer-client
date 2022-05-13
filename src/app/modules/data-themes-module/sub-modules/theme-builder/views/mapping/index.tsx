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
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
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

export function DataThemesBuilderMapping(props: DataThemesBuilderMappingProps) {
  useTitle("Data Themes - Mapping");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [nextEnabled, setNextEnabled] = React.useState<boolean>(false);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );

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
      setMapping(
        handleReplaceLocalMapping(
          nextId,
          isEmpty(mapping) ? mappingFromStorage : mapping,
          fromDimension,
          toDimension,
          fromIndex,
          toIndex,
          props.dimensions,
          props.currentChartData.dataTypes
        )
      );
    },
    [
      mapping,
      get(props.currentChartData, "dataTypes", []),
      props.dimensions,
      setMapping,
    ]
  );

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions.width === CHART_DEFAULT_WIDTH
    ) {
      props.setVisualOptions({
        ...props.visualOptions,
        width: containerRef.current.clientWidth,
      });
    }
  }, [containerRef]);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(mapping, props.dimensions);

    setNextEnabled(
      updRequiredFields.length === 0 &&
        updErrors.length === 0 &&
        updMinValuesFields.length === 0
    );
  }, [mapping, props.dimensions]);

  React.useEffect(() => {
    if (nextEnabled && domRef && domRef.current) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping,
          visualOptions: props.visualOptions,
          dataTypes: props.currentChartData.dataTypes,
        });
        try {
          const rawViz = viz.renderToDOM(domRef.current, viz._getVizData());
        } catch (e) {
          if (process.env.NODE_ENV === "development") {
            console.log("chart error", e);
          }
        }
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    } else if (!nextEnabled && domRef && domRef.current) {
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild);
      }
    }
  }, [nextEnabled, props.currentChart, props.currentChartData, mapping]);

  if (props.data.length === 0 && !props.loading) {
    history.push(`/data-themes/${page}/data`);
  }

  // console.log("mapping", mapping);
  // console.log("dimensions", props.dimensions);

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={3}
        data={props.data}
        loading={props.loading}
        forceNextEnabled={nextEnabled}
        loadDataset={props.loadDataset}
        currentChartData={props.currentChartData}
        filterOptionGroups={props.filterOptionGroups}
      />
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
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Chart variables
          </div>
          <Grid container spacing={2}>
            {props.dimensions.map((dimension: any) => (
              <DataThemesBuilderMappingDimension
                key={dimension.id}
                dimension={dimension}
                replaceDimension={replaceDimension}
                currentChartData={props.currentChartData}
              />
            ))}
          </Grid>
          <DataThemesBuilderMappingMessage dimensions={props.dimensions} />
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
        </div>
      </div>
    </div>
  );
}

function DataThemesBuilderMappingDimension(
  props: DataThemesBuilderMappingDimensionProps
) {
  const { dimension, currentChartData, replaceDimension } = props;

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setMapping = useStoreActions(
    (actions) => actions.dataThemes.sync.mapping.setValue
  );

  const dimensionMapping = get(mapping, dimension.id, {});

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
      const dimensionMappingFromStorage = get(
        mappingFromStorage,
        dimension.id,
        {}
      );
      const localDimensionMapping = isEmpty(dimensionMapping)
        ? dimensionMappingFromStorage
        : dimensionMapping;
      if (item.type === "column") {
        const defaulAggregation = dimension.aggregation
          ? getDefaultDimensionAggregation(
              dimension,
              currentChartData.dataTypes[item.id]
            )
          : null;
        const columnDataType = getTypeName(currentChartData.dataTypes[item.id]);
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
          item.index,
          localDimensionMapping.value ? localDimensionMapping.value.length : 0
        );
      }
    },
  }));

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
        config: nextConfig,
      };
      if (nextDimensionMapping.ids.length === 0) {
        nextDimensionMapping = undefined;
      }

      setMapping({
        [dimension.id]: nextDimensionMapping,
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
        [dimension.id]: nextDimensionMapping,
      });
    },
    [dimensionMapping, setMapping]
  );

  const onChangeDimension = React.useCallback(
    (i: number, newCol: any) => {
      // console.log("onChangeDimension");
      const defaulAggregation = dimension.aggregation
        ? getDefaultDimensionAggregation(
            dimension,
            currentChartData.dataTypes[newCol.id]
          )
        : null;
      const columnDataType = getTypeName(currentChartData.dataTypes[newCol.id]);
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
        [dimension.id]: nextDimensionMapping,
      });
    },
    [dimensionMapping, setMapping]
  );

  // console.log("dimension", dimension);
  // console.log("dimensionMapping", dimensionMapping);

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
            const columnDataType = getTypeName(
              props.currentChartData.dataTypes[columnId]
            );
            // const relatedAggregation = dimension.aggregation
            //   ? dimensionMapping.config.aggregation[index] ||
            //     getDefaultDimensionAggregation(dimension, columnDataType)
            //   : undefined;
            const isValid =
              dimension.validTypes?.length === 0 ||
              dimension.validTypes?.includes(columnDataType);

            let type = props.currentChartData.dataTypes[columnId];
            if (
              typeof props.currentChartData.dataTypes[columnId] === "object"
            ) {
              type = props.currentChartData.dataTypes[columnId].type;
            }

            return (
              <DataThemesToolBoxMappingItem
                key={id}
                type={type}
                index={index}
                onMove={onMove}
                dimension={dimension}
                dataTypeName={columnId}
                replaceDimension={replaceDimension}
                onChangeDimension={onChangeDimension}
                onDeleteItem={() => onDeleteItem(index)}
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

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);

  React.useEffect(() => {
    // console.log("mapping", mapping);
    // console.log("dimensions", props.dimensions);

    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(mapping, props.dimensions);

    setRequiredFields(updRequiredFields);
    setErrors(updErrors);
    setMinValuesFields(updMinValuesFields);
  }, [mapping, props.dimensions]);

  return (
    <div
      css={`
        width: 100%;
        font-size: 14px;
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