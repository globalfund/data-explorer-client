// @ts-nocheck
/* third-party */
import React from "react";
import get from "lodash/get";
import omit from "lodash/omit";
// @ts-ignore
import { getTypeName } from "@rawgraphs/rawgraphs-core";
/* project */
import CustomizeOptionText from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/components/ChartOptionText";
import CustomizeOptionColor from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/components/ChartOptionColor";
import ChartOptionBoolean from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/components/ChartOptionBoolean";
import CustomizeOptionNumber from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/components/ChartOptionNumber";
import ChartOptionColorScaleWrapper from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/components/ChartOptionColorScaleWrapper";

const CHART_OPTION_COMPONENTS = {
  number: CustomizeOptionNumber,
  text: CustomizeOptionText,
  color: CustomizeOptionColor,
  colorScale: ChartOptionColorScaleWrapper,
  boolean: ChartOptionBoolean,
};

export function getPartialMapping(mapping, dimension, repeatIndex) {
  const nv = get(mapping[dimension], `value[${repeatIndex}]`);
  return {
    ...mapping,
    [dimension]: {
      ...mapping[dimension],
      value: [nv],
    },
  };
}

export function getPartialMappedData(mappedData, dimension, repeatIndex) {
  return Array.isArray(mappedData)
    ? mappedData.map((datum) => {
        const value = get(datum[dimension], `[${repeatIndex}]`);
        return {
          ...datum,
          [dimension]: value,
        };
      })
    : mappedData;
}

export function getDefaultForRepeat(def, index) {
  if (Array.isArray(def.repeatDefault)) {
    return get(def.repeatDefault, `[${index}]`, def.default);
  }
  return def.default;
}

export function WrapControlComponent({
  type,
  optionId,
  allVisualOptions, // Introduced to be able to maintain both customized visual options and complete set of vizoptions for setVisualOptions function.
  setVisualOptions,
  setLocalVisualOptions,
  label,
  repeatIndex,
  ...props
}) {
  // @ts-ignore
  const Component = CHART_OPTION_COMPONENTS[type];

  const remainingOptions = React.useMemo(() => {
    if (type !== "colorScale") {
      return null;
    }

    return Object.keys(omit(props.visualOptions, optionId))
      .map((k) => JSON.stringify(get(props.visualOptions, k, "")))
      .join("-");
  }, [type, props.visualOptions, optionId]);

  const domainFromChart = React.useMemo(() => {
    if (type !== "colorScale") {
      return null;
    }
    if (props.domain && props.chart[props.domain]) {
      //as sometimes the current chart is not in synch with current options (chart is set before options, we just handle an exception)
      //everything should be ok on the next render.
      try {
        const domain = props.chart[props.domain](
          props.mappedData,
          props.mapping,
          props.visualOptions
        );
        return domain;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    type,
    props.chart,
    props.domain,
    props.mappedData,
    props.mapping,
    remainingOptions,
  ]);

  const mappingValue = React.useMemo(() => {
    if (type !== "colorScale") {
      return null;
    }
    return domainFromChart
      ? "__custom__"
      : get(props.mapping, `[${props.dimension}].value`);
  }, [domainFromChart, props.dimension, props.mapping, type]);

  const colorDataType = React.useMemo(() => {
    if (type !== "colorScale") {
      return null;
    }
    if (domainFromChart) {
      return domainFromChart.type;
    }
    return props.dataTypes[mappingValue]
      ? getTypeName(props.dataTypes[mappingValue])
      : "string";
  }, [type, props.dataTypes, domainFromChart, mappingValue]);

  const colorDataset = React.useMemo(() => {
    if (type !== "colorScale") {
      return null;
    }
    if (domainFromChart) {
      return domainFromChart.domain;
    }

    if (props.mappedData) {
      return props.mappedData
        .map((d) => get(d, props.dimension))
        .filter(
          (item) => item !== undefined && !(Array.isArray(item) && !item.length)
        );
    } else {
      return [];
    }
  }, [type, props.dimension, domainFromChart, props.mappedData]);

  const handleControlChange = React.useCallback(
    (nextValue) => {
      setLocalVisualOptions((visualOptions) => {
        let newValue = nextValue;
        if (repeatIndex !== undefined) {
          newValue = visualOptions[optionId] || [];
          newValue[repeatIndex] = nextValue;
        }

        const tmpVisualOptions = { ...allVisualOptions, [optionId]: newValue };
        return tmpVisualOptions;
      });
    },
    [
      optionId,
      repeatIndex,
      allVisualOptions,
      setVisualOptions,
      setLocalVisualOptions,
    ]
  );

  return (
    <Component
      type={type}
      domainFromChart={domainFromChart}
      mappingValue={mappingValue}
      colorDataType={colorDataType}
      colorDataset={colorDataset}
      optionId={optionId}
      label={
        repeatIndex !== undefined ? (
          <React.Fragment>
            {label} ({repeatIndex + 1})
          </React.Fragment>
        ) : (
          label
        )
      }
      {...omit(props, [
        "mapping",
        "visualOptions",
        "chart",
        "dataset",
        "dataTypes",
        "mappedData",
      ])}
      onChange={handleControlChange}
    />
  );
}
