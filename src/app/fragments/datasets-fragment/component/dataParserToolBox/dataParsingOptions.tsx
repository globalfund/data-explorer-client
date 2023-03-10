import { Box } from "@material-ui/core";
import SimpleSelect from "app/components/Select/simple/simpleSelect";
import { setConfig } from "next/config";
import React from "react";
import { css } from "styled-components/macro";

const optionscss = css`
  p {
    font-size: 24px;
    color: #231d2c;
    font-family: "Inter";
  }
  input {
    background: #ffffff;
    width: 10px;

    border: none;
    outline: none;
  }
  button {
    background: #e4e4e4;
    border-radius: 30px;
    padding: 12px 27px;
    height: 41px;
    font-weight: 500;
    font-size: 14px;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 125px;
    cursor: pointer;
    color: #231d2c;
    text-transform: uppercase;
    :hover {
      background: #231d2c;
      color: #fff;
    }
  }
`;
const optionFlexcss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  p {
    font-weight: 500;
    font-size: 14px;
    color: #231d2c;
  }
`;
const buttonFlexcss = css`
  display: flex;
  justify-content: flex-end;
  /* margin-top: 18rem; */
  gap: 1rem;
`;
const inputBoxcss = css`
  background: #ffffff;
  width: 43px;
  height: 43px;
  border: 1px solid #231d2c;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DataParsingOptions() {
  const [columnSeparatorValue, setColumnSeparatorValue] = React.useState("tab");
  const handleColumnSeparatorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setColumnSeparatorValue(event.target.value as string);
  };
  const columnSeparatorMenu = [{ value: "tab", label: "Tab" }];

  const [dateLocaleValue, setDateLocaleValue] = React.useState("en");
  const handleDateLocaleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDateLocaleValue(event.target.value as string);
  };
  const dateLocaleMenu = [{ value: "en", label: "en-US" }];

  const [stackOnValue, setStackOnValue] = React.useState("row");
  const handleStackOnChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setStackOnValue(event.target.value as string);
  };

  const stackOnMenu = [
    { value: "column", label: "Column" },
    { value: "row", label: "Row" },
  ];
  return (
    <div css={optionscss}>
      <Box height={38} />
      <p>Data Parsing Options</p>
      <Box height={20} />
      <div css={optionFlexcss}>
        <div>
          <p>Column separator</p>
        </div>
        <div>
          <SimpleSelect
            handleChange={handleColumnSeparatorChange}
            menuItems={columnSeparatorMenu}
            setValue={setColumnSeparatorValue}
            value={columnSeparatorValue}
          />
        </div>
      </div>
      <div css={optionFlexcss}>
        <div>
          <p>Thousands separator</p>
        </div>
        <div css={inputBoxcss}>
          <input type="text" placeholder="," />
        </div>
      </div>{" "}
      <div css={optionFlexcss}>
        <div>
          <p>Decimals separator</p>
        </div>
        <div css={inputBoxcss}>
          <input type="text" placeholder="." />
        </div>
      </div>{" "}
      <div css={optionFlexcss}>
        <div>
          <p>Date Locale</p>
        </div>
        <div>
          <SimpleSelect
            handleChange={handleDateLocaleChange}
            menuItems={dateLocaleMenu}
            setValue={setDateLocaleValue}
            value={dateLocaleValue}
          />
        </div>
      </div>
      <Box height={20} />
      <hr
        css={`
          border: 1px solid #e4e4e4;
          width: 333px;
          margin: auto;
        `}
      />
      <Box height={25} />
      <p>Data Transformation</p>
      <div css={optionFlexcss}>
        <div>
          <p>Stack on</p>
        </div>
        <div>
          <SimpleSelect
            handleChange={handleStackOnChange}
            menuItems={stackOnMenu}
            setValue={setStackOnValue}
            value={stackOnValue}
          />
        </div>
      </div>
      <Box height={155} />
      <div css={buttonFlexcss}>
        <button type="button">Skip</button>
        <button type="button">Save</button>
      </div>
      <Box height={85} />
    </div>
  );
}
