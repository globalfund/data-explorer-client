import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "@material-ui/core";
import { RatingIcon } from "app/assets/icons/Rating";
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  listitem,
  row,
} from "app/modules/grants-module/components/List/styles";
import {
  GrantsListProps,
  GrantListItemModel,
} from "app/modules/grants-module/data";

export function GrantsList(props: GrantsListProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Grid container spacing={2}>
      {props.listitems.map((item: GrantListItemModel) => {
        const bottomRowContent = [
          <div
            css={`
              gap: 24px;
              display: flex;
              flex-direction: row;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 24px;
                  }
                }
              }

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 24px;
                  }
                }
              }

              @media (max-width: 920px) {
                gap: 12px;
                flex-direction: column;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 12px;
                    }
                  }
                }

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 12px;
                    }
                  }
                }
              }

              > div {
                gap: 6px;
                display: flex;
                font-weight: bold;
                flex-direction: row;
                align-items: center;
                font-family: "Inter", "Helvetica Neue", sans-serif;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 6px;
                    }
                  }
                }

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 6px;
                    }
                  }
                }
              }

              @media (max-width: 767px) {
                gap: 24px;
                flex-direction: row;
                margin-bottom: 16px;

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 24px;
                    }
                  }
                }

                > * {
                  @supports (-webkit-touch-callout: none) and
                    (not (translate: none)) {
                    &:not(:last-child) {
                      margin-right: 24px;
                    }
                  }
                }
              }
            `}
          >
            <div>
              <LocationIcon />
              <div>{item.geoLocation}</div>
            </div>
            <div>
              <RatingIcon />
              <div>{item.rating}</div>
            </div>
          </div>,
          <div
            css={`
              margin-bottom: ${isMobile ? "16px" : "0"};
              text-align: ${isMobile ? "left" : "right"};
            `}
          >
            <div>Disbursed: {formatFinancialValue(item.disbursed)}</div>
            <div>Committed: {formatFinancialValue(item.committed)}</div>
            <div>Signed: {formatFinancialValue(item.signed)}</div>
          </div>,
        ];
        return (
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

                    > * {
                      @supports (-webkit-touch-callout: none) and
                        (not (translate: none)) {
                        &:not(:last-child) {
                          margin-right: 24px;
                        }
                      }
                    }

                    @media (max-width: 920px) {
                      gap: 12px;
                      flex-direction: column;

                      > * {
                        @supports (-webkit-touch-callout: none) and
                          (not (translate: none)) {
                          &:not(:last-child) {
                            margin-right: 12px;
                          }
                        }
                      }
                    }

                    > div {
                      gap: 6px;
                      display: flex;
                      font-weight: bold;
                      flex-direction: row;
                      align-items: center;
                      font-family: "Inter", "Helvetica Neue", sans-serif;

                      > * {
                        @supports (-webkit-touch-callout: none) and
                          (not (translate: none)) {
                          &:not(:last-child) {
                            margin-right: 6px;
                          }
                        }
                      }
                    }
                  `}
                >
                  {!isMobile && (
                    <React.Fragment>
                      <div>
                        <LocationIcon />
                        {item.geoLocation}
                      </div>
                      <div>
                        <RatingIcon />
                        {item.rating}
                      </div>
                    </React.Fragment>
                  )}
                  <div>
                    <b>{item.component}</b>
                    <ComponentIcon />
                  </div>
                </div>
              </div>
              {/* 2nd row */}
              <div css={row(18, "bold", 24)}>{item.title}</div>
              <div css={row(14, "normal")} style={{ margin: "0 0 32px 0" }}>
                <div>
                  Principal Recipient:{" "}
                  <b>
                    {item.recipientName}
                    {item.recipientShortName && ` (${item.recipientShortName})`}
                  </b>
                </div>
              </div>
              {/* 3rd row */}
              {isMobile ? (
                <div>
                  {bottomRowContent[1]}
                  {bottomRowContent[0]}
                </div>
              ) : (
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

                      > * {
                        @supports (-webkit-touch-callout: none) and
                          (not (translate: none)) {
                          &:not(:last-child) {
                            margin-right: 10px;
                          }
                        }
                      }
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
                          font-family: "Inter", "Helvetica Neue", sans-serif;
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
                          font-family: "Inter", "Helvetica Neue", sans-serif;
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
                          font-family: "Inter", "Helvetica Neue", sans-serif;
                        `}
                      >
                        Signed
                      </div>
                      <div>{formatFinancialValue(item.signed)}</div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
