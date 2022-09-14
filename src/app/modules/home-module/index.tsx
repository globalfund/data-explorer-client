/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import Button from "@material-ui/core/Button";
/* project */
import { GiftIcon } from "app/assets/icons/Gift";
import { UploadIcon } from "app/assets/icons/Upload";
import linesAsset from "app/modules/home-module/lines.svg";
import ExploreImage from "app/assets/home-images/explore.png";
import MapDataImage from "app/assets/home-images/mapdata.png";
import backgroundAsset from "app/modules/home-module/background.svg";
import SelectDatasetImage from "app/assets/home-images/selectdataset.png";

export default function HomeModule() {
  useTitle("Dataxplorer - Home");

  return (
    <React.Fragment>
      <div
        css={`
          width: 100%;
          display: flex;
          padding-top: 130px;
          align-items: center;
          flex-direction: column;
        `}
      >
        <img
          src="/logo.svg"
          width={244}
          height={44}
          alt="dataxplorer logo"
          css={`
            transform: scale(2);
            margin-bottom: 48px;
          `}
        />
        <h3
          css={`
            font-size: 48px;
            line-height: 58px;
            text-align: center;
            margin-bottom: 20px;
          `}
        >
          Powering the global movement for human <br /> development by
          leveraging data
        </h3>
        <h5
          css={`
            margin-top: 0;
            font-size: 24px;
            line-height: 32px;
            text-align: center;
            margin-bottom: 43px;
          `}
        >
          Data exploration solution that boosts your performance
        </h5>
        <div
          css={`
            margin-bottom: 32px;

            > a {
              text-decoration: none;

              > button {
                padding: 21px 24px;
                border-radius: 33px;

                > span {
                  color: #fff;
                  font-weight: 500;
                }
              }
            }
          `}
        >
          <Link to="/datasets">
            <Button
              startIcon={<GiftIcon />}
              css={`
                margin-right: 24px;
                background: #e492bd;
              `}
            >
              TRY DATA SAMPLE
            </Button>
          </Link>
          <Link to="/map-data">
            <Button
              startIcon={<UploadIcon />}
              css={`
                background: #6061e5;
              `}
            >
              MAP YOUR DATA
            </Button>
          </Link>
        </div>
        <div
          css={`
            width: 100%;
            height: 350px;
            display: flex;
            padding: 40px;
            max-width: 100%;
            background: #fff;
            overflow-x: auto;
            position: relative;
            border-radius: 20px;
            flex-direction: row;
            background-position: center;
            background-repeat: no-repeat;
            justify-content: space-between;
            background-image: url(${linesAsset});

            > div {
              width: 350px;
              height: 216px;
              display: flex;
              flex-direction: column;

              > div {
                &:nth-of-type(1) {
                  display: flex;
                  padding-left: 20px;
                  align-items: center;
                  flex-direction: row;
                  margin-bottom: 10px;

                  > div {
                    width: 38px;
                    color: #fff;
                    height: 38px;
                    display: flex;
                    font-size: 24px;
                    margin-right: 12px;
                    border-radius: 6px;
                    flex-direction: row;
                    align-items: center;
                    background: #6061e5;
                    justify-content: center;
                  }

                  > h6 {
                    margin: 0;
                    color: #231d2c;
                    font-size: 24px;
                    font-weight: 400;
                  }
                }
              }
            }
          `}
        >
          <div>
            <div>
              <div>1</div>
              <h6>Select Dataset</h6>
            </div>
            <img src={SelectDatasetImage} alt="select-dataset" />
          </div>
          <div>
            <div>
              <div>2</div>
              <h6>Map Data</h6>
            </div>
            <img src={MapDataImage} alt="map-data" />
          </div>
          <div>
            <div>
              <div>3</div>
              <h6>Explore</h6>
            </div>
            <img src={ExploreImage} alt="explore" />
          </div>
        </div>
      </div>
      <div
        css={`
          top: 0;
          left: 0;
          z-index: -1;
          width: 100vw;
          height: 100vh;
          position: absolute;
          background-size: cover;
          background-image: url(${backgroundAsset});
        `}
      />
    </React.Fragment>
  );
}
