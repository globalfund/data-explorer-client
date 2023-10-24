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
      <EmpowerBlock alternativeText />
      <div
        css={`
          background-image: url(${Ellipses});
          background-repeat: no-repeat;
          background-position: 40% 0%;
        `}
      >
        <Container maxWidth="lg">
          <BenefitsBlock />
          <div
            css={`
              height: 132px;
            `}
          />
          <SimpleStepsBlock />
          <div
            css={`
              height: 199px;
            `}
          />
          <KeyFeaturesBlock />
          <div
            css={`
              height: 130px;
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
