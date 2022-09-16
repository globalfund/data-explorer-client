import React from "react";
import get from "lodash/get";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useCMSData } from "app/hooks/useCMSData";
import { BarIcon } from "app/assets/icons/charts/Bar";
import { MapIcon } from "app/assets/icons/charts/Map";
import { DotIcon } from "app/assets/icons/charts/Dot";
import { useStoreActions } from "app/state/store/hooks";
import { TableIcon } from "app/assets/icons/charts/Table";
import { SankeyIcon } from "app/assets/icons/charts/Sankey";
import { TreemapIcon } from "app/assets/icons/charts/Treemap";
import { AllocationIcon } from "app/assets/icons/charts/Allocation";
import { useDatasourcesDatasets } from "app/hooks/useDatasourcesDatasets";

function GridItem(props: {
  link: string;
  value: string;
  title: { __html: any };
  description: { __html: any };
  iconLinks?: {
    link: string;
    icon: React.ReactElement;
  }[];
}) {
  const history = useHistory();
  const changeDatasource = useStoreActions(
    (store) => store.DataSourceState.setValue
  );

  const onClickHandler = () => {
    changeDatasource(props.value);
    setTimeout(() => {
      history.push(props.link);
    }, 500);
  };

  return (
    <div
      onClick={onClickHandler}
      css={`
        padding: 16px;
        height: 125px;
        color: #262c34;
        cursor: pointer;
        background: #fff;
        position: relative;
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(206, 168, 188, 0.24);

        @media (max-width: 767px) {
          height: 125px;
        }

        > div {
          font-weight: bold;
          line-height: 18px;
          margin-bottom: 4px;
          font-family: "Inter", "Helvetica Neue", sans-serif;

          &:nth-of-type(2) {
            font-size: 10px;
            line-height: 12px;
            font-weight: normal;
            font-family: "Inter", "Helvetica Neue", sans-serif;
          }
        }

        &:hover {
          border-color: #13183f;
        }
      `}
    >
      <div dangerouslySetInnerHTML={props.title} />
      <div dangerouslySetInnerHTML={props.description} />
      {props.iconLinks && (
        <div
          css={`
            gap: 20px;
            bottom: 16px;
            display: flex;
            position: absolute;
            flex-direction: row;
            pointer-events: none;

            > a {
              padding-right: 10px;
              display: inline-flex;
              transform: scale(1.2);

              &:not(:last-child) {
                border-right: 1px solid #868a9d;
              }

              > svg {
                > path {
                  fill: #231d2c;
                }

                &:hover {
                  > path {
                    fill: #6061e5;
                  }
                }
              }
            }
          `}
        >
          {props.iconLinks.map((iconLink) => (
            <Link to={iconLink.link} key={iconLink.link}>
              {iconLink.icon}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const iconLinks = [
  {
    icon: <SankeyIcon />,
    link: "/viz/budgets/flow",
  },
  {
    icon: <BarIcon />,
    link: "/viz/disbursements/time-cycle",
  },
  {
    icon: <MapIcon />,
    link: "/viz/allocations/map",
  },
  {
    icon: <TableIcon />,
    link: "/viz/eligibility/table",
  },
];

export function LandingDatasetGrid() {
  // const cmsData = useCMSData({ returnData: true });

  // const fpText = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financePledgesContributions",
  //     ""
  //   ),
  // };
  // const fsText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.financeSignedAmounts", ""),
  // };
  // const fcText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.financeCommitments", ""),
  // };
  // const fdText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.financeDisbursements", ""),
  // };
  // const fbText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.financeBudgets", ""),
  // };
  // const aeText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.accessEligibility", ""),
  // };
  // const aaText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.accessAllocations", ""),
  // };
  // const grText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.grants", ""),
  // };
  // const reText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.results", ""),
  // };
  // const doText = {
  //   __html: get(cmsData, "componentsDatasetCarousel.documents", ""),
  // };

  // const fpDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financePledgesContributionsDescription",
  //     ""
  //   ),
  // };
  // const fsDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financeSignedAmountsDescription",
  //     ""
  //   ),
  // };
  // const fcDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financeCommitmentsDescription",
  //     ""
  //   ),
  // };
  // const fdDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financeDisbursementsDescription",
  //     ""
  //   ),
  // };
  // const fbDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.financeBudgetsDescription",
  //     ""
  //   ),
  // };
  // const aeDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.accessEligibilityDescription",
  //     ""
  //   ),
  // };
  // const aaDescription = {
  //   __html: get(
  //     cmsData,
  //     "componentsDatasetCarousel.accessAllocationsDescription",
  //     ""
  //   ),
  // };
  // const grDescription = {
  //   __html: get(cmsData, "componentsDatasetCarousel.grantsDescription", ""),
  // };
  // const reDescription = {
  //   __html: get(cmsData, "componentsDatasetCarousel.resultsDescription", ""),
  // };
  // const doDescription = {
  //   __html: get(cmsData, "componentsDatasetCarousel.documentsDescription", ""),
  // };

  const dummyDatasets = [0, 1, 2, 3, 4, 5, 6];

  const { availableDatasets } = useDatasourcesDatasets();

  return (
    <Grid container spacing={2}>
      {availableDatasets.map((dt: any) => (
        <Grid item xs={12} sm={6} md={6} lg={3} key={dt.name}>
          <GridItem
            value={dt.value}
            title={{ __html: dt.name }}
            link="/viz"
            description={{
              __html:
                "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
            }}
            iconLinks={iconLinks}
          />
        </Grid>
      ))}
      {dummyDatasets.map((item) => (
        <Grid
          item
          key={item}
          xs={12}
          sm={6}
          md={6}
          lg={3}
          css={`
            pointer-events: none;

            // > a {
            > div {
              box-shadow: none;
              background: #f4f4f4;
              border-color: #f4f4f4;
            }
            // }
          `}
        >
          <GridItem
            value=""
            title={{ __html: "Dataset" }}
            link="/viz/signed/treemap"
            description={{
              __html:
                "Detailed budgets for each implementation period from the 2017-2019 Allocation Period onwards",
            }}
            iconLinks={iconLinks}
          />
        </Grid>
      ))}
      {/* <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={fbText}
          link="/viz/budgets/flow"
          description={fbDescription}
          iconLinks={[
            {
              icon: <SankeyIcon />,
              link: "/viz/budgets/flow",
            },
            {
              icon: <BarIcon />,
              link: "/viz/budgets/time-cycle",
            },
            {
              icon: <MapIcon />,
              link: "/viz/budgets/map",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={fpText}
          link="/viz/pledges-contributions/treemap"
          description={fpDescription}
          iconLinks={[
            {
              icon: <TreemapIcon />,
              link: "/viz/pledges-contributions/treemap",
            },
            {
              icon: <BarIcon />,
              link: "/viz/pledges-contributions/time-cycle",
            },
            {
              icon: <MapIcon />,
              link: "/viz/pledges-contributions/map",
            },
            {
              icon: <TableIcon />,
              link: "/viz/pledges-contributions/table",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={fsText}
          link="/viz/signed/treemap"
          description={fsDescription}
          iconLinks={[
            {
              icon: <TreemapIcon />,
              link: "/viz/signed/treemap",
            },
            {
              icon: <BarIcon />,
              link: "/viz/signed/time-cycle",
            },
            {
              icon: <MapIcon />,
              link: "/viz/signed/map",
            },
            {
              icon: <TableIcon />,
              link: "/viz/signed/table",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={fdText}
          link="/viz/disbursements/treemap"
          description={fdDescription}
          iconLinks={[
            {
              icon: <TreemapIcon />,
              link: "/viz/disbursements/treemap",
            },
            {
              icon: <BarIcon />,
              link: "/viz/disbursements/time-cycle",
            },
            {
              icon: <MapIcon />,
              link: "/viz/disbursements/map",
            },
            {
              icon: <TableIcon />,
              link: "/viz/disbursements/table",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={fcText}
          link="/viz/commitment/treemap"
          description={fcDescription}
          iconLinks={[
            {
              icon: <TreemapIcon />,
              link: "/viz/commitment/treemap",
            },
            {
              icon: <BarIcon />,
              link: "/viz/commitment/time-cycle",
            },
            {
              icon: <MapIcon />,
              link: "/viz/commitment/map",
            },
            {
              icon: <TableIcon />,
              link: "/viz/commitment/table",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={aeText}
          link="/viz/eligibility"
          description={aeDescription}
          iconLinks={[
            {
              icon: <DotIcon />,
              link: "/viz/eligibility",
            },
            {
              icon: <TableIcon />,
              link: "/viz/eligibility/table",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={aaText}
          link="/viz/allocations"
          description={aaDescription}
          iconLinks={[
            {
              icon: <AllocationIcon />,
              link: "/viz/allocations",
            },
            {
              icon: <MapIcon />,
              link: "/viz/allocations/map",
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem title={reText} link="/results" description={reDescription} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem
          title={doText}
          link="/documents"
          description={doDescription}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <GridItem title={grText} link="/grants" description={grDescription} />
      </Grid> */}
    </Grid>
  );
}
