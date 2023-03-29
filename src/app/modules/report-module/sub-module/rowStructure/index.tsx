import { Grid } from "@material-ui/core";
import {
  IRowFrameStructure,
  rowFrameStructureAtom,
} from "app/state/recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import { RowStructureProps } from "./rowstructureSampleBlock";

interface Props {
  rowType: string;
  rowId: string;
}
interface RowStructureDisplayProps {
  rowstructureType: IRowFrameStructure;
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const [rowstructure, setRowStructure] = React.useState<Props[]>([]);

  const [gridTemplateArrangement, setGridTemplateArrangement] = React.useState({
    gridTemplateColumns: "",
    gap: "",
    height: "",
  });

  React.useEffect(() => {
    if (props.rowstructureType.rowType === "") {
      return;
    }

    if (props.rowstructureType.rowType === "oneByOne") {
      setGridTemplateArrangement({
        gridTemplateColumns: "1fr",
        gap: "auto",
        height: "360.63px",
      });
      setRowStructure([{ rowType: "oneByOne", rowId: "" }]);
    }
    if (props.rowstructureType.rowType === "oneByTwo") {
      setGridTemplateArrangement({
        gridTemplateColumns: "auto auto",
        gap: "60.59px",
        height: "360.63px",
      });
      setRowStructure(Array(2).fill({ rowType: "oneByTwo", rowId: "" }));
    }

    if (props.rowstructureType.rowType === "oneByThree") {
      setGridTemplateArrangement({
        gridTemplateColumns: "27.79% auto auto",
        gap: "68.2px",
        height: "360.63px",
      });
      setRowStructure(Array(3).fill({ rowType: "oneByThree", rowId: "" }));
    }

    if (props.rowstructureType.rowType === "oneByFour") {
      setGridTemplateArrangement({
        gridTemplateColumns: "19.68% auto auto auto",
        gap: "60.59px",
        height: "122.61px",
      });
      setRowStructure(Array(4).fill({ rowType: "oneByFour", rowId: "" }));
    }

    if (props.rowstructureType.rowType === "oneByFive") {
      setGridTemplateArrangement({
        gridTemplateColumns: "auto auto auto  auto auto",
        gap: "60.81px",
        height: "121.67px",
      });
      setRowStructure(Array(5).fill({ rowType: "oneByFive", rowId: "" }));
    }

    if (props.rowstructureType.rowType === "oneToFour") {
      setGridTemplateArrangement({
        gridTemplateColumns: "36% auto",
        gap: "60.95px",
        height: "360.63px",
      });
      setRowStructure(Array(2).fill({ rowType: "oneToFour", rowId: "" }));
    }

    if (props.rowstructureType.rowType === "fourToOne") {
      setGridTemplateArrangement({
        gridTemplateColumns: " auto 36%",
        gap: "60.95px",
        height: "360.63px",
      });
      setRowStructure(Array(2).fill({ rowType: "fourToOne", rowId: "" }));
    }
  }, [props.rowstructureType.rowType]);

  return (
    <div
      css={`
        width: 916px;
        margin-bottom: 50px;
      `}
    >
      <div
        css={`
          width: 100%;
          display: grid;
          grid-template-columns: ${gridTemplateArrangement.gridTemplateColumns};
          gap: ${gridTemplateArrangement.gap};
        `}
      >
        {rowstructure.map((row) => (
          <div
            css={`
              height: ${gridTemplateArrangement.height};
              background: #dfe3e6;
            `}
            id={row.rowId}
          >
            <p
              css={`
                font-weight: 325;
                font-size: 8.65512px;
                color: #495057;
                text-align: center;
                width: 117.57px;
                margin: auto;
              `}
            >
              Drag and drop content here
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
