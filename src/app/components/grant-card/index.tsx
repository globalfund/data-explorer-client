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
          borderColor: "#DFE3E5",
        },
      }}
    >
      <Box
        width="100%"
        display="flex"
        marginBottom="24px"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography fontSize="12px" fontWeight="700">
          {props.status}
        </Typography>
        <Box gap="21px" display="flex" flexDirection="row">
          <Box gap="4px" display="flex" alignItems="center">
            <LocationIcon fontSize="small" />
            <Typography fontSize="12px" fontWeight="700">
              {props.location}
            </Typography>
          </Box>
          <Box gap="4px" display="flex" alignItems="center">
            <SignalCellularAltIcon fontSize="small" />
            <Typography fontSize="12px" fontWeight="700">
              {props.rating}
            </Typography>
          </Box>
          <Typography fontSize="12px" fontWeight="700">
            {props.component}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" fontWeight="700">
        {props.number}
      </Typography>
      <Divider
        sx={{
          margin: "8px 0",
        }}
      />
      <Box gap="6px" display="flex" flexDirection="column">
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography fontSize="12px" fontWeight="700">
            Principal recipient:
          </Typography>
          <Typography fontSize="12px" letterSpacing="normal">
            {props.principalRecipient}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography fontSize="12px" fontWeight="700">
            Start / end date:
          </Typography>
          <Typography fontSize="12px" letterSpacing="normal">
            {props.startDate} / {props.endDate}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          margin: "8px 0 16px 0",
        }}
      />
      <Box gap="6px" display="flex" flexDirection="column">
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography fontSize="12px" fontWeight="700">
            Signed
          </Typography>
          <Typography fontSize="12px" letterSpacing="normal">
            {formatFinancialValue(props.signed)}
          </Typography>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography fontSize="12px" fontWeight="700">
            Disbursed · {props.percentage}%
          </Typography>
          <Typography fontSize="12px" letterSpacing="normal">
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
