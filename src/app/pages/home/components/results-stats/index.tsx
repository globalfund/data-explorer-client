import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as TBIcon } from "app/assets/vectors/TB.svg";
import { ReactComponent as HIVIcon } from "app/assets/vectors/HIV.svg";
import { applyResultValueFormula } from "app/utils/applyResultValueFormula";
import { ReactComponent as MalariaIcon } from "app/assets/vectors/Malaria.svg";
import {
  StatCompProps,
  HomeResultsStatsProps,
  statsOrder,
} from "app/pages/home/components/results-stats/data";

const StatComp: React.FC<StatCompProps> = (props: StatCompProps) => {
  const value = applyResultValueFormula(props.value, 3);

  const labelHtml = props.label
    .replace("HIV", "<b>HIV</b>")
    .replace("TB", "<b>TB</b>")
    .replace("Mosquito nets", "<b>Mosquito nets</b>");

  const icon = React.useMemo(() => {
    if (props.icon) return props.icon;
    if (props.label.includes("HIV")) return <HIVIcon />;
    if (props.label.includes("TB")) return <TBIcon />;
    if (props.label.includes("Mosquito nets")) return <MalariaIcon />;
    return <React.Fragment />;
  }, [props.icon, props.label]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        b: {
          fontWeight: 900,
        },
      }}
    >
      {icon}
      <Box>
        <Typography variant="h3" fontWeight="900">
          {value.number} {value.text}
        </Typography>
        <Typography
          component="div"
          maxWidth="190px"
          variant="overline"
          lineHeight="normal"
          dangerouslySetInnerHTML={{ __html: labelHtml }}
        />
      </Box>
    </Box>
  );
};

export const HomeResultsStats: React.FC<HomeResultsStatsProps> = (
  props: HomeResultsStatsProps
) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        "> div": {
          width: "calc(100% / 3 - 20px)",
        },
      }}
    >
      {statsOrder.map((o) => {
        const stat = props.stats.find((s) => s.label.includes(o));
        return stat ? <StatComp key={stat.label} {...stat} /> : null;
      })}
    </Box>
  );
};
