import React from "react";
import { useHistory } from "react-router-dom";

export function useScrollToTop() {
  const history = useHistory();

  React.useEffect(() => {
    return history.listen(() => {
      if (history.location.hash === "") {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, 5);
      }
    });
  }, [history]);

  return null;
}
