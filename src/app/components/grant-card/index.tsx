import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LocationIcon from "@mui/icons-material/LocationOn";
import { GrantCardProps } from "app/components/grant-card/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export const GrantCard: React.FC<GrantCardProps> = (props: GrantCardProps) => {
  return (
    <Box
      width="367px"
      height="333px"
      display="flex"
      padding="16px"
      borderRadius="20px"
      letterSpacing="0.5px"
      bgcolor="transparent"
      flexDirection="column"
      border="1px solid #B1B1B1"
      sx={{
        "*": {
          lineHeight: "1.4",
        },
        hr: {
          margin: "16px 0",
          borderColor: "#DFE3E5",
        },
      }}
    >
      <Box
        width="100%"
        display="flex"
        marginBottom="8px"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="overline" fontWeight="700">
          {props.status}
        </Typography>
        <Box gap="21px" display="flex" flexDirection="row">
          <Box gap="4px" display="flex" alignItems="center">
            <LocationIcon fontSize="small" />
            <Typography variant="overline" fontWeight="700">
              {props.location}
            </Typography>
          </Box>
          <Box gap="4px" display="flex" alignItems="center">
            <SignalCellularAltIcon fontSize="small" />
            <Typography variant="overline" fontWeight="700">
              {props.rating}
            </Typography>
          </Box>
          <Typography variant="overline" fontWeight="700">
            {props.component}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" fontWeight="700">
        {props.number}
      </Typography>
      <Divider />
      <Box gap="6px" display="flex" flexDirection="column">
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="overline" fontWeight="700">
            Principal recipient:
          </Typography>
          <Typography variant="overline" letterSpacing="normal">
            {props.principalRecipient}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="overline" fontWeight="700">
            Start / end date:
          </Typography>
          <Typography variant="overline" letterSpacing="normal">
            {props.startDate} / {props.endDate}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Typography
        variant="body2"
        fontWeight="700"
        height="80px"
        overflow="hidden"
        textOverflow="ellipsis"
        sx={{
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
        }}
      >
        {props.title}
      </Typography>
      <Divider />
      <Box gap="6px" display="flex" flexDirection="column">
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="overline" fontWeight="700">
            Signed
          </Typography>
          <Typography variant="overline" letterSpacing="normal">
            {formatFinancialValue(props.signed)}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="overline" fontWeight="700">
            Disbursed · {props.percentage}%
          </Typography>
          <Typography variant="overline" letterSpacing="normal">
            {formatFinancialValue(props.disbursed)}
          </Typography>
        </Box>
        <Box
          width="100%"
          height="4px"
          display="flex"
          bgcolor="#C7CDD1"
          borderRadius="20px"
        >
          <Box
            bgcolor="#373D43"
            borderRadius="20px"
            width={`${props.percentage}%`}
          />
        </Box>
      </Box>
    </Box>
  );
};
