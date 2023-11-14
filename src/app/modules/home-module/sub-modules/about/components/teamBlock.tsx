import React from "react";
import Grid from "@material-ui/core/Grid";
import SiemAvi from "app/modules/home-module/assets/siem.png";
import JohnAvi from "app/modules/home-module/assets/john.png";
import KennyAvi from "app/modules/home-module/assets/kenny.png";
import AylinAvi from "app/modules/home-module/assets/aylin.png";
import SylvanAvi from "app/modules/home-module/assets/sylvan.png";
import VeronikaAvi from "app/modules/home-module/assets/veronika.png";
import StefanosAvi from "app/modules/home-module/assets/stefanos.png";
import EmmanuellaAvi from "app/modules/home-module/assets/emmanuella.png";
import { subParagraphcss } from "app/modules/home-module/sub-modules/about/style";

export default function TeamBlock() {
  return (
    <>
      <div
        css={`
          ${subParagraphcss} p {
            text-align: center;
          }
          margin-bottom: 80px;
        `}
      >
        <h3>
          <b>Team</b>
        </h3>
        <p>
          With over two decades of expertise in data and global health
          development, we empower organizations to enhance their communication
          with revolutionary data solutions.
        </p>
        <p>
          {" "}
          Working to have an impact on people's lives is a privilege. Over the
          past decade, our unwavering dedication to making a difference has
          consistently pushed the boundaries of data communication.{" "}
        </p>
        <p> Discover the true potential of data with DataXplorer!</p>
        <p> Let us help you unlock the power of your data!</p>
      </div>
      <Grid
        container
        spacing={3}
        css={`
          z-index: 1;
          position: relative;
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
