import { Box, Container } from "@material-ui/core";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import HeaderBlock from "../../sub-module/components/headerBlock";
import RowFrame from "../../sub-module/rowStructure/rowFrame";
import RowstructureDisplay from "../../sub-module/rowStructure";
import { ReportElmentsType } from "../../components/right-panel-create-view";
import { useDrop } from "react-dnd";
import AddRowFrameButton from "../../sub-module/rowStructure/addRowFrameButton";
import { v4 } from "uuid";

export interface IFramesArray {
  frame: JSX.Element;
  id: string;
}

export function ReportCreateView(props: {
  open: boolean;
  reportType: "basic" | "advanced";
}) {
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  const [headerDetails, setHeaderDetails] = React.useState({
    title: "",
    description: "",
  });
  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([
    {
      frame: <RowFrame deleteFrame={() => deleteFrame(0)} />,
      id: v4(),
    },
  ]);

  function deleteFrame(index: number) {
    setFramesArray((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }

  React.useEffect(() => {
    if (props.reportType === "advanced") {
      setFramesArray([
        {
          frame: (
            <RowFrame
              forceSelectedType="oneByFive"
              deleteFrame={() => deleteFrame(0)}
            />
          ),
          id: v4(),
        },
        {
          frame: (
            <RowFrame
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(1)}
            />
          ),
          id: v4(),
        },
        {
          frame: (
            <RowFrame
              forceSelectedType="oneToFour"
              deleteFrame={() => deleteFrame(2)}
            />
          ),
          id: v4(),
        },
        {
          frame: (
            <RowFrame
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(3)}
            />
          ),
          id: v4(),
        },
        {
          frame: (
            <RowFrame
              forceSelectedType="oneByThree"
              deleteFrame={() => deleteFrame(4)}
            />
          ),
          id: v4(),
        },
      ]);
    }
  }, [props.reportType]);

  return (
    <div>
      <HeaderBlock
        previewMode={false}
        headerDetails={headerDetails}
        setHeaderDetails={setHeaderDetails}
      />
      <Container maxWidth="lg">
        <div
          css={`
            transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            width: ${props.open
              ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
              : "100%"};

            @media (max-width: 1280px) {
              width: calc(100vw - 400px);
            }
          `}
        >
          <Box height={50} />
          {framesArray.map((frame) => {
            return (
              <div key={frame.id}>
                <div>{frame.frame}</div>
                <PlaceHolder
                  setFramesArray={setFramesArray}
                  index={frame.id}
                  framesArray={framesArray}
                  deleteFrame={deleteFrame}
                />
              </div>
            );
          })}
          <Box height={45} />
          <AddRowFrameButton
            deleteFrame={deleteFrame}
            framesArray={framesArray}
            setFramesArray={setFramesArray}
            rowStructureType={rowStructureType}
            setRowStructureType={setRowStructuretype}
          />
        </div>
      </Container>
    </div>
  );
}

export const PlaceHolder = (props: {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  index: string;
  disableAddrowStructureButton?: boolean;
  deleteFrame: (index: number) => void;
}) => {
  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: [ReportElmentsType.DIVIDER, ReportElmentsType.ROWFRAME],
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem() as any,
    }),
    drop: (item: any, monitor) => {
      if (item.type == ReportElmentsType.ROWFRAME) {
        props.setFramesArray((prev) => {
          const tempIndex = prev.findIndex((frame) => frame.id == props.index);
          prev.splice(tempIndex + 1, 0, {
            frame: (
              <RowFrame deleteFrame={() => props.deleteFrame(tempIndex + 1)} />
            ),
            id: v4(),
          });
          return [...prev];
        });
      } else {
        return props.setFramesArray((prev) => {
          const tempIndex = prev.findIndex((frame) => frame.id == props.index);

          prev.splice(tempIndex + 1, 0, {
            frame: (
              <hr
                css={`
                  border: 1px solid #e4e4e4;
                  margin: 20px 0;
                `}
              />
            ),
            id: v4(),
          });
          return [...prev];
        });
      }
    },
  }));

  return (
    <>
      <div
        ref={drop}
        css={`
          height: 10px;
          width: 100%;
          background-color: ${isOver ? " #262C34;" : "transparent"};
        `}
      />
    </>
  );
};
