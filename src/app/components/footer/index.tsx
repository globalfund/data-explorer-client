import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ReactComponent as FooterLogo } from "app/assets/vectors/FooterLogo.svg";
import {
  SM,
  FooterSM,
  FooterHeader,
  FooterContainer,
  FooterExternalLink,
  FooterBottomBgBlock,
  FooterLinkSeparator,
} from "app/components/footer/styles";

export const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <FooterContainer>
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            "@media (max-width: 1200px)": {
              padding: "0 16px",
            },
          }}
        >
          <Grid container>
            <Grid item sm={6} md={6} lg={7}>
              <FooterLogo />
              <Box
                gap="15px"
                display="flex"
                marginTop="56px"
                marginBottom="16px"
                sx={{
                  "@media (max-width: 767px)": {
                    marginTop: "16px",
                  },
                }}
              >
                {SM.map((sm) => (
                  <FooterSM key={sm.name} href={sm.link} target="_blank">
                    {sm.icon}
                  </FooterSM>
                ))}
              </Box>
              <Typography
                display="block"
                fontSize="10px"
                marginTop="-5px"
                variant="caption"
                color={appColors.COMMON.BLACK}
              >
                © {new Date().getFullYear()} The Global Fund to Fight AIDS,
                Tuberculosis and Malaria
              </Typography>
            </Grid>
            <Grid
              item
              container
              sm={6}
              md={6}
              lg={5}
              spacing={2}
              sx={{
                "@media (max-width: 767px)": {
                  display: "none",
                },
              }}
            >
              <Grid item sm={4} md={4}>
                <FooterHeader>CONNECT</FooterHeader>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/contact/"
                >
                  Contact Us
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/careers/"
                >
                  Careers
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/site/rss"
                >
                  RSS Feeds
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/oig/report-fraud-and-abuse/"
                >
                  Report Fraud & Abuse
                </FooterExternalLink>
                <FooterLinkSeparator>-</FooterLinkSeparator>
                <FooterExternalLink
                  target="_blank"
                  href="https://act.unfoundation.org/FJvB3vUCJUepH_5KN75TTQ2"
                >
                  Donate to the Global Fund through United Nations Foundation
                </FooterExternalLink>
              </Grid>
              <Grid item sm={4} md={4}>
                <FooterHeader>ABOUT THE WEBSITE</FooterHeader>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/site/phishing-and-scam-alert/"
                >
                  Phishing & Scam Alert
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/site/privacy-statement/"
                >
                  Privacy Statement
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/site/terms-of-use/"
                >
                  Terms of Use
                </FooterExternalLink>
                <FooterExternalLink
                  target="_blank"
                  href="https://www.theglobalfund.org/en/site/cookies/"
                >
                  Cookies
                </FooterExternalLink>
              </Grid>
              <Grid item sm={4} md={4}>
                <FooterHeader>MORE GLOBAL FUND SITES</FooterHeader>
                <FooterExternalLink
                  target="_blank"
                  href="http://www.theglobalfund.org"
                >
                  The Global Fund Website
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
                <FooterLinkSeparator>-</FooterLinkSeparator>
                <FooterExternalLink
                  target="_blank"
                  href="https://archive.theglobalfund.org"
                >
                  Archive
                </FooterExternalLink>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </FooterContainer>
      <Container maxWidth="lg" disableGutters>
        <FooterBottomBgBlock />
      </Container>
    </React.Fragment>
  );
};
