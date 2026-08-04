import type { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";

export const prepareReportItemsForSave = (
  items: RBReportItem[],
): RBReportItem[] => {
  // Remove any properties that are not needed for saving the report items
  // There are not any for now, but this function is here for future-proofing in case we need to remove any properties in the future
  return items;
};

export const hydrateReportItems = (items: RBReportItem[]): RBReportItem[] => {
  // Add any properties that are needed for the editor state
  // There are not any for now, but this function is here for future-proofing in case we need to add any properties in the future
  return items;
};

export const persistedReportItemsChanged = (
  previousItems: RBReportItem[],
  nextItems: RBReportItem[],
): boolean =>
  JSON.stringify(prepareReportItemsForSave(previousItems)) !==
  JSON.stringify(prepareReportItemsForSave(nextItems));
