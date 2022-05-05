import React from "react";
import { Dropdown } from "react-bootstrap";
import ColorSchemePreview from "./ColorSchemePreview";
import {
  colorPresets,
  getColorDomain,
  getPresetScale,
} from "@rawgraphs/rawgraphs-core";

const ColorSchemesDropDown = ({
  interpolators,
  interpolator,
  setInterpolator,
  // To display color-scale preview
  colorDataset,
  colorDataType,
  scaleType,
  currentFinalScale,
}) => {
  return (
    <Dropdown className="d-inline-block raw-dropdown w-100">
      <Dropdown.Toggle
        variant="white"
        className="w-100"
        style={{ paddingRight: 24 }}
        disabled={!colorDataType}
      >
        {currentFinalScale && <ColorSchemePreview scale={currentFinalScale} />}
      </Dropdown.Toggle>
      {colorDataType && (
        <Dropdown.Menu className="w-100">
          {interpolators.map((intrplr) => {
            return (
              <Dropdown.Item
                key={intrplr}
                className="color-scheme-dropdown-item"
                onClick={() => setInterpolator(intrplr)}
              >
                {colorDataset[0] && colorPresets[scaleType][interpolator] && (
                  <ColorSchemePreview
                    scale={getPresetScale(
                      scaleType,
                      getColorDomain(colorDataset, colorDataType, scaleType),
                      intrplr
                    )}
                    label={intrplr}
                  />
                )}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default React.memo(ColorSchemesDropDown);
