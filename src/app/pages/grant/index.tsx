import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { PageLoader } from "app/components/page-loader";
import { GrantTargetsResults } from "./views/targets-results";
import { GrantOverview } from "app/pages/grant/views/overview";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { GrantDocuments } from "app/pages/grant/views/documents";
import { splitStringInMiddle } from "app/utils/splitStringInMiddle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { GrantImplementation } from "app/pages/grant/views/grant-implementation";
import {
  GRANT_TABS,
  GRANT_DROPDOWN_ITEMS,
} from "app/components/detail-page-tabs/data";

export const Grant: React.FC = () => {
  const params = useParams<{ id: string; ip: string; tab: string }>();

  const dataGrant = useStoreState(
    (state) =>
      get(state.GrantInfo, "data.data[0]", {
        code: "",
        title: "",
        periods: [],
        countryName: "",
        countryCode: "",
        principalRecipientId: "",
        principalRecipientName: "",
        principalRecipientShortrName: "",
        component: "",
      }) as {
        code: string;
        title: string;
        periods: {
          code: string | number;
          name: string;
        }[];
        countryName: string;
        countryCode: string;
        principalRecipientId: string;
        principalRecipientName: string;
        principalRecipientShortrName: string;
        component: string;
      }
  );

  const [dropdownSelected, setDropdownSelected] = React.useState<{
    code: string | number;
    name: string;
  } | null>(
    get(
      dataGrant.periods,
      `[${params.ip !== undefined ? parseInt(params.ip) - 1 : 0}]`,
      null
    )
  );

  const titleSplits = splitStringInMiddle(
    "Accelerated HIV Response Through Active Prevention, Linking To Care And Retention Interventions For PWID And Their Partners In Pakistan"
  );

  const handleDropdownChange = (value: string) => {
    const selected = dataGrant.periods.find((p) => p.code.toString() === value);
    if (selected) setDropdownSelected(selected);
  };

  const view = React.useMemo(() => {
    switch (params.tab) {
      case "overview":
        return <GrantOverview />;
      case "financial-insights":
        return <GrantImplementation />;
      case "targets-results":
        return <GrantTargetsResults />;
      case "documents":
        return <GrantDocuments />;
      default:
        return <div />;
    }
  }, [params.tab]);

  React.useEffect(() => {
    setDropdownSelected(
      get(
        dataGrant.periods,
        `[${params.ip !== undefined ? parseInt(params.ip) - 1 : 0}]`,
        null
      )
    );
  }, [params.ip]);

  return (
    <Box padding="60px 0">
      <Typography variant="h1" lineHeight={1}>
        {params.id}
      </Typography>
      <Typography
        variant="h6"
        color="#CFD4DA"
        lineHeight={1.2}
        marginBottom="24px"
      >
        {titleSplits.map((s) => (
          <React.Fragment key={s}>
            {s}
            <br />
          </React.Fragment>
        ))}
      </Typography>
      <DetailPageTabs
        tabs={GRANT_TABS}
        baseRoute={`/grant`}
        activeTab={params.tab}
        dropdown={{
          handleDropdownChange,
          dropdownSelected: dropdownSelected?.name || "",
          dropdownItems: dataGrant.periods.map((p) => ({
            label: p.name,
            value: p.code.toString(),
          })),
        }}
      />
      <Box marginTop="24px">{view}</Box>
    </Box>
  );
};

export const PreGrant: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const dataGrant = useStoreState(
    (state) =>
      get(state.GrantInfo, "data.data[0]", {
        code: "",
        title: "",
        periods: [],
        countryName: "",
        countryCode: "",
        principalRecipientId: "",
        principalRecipientName: "",
        principalRecipientShortrName: "",
        component: "",
      }) as {
        code: string;
        title: string;
        periods: {
          code: string | number;
          name: string;
        }[];
        countryName: string;
        countryCode: string;
        principalRecipientId: string;
        principalRecipientName: string;
        principalRecipientShortrName: string;
        component: string;
      }
  );
  const fetchGrant = useStoreActions((actions) => actions.GrantInfo.fetch);

  React.useEffect(() => {
    if (params.id) {
      fetchGrant({
        routeParams: {
          code: params.id,
        },
      });
    }
  }, [params.id]);

  React.useEffect(() => {
    if (dataGrant.periods.length > 0) {
      navigate(
        `/grant/${params.id}/${dataGrant.periods[dataGrant.periods.length - 1].code}/overview`,
        { replace: true }
      );
    }
  }, [dataGrant.periods]);

  return (
    <Box>
      <PageLoader />
    </Box>
  );
};
