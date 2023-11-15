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
import { ReactComponent as LnIcon } from "app/modules/home-module/assets/linkedIn-icon.svg";

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
            linkedIn="https://nl.linkedin.com/in/siemvaessen"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={JohnAvi}
            name="John Busch"
            role="Digital Communications Specialist"
            linkedIn="https://ch.linkedin.com/in/johnbusch74"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={StefanosAvi}
            name="Stefanos Hadjipetrou"
            role="Software Developer"
            linkedIn="https://cy.linkedin.com/in/hadjipetroustefanos"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={SylvanAvi}
            name="Sylvan Ridderinkhof"
            role="Data Engineer"
            linkedIn="https://nl.linkedin.com/in/sylvan-ridderinkhof-86a020107?challengeId=AQFDWDx46Olg2QAAAYr1KwXeEdh97rpAAaQ8gLnOm7H190q2qCasdaA6guAGANQJsR6xepqoUXXzQ5bKND5vTO0rAenHnXWF3Q&submissionId=68766498-7793-8a17-5f6f-70c0142d6e27&challengeSource=AgFrhytD0Prn8AAAAYr1Kx5jGtAEYxmekwbj5CA-UhQ7pDdjcNDxjGbYTSR_DwE&challegeType=AgH0D6bojPuGUQAAAYr1Kx5mnIsbC9qB6FFID57du71lohYZdSGH_40&memberId=AgEcNgR_on6EGwAAAYr1Kx5oosRjIGYUVqGTRyOYKRTNLdI&recognizeDevice=AgET4m70YC1oOwAAAYr1Kx5rI2LeNWRuokkcc9dL0vH-7MKIkf77"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={KennyAvi}
            name="Kennet Z. Porter"
            role="UI/UX & Data Visualisation Designer"
            linkedIn="https://es.linkedin.com/in/kennet-z-porter/en"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={EmmanuellaAvi}
            name="Emmanuella Okorie "
            role="Frontend Developer"
            linkedIn="https://ng.linkedin.com/in/okorie-emmanuella-350916173"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={VeronikaAvi}
            name="Veronika Ivanova"
            role="UI/UX Design Intern"
            linkedIn="https://nl.linkedin.com/in/veronika-ivanova-448b6b1b6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard
            img={AylinAvi}
            name="Aylin Paçaci"
            role="UI/UX Design Intern"
            linkedIn="https://tr.linkedin.com/in/aylinpacaci?challengeId=AQGCezNLhQB5VAAAAYr1LsyqInpecECsz0f1D032FrhjK53S0QxwLaFrnvD3BTPyZqw3EiwG4dUCGfYwbrX2QYEkUPehESPhcA&submissionId=23a4be36-b193-8a17-763d-43964760bb5d&challengeSource=AgFbFYc7O7cBCwAAAYr1Lw4R7zCEZuxI9v0AfSWFvI6vfM5UAz1w4rCbRqG0t_o&challegeType=AgH0plkkpgehOwAAAYr1Lw4UkFu-5d_Th_klMyVozCAMZlWzC6FMFxU&memberId=AgGD_QYvN6PzHgAAAYr1Lw4X1y5FvFFmoiDNJphRNKC2Iqc&recognizeDevice=AgGSDMbPuggcNQAAAYr1Lw4adUncXjOjYUgn-oI477FV4Aw2IxXu"
          />
        </Grid>
      </Grid>
    </>
  );
}

const TeamCard = (props: {
  img: string;
  name: string;
  role: string;
  linkedIn: string;
}) => {
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
          display: flex;
          align-items: center;
          gap: 16px;
        `}
      >
        <b>{props.name}</b>{" "}
        <span>
          <a href={props.linkedIn} target="_blank" rel="noopener noreferrer">
            <LnIcon />
          </a>
        </span>
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
