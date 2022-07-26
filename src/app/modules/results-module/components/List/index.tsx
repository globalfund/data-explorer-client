/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { ComponentIcon } from "app/assets/icons/Component";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import {
  row,
  listitem,
  buttonrow,
  locationlist,
} from "app/modules/results-module/components/List/styles";
import {
  ResultsListProps,
  ResultListItemModel,
} from "app/modules/results-module/data";

export function ResultsList(props: ResultsListProps) {
  return (
    <Grid container spacing={2}>
      {props.listitems.map((item: ResultListItemModel) => (
        <ResultsListItem
          {...item}
          key={item.id}
          isToolboxOpen={props.isToolboxOpen}
        />
      ))}
    </Grid>
  );
}

function ResultsListItem(props: ResultListItemModel) {
  const history = useHistory();
  const [expand, setExpand] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isLocationDetail = history.location.pathname.indexOf("/location/") > -1;

  return (
    <Grid
      item
      id={props.id}
      key={props.id}
      xs={12}
      sm={6}
      md={4}
      lg={props.isToolboxOpen ? 6 : 4}
    >
      <div css={listitem(history.location.hash === `#${props.id}` && !expand)}>
        {!expand && (
          <React.Fragment>
            <div css="width: 100%;height: 12px;" />
            {/* 1st row */}
            <div css={row(!isMobile ? 18 : 40, "bold")}>
              {props.value.toLocaleString()}
              <div
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 14px;
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
                `}
              >
                <b>{props.component}</b>
                <ComponentIcon />
              </div>
            </div>
            {/* 2nd row */}
            <div css={row(14, "normal")}>{props.title}</div>
            {/* 3rd row */}
            <div
              id="result-see-more-button"
              css={buttonrow("down")}
              onClick={(e: any) => {
                if (!isLocationDetail) {
                  e.stopPropagation();
                  setExpand(true);
                }
              }}
              style={
                isLocationDetail
                  ? {
                      opacity: 0,
                      cursor: "default",
                    }
                  : {}
              }
            >
              <TriangleXSIcon />
              <div>See more</div>
            </div>
          </React.Fragment>
        )}
        {expand && (
          <React.Fragment>
            {/* 1st row */}
            <div
              id="result-see-more-button"
              css={buttonrow("up")}
              onClick={(e: any) => {
                e.stopPropagation();
                setExpand(false);
              }}
            >
              <TriangleXSIcon />
              <div>See more</div>
            </div>
            <div css={locationlist}>
              {props.geoLocations.map(
                (location: { name: string; value: number }) => (
                  <div key={location.name}>
                    <div>{location.name}</div>
                    <div>{location.value.toLocaleString()}</div>
                  </div>
                )
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </Grid>
  );
}
