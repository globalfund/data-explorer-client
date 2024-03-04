import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  stats,
  StatCompProps,
} from "app/pages/home/components/results-stats/data";

const StatComp: React.FC<StatCompProps> = (props: StatCompProps) => {
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
      {props.icon}
      <Box>
        <Typography variant="h3" fontWeight="900">
          {props.value}
        </Typography>
        <Typography
          component="div"
          maxWidth="190px"
          variant="overline"
          lineHeight="normal"
          dangerouslySetInnerHTML={{ __html: props.label }}
        />
      </Box>
    </Box>
  );
};

export const HomeResultsStats: React.FC = () => {
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
      {stats.map((stat: StatCompProps) => (
        <StatComp key={stat.label} {...stat} />
      ))}
    </Box>
  );
};
