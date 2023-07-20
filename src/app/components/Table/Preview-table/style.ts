import { css } from "styled-components/macro";

export const previewTablecss = css`
  width: max-content;

  th {
    padding: 0.1rem 0.7rem;
    height: 54px;
    text-transform: capitalize;
    font-weight: 500;
  }
  td {
    border-bottom: 1px solid #dfe3e5;
    border-right: 1px solid #dfe3e5;
    padding: 10px 16px;
    height: 35px;
    font-weight: 400;
    font-size: 14px;
    font-family: "GothamNarrow-Book";
  }
`;
