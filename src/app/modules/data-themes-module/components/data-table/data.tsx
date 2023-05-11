import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";

export interface DataThemesDataTableProps {
  data: { [key: string]: number | string | null }[];
  stats: {
    name: string;
    type: "percentage" | "bar" | "unique";
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

export function getColumnsFromData(
  data: { [key: string]: number | string | null }[],
  containerWidth?: number
) {
  const columns: { [key: string]: string } = {};
  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!columns[key]) {
        columns[key] = key;
      }
    });
  });
  const equalDistribution =
    ((containerWidth || 0) - 32 - 1) / Object.keys(columns).length;
  const columnWidth = equalDistribution
    ? Math.max(equalDistribution, 170)
    : 170;
  return [
    {
      name: "",
      key: "_id",
      frozen: true,
      sortable: true,
      cellClass: "data-themes-table-id-cell",
      headerCellClass: "data-themes-table-header-cell",
      headerRenderer: ({ ...props }) => (
        <div
          onClick={props.onSort}
          css={`
            width: 100%;
            height: 100%;
            display: flex;
            cursor: pointer;
            position: relative;
            align-items: center;
            justify-content: flex-end;

            &:after {
              width: 16px;
              height: 1rem;
              content: " ";
              display: flex;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
              ${
                props.sortDirection === "ASC"
                  ? "background-image: url('/icons/arrow-up.svg');"
                  : ""
              }
              ${
                props.sortDirection === "DESC"
                  ? "background-image: url('/icons/arrow-down.svg');"
                  : ""
              }
              ${
                props.sortDirection === undefined
                  ? "opacity: 0.3;background-image: url('/icons/arrow-down-up.svg');"
                  : ""
              }
          `}
        />
      ),
    },
    ...Object.keys(columns).map((key) => {
      return {
        key,
        sortable: true,
        resizable: true,
        width: columnWidth,
        headerRenderer: HeaderRenderer,
        cellClass: "data-themes-table-cell",
        _type: getFieldDataType(data[0][key]),
        headerCellClass: "data-themes-table-header-cell",
        name: splitStrBasedOnCapitalLetters(key).replace(/_/g, ""),
      };
    }),
  ];
}
