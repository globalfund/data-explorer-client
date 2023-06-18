import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  templates,
  TemplateItem,
  ReportInitialViewProps,
  ReportTemplateModel,
} from "app/modules/report-module/views/initial/data";

export function ReportInitialView(props: ReportInitialViewProps) {
  const handleTemplateSelected = (option: ReportTemplateModel) => {
    props.setButtonActive(option.value);
  };

  React.useEffect(() => {
    props.resetFrames();
  }, []);

  return (
    <>
      <div
        css={`
          height: 26px;
        `}
      />
      <Grid container spacing={10}>
        {templates.map((option) => (
          <Grid key={option.value} item xs={12} sm={6} md={4}>
            <TemplateItem
              name={option.name}
              value={option.value}
              available={option.available}
              description={option.description}
              templateImg={option.templateImg}
              handleClick={() => handleTemplateSelected(option)}
            />
          </Grid>
        ))}
      </Grid>
      <div
        css={`
          height: 114px;
        `}
      />
      <hr
        css={`
          border: 1px solid #adb5bd;
        `}
      />
    </>
  );
}
