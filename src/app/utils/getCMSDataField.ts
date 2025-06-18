import get from "lodash/get";

export function getCMSDataField(
  cmsData: any,
  field: string,
  defaultValue: string = "",
) {
  if (!cmsData) return defaultValue;
  const value = get(cmsData, field, defaultValue);
  if (value === null) return defaultValue;
  return value;
}
