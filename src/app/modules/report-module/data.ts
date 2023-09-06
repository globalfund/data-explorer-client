import { EditorState, convertToRaw, RawDraftContentState } from "draft-js";

export interface ReportModel {
  id: string;
  name: string;
  title: string;
  public: boolean;
  showHeader: boolean;
  subTitle: RawDraftContentState;
  rows: {
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive";

    items: (object | string)[];
    contentWidths: {
      id: string;
      widths: number[];
    };
    contentHeights: {
      id: string;
      heights: number[];
    };
  }[];
  createdDate: Date;
  backgroundColor: string;
  titleColor: string;
  descriptionColor: string;

  dateColor: string;
}

export interface ReportContentWidthsType {
  id: string;
  widths: number[];
}
export interface ReportContentHeightsType {
  id: string;
  heights: number[];
}

export const emptyReport: ReportModel = {
  id: "",
  name: "",
  title: "",
  public: false,
  subTitle: convertToRaw(EditorState.createEmpty().getCurrentContent()),
  showHeader: false,
  rows: [],
  createdDate: new Date(),
  backgroundColor: "#252c34",
  titleColor: "#ffffff",
  descriptionColor: "#ffffff",

  dateColor: "#ffffff",
};

export const itemSpacing = "30px";
export const containerGap = "60px";
