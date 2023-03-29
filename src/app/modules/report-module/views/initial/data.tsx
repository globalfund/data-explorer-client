import { useHistory } from "react-router-dom";

export interface ReportInitialViewProps {
  setCurrentView: (view: "initial" | "create" | "preview") => void;
}

interface ReportSearchResultModel {
  name: string;
  description: string;
  value: string;
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
  setCurrentView,
}: ReportSearchResultModel & {
  setCurrentView: (view: "initial" | "create" | "preview") => void;
}) => {
  const history = useHistory();
  return (
    <div
      css={`
        padding: 16px;
        border: 1px solid transparent;

        &:hover {
          cursor: pointer;
          border-color: #6061e5;
        }
      `}
      onClick={() => setCurrentView("create")}
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
