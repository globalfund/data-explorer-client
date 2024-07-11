import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ReactComponent as FooterLogo } from "app/assets/vectors/FooterLogo.svg";
import { ReactComponent as TwitterIcon } from "app/assets/vectors/SM_Twitter.svg";
import { ReactComponent as FacebookIcon } from "app/assets/vectors/SM_Facebook.svg";
import { ReactComponent as LinkedInIcon } from "app/assets/vectors/SM_LinkedIn.svg";
import { ReactComponent as InstagramIcon } from "app/assets/vectors/SM_Instagram.svg";

const FooterContainer = styled.footer`
  width: 100vw;
  height: 256px;
  padding: 33px 0;
  position: relative;
  background-color: ${appColors.COMMON.WHITE};
  border-top: 1px solid ${appColors.COMMON.SECONDARY_COLOR_3};
`;

const FooterHeader = styled(Typography)`
  font-size: 10px;
  font-weight: 900;
  margin-bottom: 23px;
  color: ${appColors.COMMON.BLACK};
`;

const FooterExternalLink = styled.a`
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${appColors.COMMON.BLACK};
`;

const FooterLinkSeparator = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
`;

const FooterSM = styled.a`
  text-decoration: none;
`;

const FooterBottomBgBlock = styled.div`
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
  background-image: url("/static/images/FooterOrnament2.png");
`;

const SM = [
  {
    name: "facebook",
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/theglobalfund",
  },
  {
    name: "twitter",
    icon: <TwitterIcon />,
    link: "https://twitter.com/globalfund",
  },
  {
    name: "linkedin",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/company/the-global-fund/",
  },
  {
    name: "instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/globalfund",
  },
];

export const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <FooterContainer>
        <Container maxWidth="lg" disableGutters>
          <Grid container>
            <Grid item sm={12} md={6} lg={7}>
              <FooterLogo />
              <Box
                gap="15px"
                display="flex"
                marginTop="56px"
                marginBottom="16px"
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
            <Grid item container sm={12} md={6} lg={5} spacing={2}>
              <Grid item sm={12} md={4}>
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
              <Grid item sm={12} md={4}>
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
              <Grid item sm={12} md={4}>
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
