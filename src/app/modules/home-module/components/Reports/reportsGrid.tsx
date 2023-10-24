import React from "react";
import axios from "axios";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useSessionStorage, useUpdateEffect } from "react-use";
import useDebounce from "react-use/lib/useDebounce";
import { ReportModel } from "app/modules/report-module/data";
import ColoredReportIcon from "app/assets/icons/ColoredReportIcon";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { HomepageTable } from "app/modules/home-module/components/Table";
import DeleteReportDialog from "app/components/Dialogs/deleteReportDialog";
import ReformedGridItem from "app/modules/home-module/components/Reports/reformedGridItem";
import ReportAddnewCard from "./reportAddNewCard";
import { useInfinityScroll } from "app/hooks/useInfinityScroll";
import CircleLoader from "../Loader";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
  showMenuButton: boolean;
  addCard?: boolean;
}

export default function ReportsGrid(props: Props) {
  const observerTarget = React.useRef(null);
  const token = useSessionStorage("authToken", "")[0];
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [loadedReports, setLoadedReports] = React.useState<ReportModel[]>([]);
  const limit = 15;
  //used over usestate to get current offset value in the IntersectionObserver api, as it is not updated in usestate.
  const [offset, setOffset] = React.useState(0);
  const { isObserved } = useInfinityScroll(observerTarget);
  const reports = useStoreState(
    (state) => (state.reports.ReportGetList.crudData ?? []) as ReportModel[]
  );
  const loadReportsCount = useStoreActions(
    (actions) => actions.reports.ReportsCount.fetch
  );
  const reportsCount = useStoreState(
    (state) => get(state, "reports.ReportsCount.data.count", 0) as number
  );

  const loadReports = useStoreActions(
    (actions) => actions.reports.ReportGetList.fetch
  );
  const loading = useStoreState((state) => state.reports.ReportGetList.loading);
  const reportsLoadSuccess = useStoreState(
    (state) => state.reports.ReportGetList.success
  );

  const getFilterString = () => {
    const value =
      props.searchStr?.length > 0
        ? `"where":{"name":{"like":"${props.searchStr}.*","options":"i"}},`
        : "";
    return `filter={${value}"order":"${props.sortBy} desc","limit":${limit},"offset":${offset}}`;
  };

  const getWhereString = () => {
    return props.searchStr?.length > 0
      ? `where={"name":{"like":"${props.searchStr}.*","options":"i"}}`
      : "";
  };

  const loadData = async () => {
    //refrain from loading data if all the data is loaded
    if (loadedReports.length !== reportsCount && token) {
      await loadReports({
        token,
        storeInCrudData: true,
        filterString: getFilterString(),
      });
    }
  };

  const reloadData = async () => {
    setOffset(0);
    if (token) {
      await loadReportsCount({ token, filterString: getWhereString() });
    }
    setLoadedReports([]);
    loadData();
  };

  React.useEffect(() => {
    //load data if intersection observer is triggered
    if (isObserved) {
      if (loadedReports.length !== reportsCount) {
        //update the offset value for the next load
        setOffset(offset + limit);
      }
    }
  }, [isObserved]);

  useUpdateEffect(() => {
    loadData();
  }, [offset]);

  React.useEffect(() => {
    if (token) {
      reloadData();
    }
  }, [props.sortBy, token]);

  const handleDelete = (index?: number) => {
    setModalDisplay(false);
    setEnableButton(false);
    const id = loadedReports[index as number].id;
    if (!id) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API}/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        reloadData();
      })
      .catch((error) => console.log(error));
  };

  const handleDuplicate = (index: number) => {
    const id = loadedReports[index].id;
    if (!id) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API}/report/duplicate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        reloadData();
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
    if (!reportsLoadSuccess) {
      return;
    }
    //update the loaded reports
    setLoadedReports((prevReports) => {
      const prevReportsIds = prevReports.map((r) => r.id);
      const f = reports.filter((report) => !prevReportsIds.includes(report.id));
      return [...prevReports, ...f];
    });
  }, [reportsLoadSuccess]);

  const [,] = useDebounce(
    () => {
      //calls reloadData 500ms after change in searchStr or sortBy
      if (props.searchStr !== undefined) {
        reloadData();
      }
    },
    500,
    [props.searchStr]
  );

  return (
    <>
      {!props.tableView && (
        <Grid container spacing={2}>
          {props.addCard && <ReportAddnewCard />}
          {loadedReports.map((data, index) => (
            <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
              <ReformedGridItem
                id={data.id}
                key={data.id}
                descr={data.name}
                date={data.createdDate}
                viz={<ColoredReportIcon />}
                color={data.backgroundColor}
                showMenuButton={props.showMenuButton}
                handleDelete={() => handleModal(index)}
                handleDuplicate={() => handleDuplicate(index)}
                title={
                  get(data, "title", "").length > 0 ? data.title : data.name
                }
              />
              <Box height={16} />
            </Grid>
          ))}
        </Grid>
      )}
      {props.tableView && (
        <HomepageTable
          data={loadedReports.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.title,
            createdDate: data.createdDate,
          }))}
        />
      )}
      <Box height={100} />

      <div ref={observerTarget} />
      {loading && <CircleLoader />}
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
