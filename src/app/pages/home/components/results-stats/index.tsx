import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
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
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{
            "@media (max-width: 1200px)": {
              fontSize: "32px",
            },
          }}
        >
          {value.number} {value.text}
        </Typography>
        <Typography
          component="div"
          maxWidth="190px"
          variant="overline"
          lineHeight="normal"
        >
          {props.label}
        </Typography>
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
      justifyContent="center"
      sx={{
        "> div": {
          width: "calc(100% / 3)",
        },
        "@media (max-width: 920px)": {
          justifyContent: "space-around",
          "> div": {
            width: "fit-content",
          },
        },
      }}
    >
      {props.loading && props.stats.length === 0 && (
        <Box
          height="75px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100% !important",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {props.stats.length > 0 &&
        statsOrder.map((o) => {
          const stat = props.stats.find((s) => s.label.includes(o));
          return stat ? <StatComp key={stat.label} {...stat} /> : null;
        })}
    </Box>
  );
};
