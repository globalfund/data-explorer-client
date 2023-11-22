import React from "react";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "app/modules/common/page-loader";

function AuthCallbackModule() {
  const history = useHistory();
  const { error, isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace("/");
    } else {
      getAccessTokenSilently();
    }
  }, [isAuthenticated]);

  return (
    <Box>
      {!error && <PageLoader />}
      {error && <Box>{error.message}</Box>}
    </Box>
  );
}

export default AuthCallbackModule;
