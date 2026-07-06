type RawHeatmapItem = {
  x: string;
  y: string;
  size: number;
  [key: string]: any;
};

type HeatmapItem = {
  column: string;
  row: string;
  value: number;
};

type LimitHeatmapOptions = {
  limitRowsToTop?: boolean;
  limitColumnsToTop?: boolean;
  limitRowsToTopValue?: number;
  limitColumnsToTopValue?: number;
  groupRemainderAsOther?: boolean;
  otherLabel?: string;
};

function getTopKeysByTotal<T extends string>(
  totals: Map<T, number>,
  limit: number,
): Set<T> {
  if (!limit || limit < 1) return new Set();

  return new Set(
    [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([key]) => key),
  );
}

export function limitHeatmapData(
  rawData: RawHeatmapItem[],
  options: LimitHeatmapOptions,
): HeatmapItem[] {
  const {
    limitRowsToTop = false,
    limitColumnsToTop = false,
    limitRowsToTopValue = 10,
    limitColumnsToTopValue = 10,
    groupRemainderAsOther = true,
    otherLabel = "Other",
  } = options;

  const data: HeatmapItem[] = rawData.map((item) => ({
    column: item.x,
    row: item.y,
    value: Number(item.size ?? 0),
  }));

  const rowTotals = new Map<string, number>();
  const columnTotals = new Map<string, number>();

  for (const item of data) {
    rowTotals.set(item.row, (rowTotals.get(item.row) ?? 0) + item.value);
    columnTotals.set(
      item.column,
      (columnTotals.get(item.column) ?? 0) + item.value,
    );
  }

  const topRows = limitRowsToTop
    ? getTopKeysByTotal(rowTotals, limitRowsToTopValue)
    : null;

  const topColumns = limitColumnsToTop
    ? getTopKeysByTotal(columnTotals, limitColumnsToTopValue)
    : null;

  const groupedCells = new Map<string, HeatmapItem>();

  for (const item of data) {
    const rowIsLimited = topRows !== null && !topRows.has(item.row);
    const columnIsLimited = topColumns !== null && !topColumns.has(item.column);

    if (!groupRemainderAsOther && (rowIsLimited || columnIsLimited)) {
      continue;
    }

    const row = rowIsLimited ? otherLabel : item.row;
    const column = columnIsLimited ? otherLabel : item.column;

    const key = `${row}|||${column}`;

    const existing = groupedCells.get(key);

    if (existing) {
      existing.value += item.value;
    } else {
      groupedCells.set(key, {
        row,
        column,
        value: item.value,
      });
    }
  }

  return [...groupedCells.values()];
}
