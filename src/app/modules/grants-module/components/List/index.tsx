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
        <Grid item key={item.id} xs={12} sm={6} md={6}>
          <Link to={`/grant/${item.id}`} css={listitem}>
            {/* 1st row */}
            <div css={row(14, "normal")}>
              <div>
                <div>
                  <b>{item.status}</b>
                </div>
                <div>{item.id}</div>
              </div>
              <div
                css={`
                  gap: 24px;
                  display: flex;
                  flex-direction: row;

                  @media (max-width: 920px) {
                    gap: 12px;
                    flex-direction: column;
                  }

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
                <div>
                  <b>{item.component}</b>
                  <ComponentIcon />
                </div>
              </div>
            </div>
            {/* 2nd row */}
            <div css={row(18, "bold", 24)}>{item.title}</div>
            {/* 3rd row */}
            <div
              css={row(14, "normal")}
              style={{
                borderTop: "1px solid #DFE3E6",
                paddingTop: 8,
                marginTop: 0,
              }}
            >
              <div
                css={`
                  gap: 10px;
                  width: 100%;
                  display: flex;
                  font-size: 12px;
                  padding-top: 16px;
                  flex-direction: column;
                `}
              >
                <div
                  css={`
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  `}
                >
                  <div
                    css={`
                      font-weight: bold;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    `}
                  >
                    Disbursed ·{" "}
                    {((item.disbursed * 100) / item.committed).toFixed(2)}%
                  </div>
                  <div>{formatFinancialValue(item.disbursed)}</div>
                </div>
                <div
                  css={`
                    width: 100%;
                    height: 5px;
                    border-radius: 20px;
                    background: #c7cdd1;
                  `}
                >
                  <div
                    css={`
                      height: 5px;
                      border-radius: 20px;
                      background: #373d43;
                      width: ${(item.disbursed * 100) / item.committed}%;
                    `}
                  />
                </div>
                <div
                  css={`
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  `}
                >
                  <div
                    css={`
                      font-weight: bold;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    `}
                  >
                    Committed
                  </div>
                  <div>{formatFinancialValue(item.committed)}</div>
                </div>
                <div
                  css={`
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  `}
                >
                  <div
                    css={`
                      font-weight: bold;
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    `}
                  >
                    Signed
                  </div>
                  <div>{formatFinancialValue(item.signed)}</div>
                </div>
              </div>
            </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
