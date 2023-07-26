import React from 'react';
import styled from 'styled-components/macro';
import useCookie from '@devhammed/use-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Message } from './common/message';

type SnackBarProps = {
  open: boolean;
};

const BaseSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 0;
  }

  & [class*='MuiSnackbarContent-root'] {
    background-color: white;
    width: 1232px;
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0 8px 17px -4px rgba(130, 142, 148, 0.35),
      0 0 4px 0 rgba(130, 142, 148, 0.16), 0 0 2px 0 rgba(130, 142, 148, 0.12);
    flex-wrap: nowrap;
    padding: 0 32px;
    display: flex;
    justify-content: center;
  }

  & [class*='MuiButtonBase-root'] {
    border-radius: 16px;
    height: 32px;
  }
  & [class*='MuiTypography-root'] {
    font-weight: bold;
    font-size: 18px;
  }

  & [class*='MuiSnackbarContent-message'] {
    padding-left: 0;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  & [class*='MuiSnackbarContent-action'] {
    padding-left: 64px;
  }
`;

export const CookieDialog = (props: SnackBarProps) => {
  const [cookie, setCookie] = useCookie('cookieNotice', 'true');
  const [visible, setVisibility] = React.useState(cookie);

  function handleClose() {
    setCookie('false', {
      expires: 31536000 * 20,
      domain: '',
      path: '',
      secure: false,
      httpOnly: false,
      maxAge: 0,
      sameSite: '',
    });
    setVisibility(!visible);
  }

  return (
    visible &&
    cookie && (
      <>
        <BaseSnackbar
          ClickAwayListenerProps={{ mouseEvent: false }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={props.open}
          autoHideDuration={null}
          onClose={handleClose}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={<Message onClose={handleClose} />}
          />
        </BaseSnackbar>
      </>
    )
  );
};
