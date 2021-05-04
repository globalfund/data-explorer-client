import React from "react";
import Grid from "@material-ui/core/Grid";
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
import { ComponentIcon } from "app/assets/icons/Component";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

export function ResultsList(props: ResultsListProps) {
  return (
    <Grid container spacing={2}>
      {props.listitems.map((item: ResultListItemModel) => (
        <ResultsListItem {...item} key={item.id} />
      ))}
    </Grid>
  );
}

function ResultsListItem(props: ResultListItemModel) {
  const [expand, setExpand] = React.useState(false);

  return (
    <Grid item key={props.id} xs={12} sm={6} md={4}>
      <div css={listitem}>
        {!expand && (
          <React.Fragment>
            <div css="width: 100%;height: 12px;" />
            {/* 1st row */}
            <div css={row(40, "bold")}>
              <div>{props.value.toLocaleString()}</div>
              <div
                css={`
                  gap: 6px;
                  display: flex;
                  font-size: 14px;
                  font-weight: bold;
                  flex-direction: row;
                  align-items: center;
                `}
              >
                <b>{props.component}</b>
                <ComponentIcon />
              </div>
            </div>
            {/* 2nd row */}
            <div css={row(14, "normal")}>{props.title}</div>
            {/* 3rd row */}
            <div css={buttonrow("down")} onClick={() => setExpand(true)}>
              <TriangleXSIcon />
              See more
            </div>
          </React.Fragment>
        )}
        {expand && (
          <React.Fragment>
            {/* 1st row */}
            <div css={buttonrow("up")} onClick={() => setExpand(false)}>
              <TriangleXSIcon />
              See more
            </div>
            <div css={locationlist}>
              {props.geoLocations.map(
                (location: { name: string; value: number }) => (
                  <div>
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
