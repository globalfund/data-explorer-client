import { useStoreState } from "app/state/store/hooks";
import React from "react";
import TextController from "./text";

export default function ElementsController() {
  const selectedItem = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );
  const activeRTE = useStoreState((state) => state.RBReportRTEState.activeRTE);

  const renderItem = () => {
    switch (selectedItem?.type) {
      case "text":
        return activeRTE && <TextController />;
      default:
        return null;
    }
  };

  return renderItem();
}
