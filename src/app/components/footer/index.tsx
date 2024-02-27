import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as FooterLogo } from "app/assets/vectors/FooterLogo.svg";

const FooterContainer = styled.footer`
  width: 100vw;
  height: 256px;
  padding: 38px 0;
  position: relative;
  background-size: contain;
  background-position-x: left;
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-color: ${appColors.COMMON.BLACK};
  background-image: url("/static/images/FooterOrnament.png");
`;

const FooterHeader = styled(Typography)`
  font-size: 10px;
  font-weight: 900;
  margin-bottom: 23px;
`;

const FooterInternalLink = styled(Link)`
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${appColors.COMMON.WHITE};
`;

const FooterExternalLink = styled.a`
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${appColors.COMMON.WHITE};
`;

const FooterSM = styled.a`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  text-decoration: none;
  color: ${appColors.COMMON.WHITE};
  border: 1px solid ${appColors.COMMON.WHITE};

  > svg {
    transform: scale(0.7);
  }
`;

const FooterDonateButton = styled.button`
  padding: 0;
  width: 140px;
  height: 32px;
  font-size: 10px;
  cursor: pointer;
  font-weight: 700;
  border-radius: 50px;
  color: ${appColors.COMMON.WHITE};
  background: ${appColors.COMMON.BLACK};
  border: 1px solid ${appColors.COMMON.WHITE};
`;

const SM = [
  {
    name: "facebook",
    icon: <FacebookIcon fontSize="small" htmlColor={appColors.COMMON.WHITE} />,
    link: "https://www.facebook.com/theglobalfund",
  },
  {
    name: "twitter",
    icon: <TwitterIcon fontSize="small" htmlColor={appColors.COMMON.WHITE} />,
    link: "https://twitter.com/theglobalfund",
  },
  {
    name: "linkedin",
    icon: <LinkedInIcon fontSize="small" htmlColor={appColors.COMMON.WHITE} />,
    link: "https://www.linkedin.com/company/the-global-fund-to-fight-aids-tuberculosis-and-malaria",
  },
  {
    name: "instagram",
    icon: <InstagramIcon fontSize="small" htmlColor={appColors.COMMON.WHITE} />,
    link: "https://www.instagram.com/theglobalfund",
  },
];

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid item sm={false} md={6} lg={7} />
          <Grid item container sm={12} md={6} lg={5}>
            <Grid item sm={12} md={4}>
              <FooterHeader>CONNECT</FooterHeader>
              <FooterInternalLink to="/about">About Us</FooterInternalLink>
              <FooterExternalLink
                target="_blank"
                href="https://www.theglobalfund.org/en/contact"
              >
                Contact Us
              </FooterExternalLink>
              <FooterExternalLink
                target="_blank"
                href="https://www.theglobalfund.org/en/site/rss"
              >
                RSS Feeds
              </FooterExternalLink>
              <FooterExternalLink
                target="_blank"
                href="https://www.theglobalfund.org/en/oig/report-fraud-and-abus/"
              >
                Report Fraud & Abuse
              </FooterExternalLink>
            </Grid>
            <Grid item sm={12} md={4}>
              <FooterHeader>MORE GLOBAL FUND SITES</FooterHeader>
              <FooterExternalLink
                target="_blank"
                href="https://www.theglobalfund.org/en"
              >
                TGF Website
              </FooterExternalLink>
              <FooterExternalLink
                target="_blank"
                href="https://data-service.theglobalfund.org"
              >
                Data Service
              </FooterExternalLink>
              <FooterExternalLink
                target="_blank"
                href="https://www.theglobalfund.org/en/newsroom/digital-media"
              >
                Digital Library
              </FooterExternalLink>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
            >
              <Box display="flex" gap="15px" marginBottom="32px">
                {SM.map((sm) => (
                  <FooterSM key={sm.name} href={sm.link} target="_blank">
                    {sm.icon}
                  </FooterSM>
                ))}
              </Box>
              <FooterDonateButton
                onClick={() =>
                  window.open(
                    "https://act.unfoundation.org/FJvB3vUCJUepH_5KN75TTQ2",
                    "_blank"
                  )
                }
              >
                DONATE NOW
              </FooterDonateButton>
            </Grid>
            <Grid item sm={12}>
              <Divider
                sx={{
                  margin: "16px 0",
                  background: appColors.COMMON.WHITE,
                }}
              />
            </Grid>
            <Grid item sm={12} marginTop="5px">
              <FooterLogo />
              <Typography
                display="block"
                fontSize="10px"
                marginTop="-5px"
                variant="caption"
                color={appColors.COMMON.WHITE}
              >
                © {new Date().getFullYear()} The Global Fund to Fight AIDS,
                Tuberculosis and Malaria
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};
