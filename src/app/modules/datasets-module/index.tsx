/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { LandingDatasetGrid } from "app/modules/landing-module/components/dataset-grid";
import {
  dataSetsCss,
  datasetsBottomCss,
} from "app/modules/datasets-module/style";

export default function Datasets() {
  useTitle("Dataxplorer - Datasets");

  return (
    <div css={dataSetsCss}>
      <PageTopSpacer />
      <img
        src="/logo.svg"
        width={244}
        height={44}
        alt="dataxplorer logo"
        css={`
          margin-top: 72px;
          transform: scale(2);
        `}
      />
      <h6
        css={`
          font-size: 24px;
          margin-top: 32px;
          font-weight: 400;
        `}
      >
        Data exploration solution that boosts your performance
      </h6>
      <LandingDatasetGrid />
      <div css={datasetsBottomCss} />
    </div>
  );
}
