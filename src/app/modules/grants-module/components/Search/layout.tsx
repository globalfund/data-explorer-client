import React from "react";
import { SearchIcon } from "app/assets/icons/Search";
import {
  container,
  input,
} from "app/modules/grants-module/components/Search/styles";

interface SearchLayoutProps {
  value: string;
  setValue: (value: string) => void;
}

export function SearchLayout(props: SearchLayoutProps) {
  return (
    <div css={container}>
      <input
        type="text"
        css={input}
        tabIndex={0}
        value={props.value}
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(e.target.value)
        }
      />
      <SearchIcon />
    </div>
  );
}
