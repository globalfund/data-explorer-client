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
  rowText,
} from "app/modules/grants-module/components/List/styles";
import {
  GrantsListProps,
  GrantListItemModel,
} from "app/modules/grants-module/data";
import { appColors } from "app/theme";

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
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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

              <div
                css={`
                  ${row(12, "normal")}
                  margin: 2 0;
                  padding-left: 4px;
                `}
              >
                <div>
                  <div>
                    <b>{item.status}</b>
                  </div>
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
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;

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

              <div
                css={`
                  ${row(14, "normal")}
                  border-bottom: 1px solid ${appColors.GRANT_LIST.DIVIDER};
                  color: #262c34;
                  padding-bottom: 9px;
                `}
              >
                <div>
                  <div>
                    <b> {item.id}</b>
                  </div>
                </div>
              </div>
              {/* 2nd row */}
              <div
                css={`
                  height: 70px;
                  border-bottom: 1px solid ${appColors.GRANT_LIST.DIVIDER};
                `}
              >
                <div
                  css={`
                    ${row(12, "normal")} align-items: center;
                    margin: 0;
                    height: 20px;
                  `}
                >
                  <b>Principal Recipient:</b>{" "}
                  <p css={rowText}>{item.recipientName}</p>
                </div>

                <div
                  css={`
                    ${row(12, "normal")} align-items: center;
                    margin: 0;
                    height: 20px;
                  `}
                >
                  <b>Cycle:</b> <p css={rowText}></p>
                </div>
                <div
                  css={`
                    ${row(12, "normal")} align-items: center;
                    margin: 0;
                    height: 20px;
                  `}
                >
                  <b>Start / end date:</b> <p css={rowText}></p>
                </div>
              </div>

              <div css={row(14, "bold", 20)}>{item.title}</div>

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
                    borderTop: `1px solid ${appColors.GRANT_LIST.DIVIDER}`,
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
                        background: ${appColors.GRANT_LIST
                          .PROGRESS_BAR_BACKGROUND_COLOR};
                      `}
                    >
                      <div
                        css={`
                          height: 5px;
                          border-radius: 20px;
                          width: ${(item.disbursed * 100) / item.committed}%;
                          background: ${appColors.GRANT_LIST
                            .PROGRESS_BAR_COLOR};
                        `}
                      />
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
