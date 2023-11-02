import React from "react";
import Container from "@material-ui/core/Container";
import HomeFooter from "app/modules/home-module/components/Footer";
import Ellipses from "app/modules/home-module/assets/whydx-ellipses.svg";
import TryUsBlock from "app/modules/home-module/sub-modules/why-dx/components/tryUsBlock";
import EmpowerBlock from "app/modules/home-module/sub-modules/partners/components/empowerBlock";
import BenefitsBlock from "app/modules/home-module/sub-modules/why-dx/components/benefitsBlock";
import SimpleStepsBlock from "app/modules/home-module/sub-modules/why-dx/components/simpleStepsBlock";
import KeyFeaturesBlock from "app/modules/home-module/sub-modules/why-dx/components/keyFeaturesBlock";

export default function WhyDX() {
  return (
    <>
      <EmpowerBlock view="why-dx" />
      <div
        css={`
          background-image: url(${Ellipses});
          background-repeat: no-repeat;
          background-position: 40% 100%;
        `}
      >
        <Container maxWidth="lg">
          <SimpleStepsBlock />
          <div
            css={`
              height: 132px;
            `}
          />
          <KeyFeaturesBlock />
          <div
            css={`
              height: 90px;
            `}
          />
          <BenefitsBlock />
          <div
            css={`
              height: 129px;
            `}
          />
          <TryUsBlock />
        </Container>
      </div>
      <div css="width: 100%;height: 232px" />
      <HomeFooter />
    </>
  );
}
