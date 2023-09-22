import React from "react";
import {  Col } from "react-bootstrap";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { checkLists } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/data";
import RadioGroup from '@material-ui/core/RadioGroup';


const ChartOptionCheckboxes = ({
  value,
  error,
  onChange,
  default: defaultValue,
}) => {

  const [radioValue, setRadioValue] = React.useState(value ?? defaultValue);
  const handleChange = (e) => {
    setRadioValue(e.target?.value);
  };

  React.useEffect(() => {
    onChange(radioValue);
  }, [radioValue]);

  return (
    <>
     <RadioGroup aria-label="palette" name="palette" value={radioValue} onChange={handleChange}>
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
            padding-left:10px;
            div:nth-child(2){
              display: flex;
              align-items: center;
              gap:4px;
            }
            svg{
              width: 20px;
              height: 20px;
            }
            button, input{
              :hover{
                background: transparent;
              }
            }
          `}
        >
          <Col xs={6} className="d-flex align-items-center nowrap">

          <FormControlLabel value={item.label} control={<Radio checked={radioValue===item.label} color='default'  />} label={item.label} name="pallete"  />
        
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
      </RadioGroup>
    </>
  );
};

export default React.memo(ChartOptionCheckboxes);
