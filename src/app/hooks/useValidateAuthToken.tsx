import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useValidateAuthToken = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      localStorage.removeItem("accessToken");
      return;
    }

    const hasRunInThisTab = sessionStorage.getItem(
      "validateAuthTokenOnFirstLoadDone",
    );

    if (hasRunInThisTab) {
      return;
    }

    sessionStorage.setItem("validateAuthTokenOnFirstLoadDone", "true");

    const token = localStorage.getItem("accessToken");

    if (token) {
      fetch(`${import.meta.env.VITE_API}/auth/validate-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            getAccessTokenSilently().then((newToken) => {
              localStorage.setItem("accessToken", newToken);
            });
          }
        })
        .catch(() => {
          getAccessTokenSilently().then((newToken) => {
            localStorage.setItem("accessToken", newToken);
          });
        });
    } else {
      getAccessTokenSilently().then((newToken) => {
        localStorage.setItem("accessToken", newToken);
      });
    }
  }, [isAuthenticated, isLoading]);
};
