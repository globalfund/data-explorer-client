import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { BreadcrumbsProps } from "app/components/breadcrumbs/data";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (
  props: BreadcrumbsProps
) => {
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Box
      gap="8px"
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{
        "> p": {
          padding: "5px",
        },
      }}
    >
      <IconButton sx={{ marginLeft: "-8px" }} onClick={onBackButtonClick}>
        <ArrowBack fontSize="small" />
      </IconButton>
      {props.items.map((item, index) => {
        const lastItem = index === props.items.length - 1;
        if (item.link && !lastItem) {
          return (
            <Link key={item.label} to={item.link}>
              <Typography variant="body2">{item.label}</Typography>
            </Link>
          );
        }
        return (
          <React.Fragment key={item.label}>
            <Typography
              variant="body2"
              key={item.label}
              fontWeight={lastItem ? "700" : "400"}
            >
              {item.label}
            </Typography>
            {!lastItem && "/"}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
