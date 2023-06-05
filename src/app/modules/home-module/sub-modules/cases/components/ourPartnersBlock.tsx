import React from "react";
import GFLogo from "app/modules/home-module/assets/gf-logo.png";
import MFALogo from "app/modules/home-module/assets/mfa-finland-logo.png";
import IatiLogo from "app/modules/home-module/assets/iati-logo.png";
export default function OurPartnersBlock() {
  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #e4e4e4;
        gap: 80px;
        img {
          width: 189px;
          height: 78px;
          object-fit: contain;
        }
      `}
    >
      <div>
        <h4
          css={`
            font-size: 24px;
            line-height: 29px;
            margin-top: 16px;
          `}
        >
          <b>Our partners</b>
        </h4>
      </div>
      <div>
        <img src={GFLogo} alt="globalfund_logo" />
      </div>
      <div>
        <img src={MFALogo} alt="mfa-finland-logo" />
      </div>
      <div>
        <img src={IatiLogo} alt="iati-logo" />
      </div>
    </div>
  );
}
