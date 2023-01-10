import React from "react";
import ChartOptionSelect from "./ChartOptionSelect";
import { Row, Col } from "react-bootstrap";

const ChartOptionText = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  isEnabled,
  ...props
}) => {
  if (props.options) {
    return (
      <ChartOptionSelect
        value={value}
        error={error}
        onChange={onChange}
        default={defaultValue}
        label={label}
        {...props}
      />
    );
  }
  return (
    <>
      <Row className={props.className}>
        <Col xs={6} className="d-flex align-items-center nowrap">
          {label}
        </Col>
        <Col xs={6}>
          <input
            className="w-100 form-control text-field"
            type="text"
            value={value ?? ""}
            step={props.step}
            disabled={!isEnabled}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={defaultValue}
            css={`
              padding-left: 4px !important;
            `}
          />
        </Col>
        {error && (
          <small>
            <i>{error}</i>
          </small>
        )}
      </Row>
    </>
  );
};

export default React.memo(ChartOptionText);
