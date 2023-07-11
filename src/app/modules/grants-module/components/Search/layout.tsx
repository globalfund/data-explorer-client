import React from "react";
import get from "lodash/get";
import CloseIcon from "@material-ui/icons/Close";
import { useCMSData } from "app/hooks/useCMSData";
import { SearchIcon } from "app/assets/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import {
  container,
  input,
} from "app/modules/grants-module/components/Search/styles";

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
      {props.value.length === 0 ? (
        <SearchIcon />
      ) : (
        <IconButton
          onClick={() => props.setValue("")}
          css={`
            padding: 0;
          `}
        >
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
}
