import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";

type DataType = number | string | null;
type DatastatsType = "bar" | "percentage" | "unique";

export interface DataTableProps {
  data: { [key: string]: DataType }[];
  stats: {
    name: string;
    type: DatastatsType;
    data: { name: string; value: number }[];
  }[];
}

const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};

function HeaderRenderer({ ...props }) {
  const { column, onSort, sortDirection } = props;
  const { _type } = column;

  return (
    <div
      css={`
        height: 100%;
        display: flex;
        cursor: pointer;
        position: relative;
        align-items: center;
        justify-content: space-between;

        &:after {
          width: 16px;
          height: 1rem;
          content: " ";
          display: flex;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          ${sortDirection === "ASC"
            ? "background-image: url('/icons/arrow-up.svg');"
            : ""}
          ${sortDirection === "DESC"
            ? "background-image: url('/icons/arrow-down.svg');"
            : ""}
          ${sortDirection === undefined
            ? "opacity: 0.3;background-image: url('/icons/arrow-down-up.svg');"
            : ""}
        }
      `}
    >
      <div
        css={`
          width: 24px;
          height: 24px;
          display: flex;
          background: #fff;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
        `}
      >
        <span
          css={`
            width: 16px;
            height: 16px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url(${typeIcon[
              _type as "string" | "number" | "date"
            ]});
          `}
        />
      </div>
      <div
        title={column.name}
        onClick={onSort}
        css={`
          overflow: clip;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: calc(100% - 60px);
          text-transform: capitalize;
        `}
      >
        {column.name}
      </div>
    </div>
  );
}

function getFieldDataType(field: string | number | null) {
  if (field === null) {
    return "string";
  }
  if (typeof field === "number") {
    return "number";
  }
  if (new Date(field).toString() !== "Invalid Date") {
    return "date";
  }
  return "string";
}
