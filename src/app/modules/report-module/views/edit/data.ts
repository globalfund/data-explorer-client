import { EditorState } from "draft-js";
import { IFramesArray } from "app/modules/report-module/views/create";

export interface ReportEditViewProps {
  open: boolean;
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
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
    rowIndex: number,
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
