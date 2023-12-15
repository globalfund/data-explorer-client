import React from "react";
import axios from "axios";
import find from "lodash/find";
import Grid from "@material-ui/core/Grid";
import useDebounce from "react-use/lib/useDebounce";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import DeleteReportDialog from "app/components/Dialogs/deleteReportDialog";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import DuplicateReportDialog from "app/components/Dialogs/duplicateReportDialog";
import { GridItem } from "app/modules/reports-overview-module/components/gridItem";
import { ReportsTable } from "app/modules/reports-overview-module/components/Table";

interface Props {
  sortValue: string;
  tableView: boolean;
  searchValue: string;
}

export default function ReportsGrid(props: Props) {
  const [cardId, setCardId] = React.useState("");
  const [modalType, setModalType] = React.useState("");
  const [reportName, setReportName] = React.useState("");
  const [duplicateName, setDuplicateName] = React.useState("");
  const [tableData, setTableData] = React.useState<
    {
      id: string;
      name: string;
      title: string;
      createdDate: Date;
      description: string;
      menuOptionsDisplay: boolean;
      handleModal: (type: string) => void;
    }[]
  >([]);

  const token = useStoreState((state) => state.AuthToken.value);

  const reports = useStoreState(
    (state) => (state.reports.ReportGetList.crudData ?? []) as any[]
  );

  const loadReports = useStoreActions(
    (actions) => actions.reports.ReportGetList.fetch
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
    loadReports({
      token,
      storeInCrudData: true,
      filterString: `filter={${value}"order":"${sortByStr} desc"}`,
    });
  }

  const handleModal = (id?: string, name?: string, type?: string) => {
    if (id) {
      setCardId(id);
      if (name) {
        if (type === "delete") {
          setReportName(name);
        } else {
          setReportName(`${name} (Copy)}`);
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
      .delete(`${process.env.REACT_APP_API}/report/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        loadReports({
          token,
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
        `${process.env.REACT_APP_API}/report/duplicate/${cardId}/${duplicateName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        loadReports({
          token,
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
      reports.map((report) => {
        return {
          id: report.id,
          name: report.name,
          title: report.name,
          menuOptionsDisplay: false,
          description: report.description,
          createdDate: report.createdDate,
          updatedDate: report.updatedDate,
          handleModal: (type: string) =>
            handleModal(report.id, report.name, type),
        };
      })
    );
  }, [reports]);

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
          {reports?.map((data, index: number) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={`${data.link + index}`}
            >
              <GridItem
                id={data.id}
                description={data.name}
                link={`/report/${data.id}`}
                setModalType={setModalType}
                updatedDate={data.updatedDate}
                title={data.title?.length === 0 ? data.name : data.title}
                icons={data.chartTypes?.map((type: string) => getIcon(type))}
                handleModal={(type: string) =>
                  handleModal(
                    data.id,
                    data.title.length === 0 ? data.name : data.title,
                    type
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
      {props.tableView && (
        <ReportsTable
          data={tableData}
          setTableData={setTableData}
          setModalType={setModalType}
        />
      )}
      <DeleteReportDialog
        cardId={cardId}
        modalType={modalType}
        reportName={reportName}
        setModalType={setModalType}
        handleDelete={handleDelete}
      />
      <DuplicateReportDialog
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
