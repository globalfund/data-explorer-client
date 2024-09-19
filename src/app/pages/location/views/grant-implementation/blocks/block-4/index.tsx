import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import Typography from "@mui/material/Typography";
import { PieChart } from "app/components/charts/pie";
import { ChartBlock } from "app/components/chart-block";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { TableContainer } from "app/components/table-container";
import { GrantCardProps } from "app/components/grant-card/data";
import { getMonthFromNumber } from "app/utils/getMonthFromNumber";
import { PieChartDataItem } from "app/components/charts/pie/data";
import { TABLE_VARIATION_5_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";

export const LocationGrantImplementationBlock4 = () => {
  const cmsData = useCMSData({ returnData: true });
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "pledges-contributions",
  });

  const params = useParams<{ id: string; tab: string }>();
  const paramsId = params.id?.replace("|", "%2F");

  const [tableSearch, setTableSearch] = React.useState("");

  const dataGrantsPieCharts = useStoreState(
    (state) =>
      get(state.GeographyGrantsPieCharts, "data.data", {
        pie1: [],
        pie2: [],
        pie3: [],
      }) as {
        pie1: PieChartDataItem[];
        pie2: PieChartDataItem[];
        pie3: PieChartDataItem[];
      }
  );
  const dataGrantsTable = useStoreState(
    (state) =>
      get(state.GeographyGrantsTable, "data.data", []) as GrantCardProps[]
  );
  const countGrantsTable = useStoreState((state) =>
    get(state.GeographyGrantsTable, "data.count", 0)
  );
  const loadingGrantsPieCharts = useStoreState(
    (state) => state.GeographyGrantsPieCharts.loading
  );
  const loadingGrantsTable = useStoreState(
    (state) => state.GeographyGrantsTable.loading
  );
  const fetchGrantsTable = useStoreActions(
    (actions) => actions.GeographyGrantsTable.fetch
  );

  const onSearchChange = (search: string) => {
    setTableSearch(search);
    if (paramsId) {
      fetchGrantsTable({
        filterString: `geographies=${paramsId}${
          search.length > 0 ? `&q=${search}` : ""
        }`,
        routeParams: {
          page: "1",
          pageSize: "all",
        },
      });
    }
  };

  const dataGrantsTableFormatted = React.useMemo(() => {
    return dataGrantsTable.map((item) => {
      let datesStr = "";
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      if (startDate) {
        datesStr = `${getMonthFromNumber(
          startDate.getMonth() + 1
        )} ${startDate.getFullYear()} - `;
      }
      if (endDate) {
        datesStr += `${getMonthFromNumber(
          endDate.getMonth() + 1
        )} ${endDate.getFullYear()}`;
      }
      return {
        grantId: item.number,
        startEndDate: datesStr,
        geography: item.location,
        component: item.component,
        principalRecipient: item.principalRecipient,
        status: item.status,
        signed: item.signed,
        disbursed: item.disbursed,
      };
    });
  }, [dataGrantsTable]);

  const exportChartData = React.useMemo(() => {
    return {
      headers: [
        "Grant ID",
        "Start/End date",
        "Geography",
        "Component",
        "Principal Recipient",
        "Status",
        "Signed",
        "Disbursed",
      ],
      data: dataGrantsTable.map((item) => [
        item.number,
        `${getMonthFromNumber(
          new Date(item.startDate).getMonth() + 1
        )} ${new Date(item.startDate).getFullYear()} - ${getMonthFromNumber(
          new Date(item.endDate).getMonth() + 1
        )} ${new Date(item.endDate).getFullYear()}`,
        `"${item.location}"`,
        item.component,
        `"${item.principalRecipient}"`,
        item.status,
        item.signed,
        item.disbursed,
      ]),
    };
  }, [dataGrantsTable]);

  const showGrantsTable =
    (dataGrantsTable.length > 0 &&
      !loadingGrantsTable &&
      !loadingGrantsPieCharts) ||
    tableSearch.length > 0;

  return (
    <ChartBlock
      id="grants"
      title={`${countGrantsTable} ${getCMSDataField(
        cmsData,
        "pagesLocationGrantImplementation.grantsTitle",
        "Grants"
      )}`}
      subtitle=""
      empty={!showGrantsTable}
      latestUpdate={latestUpdateDate}
      data={exportChartData}
      infoType="global"
    >
      <Box height="16px" />
      <TableContainer
        withCycles
        search={tableSearch}
        id="financial-insights-table"
        data={dataGrantsTableFormatted}
        onSearchChange={onSearchChange}
        columns={TABLE_VARIATION_5_COLUMNS}
      />
      <Box
        height="64px"
        sx={{
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      />
      <Box
        width="100%"
        padding="32px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{
          "@media (max-width: 767px)": {
            gap: "32px",
            padding: "16px 0",
            flexDirection: "column",
            "> div": {
              gap: 0,
              width: "100%",
            },
          },
        }}
        data-cy="location-pie-charts"
      >
        <Box
          gap="16px"
          display="flex"
          alignItems="center"
          width="calc(100% / 3)"
          flexDirection="column"
        >
          <Typography color="#000" fontSize="18px" fontWeight="700">
            {getCMSDataField(
              cmsData,
              "pagesLocationGrantImplementation.grantsPieChart1Title",
              "Components"
            )}
          </Typography>
          <PieChart data={dataGrantsPieCharts.pie1} />
        </Box>
        <Box
          gap="16px"
          display="flex"
          alignItems="center"
          width="calc(100% / 3)"
          flexDirection="column"
        >
          <Typography color="#000" fontSize="18px" fontWeight="700">
            {getCMSDataField(
              cmsData,
              "pagesLocationGrantImplementation.grantsPieChart2Title",
              "Principal Recipients"
            )}
          </Typography>
          <PieChart data={dataGrantsPieCharts.pie2} />
        </Box>
        <Box
          gap="16px"
          display="flex"
          alignItems="center"
          width="calc(100% / 3)"
          flexDirection="column"
        >
          <Typography color="#000" fontSize="18px" fontWeight="700">
            {getCMSDataField(
              cmsData,
              "pagesLocationGrantImplementation.grantsPieChart3Title",
              "Investments"
            )}
          </Typography>
          <PieChart data={dataGrantsPieCharts.pie3} />
        </Box>
      </Box>
    </ChartBlock>
  );
};
