import React, { useEffect, useState } from "react";

interface Props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export default function BasicTextarea({ label, ...rest }: Props) {
  const [labelDisplay, setLabelDisplay] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(rest.value.length);
    rest.value.length < 1 ? setLabelDisplay(false) : setLabelDisplay(true);
  }, [rest.value]);

  return (
    <>
      <div
        css={`
          position: relative;
          border: 1px solid #231d2c;
          border-radius: 10px;
          background: white;

          display: flex;
          flex-direction: column;

          align-items: center;
          trasition: all 0.2s;
          :focus-within {
            border: 2px solid #231d2c;
          }
        `}
      >
        <label
          className="form-label"
          css={`
            position: absolute;
            top: ${labelDisplay ? "-11px" : "25px"};
            left: 1%;

            padding: 0 1%;
            font-size: 12px;
            font-family: "GothamNarrow-Book";
            background: inherit;
            font-weight: 400;
            transition: top 0.2s ease-in;

            z-index: ${labelDisplay ? 0 : -1};
          `}
        >
          {label}
        </label>

        <textarea
          css={`
            border: none;
            outline: none;
            background: inherit;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            padding: 16px;
            color: #231d2c;

            ::placeholder {
              color: #231d2c;
            }
          `}
          placeholder={labelDisplay ? "" : rest.placeholder}
          onChange={(e) => rest.setValue(e.target.value)}
          maxLength={150}
          rows={4}
        />
        <p
          css={`
            position: absolute;
            bottom: -1rem;
            right: 20px;
            font-weight: 325;
            font-size: 12px;
            color: #231d2c;
          `}
        >
          {characterCount}/150
        </p>
      </div>
    </>
  );
}
