import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  TemplateItem,
  searchResultOptions,
  ReportInitialViewProps,
  ReportSearchResultModel,
} from "app/modules/report-module/views/initial/data";
import { withStyles } from "@material-ui/core";

const StyledTextField = withStyles({
  root: {
    "& label.MuiInputLabel-root": {
      fontSize: "14px",
      color: "#868E96",
      fontFamily: "Gotham Narrow",
    },

    "& label.Mui-focused": {
      fontSize: "14px",
      color: "#6061e5",

      fontFamily: "Gotham Narrow",
    },
    "&.MuiInputBase-root": {
      bordercolor: "#ADB5BD",
    },

    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #ADB5BD",
    },
  },
})(TextField);

export function ReportInitialView(props: ReportInitialViewProps) {
  const [currentValue, setCurrentValue] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState(searchResultOptions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue === "") {
      setSearchResults(searchResultOptions);
      return;
    }
    const filteredResults = searchResultOptions.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleTemplateSelected = (option: ReportSearchResultModel) => {
    searchResults.filter((filterOption) => {
      if (filterOption.value === option.value) {
        setCurrentValue(option.value);
        props.setButtonActive(true, option.value);
      }
    });
  };

  React.useEffect(() => {
    props.resetFrames();
  }, []);

  const count = React.useMemo(() => {
    return searchResults.length;
  }, [searchResults]);

  return (
    <div>
      <StyledTextField
        fullWidth
        label="Search templates"
        onChange={handleSearch}
      />
      <div
        css={`
          font-size: 14px;
          text-align: center;
          padding: 16px 0 45px 0;
        `}
      >
        {count} result{count !== 1 ? "s" : ""}
      </div>
      <Grid container spacing={2}>
        {searchResults.map((option) => (
          <Grid key={option.value} item xs={12} sm={6} md={4}>
            <TemplateItem
              name={option.name}
              value={option.value}
              currentValue={currentValue}
              description={option.description}
              handleClick={() => handleTemplateSelected(option)}
              templateImg={option.templateImg}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
