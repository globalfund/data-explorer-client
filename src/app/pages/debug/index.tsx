import React from "react";
import { useParams } from "react-router-dom";
import { useStoreActions } from "app/state/store/hooks";
import { GrantTargetsResults } from "app/pages/grant/views/targets-results";

export const Debug: React.FC = () => {
  const params = useParams<{ id: string; ip: string }>();

  const fetchTargetsResults = useStoreActions(
    (actions) => actions.GrantTargetsResultsTable.fetch,
  );

  React.useEffect(() => {
    if (params.id && params.ip) {
      fetchTargetsResults({
        routeParams: { code: params.id, ip: params.ip },
      });
    }
  }, [params.id, params.ip]);

  return <GrantTargetsResults />;
};
