import React from "react";
import { SearchLayout } from "app/modules/results-module/components/Search/layout";

export function Search() {
  const [value, setValue] = React.useState("");

  return <SearchLayout value={value} setValue={setValue} />;
}
