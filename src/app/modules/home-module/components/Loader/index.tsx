import React from "react";

const ProcessingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 160 160">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0"
      to="360"
      dur="2s"
      repeatCount="indefinite"
    />
    <circle
      r="70"
      cx="80"
      cy="80"
      fill="transparent"
      stroke="#DADAF8"
      strokeWidth="8px"
    ></circle>
    <circle
      r="70"
      cx="80"
      cy="80"
      fill="transparent"
      stroke="#6061E5"
      strokeLinecap="round"
      strokeWidth="10px"
      strokeDasharray="239.6px"
      strokeDashoffset="109.9px"
    ></circle>
  </svg>
);
export default function CircleLoader() {
  return (
    <div
      css={`
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
      `}
    >
      <ProcessingIcon />
    </div>
  );
}
