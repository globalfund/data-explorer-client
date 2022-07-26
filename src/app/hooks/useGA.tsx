import React from "react";
import { useHistory } from "react-router-dom";
import useCookie from "@devhammed/use-cookie";

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
  const [userConsent] = useCookie("userConsent", false);

  React.useEffect(() => {
    if (window.location.hostname === "data.theglobalfund.org" && userConsent) {
      return history.listen(sendPageView);
    }
  }, [history]);

  return null;
}
