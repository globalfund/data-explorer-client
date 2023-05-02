import { css } from "styled-components/macro";

export const previewTablecss = css`
  width: max-content;

  th {
    border-right: 1px solid #dfe3e5;
    padding: 0.1rem 0.7rem;
    height: 54px;
    text-transform: capitalize;
    font-weight: 500;
  }
  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding: 0rem 0.7rem;
    height: 35px;
    font-weight: 400;
    font-size: 14px;
    font-family: "Inter";
  }
`;
