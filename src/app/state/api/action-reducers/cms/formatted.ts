/* eslint-disable no-param-reassign */
import { action } from "easy-peasy";
import { CMSFormattedCollectionsModel } from "app/state/api/interfaces";

export const formattedCollections: CMSFormattedCollectionsModel = {
  countrySummary: {},
  setPagesData: action((state, payload) => {
    state.countrySummary = payload.countrySummary;
  }),
};
