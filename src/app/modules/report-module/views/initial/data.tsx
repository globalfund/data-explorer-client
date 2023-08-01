import { ReactComponent as AITemplateImg } from "../../asset/aiTemplate-img.svg";
import { ReactComponent as BlankTemplateImg } from "../../asset/blankTemplate-img.svg";
import { ReactComponent as AdvancedTemplateImg } from "../../asset/advancedTemplate-img.svg";
import { ReactComponent as RightArrowIcon } from "../../asset/rightArrow.svg";

export interface ReportInitialViewProps {
  buttonActive: boolean;
  resetReport: () => void;
  setButtonActive: (type: "basic" | "advanced" | "ai") => void;
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
    name: "Blank template report",
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
  handleClick,
  templateImg,
  available,
}: ReportTemplateModel & {
  handleClick: () => void;
}) => {
  return (
    <div
      css={`
        height: 125px;
        width: 85%;
        position: relative;
        padding: 12px 16px;
        background: #f2f7fd;
        &:hover {
          cursor: pointer;

          button {
            cursor: pointer;
            background: #6061e5;
          }
        }
      `}
      onClick={handleClick}
    >
      <div>
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
            {description}
          </p>
        </div>

        <div />
        <div>{templateImg}</div>
      </div>
      <div>
        {!available && (
          <div
            css={`
              top: 16px;
              right: 14px;
              position: absolute;
              font-size: 12px;
              padding: 1px 6px;
              line-height: 14px;
              border-radius: 10px;
              border: 1px solid #000;
            `}
          >
            Coming soon!
          </div>
        )}
        <button
          css={`
            bottom: 16px;
            right: 14px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5.96px;
            outline: none;
            border: none;
            background: #231d2c;
            border-radius: 17.8756px;
            height: 24.3px;
            width: 99px;
            padding: 7.15026px 10px;
            color: #ffffff;
            span {
              font-size: 8.34197px;
              font-weight: 500;
              text-transform: uppercase;
              font-family: "Inter", sans-serif;
            }
          `}
        >
          {value === "ai" ? (
            <span>Want to try it?</span>
          ) : (
            <>
              <span>Use template</span> <RightArrowIcon />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
