import { Grid } from "@material-ui/core";
import React from "react";
import {
  dummyReportsdata,
  vizTypes,
} from "app/modules/charts-overview-module/data";
import { GridItem } from "app/modules/charts-overview-module/components/gridItem";
import { v4 } from "uuid";
import { ChartsTable } from "./table";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import DuplicateChartDialog from "app/components/Dialogs/duplicateChartDialog";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { find } from "lodash";

export default function ChartsGrid(props: {
  tableView: boolean;
  sortValue: string;
  searchValue: string;
}) {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalType, setModalType] = React.useState<string>("");
  const [_, setEnableButton] = React.useState<boolean>(false);
  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
  );
  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );
  const getIcon = (vizType: string) => {
    const type = find(vizTypes, { type: vizType });
    if (type) {
      return type.icon;
    }
    return vizTypes[0].icon;
  };
  function loadData(searchStr: string, sortByStr: string) {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    loadCharts({
      storeInCrudData: true,
      filterString: `filter={${value}"order":"${sortByStr} desc"}`,
    });
  }

  React.useEffect(() => {
    loadData(props.searchValue, props.sortValue);
  }, []);
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

  React.useEffect(() => {
    document.body.style.background = "white";
    return () => {
      document.body.style.background = "#f5f5f7";
    };
  }, []);

  return (
    <>
      {!props.tableView && (
        <Grid container spacing={2}>
          {charts.map((data, index: number) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={data.id}>
              <GridItem
                description="Allocations amounts for countries by disease"
                link={data.link}
                title={data.name}
                viz={getIcon(data.vizType)}
                handleModal={() => handleModal(index)}
                setModalType={setModalType}
                createdDate={data.createdDate}
                id={data.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {props.tableView && (
        <ChartsTable
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
      <DeleteChartDialog
        cardId={cardId}
        modalType={modalType}
        setModalType={setModalType}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
      />
      <DuplicateChartDialog
        cardId={cardId}
        modalType={modalType}
        setModalType={setModalType}
        handleDuplicate={() => {}}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
