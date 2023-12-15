import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { PageLoader } from "app/modules/common/page-loader";

function AuthCallbackModule() {
  const history = useHistory();

  const { error, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [authRedirectRoute] = useLocalStorage("authRedirectRoute", "/");

  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace(authRedirectRoute ?? "/");
    } else {
      getAccessTokenSilently();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {!error && <PageLoader />}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default AuthCallbackModule;
