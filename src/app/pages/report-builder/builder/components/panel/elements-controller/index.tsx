import { useStoreState } from "app/state/store/hooks";
import React from "react";
import TextController from "./text";

export default function ElementsController() {
  const selectedItem = useStoreState(
    (state) => state.RBReportItemsControllerState.item,
  );

  const renderItem = () => {
    switch (selectedItem?.type) {
      case "text":
        return <TextController />;
      default:
        return <div>No Controller Available</div>;
    }
  };

  return renderItem();
}
