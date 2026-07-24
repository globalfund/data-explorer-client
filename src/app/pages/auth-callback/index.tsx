import React from "react";
import Box from "@mui/system/Box";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "app/components/page-loader";

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user, error, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      getAccessTokenSilently().then((token) => {
        localStorage.setItem("accessToken", token);
        const redirectToPath = localStorage.getItem("redirectTo") ?? "/";
        navigate(redirectToPath);
        localStorage.removeItem("redirectTo");
      });
    }
  }, [isAuthenticated, user]);

  if (error && !isLoading) {
    if (!error.message.toLowerCase().includes("mismatch")) {
      return <div>{error.message}</div>;
    }
  }

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        zIndex: 1500,
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        background: "#f7f7f7",
        justifyContent: "center",
      }}
    >
      <PageLoader />
    </Box>
  );
};
