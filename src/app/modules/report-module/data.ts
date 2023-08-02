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
  }[];
  createdDate: Date;
  backgroundColor: string;
  titleColor: string;
  descriptionColor: string;
  contentWidths: {
    id: string;
    widths: number[];
  }[];
  contentHeights: {
    id: string;
    heights: number[];
  }[];
  dateColor: string;
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
  contentWidths: [],
  contentHeights: [],
  dateColor: "#ffffff",
};

export const itemSpacing = "30px";
export const containerGap = "60px";
