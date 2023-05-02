import { ReactComponent as BlankTemplateImg } from "../../asset/blankTemplate-img.svg";
import { ReactComponent as AdvancedTemplateImg } from "../../asset/advancedTemplate-img.svg";

export interface ReportInitialViewProps {
  buttonActive: boolean;
  resetFrames: () => void;
  setButtonActive: (active: boolean, type: "basic" | "advanced") => void;
}

export interface ReportSearchResultModel {
  name: string;
  description: string;
  value: "basic" | "advanced";
  templateImg: React.ReactNode;
}

export const searchResultOptions: ReportSearchResultModel[] = [
  {
    name: "Basic template report",
    description: "A basic template to create your report",
    value: "basic",
    templateImg: <BlankTemplateImg />,
  },
  {
    name: "Advanced template report",
    description: "An advanced template to create your report",
    value: "advanced",
    templateImg: <AdvancedTemplateImg />,
  },
];

export const TemplateItem = ({
  name,
  value,
  description,
  currentValue,
  handleClick,
  templateImg,
}: ReportSearchResultModel & {
  currentValue: string;
  handleClick: () => void;
}) => {
  return (
    <div
      css={`
        padding: 12px 16px;
        background: #f2f7fd;
        border: 1px solid ${value === currentValue ? "#6061e5" : "transparent"};
        width: 89%;
        height: 125px;
        &:hover {
          cursor: pointer;
          border-color: #6061e5;
        }
      `}
      onClick={handleClick}
    >
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
        `}
      >
        <p
          css={`
            margin: 0px;
            font-size: 14px;
            color: #262c34;
          `}
        >
          <b>{name}</b>
        </p>
        <p
          css={`
            font-size: 10px;
            margin-top: -3px;
            font-weight: normal;
            color: #495057;
          `}
        >
          {" "}
          {description}
        </p>
      </div>

      <div />
      <div>{templateImg}</div>
    </div>
  );
};
