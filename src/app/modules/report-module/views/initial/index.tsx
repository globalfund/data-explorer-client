import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  ReportInitialViewProps,
  searchResultOptions,
  TemplateItem,
} from "app/modules/report-module/views/initial/data";

export function ReportInitialView(props: ReportInitialViewProps) {
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

  const count = React.useMemo(() => {
    return searchResults.length;
  }, [searchResults]);

  return (
    <div>
      <TextField fullWidth label="Search templates" onChange={handleSearch} />
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
              description={option.description}
              setCurrentView={props.setCurrentView}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
