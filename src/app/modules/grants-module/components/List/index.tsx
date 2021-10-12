import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  listitem,
  row,
} from "app/modules/grants-module/components/List/styles";
import {
  GrantsListProps,
  GrantListItemModel,
} from "app/modules/grants-module/data";
import { ComponentIcon } from "app/assets/icons/Component";
import { LocationIcon } from "app/assets/icons/Location";
import { RatingIcon } from "app/assets/icons/Rating";

export function GrantsList(props: GrantsListProps) {
  return (
    <Grid container spacing={2}>
      {props.listitems.map((item: GrantListItemModel) => (
        <Grid item key={item.id} sm={12} md={6}>
          <Link to={`/grant/${item.id}`} css={listitem}>
            {/* 1st row */}
            <div css={row(14, "normal")}>
              <div>
                <div>{item.status}</div>
                <div>{item.id}</div>
              </div>
              <div
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 14px;
                  font-weight: bold;
                  flex-direction: row;
                  align-items: center;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                <b>{item.component}</b>
                <ComponentIcon />
              </div>
            </div>
            {/* 2nd row */}
            <div css={row(18, "bold", 24)}>{item.title}</div>
            {/* 3rd row */}
            <div css={row(14, "normal")}>
              <div
                css={`
                  gap: 24px;
                  display: flex;
                  flex-direction: row;

                  > div {
                    gap: 6px;
                    display: flex;
                    font-weight: bold;
                    flex-direction: row;
                    align-items: center;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  }
                `}
              >
                <div>
                  <LocationIcon />
                  {item.geoLocation}
                </div>
                <div>
                  <RatingIcon />
                  {item.rating}
                </div>
              </div>
              <div css="text-align: right;">
                <div>Disbursed: {formatFinancialValue(item.disbursed)}</div>
                <div>Committed: {formatFinancialValue(item.committed)}</div>
                <div>Signed: {formatFinancialValue(item.signed)}</div>
              </div>
            </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
