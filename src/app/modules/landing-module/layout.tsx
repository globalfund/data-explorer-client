import React from "react";
import { Link } from "react-router-dom";
import BigLogo from "app/assets/BigLogo";
import { Search } from "app/components/Search";
import { DatasetCarousel } from "app/components/DatasetCarousel";
import {
  container,
  subtitle,
  datasetstitle,
  datasetslink,
} from "app/modules/landing-module/styles";

export const LandingLayout = () => {
  return (
    <div css={container}>
      <div
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;

          @media (max-width: 600px) {
            > svg {
              width: 100%;
            }
          }
        `}
      >
        <BigLogo />
        <div css={subtitle}>Free and open access to the Global Fund Data</div>
        <Search />
        <div css={datasetstitle}>Explore the Datasets</div>
        <DatasetCarousel />
        <div css={datasetslink}>
          <Link to="/datasets" data-cy="datasets-link">View all</Link>
        </div>
      </div>
    </div>
  );
};
