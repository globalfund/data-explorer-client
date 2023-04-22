import { EditorState } from "draft-js";

export interface IFramesArray {
  id: string;
  frame: JSX.Element;
  content: (object | string | null)[];
  contentTypes: ("text" | "divider" | "chart" | null)[];
  structure:
    | null
    | "oneByOne"
    | "oneByTwo"
    | "oneByThree"
    | "oneByFour"
    | "oneByFive"
    | "oneToFour"
    | "fourToOne";
}

export interface ReportCreateViewProps {
  open: boolean;
  reportType: "basic" | "advanced";
  pickedCharts: string[];
  setPickedCharts: React.Dispatch<React.SetStateAction<string[]>>;
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  deleteFrame: (id: string) => void;
  framesArray: IFramesArray[];
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
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => void;
}

export interface PlaceholderProps {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  index: string;
  disableAddrowStructureButton?: boolean;
  deleteFrame: (id: string) => void;
  rowId: string;
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => void;
}
