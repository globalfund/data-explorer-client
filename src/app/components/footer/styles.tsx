import React from "react";
import { appColors } from "app/theme";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { ReactComponent as TwitterIcon } from "app/assets/vectors/SM_Twitter.svg";
import { ReactComponent as FacebookIcon } from "app/assets/vectors/SM_Facebook.svg";
import { ReactComponent as LinkedInIcon } from "app/assets/vectors/SM_LinkedIn.svg";
import { ReactComponent as InstagramIcon } from "app/assets/vectors/SM_Instagram.svg";

export const FooterContainer = styled.footer`
  width: 100vw;
  height: 256px;
  padding: 33px 0;
  position: relative;
  background-color: ${appColors.COMMON.WHITE};
  border-top: 1px solid ${appColors.COMMON.SECONDARY_COLOR_3};

  @media (max-width: 767px) {
    height: auto;
    padding: 16px 0;
  }
`;

export const FooterHeader = styled(Typography)`
  font-size: 10px;
  font-weight: 900;
  margin-bottom: 23px;
  color: ${appColors.COMMON.BLACK};
`;

export const FooterExternalLink = styled.a`
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  color: ${appColors.COMMON.BLACK};
`;

export const FooterLinkSeparator = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
`;

export const FooterSM = styled.a`
  text-decoration: none;
`;

export const FooterBottomBgBlock = styled.div`
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
  background-image: url("/static/images/FooterOrnament2.png");

  @media (max-width: 767px) {
    height: 80px;
  }
`;

export const SM = [
  {
    name: "facebook",
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/theglobalfund",
  },
  {
    name: "twitter",
    icon: <TwitterIcon />,
    link: "https://x.com/globalfund",
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
