import React from "react";
import { SearchLayout } from "app/modules/grants/components/Search/layout";
import { SearchResultModel } from "app/modules/grants/components/Search/components/results/data";

export function Search() {
  const [value, setValue] = React.useState("");
  const results: SearchResultModel[] = [];

  return <SearchLayout value={value} results={results} setValue={setValue} />;
}
