import React from "react";
import {  Col } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";

import { checkLists } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/data";

const ChartOptionCheckboxes = ({
  value,
  error,
  onChange,
  default: defaultValue,
}) => {
  const [checkFields, setCheckFields] = React.useState(value ?? defaultValue);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckFields({ ...checkFields, [name]: checked });
  };

  React.useEffect(() => {
    onChange(checkFields);
  }, [checkFields]);

  return (
    <>
      {checkLists.map((item) => (
        <div
          key={item.label}
          css={`
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color:#231D2C;
            font-family: 'Roboto', sans-serif;
            font-weight: 500; 
            div:nth-child(2){
              display: flex;
              align-items: center;
              gap:4px;
            }
            svg{
              width: 20px;
              height: 20px;
            }
          `}
        >
          <Col xs={6} className="d-flex align-items-center nowrap">
          <Checkbox
                color="default"
                checked={value[item.label] ?? defaultValue[item.label]}
                name={item.label}
                onChange={handleChange}
              
               
              />
          
            {item.label}
          </Col>

          <div>
            {item.value.map((color, colorIndex) => (
              <div
                key={`${"color" + colorIndex}`}
                css={`
                  width: 26px;
                  height: 26px;
                  border-radius: 50%;
                  background-color: ${color};
                `}
              />
            ))}
          </div>

          {error && (
            <div className="col-12">
              <small>
                <i>{error}</i>
              </small>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default React.memo(ChartOptionCheckboxes);
