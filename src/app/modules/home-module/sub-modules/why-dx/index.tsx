import React from "react";
import EmpowerBlock from "../cases/components/empowerBlock";
import { Container } from "@material-ui/core";

import BenefitsBlock from "./components/benefitsBlock";
import SimpleStepsBlock from "./components/simpleStepsBlock";
import KeyFeaturesBlock from "./components/keyFeaturesBlock";
import TryUsBlock from "./components/tryUsBlock";
import HomeFooter from "../../components/Footer";
import Ellipses from "app/modules/home-module/assets/whydx-ellipses.svg";
export default function WhyDX() {
  return (
    <>
      <EmpowerBlock />
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
          <div
            css={`
              height: 147px;
            `}
          />
        </Container>
      </div>
      <HomeFooter />
    </>
  );
}
