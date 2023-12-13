import { EditorState } from "draft-js";

export interface IRowFrame {
  rowIndex: number;
  rowId: string;
  forceSelectedType?: string;
  setPickedCharts?: (value: React.SetStateAction<any[]>) => void;
  type: "rowFrame" | "divider";
  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
}

export type RowStructureType =
  | null
  | "oneByOne"
  | "oneByTwo"
  | "oneByThree"
  | "oneByFour"
  | "oneToFour"
  | "fourToOne"
  | "twoToThree"
  | "threeToTwo";

export interface IFramesArray {
  id: string;
  frame: IRowFrame;
  contentWidths: number[];
  contentHeights: number[];
  content: (object | string | null)[];
  contentTypes: ("text" | "divider" | "chart" | "image" | null)[];
  structure: RowStructureType;
  isHandleOpen?: boolean;
}

export interface ReportCreateViewProps {
  open: boolean;
  view: "initial" | "edit" | "create" | "preview" | "ai-template";

  reportType: "basic" | "advanced" | "ai";
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  deleteFrame: (id: string) => void;
  framesArray: IFramesArray[];
  handlePersistReportState: () => void;
  headerDetails: {
    title: string;
    showHeader: boolean;
    description: EditorState;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  setHeaderDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      showHeader: boolean;
      description: EditorState;
      backgroundColor: string;
      titleColor: string;
      descriptionColor: string;
      dateColor: string;
    }>
  >;

  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}

export interface PlaceholderProps {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  index: string;
  disableAddrowStructureButton?: boolean;
  deleteFrame: (id: string) => void;
  rowId: string;
  handlePersistReportState: () => void;

  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}
