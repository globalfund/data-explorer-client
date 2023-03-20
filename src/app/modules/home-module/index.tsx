/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import Button from "@material-ui/core/Button";
/* project */

import { Search } from "app/components/Search";
import ToggleButtons from "app/components/ToggleButton/toggleButtonGroup";
import DatasetsGrid from "./components/Datasets/datasetsGrid";
import ChartsGrid from "./components/Charts/chartsGrid";
import ReportsGrid from "./components/Reports/reportsGrid";
import { Container } from "@material-ui/core";

export default function HomeModule() {
  useTitle("Dataxplorer - Home");
  const [alignment, setAlignment] = React.useState<
    "data" | "charts" | "report"
  >("data");

  const displayGrid = () => {
    switch (alignment) {
      case "data":
        return <DatasetsGrid />;
      case "charts":
        return <ChartsGrid />;

      case "report":
        return <ReportsGrid />;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <div
          css={`
            width: 100%;
            display: flex;
            padding-top: 130px;
            align-items: center;
            flex-direction: column;
            a {
              text-decoration: none;
            }
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

          <p
            css={`
              margin-top: -17px;
              font-weight: 325;
              font-size: 16px;
              text-align: center;
              margin-bottom: 43px;
            `}
          >
            Data exploration solution that boosts your performance
          </p>

          <Search />
          <div
            css={`
              display: flex;
              justify-content: center;
              margin: 2rem 0;
            `}
          >
            <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
          </div>

          {displayGrid()}
        </div>
      </Container>
    </React.Fragment>
  );
}
