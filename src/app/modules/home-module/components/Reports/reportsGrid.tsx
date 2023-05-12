import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { ReportModel } from "app/modules/report-module/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import GridItem from "app/modules/home-module/components/Reports/gridItem";
import ReportAddnewCard from "app/modules/home-module/components/Reports/reportAddNewCard";
import { ReactComponent as ReportIcon } from "app/modules/home-module/assets/reports-img.svg";
import { useHistory } from "react-router-dom";
import DeleteReportDialog from "app/components/Dialogs/deleteReportDialog";

export default function ReportsGrid() {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const reports = useStoreState(
    (state) => (state.reports.ReportGetList.crudData ?? []) as ReportModel[]
  );

  const loadReports = useStoreActions(
    (actions) => actions.reports.ReportGetList.fetch
  );

  const handleDelete = (index?: number) => {
    setModalDisplay(false);
    setEnableButton(false);
    const id = reports[index as number].id;
    if (!id) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API}/report/${id}`)
      .then(() => {
        loadReports({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDuplicate = (index: number) => {
    const id = reports[index].id;
    if (!id) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API}/report/duplicate/${id}`)
      .then(() => {
        loadReports({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleModal = (id: number) => {
    setCardId(id);
    setModalDisplay(true);
  };

  React.useEffect(() => {
    loadReports({
      storeInCrudData: true,
      filterString: "filter[order]=createdDate desc",
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <ReportAddnewCard />
        {reports.map((data, index) => (
          <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
            <GridItem
              id={data.id}
              key={data.id}
              title={data.name}
              descr={data.title}
              viz={<ReportIcon />}
              date={data.createdDate}
              handleDelete={() => handleModal(index)}
              handleDuplicate={() => handleDuplicate(index)}
            />
          </Grid>
        ))}
      </Grid>
      <DeleteReportDialog
        cardId={cardId}
        modalDisplay={modalDisplay}
        enableButton={enableButton}
        handleDelete={handleDelete}
        setModalDisplay={setModalDisplay}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
