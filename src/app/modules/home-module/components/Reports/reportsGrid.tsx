import Grid from "@material-ui/core/Grid";
import { ReactComponent as ReportIcon } from "../../assets/reports-img.svg";
import React from "react";
import { reportsDummyData } from "./data";
import GridItem from "./gridItem";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DataThemeListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import ReportAddnewCard from "./reportAddNewCard";

export default function ReportsGrid() {
  const loadedDataThemes = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGetList.crudData ??
        []) as DataThemeListItemAPIModel[]
  );
  const isLoadingDataThemes = useStoreState(
    (state) => state.dataThemes.DataThemeGetList.loading
  );
  const loadDataThemes = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGetList.fetch
  );

  React.useEffect(() => {
    loadDataThemes({ filterString: `order=createdDate DESC` });
  }, []);

  return (
    <Grid container spacing={2}>
      <ReportAddnewCard />
      {loadedDataThemes.slice(0, 11).map((data) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GridItem
            key={data.id}
            id={data.id}
            date={data.createdDate}
            title={data.title}
            descr={data.subTitle}
            viz={<ReportIcon />}
          />
        </Grid>
      ))}
    </Grid>
  );
}
