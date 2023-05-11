import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  templates,
  TemplateItem,
  ReportInitialViewProps,
  ReportTemplateModel,
} from "app/modules/report-module/views/initial/data";

export function ReportInitialView(props: ReportInitialViewProps) {
  const [currentValue, setCurrentValue] = React.useState<string>("");

  const handleTemplateSelected = (option: ReportTemplateModel) => {
    setCurrentValue(option.value);
    props.setButtonActive(true, option.value);
  };

  React.useEffect(() => {
    props.resetFrames();
  }, []);

  return (
    <Grid container spacing={6}>
      {templates.map((option) => (
        <Grid key={option.value} item xs={12} sm={6} md={4}>
          <TemplateItem
            name={option.name}
            value={option.value}
            currentValue={currentValue}
            available={option.available}
            description={option.description}
            templateImg={option.templateImg}
            handleClick={() => handleTemplateSelected(option)}
          />
        </Grid>
      ))}
    </Grid>
  );
}