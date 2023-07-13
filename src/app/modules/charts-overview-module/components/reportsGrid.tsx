import { Grid } from "@material-ui/core";
import React from "react";
import { dummyReportsdata } from "../data";
import { ReportsTable } from "./Table";
import { GridItem } from "./gridItem";
import DeleteReportDialog from "app/components/Dialogs/deleteReportDialog";
import DuplicateReportDialog from "app/components/Dialogs/duplicateReportDialog";
import { v4 } from "uuid";

export default function ReportsGrid(props: { tableView: boolean }) {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalType, setModalType] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [tableData, setTableData] = React.useState(
    dummyReportsdata.map((data) => {
      return {
        ...data,
        title: data.title.__html,
        name: data.title.__html,
        description: data.description.__html,
        createdDate: new Date(),
        id: v4(),
        menuOptionsDisplay: false,
      };
    })
  );
  const handleModal = (id?: number) => {
    setCardId(id as number);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };
  const handleDelete = () => {
    setModalType("");
    setEnableButton(false);
  };

  return (
    <>
      {!props.tableView && (
        <Grid container spacing={2}>
          {dummyReportsdata.map((data, index: number) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <GridItem
                description={data.description}
                link={data.link}
                title={data.title}
                iconLinks={data.iconLinks}
                handleModal={() => handleModal(index)}
                setModalType={setModalType}
                id=""
              />
            </Grid>
          ))}
        </Grid>
      )}
      {props.tableView && (
        <ReportsTable
          setModalType={setModalType}
          handleModal={handleModal}
          setTableData={setTableData}
          data={tableData.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.description,
            createdDate: data.createdDate,
            menuOptionsDisplay: data.menuOptionsDisplay,
          }))}
        />
      )}
      <DeleteReportDialog
        cardId={cardId}
        modalType={modalType}
        setModalType={setModalType}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
      />
      <DuplicateReportDialog
        cardId={cardId}
        modalType={modalType}
        setModalType={setModalType}
        enableButton={enableButton}
        handleDuplicate={() => {}}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
