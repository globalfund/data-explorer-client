export interface ReportInitialViewProps {
  buttonActive: boolean;
  resetFrames: () => void;
  setButtonActive: (active: boolean, type: "basic" | "advanced") => void;
}

export interface ReportSearchResultModel {
  name: string;
  description: string;
  value: "basic" | "advanced";
}

export const searchResultOptions: ReportSearchResultModel[] = [
  {
    name: "Basic template",
    description: "A basic template to create your report",
    value: "basic",
  },
  {
    name: "Advanced template",
    description: "An advanced template to create your report",
    value: "advanced",
  },
];

export const TemplateItem = ({
  name,
  value,
  description,
  currentValue,
  handleClick,
}: ReportSearchResultModel & {
  currentValue: string;
  handleClick: () => void;
}) => {
  return (
    <div
      css={`
        padding: 16px;
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
        {name}
      </div>
      <div
        css={`
          font-size: 10px;
        `}
      >
        {description}
      </div>
    </div>
  );
};
