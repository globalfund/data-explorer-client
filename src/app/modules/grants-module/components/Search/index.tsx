import React from "react";
import { SearchLayout } from "app/modules/grants-module/components/Search/layout";

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
}

export function Search(props: SearchProps) {
  return <SearchLayout value={props.value} setValue={props.setValue} />;
}
