import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import {
  getDefaultDimensionAggregation,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-core";

function removeIndex(mapping: any, i: number) {
  let nextConfig;
  if (mapping.config) {
    nextConfig = {
      ...mapping.config,
      aggregation: mapping.config.aggregation.filter(
        (col: any, j: number) => j !== i
      ),
    };
  }

  return {
    ...mapping,
    ids: mapping.ids.filter((col: any, j: number) => j !== i),
    value: mapping.value.filter((col: any, j: number) => j !== i),
    config: nextConfig,
  };
}

function arrayReplace(arr: any, i: number, value: any) {
  return arr.map((item: any, j: number) => (j === i ? value : item));
}

function arrayInsert(arr: any, i: number, value: any) {
  return arr.slice().splice(i, 0, value);
}

export function handleReplaceLocalMapping(
  nextId: string,
  prev: { [key: string]: any },
  fromDimension: string,
  toDimension: string,
  fromIndex: number,
  toIndex: number,
  dimensions: any,
  dataTypes: any,
  multiple = false
) {
  // console.log(prev, fromDimension, fromIndex);
  const removedItem: { [key: string]: any } = {};
  removedItem.aggregation =
    prev[fromDimension]?.config?.aggregation?.[fromIndex];
  removedItem.value = prev[fromDimension].value[fromIndex];

  let moveFn = multiple ? arrayInsert : arrayReplace;

  const prevToMapping = prev[toDimension] || {};
  const toDimensionMapping = {
    ...prevToMapping,
    ids: moveFn(prevToMapping.ids ?? [], toIndex, nextId),
    value: moveFn(prevToMapping.value ?? [], toIndex, removedItem.value),
  };

  const dimension = dimensions[toDimension];
  if (dimensions.aggregation) {
    let newAggregation;
    if (removedItem.aggregation) {
      newAggregation = removedItem.aggregation;
    } else {
      newAggregation = getDefaultDimensionAggregation(
        dimension,
        dataTypes[removedItem.value]
      );
    }
    toDimensionMapping.config = {
      aggregation: moveFn(
        get(prevToMapping, "config.aggregation", []),
        toIndex,
        newAggregation
      ),
    };
  }
  const obj = {
    ...prev,
    [fromDimension]: removeIndex(prev[fromDimension], fromIndex),
    [toDimension]: toDimensionMapping,
  };
  // console.log(obj);
  return obj;
}

function arrayMoveMutable(array: any, fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMove(array: any, fromIndex: number, toIndex: number) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}

export function getRequiredFieldsAndErrors(mapping: any, dimensions: any) {
  let updRequiredFields: { id: string; name: string }[] = [];

  dimensions.forEach((dimension: any) => {
    if (dimension.required) {
      updRequiredFields.push({
        id: dimension.id,
        name: dimension.name,
      });
    }
  });

  let updMinValuesFields: { id: string; name: string; minValues: number }[] =
    [];

  dimensions.forEach((dimension: any) => {
    if (dimension.minValues && dimension.minValues > 1) {
      const dimensionMapping = mapping[dimension.id];
      if (
        !dimensionMapping ||
        dimensionMapping.value.length < dimension.minValues
      ) {
        updMinValuesFields.push({
          id: dimension.id,
          name: dimension.name,
          minValues: dimension.minValues,
        });
      }
    }
  });

  const updErrors: string[] = [];

  Object.keys(mapping).forEach((dimensionId: string) => {
    const dimensionMapping = mapping[dimensionId];
    if (dimensionMapping.isValid) {
      updRequiredFields = filter(
        updRequiredFields,
        (f: { id: string; name: string }) => f.id !== dimensionId
      );
    } else {
      const fDimension = find(dimensions, { id: dimensionId });
      updErrors.push(
        `Data-type mismatch: you can't map ${
          dimensionMapping.mappedType
        }s on ${get(fDimension, "name", dimensionId)}`
      );
    }
  });

  return { updRequiredFields, updErrors, updMinValuesFields };
}
