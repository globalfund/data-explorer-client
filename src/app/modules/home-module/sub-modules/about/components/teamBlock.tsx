import { Box, Grid } from "@material-ui/core";
import React from "react";
import { ReactComponent as BtmRightEllipse } from "app/modules/home-module/assets/about-right-full-ellipse.svg";
import { ReactComponent as BtmLeftEllipse } from "app/modules/home-module/assets/about-btm-left-ellipse.svg";
import { ReactComponent as BtmEllipse } from "app/modules/home-module/assets/about-btm-ellipse.svg";
import { ReactComponent as BtmRightSmEllipse } from "app/modules/home-module/assets/about-right-small-ellipse.svg";
import SiemAvi from "app/modules/home-module/assets/siem.png";
import VeronikaAvi from "app/modules/home-module/assets/veronika.png";
import EmmanuellaAvi from "app/modules/home-module/assets/emmanuella.png";
import JohnAvi from "app/modules/home-module/assets/john.png";
import StefanosAvi from "app/modules/home-module/assets/stefanos.png";
import AylinAvi from "app/modules/home-module/assets/aylin.png";
import SylvanAvi from "app/modules/home-module/assets/sylvan.png";
import KennyAvi from "app/modules/home-module/assets/kenny.png";
import { subParagraphcss } from "../style";

export default function TeamBlock() {
  return (
    <>
      <div css={subParagraphcss}>
        <h3>
          <b>Team</b>
        </h3>
        <p>
          By combining more than two decades of experience in data and global
          health development, we help organizations to more clearly and
          effectively communicate through our transformative data solutions.
        </p>
        <p> Working to have an impact on people&apos;s lives is a privilege.</p>
        <p>
          {" "}
          Through our work in the last 10 years, fuelled by an unstoppable
          devotion to make a difference, new levels of communicating data are
          continuously unlocked.
        </p>
        <p> Let us help you unlock the power of your data!</p>
      </div>
      <Grid
        container
        spacing={3}
        css={`
          position: relative;
          z-index: 1;
          margin-bottom: 143px;
        `}
      >
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={SiemAvi}
            name="Siem Vaessen"
            role="Managing Director"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={JohnAvi}
            name="John Busch"
            role="Digital Communications Specialist"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={StefanosAvi}
            name="Stefanos Hadjipetrou"
            role="Software Developer"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={SylvanAvi}
            name="Sylvan Ridderinkhof"
            role="Data Engineer"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={KennyAvi}
            name="Kennet Z. Porter"
            role="UI/UX & Data Visualisation Designer"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={EmmanuellaAvi}
            name="Emmanuella Okorie "
            role="Frontend Developer"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={VeronikaAvi}
            name="Veronika Ivanova"
            role="UI/UX Design Intern"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={AylinAvi}
            name="Aylin Paçaci"
            role="UI/UX Design Intern"
          />
        </Grid>
        <BtmRightEllipse
          css={`
            position: absolute;
            right: -4%;
            top: -6%;
            z-index: -1;
          `}
        />
        <BtmLeftEllipse
          css={`
            position: absolute;
            left: 15%;
            top: 25%;
            z-index: -1;
          `}
        />
        <BtmRightSmEllipse
          css={`
            position: absolute;
            right: 15%;
            bottom: 20%;
            z-index: -1;
          `}
        />
        <BtmEllipse
          css={`
            position: absolute;
            right: 27%;
            bottom: -3%;
            z-index: -1;
          `}
        />
      </Grid>
    </>
  );
}

const TeamCard = (props: { img: string; name: string; role: string }) => {
  return (
    <div
      css={`
        background: #ffffff;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        /* width: 399px; */
        height: 381px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
      `}
    >
      <div
        css={`
          width: 228px;
          height: 228px;
          border-radius: 50%;
        `}
      >
        <img
          src={props.img}
          css={`
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          `}
        />
      </div>
      <p
        css={`
          color: #504e4e;
          font-weight: 400;
          font-size: 24px;
          line-height: 29px;
          /* margin: 0px; */
          margin-top: 25px;
          margin-bottom: 5px;
          font-family: "Gotham Narrow", sans-serif;
        `}
      >
        <b>{props.name}</b>
      </p>
      <p
        css={`
          margin: 0px;
        `}
      >
        {props.role}
      </p>
    </div>
  );
};
