import React from "react";
import { useRecoilValue } from "recoil";
import { reportContentIsResizingAtom } from "app/state/recoil/atoms";

export const COLUMN_WIDTH = 40;
export const COLUMN_GAP = 10;

export function GridColumns() {
  const isResizing = useRecoilValue(reportContentIsResizingAtom);

  if (!isResizing) return null;

  const contentContainer = document.getElementById("content-container");

  let numberOfColumns = 0;
  if (contentContainer) {
    numberOfColumns = Math.round(
      Math.round(
        contentContainer.offsetWidth / ((COLUMN_WIDTH + COLUMN_GAP) / 2)
      ) /
        2 +
        1
    );
  }

  return (
    <div
      css={`
        top: 0;
        width: 100%;
        height: 100%;
        max-width: 100%;
        overflow: hidden;
        position: absolute;
        pointer-events: none;
      `}
    >
      {Array(numberOfColumns)
        .fill(null)
        .map((_, i) => (
          <div
            key={`grid-column-${i}`}
            css={`
              top: 0;
              opacity: 0.25;
              min-height: 100%;
              position: absolute;
              background: #d9d9d9;
              pointer-events: none;
            `}
            style={{
              left: i * COLUMN_GAP + i * COLUMN_WIDTH,
              width: COLUMN_WIDTH,
            }}
          />
        ))}
    </div>
  );
}
