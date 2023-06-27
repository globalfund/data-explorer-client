import { ReactComponent as AITemplateImg } from "../../asset/aiTemplate-img.svg";
import { ReactComponent as BlankTemplateImg } from "../../asset/blankTemplate-img.svg";
import { ReactComponent as AdvancedTemplateImg } from "../../asset/advancedTemplate-img.svg";

export interface ReportInitialViewProps {
  buttonActive: boolean;
  resetReport: () => void;
  setButtonActive: (active: boolean, type: "basic" | "advanced" | "ai") => void;
}

export interface ReportTemplateModel {
  name: string;
  description: string;
  templateImg: React.ReactNode;
  value: "basic" | "advanced" | "ai";
  available?: boolean;
}

export const templates: ReportTemplateModel[] = [
  {
    name: "Basic template report",
    description: "A basic template to create your report",
    value: "basic",
    templateImg: <BlankTemplateImg />,
    available: true,
  },
  {
    name: "Advanced template report",
    description: "An advanced template to create your report",
    value: "advanced",
    templateImg: <AdvancedTemplateImg />,
    available: true,
  },
  {
    name: "AI-powered template",
    description: "Use AI to create your report",
    value: "ai",
    templateImg: <AITemplateImg />,
    available: false,
  },
];

export const TemplateItem = ({
  name,
  value,
  description,
  currentValue,
  handleClick,
  templateImg,
  available,
}: ReportTemplateModel & {
  currentValue: string;
  handleClick: () => void;
}) => {
  return (
    <div
      css={`
        height: 125px;
        position: relative;
        padding: 12px 16px;
        background: #f2f7fd;
        pointer-events: ${available ? "auto" : "none"};
        border: 1px solid ${value === currentValue ? "#6061e5" : "transparent"};

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
      {!available && (
        <div
          css={`
            top: 16px;
            right: 14px;
            font-size: 12px;
            padding: 1px 6px;
            line-height: 14px;
            position: absolute;
            border-radius: 10px;
            border: 1px solid #000;
          `}
        >
          Coming soon!
        </div>
      )}
    </div>
  );
};
