import React from "react";
import { useLocation } from "react-router-dom";

export function useScrollToAnchor() {
  const location = useLocation();
  const lastHash = React.useRef("");

  React.useEffect(() => {
    if (location.hash) {
      lastHash.current = `anchor-${location.hash.slice(1).split("|")[0]}`;
    }

    setTimeout(() => {
      if (lastHash.current && document.getElementById(lastHash.current)) {
        document.getElementById(lastHash.current)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        lastHash.current = "";
      }
    }, 1000);
  }, [location]);

  return null;
}
