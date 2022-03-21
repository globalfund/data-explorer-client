import React from "react";
import get from "lodash/get";
import { SearchIcon } from "app/assets/icons/Search";
import {
  container,
  input,
} from "app/modules/grants-module/components/Search/styles";
import { useCMSData } from "app/hooks/useCMSData";

interface SearchLayoutProps {
  value: string;
  setValue: (value: string) => void;
}

export function SearchLayout(props: SearchLayoutProps) {
  const cmsData = useCMSData({ returnData: true });
  return (
    <div css={container}>
      <input
        type="text"
        css={input}
        tabIndex={0}
        value={props.value}
        placeholder={get(cmsData, "modulesGrants.searchPlaceholder", "")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(e.target.value)
        }
      />
      <SearchIcon />
    </div>
  );
}
