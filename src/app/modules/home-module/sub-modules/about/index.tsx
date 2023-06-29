import React from "react";
import EmpowerBlock from "../cases/components/empowerBlock";
import { Container, Grid } from "@material-ui/core";
import { ReactComponent as TopEllipse } from "app/modules/home-module/assets/about-top-ellipse.svg";
import HomeFooter from "../../components/Footer";
import { subParagraphcss } from "./style";
import TeamBlock from "./components/teamBlock";
export default function AboutModule() {
  return (
    <>
      <EmpowerBlock />
      <Container maxWidth="lg">
        <div css={subParagraphcss}>
          <h3>
            <b>Mission</b>
          </h3>
          <p>
            Our mission is to create lasting impact for organizations that bring
            positive change to our world by helping them to unlock the power of
            data.
          </p>
          <p>
            Our trusted and easy-to-use data solutions boost an organization's
            performance by powering its core mission.
          </p>
        </div>
        <div
          css={`
            ${subParagraphcss} position: relative;
            z-index: 1;
          `}
        >
          <h3>
            <b>DataXplorer</b>
          </h3>
          <p>
            Organizations face a challenge in clearly communicating <br /> data
            they collect, analyze and disseminate. By leveraging data as a
            strategic asset, we help organizations around the world to
            communicate their lasting change more clearly <br /> and
            effectively.
          </p>
          <p>
            {" "}
            Making sense of it all is our passion;
            <br /> presenting it with impact is what we know how to do best.
          </p>
          <p>
            To enable your organization to lead in your field through the power
            of data, we provide DataXplorer, an AI-powered purpose-driven data
            platform solution. DataXplorer empowers people with meaningful data
            to make better decisions in driving towards an <br /> equitable
            future for all.
          </p>
          <TopEllipse
            css={`
              position: absolute;
              top: -15%;
              left: -6%;
              z-index: -1;
            `}
          />
        </div>

        <TeamBlock />
      </Container>
      <div css="width: 100%;height: 232px" />
      <HomeFooter />
    </>
  );
}
