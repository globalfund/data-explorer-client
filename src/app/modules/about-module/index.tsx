import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import { useMediaQuery } from "@material-ui/core";
import LinkList from "app/modules/about-module/links";
import { PageHeader } from "app/components/PageHeader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";

export default function About() {
  useTitle(`The Data Explorer - About`);

  React.useEffect(() => {
    document.body.style.background = "#F5F5F7";
  }, []);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      {!isMobile && (
        <PageHeader
          title="About"
          breadcrumbs={[
            { name: "Home", link: "/" },
            {
              name: "About",
            },
          ]}
        />
      )}
      <PageTopSpacer />
      <Grid container spacing={!isSmallScreen ? 6 : undefined}>
        {!isSmallScreen && (
          <Grid item md={3}>
            <LinkList />
          </Grid>
        )}
        <Grid
          item
          sm={12}
          md={9}
          css={`
            > div {
              margin-bottom: 50px;

              > div {
                font-size: 24px;
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              }
              > p {
                > a {
                  color: #000;
                }
              }
            }
          `}
        >
          <div>
            <div>The Data Explorer</div>
            <p>
              Explore data on investments and results in the fight against AIDS,
              tuberculosis and malaria around the world.
              <br />
              <br />
              The Global Fund invests in smart, effective health programs to end
              AIDS, tuberculosis and malaria as epidemics. The Data Explorer
              visualizes where our investments come from, where they are and
              what they achieve by providing pledge and contribution data, grant
              financial data, and results data at global, regional and country
              levels.
              <br />
              <br />
              We regularly improve and enhance the Data Explorer, and those
              updates are noted on the{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.theglobalfund.org/en/updates/data-explorer/"
              >
                Data Explorer Updates
              </a>{" "}
              page on the Global Fund website. The data behind the Data Explorer
              and our API are available through the Global Fund{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://data-service.theglobalfund.org/"
              >
                Data Service
              </a>
              .
            </p>
          </div>
          <div>
            <div>The Global Fund</div>
            <p>
              The Global Fund is a partnership designed to accelerate the end of
              AIDS, tuberculosis and malaria as epidemics. As an international
              organization, the Global Fund mobilizes and invests more than US$4
              billion a year to support programs run by local experts in more
              than 100 countries. In partnership with governments, civil
              society, technical agencies, the private sector and people
              affected by the diseases, we are challenging barriers and
              embracing innovation.
            </p>
          </div>
          <div>
            <div>Country Results Profiles</div>
            <p>
              Country Results Profiles, available in the{" "}
              <Link to="/documents">Documents</Link> tab, provide additional
              data about the financing landscape and programmatic information
              for high-impact countries. Our{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.theglobalfund.org/media/7871/other_countryresultsprofileexplanatory_notes_en.pdf"
              >
                Explanatory Note
              </a>{" "}
              shows how to use them.
            </p>
          </div>
          <div>
            <div>Disclaimers</div>
            <p>
              Amounts are in the specified currency. Where noted, the
              USD-equivalent is presented for amounts in non-USD currencies.
              <br />
              <br />
              Pledges and contributions made in currencies other than USD from
              2014 onward were converted to USD using fixed Replenishment
              exchange rates. Pledges and contributions before 2014 were
              converted using spot exchange rates.
              <br />
              <br />
              Where pledges have been made that are not specific to individual
              years, the amount shown as pledged for a period is the sum of
              contributions received in that period.
            </p>
          </div>
          <div>
            <div>Donor footnotes</div>
            <p>
              The donor withholds a portion of its funding to use for technical
              assistance related to the Global Fund.
              <br />
              <br />
              · Australia: 2014-2016, 2017-2019, 2020-2022 <br />· Ecobank:
              2014-2016, 2017-2019 <br />· France: 2011-2013, 2014-2016,
              2017-2019, 2020-2022 <br />· Germany: 2017-2019 <br />· Italy:
              2017-2019, 2020-2022 <br />· Luxembourg: 2020-2022 <br />·
              Netherlands: 2014-2016, 2017-2019 <br />· Other Public: 2020-2022{" "}
              <br />· United Kingdom: 2020-2022 <br />· United States:
              2001-2005, 2006-2007, 2008-2010, 2011-2013, 2014-2016, 2017-2019,
              2020-2022
              <br />
              <br />
              Contribution includes a EUR 5,5 million contribution from Gen.
              Catalunya in 2005-2008. <br />· Spain: 2001-2005, 2006-2007,
              2008-2010
              <br />
              <br />
              In addition to its contribution, the donor funded JPY 75 million
              in technical assistance related to the Global Fund for 2010-2019.
              <br />· Takeda Pharmaceutical: 2008-2010, 2011-2013, 2014-2016,
              2017-2019
              <br />
              <br />
              The U.S. contribution to the Global Fund is subject to legislative
              restrictions, including that, during 2004-2023, no U.S. government
              contribution may cause the total share of U.S. government funds
              contributed to exceed 33 percent of total cumulative contributions
              from all sources.
              <br /> · United States: 2001-2005, 2006-2007, 2008-2010,
              2011-2013, 2014-2016, 2017-2019, 2020-2022
              <br />
              <br />
              A portion of this pledge, EUR 100 million, is reserved for debt
              cancellations under Debt2Health. · Germany: 2017-2019
              <br />
              <br />
              The donor withholds a portion of its funding to use for in-kind
              contributions related to the Global Fund.
              <br /> · Goodbye Malaria: 2017-2019, 2020-2022
              <br />
              <br />
              In addition to its contribution, the donor funds JPY 36 million in
              technical assistance related to the Global Fund for 2020-2022.
              <br /> · Takeda Pharmaceutical: 2020-2022
            </p>
          </div>
        </Grid>
        {isSmallScreen && (
          <Grid item xs={6} sm={6}>
            <LinkList />
          </Grid>
        )}
      </Grid>
      <div
        css={`
          width: 100%;
          height: 0px;

          @media (max-width: 767px) {
            height: 90px;
          }
        `}
      />
    </div>
  );
}
