import React from "react";
import axios from "axios";
import find from "lodash/find";
import { useDebounce } from "react-use";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import DuplicateChartDialog from "app/components/Dialogs/duplicateChartDialog";
import { ChartsTable } from "app/modules/charts-overview-module/components/Table";
import { GridItem } from "app/modules/charts-overview-module/components/gridItem";
import { getFormattedType } from "app/modules/report-module/components/right-panel-create-view";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

interface Props {
  sortValue: string;
  tableView: boolean;
  searchValue: string;
}

export default function ChartsGrid(props: Props) {
  const [cardId, setCardId] = React.useState("");
  const [chartName, setChartName] = React.useState("");
  const [modalType, setModalType] = React.useState("");
  const [duplicateName, setDuplicateName] = React.useState("");

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
  );

  const [tableData, setTableData] = React.useState<
    {
      id: string;
      title: string;
      name: string;
      description: string;
      vizType: string;
      createdDate: Date;
      updatedDate: Date;
      menuOptionsDisplay: boolean;
      reports: number;
    }[]
  >([]);

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

  const handleModal = (id?: string, name?: string) => {
    if (id) {
      setCardId(id);
      if (name) {
        if (modalType === "delete") {
          setChartName(name);
        } else {
          setChartName(`${name} (Copy)}`);
          setDuplicateName(`${name} (Copy)`);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuplicateName(e.target.value);
  };

  const handleDelete = () => {
    setModalType("");
    setCardId("");
    axios
      .delete(`${process.env.REACT_APP_API_DX}/chart/${cardId}`)
      .then(() => {
        loadCharts({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDuplicate = () => {
    setModalType("");
    setCardId("");
    axios
      .get(
        `${process.env.REACT_APP_API_DX}/chart/duplicate/${cardId}/${duplicateName}`
      )
      .then(() => {
        loadCharts({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    document.body.style.background = "#fff";
    loadData(props.searchValue, props.sortValue);
    return () => {
      document.body.style.background = "#f5f5f7";
    };
  }, []);

  React.useEffect(() => {
    setTableData(
      charts.map((chart) => {
        return {
          id: chart.id,
          title: chart.name,
          name: chart.name,
          description,
          vizType: getFormattedType(chart.vizType),
          createdDate: chart.createdDate,
          updatedDate: chart.updatedDate,
          menuOptionsDisplay: false,
          reports: chart.reports,
        };
      })
    );
  }, [charts]);

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
          {charts.map((chart, index) => (
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
                handleModal={() => handleModal(chart.id, chart.name)}
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
            description: data.vizType,
            createdDate: data.createdDate,
            updatedDate: data.updatedDate,
            menuOptionsDisplay: data.menuOptionsDisplay,
            reports: data.reports,
          }))}
        />
      )}
      <DeleteChartDialog
        cardId={cardId}
        chartName={chartName}
        modalType={modalType}
        setModalType={setModalType}
        handleDelete={handleDelete}
      />
      <DuplicateChartDialog
        cardId={cardId}
        modalType={modalType}
        setModalType={setModalType}
        duplicateName={duplicateName}
        handleDuplicate={handleDuplicate}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
