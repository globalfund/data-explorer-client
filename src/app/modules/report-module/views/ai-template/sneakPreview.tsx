import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import Plyr from "plyr";
import Poster from "app/modules/report-module/asset/sneak-peek-poster.svg";

export default function SneakPreview(props: {
  setModalDisplay: (display: boolean) => void;
}) {
  //The player instance is being used in the background. Seems like an unused variable but it is not.
  const player = new Plyr(".plyr", {
    controls: [
      // "play-large",
      "mute",
      "volume",
      // "airplay",
      "rewind",
      "play",
      "pause",
      "fast-forward",
      "settings",
      "fullscreen",
      "progress",
      "current-time",
      "captions",
      // "pip",
      "airplay",
    ],
    iconUrl: "/svg-defs.svg",
  });

  return (
    <div
      css={`
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        width: 100vw;
        height: 100vh;
      `}
    >
      <div
        onClick={() => props.setModalDisplay(false)}
        css={`
          top: 0;
          left: 0;
          z-index: -1;
          width: 100vw;
          height: 100vh;
          position: fixed;
          opacity: 0.8;
          background: #050505;
        `}
      />
      <div
        css={`
          width: 1324px;
          height: 667px;
          background: #000;
          display: flex;
          align-items: center;
          padding: 61px 52px;
          position: relative;
        `}
      >
        <div
          css={`
            position: absolute;
            right: 4px;
            top: 4px;
            button {
              cursor: pointer;
            }
          `}
        >
          <IconButton onClick={() => props.setModalDisplay(false)}>
            <CloseIcon htmlColor="#fff" fontSize="large" />
          </IconButton>
        </div>
        <div
          css={`
            display: flex;
            gap: 26px;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              color: #ffffff;
              font-family: "Poppins", sans-serif;
              width: 34%;
            `}
          >
            <button
              type="button"
              css={`
                outline: none;
                border: none;
                padding: 5px 15px;
                height: 31px;
                width: 154px;
                color: #ffffff;
                font-family: "Poppins", sans-serif;

                align-items: flex-start;
                border-radius: 100px;
                background: linear-gradient(
                  180deg,
                  #fff 0%,
                  #a0a0a0 0.01%,
                  rgba(255, 255, 255, 0) 100%
                );

                font-size: 14px;
                font-style: normal;
                font-weight: 700;
              `}
            >
              COMING SOON
            </button>
            <h1
              css={`
                font-size: 44px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                /* width: 457px; */
              `}
            >
              Get ready for the future of reporting
            </h1>
            <p
              css={`
                font-size: 16px;
                line-height: 32px;
              `}
            >
              Experience the future of reporting with our AI-powered template.
              Watch the sneak preview video now for a game-changing solution
              that revolutionizes data analysis and delivers actionable
              insights. Available soon!
            </p>
          </div>
          <div>
            <video
              id="player"
              width="714"
              height="506"
              controls
              data-poster={Poster}
              className="plyr"
            >
              <source src="/ai-sneak-peek.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
