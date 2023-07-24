import React from "react";
import find from "lodash/find";
import { useDebounce } from "react-use";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import DuplicateChartDialog from "app/components/Dialogs/duplicateChartDialog";
import { ChartsTable } from "app/modules/charts-overview-module/components/Table";
import { GridItem } from "app/modules/charts-overview-module/components/gridItem";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default function ChartsGrid(props: {
  tableView: boolean;
  sortValue: string;
  searchValue: string;
}) {
  const [cardId, setCardId] = React.useState<number>(0);
  const [_, setEnableButton] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<string>("");

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
  );

  const [tableData, setTableData] = React.useState(
    charts.map((chart) => {
      return {
        id: chart.id,
        title: chart.name,
        name: chart.name,
        description,
        createdDate: chart.createdDate,
        menuOptionsDisplay: false,
      };
    })
  );

  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );

  const getIcon = (vizType: string) => {
    const type = find(echartTypes(false), { id: vizType });
    if (type) {
      return type.icon;
    }
    return echartTypes(false)[0].icon;
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

  const handleModal = (id?: number) => {
    setCardId(id as number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableButton(e.target.value === "DELETE");
  };

  const handleDelete = () => {
    setModalType("");
    setEnableButton(false);
  };

  React.useEffect(() => {
    document.body.style.background = "#fff";
    loadData(props.searchValue, props.sortValue);
    return () => {
      document.body.style.background = "#f5f5f7";
    };
  }, []);

  const [,] = useDebounce(
    () => {
      loadData(props.searchValue, props.sortValue);
    },
    500,
    [props.searchValue, props.sortValue]
  );

  return (
    <>
      {!props.tableView && (
        <Grid container spacing={2}>
          {charts.map((chart, index: number) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={chart.id}
              css={`
                position: relative;
              `}
            >
              <GridItem
                id={chart.id}
                title={chart.name}
                description={description}
                setModalType={setModalType}
                link={`/chart/${chart.id}`}
                viz={getIcon(chart.vizType)}
                createdDate={chart.createdDate}
                handleModal={() => handleModal(index)}
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
