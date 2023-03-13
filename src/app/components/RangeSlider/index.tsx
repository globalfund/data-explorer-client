import React from "react";
import styled from "styled-components/macro";
import { Range, useThumbOverlap } from "react-range";
import { IThumbProps, ITrackProps } from "react-range/lib/types";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export const THUMB_SIZE = 15;

export const Container = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  padding-right: 30px;
  justify-content: flex-end;

  > div {
    margin-right: 20px;
  }

  @media (max-width: 767px) {
    padding-right: 0;
    align-items: flex-start;
    justify-content: space-between;

    > div {
      margin-right: 0;
      width: calc(100% - 30px) !important;
    }
  }
`;

export const ThumbLabel = (props: any) => {
  const [labelValue, style] = useThumbOverlap(
    props.rangeRef1,
    props.values,
    props.index
  );
  const labels = labelValue.toString().split("-");
  return (
    <div
      data-label={props.index}
      style={{
        top: "-28px",
        color: "#fff",
        display: "block",
        fontSize: "10px",
        padding: "0 10px",
        fontWeight: "bold",
        borderRadius: "3px",
        whiteSpace: "nowrap",
        position: "absolute",
        backgroundColor: "#231d2c",
        ...(style as React.CSSProperties),
      }}
    >
      {props.raw
        ? labelValue.toString().replace(".0", "")
        : labels
            .map((label) => formatFinancialValue(parseInt(label.trim(), 10)))
            .join(" - ")}
    </div>
  );
};

export const Track = (params: {
  props: ITrackProps;
  children: React.ReactNode;
  isDragged: boolean;
  disabled: boolean;
}) => (
  <div
    {...params.props}
    ref={params.props.ref}
    style={{
      ...params.props.style,
      height: "6px",
      borderRadius: "20px",
      width: "calc(100% - 50px)",
      background: `linear-gradient(to right, #fff,#7e8a96,#0a0b0c)`,
    }}
  >
    {params.children}
  </div>
);

interface RangeSliderProps {
  min: number;
  max: number;
  onValuesChange: (values: number[]) => void;
}

export function RangeSlider(props: RangeSliderProps) {
  const rangeRef = React.useRef();
  const [localValues, setLocalValues] = React.useState([props.min, props.max]);

  React.useEffect(
    () => setLocalValues([props.min, props.max]),
    [props.min, props.max]
  );

  return (
    <Container>
      {props.min < props.max && (
        <Range
          min={props.min}
          max={props.max}
          step={0.1}
          // @ts-ignore
          ref={rangeRef}
          renderTrack={Track}
          values={localValues}
          onChange={setLocalValues}
          onFinalChange={props.onValuesChange}
          renderThumb={(params: {
            props: IThumbProps;
            value: number;
            index: number;
            isDragged: boolean;
          }) => (
            <div
              {...params.props}
              style={{
                ...params.props.style,
                height: `${THUMB_SIZE}px`,
                width: `${THUMB_SIZE}px`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                outline: "none",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <ThumbLabel
                rangeRef1={rangeRef.current}
                values={localValues}
                index={params.index}
              />
            </div>
          )}
        />
      )}
    </Container>
  );
}
