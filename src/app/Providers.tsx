import React from "react";
import theme from "app/theme";
import { store } from "app/state/store";
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { PageLoader } from "app/components/page-loader";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";

interface ProviderProps {
  children?: any;
}

function Providers(props: ProviderProps) {
  return (
    <HelmetProvider>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>{props.children}</AppContainer>
        </ThemeProvider>
      </StoreProvider>
    </HelmetProvider>
  );
}

export default Providers;

function AppContainer(props: ProviderProps) {
  const isRehydrated = useStoreRehydrated();
  if (!isRehydrated) {
    return <PageLoader />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
}
