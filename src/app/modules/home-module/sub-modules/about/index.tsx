import React from "react";
import EmpowerBlock from "../partners/components/empowerBlock";
import { Container, Grid } from "@material-ui/core";
import { ReactComponent as MissionImg } from "app/modules/home-module/assets/about-mission.svg";
import { ReactComponent as DXImg } from "app/modules/home-module/assets/about-dx.svg";
import Ellipses from "app/modules/home-module/assets/about-ellipses.svg";

import HomeFooter from "../../components/Footer";
import { subParagraphcss } from "./style";
import TeamBlock from "./components/teamBlock";
export default function AboutModule() {
  return (
    <>
      <EmpowerBlock view="about" />
      <div
        css={`
          height: 20px;
        `}
      />
      <div
        css={`
          background-image: url(${Ellipses});
          background-repeat: no-repeat;
          background-position: 40% 0%;
          height: 100%;
          padding-bottom: 80px;
          background-color: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            #f2f7fd 100%
          );
        `}
      >
        <Container maxWidth="lg">
          <TeamBlock />
          <div css={subParagraphcss}>
            <h3>
              <b>Mission</b>
            </h3>
            <div
              css={`
                display: flex;
                justify-content: space-between;
                align-items: start;
              `}
            >
              <div>
                <MissionImg />
              </div>
              <div>
                <p>
                  Our mission is to create lasting impact for organizations that
                  bring positive change to our world by helping them to unlock
                  the power of data. Our trusted and easy-to-use data solutions
                  boost an organization's performance by powering its core
                  mission.
                </p>
              </div>
            </div>
          </div>
          <div
            css={`
              ${subParagraphcss} position: relative;
            `}
          >
            <h3>
              <b>DataXplorer</b>
            </h3>
            <div
              css={`
                display: flex;
                justify-content: space-between;
                align-items: start;
              `}
            >
              <div>
                <p>
                  Many organizations struggle to convey the data they collect,
                  analyze, and share. We specialize in turning data into a
                  strategic asset, helping global organizations communicate
                  their impact with precision and effectiveness.
                </p>
                <p>
                  {" "}
                  Our passion is deciphering complexity, and our expertise lies
                  in presenting that with impact.
                </p>
                <p>
                  To position your organization as a leader in your field using
                  the power of data, we offer DataXplorer, an AI-powered,
                  purpose-driven data platform. DataXplorer equips people with
                  insightful data for making informed decisions, driving us
                  closer to an equitable future for all.
                </p>
              </div>

              <div
                css={`
                  position: relative;
                  z-index: -1;
                `}
              >
                <DXImg />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div css="width: 100%;height: 132px" />
      <HomeFooter />
    </>
  );
}
