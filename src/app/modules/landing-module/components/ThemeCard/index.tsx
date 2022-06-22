import React from "react";
import { GraphPreview } from "app/assets/ThemesCardPreview/Graph";
import { ReactComponent as Line } from "app/assets/ThemesCardPreview/Line 6.svg";
import { ReactComponent as GraphDataset } from "app/assets/ThemesCardPreview/GraphDatasets.svg";
import { useHistory } from "react-router-dom";
import { CardProps } from "../mockData";
import {
  cardGraphsCss,
  cardLabelCss,
  themeCardCss,
} from "app/modules/landing-module/components/ThemeCard/style";

export function ThemeCard({
  cardLabel,
  createdDate,
  cardTitle,
  link,
}: CardProps) {
  const history = useHistory();
  return (
    <div onClick={() => history.push(`${link}`)} css={themeCardCss}>
      <h1>{cardTitle}</h1>

      <div css={cardLabelCss}>
        <h3>{cardLabel}</h3>
        <p>{createdDate}</p>
      </div>

      <div css={cardGraphsCss}>
        <div>
          <GraphPreview />
        </div>
        <Line />
        <div>
          <GraphDataset />
        </div>
      </div>
    </div>
  );
}
