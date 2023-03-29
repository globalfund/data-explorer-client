import { Box, Container } from "@material-ui/core";
import { rowFrameStructureAtom } from "app/state/recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import AddRowStructureBlockButton from "../../sub-module/rowStructure/addRowStructureBlockButton";
import HeaderBlock from "../../sub-module/components/headerBlock";
import RowStructuresSampleBlock from "../../sub-module/rowStructure/rowstructureSampleBlock";
import RowstructureDisplay from "../../sub-module/rowStructure";

export interface IFramesArray {
  frame: JSX.Element;
}
export function ReportCreateView() {
  const [rowstructureType, setRowStructuretype] = useRecoilState(
    rowFrameStructureAtom
  );

  const [headerDetails, setHeaderDetails] = React.useState({
    title: "",
    description: "",
  });
  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([
    { frame: <RowStructuresSampleBlock /> },
  ]);
  const [firstRender, setFirstRender] = React.useState(true);

  React.useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (rowstructureType.rowType === "") {
      return;
    }
    const newFramesArray = framesArray.map((frameItem, index) => {
      if (index === framesArray.length - 1) {
        return {
          ...frameItem,
          frame: <RowstructureDisplay rowstructureType={rowstructureType} />,
        };
      }
      return frameItem;
    });
    setFramesArray(newFramesArray);
  }, [rowstructureType.rowType]);

  return (
    <div>
      <HeaderBlock
        previewMode={false}
        headerDetails={headerDetails}
        setHeaderDetails={setHeaderDetails}
      />
      <Container maxWidth="lg">
        <Box height={50} />
        {framesArray.map((frame, index) => {
          return <div key={index}>{frame.frame}</div>;
        })}
        <Box height={45} />

        <AddRowStructureBlockButton
          framesArray={framesArray}
          setFramesArray={setFramesArray}
        />
      </Container>
    </div>
  );
}
