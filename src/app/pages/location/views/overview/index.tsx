import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link as RouteLink } from "react-router-dom";

const CMS_TEXT =
  "<div>\n<p>\nThe Global Fund currently invests in six grants addressing HIV, tuberculosis (TB) and malaria in Kenya, with total funding of up to US$441 million allocated for 2021-2024. These grants support critical interventions geared toward achieving the country’s bold targets for reducing new cases and deaths from the three diseases.\n</p>\n<h4>\nProgress\n</h4>\n<p>\nKenya has made significant progress economically in the last decade, moving from a low-income to a middle-income economy. However, the country of 53 million people still faces challenges in inequality, poverty, transparency and accountability. The COVID-19 pandemic has compounded some of these challenges.\n</p>\n<p>\nNonetheless, Kenya continues to make progress in the fight against HIV, TB and malaria. New HIV infections declined from 1.18 per 1,000 population in 2015 to 0.72 in 2020. HIV prevalence declined from 4.9% in 2018 to 4.5% in 2020, and the HIV incidence rate reduced from 0.27% in 2016 to 0.14% in 2020. The TB incidence rate fell by 11% between 2018 and 2020. Malaria prevalence among children under 5 declined from 8% in 2016 to 6% in 2020.\n</p>\n<p>\nKenya has also adapted HIV, TB and malaria programs to the COVID-19 pandemic and is successfully mitigating the pandemic’s impact on the three diseases.\n</p>\n<h4>\nChallenges\n</h4>\n<p>\nHIV prevalence among key populations and vulnerable groups is disproportionately higher than the national averages, with rates highest among female sex workers, adolescent girls and young women, people who inject drugs and gay men and other men who have sex with men. Kenya’s national HIV strategy identifies the need to focus more on key populations, as well as the continued rollout of quality improvement approaches to support differentiated care delivery for vulnerable groups, as well as the general population.\n</p>\n<p>\nDespite downward trends in new TB cases and mortality over the last decade, declining trends in TB case notification and treatment success rates are concerning. Reasons for continued “missing” cases are low awareness of TB, inadequate TB screening in health facilities, suboptimal TB diagnostic and treatment services coverage and limited community and private sector engagement.\n</p>\n<p>\nMalaria remains a significant public health and socioeconomic challenge in Kenya. It is endemic in the coastal and lake regions, with high levels of transmission throughout the year. Seasonal malaria transmission occurs in the arid and semi-arid areas of the country. Environmental conditions, along with a need to boost universal coverage of insecticide-treated mosquito nets and disruptions in diagnostic availability caused by supply chain difficulties, are key challenges in Kenya's malaria response.\n</p>\n<h4>\nGlobal Fund investments\n</h4>\n<p>\nTwo HIV grants in Kenya were allocated funding for 2021-2024 of up to a combined total of US$264 million. Our investments support interventions that aim to reduce new HIV infections by 75%, AIDS-related mortality by 50%, HIV-related stigma and discrimination by 25% and significantly increase domestic financing of Kenya’s HIV response.\n<p>\nTwo TB grants were allocated funding of up to a combined total of US$96 million for 2021-2024. The investments work together to deliver interventions aimed at ensuring provision of quality care and prevention services for all people in Kenya with TB.\n</p>\n<p>\nFunding of up to a combined total of US$81 million was allocated for two malaria programs for 2021-2024. The funding supports Kenya in its mission to reduce malaria incidence and deaths by at least 75% of 2016 levels through a range of high-impact prevention, diagnosis and treatment interventions.\n</p>\n<p>\nLast updated June 2022.\t\n</p>\n</div>";

export const LocationOverview: React.FC = () => {
  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <Box>
        <Typography fontSize="18px" fontWeight="700">
          Description
        </Typography>
        <Box
          sx={{
            columnCount: 2,
            fontSize: "14px",
            columnGap: "32px",
            columnSpan: "all",
            columnWidth: "50%",
          }}
          dangerouslySetInnerHTML={{
            __html: CMS_TEXT,
          }}
        />
      </Box>
      <Divider sx={{ borderColor: "#000" }} />
      <Grid
        container
        spacing={4}
        sx={{
          a: {
            color: "#000",
            textDecoration: "none",
          },
        }}
      >
        <Grid item md={12} lg={6}>
          <Box
            sx={{
              gap: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box paddingBottom="29px">
              <Typography variant="body2" fontWeight="700" marginBottom="10px">
                Fund Portfolio Manager
              </Typography>
              <Typography fontSize="12px">
                Paul MCCARRICK
                <br />
                <a href="mailto:paul.mccarrick@theglobalfund.org">
                  paul.mccarrick@theglobalfund.org
                </a>
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "#000" }} />
            <Box>
              <Typography variant="body2" fontWeight="700" marginBottom="10px">
                Coordinating Mechanism Contacts
              </Typography>
              <Typography
                variant="body2"
                color="#ADB5BD"
                fontWeight="700"
                marginBottom="10px"
              >
                CCM Kenya
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Vice Chair
                  </Typography>
                  <Typography fontSize="12px">Ms. Maurine MURENGA</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Vice Chair
                  </Typography>
                  <Typography fontSize="12px">Ms. Maurine MURENGA</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Admin Focal Points
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Mr. Samuel MUIA
                        <br />
                        Coordinator
                        <br />
                        muiasammy@yahoo.com
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Ms. Margaret MUNDIA
                        <br />
                        Finance & Operations
                        <br />
                        w.mundiam@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Admin Focal Points
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Mr. Samuel MUIA
                        <br />
                        Coordinator
                        <br />
                        muiasammy@yahoo.com
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Ms. Margaret MUNDIA
                        <br />
                        Finance & Operations
                        <br />
                        w.mundiam@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Vice Chair
                  </Typography>
                  <Typography fontSize="12px">Ms. Maurine MURENGA</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Vice Chair
                  </Typography>
                  <Typography fontSize="12px">Ms. Maurine MURENGA</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Admin Focal Points
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Mr. Samuel MUIA
                        <br />
                        Coordinator
                        <br />
                        muiasammy@yahoo.com
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Ms. Margaret MUNDIA
                        <br />
                        Finance & Operations
                        <br />
                        w.mundiam@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    fontSize="12px"
                    fontWeight="700"
                    marginBottom="10px"
                  >
                    Admin Focal Points
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Mr. Samuel MUIA
                        <br />
                        Coordinator
                        <br />
                        muiasammy@yahoo.com
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize="12px">
                        Ms. Margaret MUNDIA
                        <br />
                        Finance & Operations
                        <br />
                        w.mundiam@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item md={12} lg={6}>
          <Box
            sx={{
              gap: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="700" marginBottom="10px">
                Current Principal Recipients in Kenya
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  a: {
                    display: "block",
                    fontSize: "12px",
                    lineHeight: 1.8,
                  },
                }}
              >
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    CARE Kenya
                  </Link>
                  <Link component={RouteLink} to="">
                    Kenya network of Women with AIDS
                  </Link>
                  <Link component={RouteLink} to="">
                    Sanaa Art Promotions
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    Amref Health Africa (Amref Kenya)
                  </Link>
                  <Link component={RouteLink} to="">
                    Kenya Red Cross Society (KRCS)
                  </Link>
                  <Link component={RouteLink} to="">
                    National Treasury of the Republic of Kenya (TNT)
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ borderColor: "#000" }} />
            <Box>
              <Typography variant="body2" fontWeight="700" marginBottom="10px">
                Former Principal Recipients in Kenya
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  a: {
                    display: "block",
                    fontSize: "12px",
                    lineHeight: 1.8,
                  },
                }}
              >
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    CARE Kenya
                  </Link>
                  <Link component={RouteLink} to="">
                    Kenya network of Women with AIDS
                  </Link>
                  <Link component={RouteLink} to="">
                    Sanaa Art Promotions
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    Amref Health Africa (Amref Kenya)
                  </Link>
                  <Link component={RouteLink} to="">
                    Kenya Red Cross Society (KRCS)
                  </Link>
                  <Link component={RouteLink} to="">
                    National Treasury of the Republic of Kenya (TNT)
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* <Divider sx={{ borderColor: "#000" }} />
            <Box>
              <Typography variant="body2" fontWeight="700" marginBottom="10px">
                Multicountries with Kenya
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  a: {
                    display: "block",
                    fontSize: "12px",
                    lineHeight: 1.8,
                  },
                }}
              >
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    Multicountry Africa ECSA-HC
                  </Link>
                  <Link component={RouteLink} to="">
                    Multicountry Eastern Africa IGAD
                  </Link>
                  <Link component={RouteLink} to="">
                    Multicountry Eastern Africa KANCO
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link component={RouteLink} to="">
                    Multicountry Southern Africa ARASA`
                  </Link>
                  <Link component={RouteLink} to="">
                    Multicountry TB WC Africa NTP/SRL
                  </Link>
                  <Link component={RouteLink} to="">
                    Multicountry Eastern Africa KANCO
                  </Link>
                </Grid>
              </Grid>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
