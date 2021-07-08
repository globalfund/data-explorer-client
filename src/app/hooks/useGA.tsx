import React from "react";
import { useHistory } from "react-router-dom";

function sendPageView(location: any) {
  // @ts-ignore
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: location.pathname,
    send_to: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  });
}

export function useGA() {
  const history = useHistory();

  React.useEffect(() => {
    if (window.location.hostname === "data.v2.theglobalfund.org") {
      return history.listen(sendPageView);
    }
  }, [history]);

  return null;
}
