// cc:application base#;application providers
import React, { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'app/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

type ProviderProps = {
  children?: ReactNode;
};

function Providers(props: ProviderProps) {
  return (
    /* material ui theme provider */
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* react router */}
      <Router>{props.children}</Router>
    </ThemeProvider>
  );
}

export default Providers;
