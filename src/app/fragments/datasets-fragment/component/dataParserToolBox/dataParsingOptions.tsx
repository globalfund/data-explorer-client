import { Box } from "@material-ui/core";
import { SelectWithIcon } from "app/components/Select/selectWithIcon";
import SimpleSelect from "app/components/Select/simpleSelect";
import React from "react";
import { css } from "styled-components/macro";
import { optionscss, optionFlexcss, inputBoxcss, buttonFlexcss } from "./style";

interface Props {
  handleNext: () => void;
}

export default function DataParsingOptions(props: Props) {
  const [columnSeparatorValue, setColumnSeparatorValue] = React.useState("tab");
  const handleColumnSeparatorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setColumnSeparatorValue(event.target.value as string);
  };
  const columnSeparatorMenu = [
    {
      value: "tab",
      label: "Tab",
      icon: (
        <span
          css={`
            width: 24px;
            height: 25px;
            background: #dadaf8;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 500;
          `}
        >
          {" "}
          \t
        </span>
      ),
    },
  ];

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
          <SelectWithIcon
            handleChange={handleColumnSeparatorChange}
            menuItems={columnSeparatorMenu}
            setValue={setColumnSeparatorValue}
            value={columnSeparatorValue}
            width="141px"
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
            width="121px"
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
            width="121px"
          />
        </div>
      </div>
      <Box height={155} />
      <div css={buttonFlexcss}>
        <button type="button" onClick={props.handleNext}>
          Apply
        </button>
      </div>
      <Box height={85} />
    </div>
  );
}
