import { Editor } from "@tiptap/react";
import { action, Action } from "easy-peasy";

export interface RBReportItem {
  id: string;
  type:
    | "text"
    | "chart"
    | "table"
    | "image"
    | "kpi_box"
    | "grid"
    | "column"
    | "section_divider";
  extra?: any;
}

export interface RBReportItemsModel {
  items: RBReportItem[];
  clearItems: Action<RBReportItemsModel>;
  addItem: Action<RBReportItemsModel, RBReportItem>;
  removeItem: Action<RBReportItemsModel, string>;
  setItems: Action<RBReportItemsModel, RBReportItem[]>;
  editItem: Action<RBReportItemsModel, RBReportItem>;
}

export interface RBReportRTEModel {
  content: string;
  setContent: Action<RBReportRTEModel, string>;
  activeRTE: Editor | null;
  setActiveRTE: Action<RBReportRTEModel, Editor | null>;
}

export interface RBReportItemOrderModel {
  isDragging: boolean;
  itemId: string | null;
  setIsDragging: Action<
    RBReportItemOrderModel,
    { isDragging: boolean; rowId: string | null }
  >;
}

export interface RBReportSettingsModel {
  width: number;
  setWidth: Action<RBReportSettingsModel, number>;
  height: number;
  setHeight: Action<RBReportSettingsModel, number>;
  vPadding: number;
  setVPadding: Action<RBReportSettingsModel, number>;
  hPadding: number;
  setHPadding: Action<RBReportSettingsModel, number>;
  stroke: number;
  setStroke: Action<RBReportSettingsModel, number>;
  strokeColor: string;
  setStrokeColor: Action<RBReportSettingsModel, string>;
  resetSettings: Action<RBReportSettingsModel>;
}

export interface RBReportNotesModel {
  value: string;
  setValue: Action<RBReportNotesModel, string>;
}

export const RBReportItemsState: RBReportItemsModel = {
  items: [],
  addItem: action((state, payload) => {
    state.items.push(payload);
  }),
  removeItem: action((state, payload) => {
    state.items = state.items.filter((item) => item.id !== payload);
  }),
  setItems: action((state, payload) => {
    state.items = payload;
  }),
  clearItems: action((state) => {
    state.items = [];
  }),
  editItem: action((state, payload) => {
    const index = state.items.findIndex((item) => item.id === payload.id);
    if (index !== -1) {
      state.items[index] = payload;
    }
  }),
};

export const RBReportRTEState: RBReportRTEModel = {
  content: "",
  setContent: action((state, payload) => {
    state.content = payload;
  }),
  activeRTE: null,
  setActiveRTE: action((state, payload) => {
    state.activeRTE = payload;
  }),
};

export const RBReportItemOrderState: RBReportItemOrderModel = {
  itemId: null,
  isDragging: false,
  setIsDragging: action((state, payload) => {
    state.itemId = payload.rowId;
    state.isDragging = payload.isDragging;
  }),
};

export const RBReportSettings: RBReportSettingsModel = {
  width: 0,
  setWidth: action((state, payload) => {
    state.width = payload;
  }),
  height: 0,
  setHeight: action((state, payload) => {
    state.height = payload;
  }),
  vPadding: 50,
  setVPadding: action((state, payload) => {
    state.vPadding = payload;
  }),
  hPadding: 50,
  setHPadding: action((state, payload) => {
    state.hPadding = payload;
  }),
  stroke: 0,
  setStroke: action((state, payload) => {
    state.stroke = payload;
  }),
  strokeColor: "#000000",
  setStrokeColor: action((state, payload) => {
    state.strokeColor = payload;
  }),
  resetSettings: action((state) => {
    state.width = 0;
    state.height = 0;
    state.vPadding = 50;
    state.hPadding = 50;
    state.stroke = 0;
    state.strokeColor = "#000000";
  }),
};

export const RBReportNotesState: RBReportNotesModel = {
  value: "",
  setValue: action((state, payload) => {
    state.value = payload;
  }),
};
