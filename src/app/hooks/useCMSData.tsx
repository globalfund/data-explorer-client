import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { useUpdateEffect } from "react-use";
import { cmsDataAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface useCMSDataProps {
  loadData?: boolean;
  returnData?: boolean;
}

export function useCMSData(props: useCMSDataProps) {
  const [cmsData, setCMSData] = useRecoilState(cmsDataAtom);

  // COMPONENTS
  const componentsAppBarCMSAction = useStoreActions(
    (actions) => actions.cms.componentsAppBar.fetch
  );
  const componentsAppBarCMSData = useStoreState(
    (state) => state.cms.componentsAppBar.data
  );
  const componentsChartsBudgetsCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsBudgets.fetch
  );
  const componentsChartsBudgetsCMSData = useStoreState(
    (state) => state.cms.componentsChartsBudgets.data
  );
  const componentsChartsCommonCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsCommon.fetch
  );
  const componentsChartsCommonCMSData = useStoreState(
    (state) => state.cms.componentsChartsCommon.data
  );
  const componentsChartsEligibilityCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsEligibility.fetch
  );
  const componentsChartsEligibilityCMSData = useStoreState(
    (state) => state.cms.componentsChartsEligibility.data
  );
  const componentsChartsGeomapCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsGeomap.fetch
  );
  const componentsChartsGeomapCMSData = useStoreState(
    (state) => state.cms.componentsChartsGeomap.data
  );
  const componentsChartsGrantsCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsGrants.fetch
  );
  const componentsChartsGrantsCMSData = useStoreState(
    (state) => state.cms.componentsChartsGrants.data
  );
  const componentsChartsInvestmentsCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsInvestments.fetch
  );
  const componentsChartsInvestmentsCMSData = useStoreState(
    (state) => state.cms.componentsChartsInvestments.data
  );
  const componentsChartsNetworkCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsNetwork.fetch
  );
  const componentsChartsNetworkCMSData = useStoreState(
    (state) => state.cms.componentsChartsNetwork.data
  );
  const componentsChartsPerformanceRatingCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsPerformanceRating.fetch
  );
  const componentsChartsPerformanceRatingCMSData = useStoreState(
    (state) => state.cms.componentsChartsPerformanceRating.data
  );
  const componentsChartsPledgesCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsPledges.fetch
  );
  const componentsChartsPledgesCMSData = useStoreState(
    (state) => state.cms.componentsChartsPledges.data
  );
  const componentsCookieDialogCMSAction = useStoreActions(
    (actions) => actions.cms.componentsCookieDialog.fetch
  );
  const componentsCookieDialogCMSData = useStoreState(
    (state) => state.cms.componentsCookieDialog.data
  );
  const componentsDatasetCarouselCMSAction = useStoreActions(
    (actions) => actions.cms.componentsDatasetCarousel.fetch
  );
  const componentsDatasetCarouselCMSData = useStoreState(
    (state) => state.cms.componentsDatasetCarousel.data
  );
  const componentsInformationPanelCMSAction = useStoreActions(
    (actions) => actions.cms.componentsInformationPanel.fetch
  );
  const componentsInformationPanelCMSData = useStoreState(
    (state) => state.cms.componentsInformationPanel.data
  );
  const componentsMobileCMSAction = useStoreActions(
    (actions) => actions.cms.componentsMobile.fetch
  );
  const componentsMobileCMSData = useStoreState(
    (state) => state.cms.componentsMobile.data
  );
  const componentsPageHeaderCMSAction = useStoreActions(
    (actions) => actions.cms.componentsPageHeader.fetch
  );
  const componentsPageHeaderCMSData = useStoreState(
    (state) => state.cms.componentsPageHeader.data
  );
  const componentsPerformanceFrameworkComponentsCMSAction = useStoreActions(
    (actions) => actions.cms.componentsPerformanceFrameworkComponents.fetch
  );
  const componentsPerformanceFrameworkComponentsCMSData = useStoreState(
    (state) => state.cms.componentsPerformanceFrameworkComponents.data
  );
  const componentsSearchCMSAction = useStoreActions(
    (actions) => actions.cms.componentsSearch.fetch
  );
  const componentsSearchCMSData = useStoreState(
    (state) => state.cms.componentsSearch.data
  );
  const componentsSlideInPanelCMSAction = useStoreActions(
    (actions) => actions.cms.componentsSlideInPanel.fetch
  );
  const componentsSlideInPanelCMSData = useStoreState(
    (state) => state.cms.componentsSlideInPanel.data
  );
  // MODULES
  const modulesAboutCMSAction = useStoreActions(
    (actions) => actions.cms.modulesAbout.fetch
  );
  const modulesAboutCMSData = useStoreState(
    (state) => state.cms.modulesAbout.data
  );
  const modulesCommonCMSAction = useStoreActions(
    (actions) => actions.cms.modulesCommon.fetch
  );
  const modulesCommonCMSData = useStoreState(
    (state) => state.cms.modulesCommon.data
  );
  const modulesCountryDetailCMSAction = useStoreActions(
    (actions) => actions.cms.modulesCountryDetail.fetch
  );
  const modulesCountryDetailCMSData = useStoreState(
    (state) => state.cms.modulesCountryDetail.data
  );
  const modulesDatasetsCMSAction = useStoreActions(
    (actions) => actions.cms.modulesDatasets.fetch
  );
  const modulesDatasetsCMSData = useStoreState(
    (state) => state.cms.modulesDatasets.data
  );
  const modulesGrantDetailCMSAction = useStoreActions(
    (actions) => actions.cms.modulesGrantDetail.fetch
  );
  const modulesGrantDetailCMSData = useStoreState(
    (state) => state.cms.modulesGrantDetail.data
  );
  const modulesGrantsCMSAction = useStoreActions(
    (actions) => actions.cms.modulesGrants.fetch
  );
  const modulesGrantsCMSData = useStoreState(
    (state) => state.cms.modulesGrants.data
  );
  const modulesLandingCMSAction = useStoreActions(
    (actions) => actions.cms.modulesLanding.fetch
  );
  const modulesLandingCMSData = useStoreState(
    (state) => state.cms.modulesLanding.data
  );

  React.useEffect(() => {
    if (props.loadData) {
      // COMPONENTS
      componentsAppBarCMSAction({ isCMSfetch: true });
      componentsChartsBudgetsCMSAction({ isCMSfetch: true });
      componentsChartsCommonCMSAction({ isCMSfetch: true });
      componentsChartsEligibilityCMSAction({ isCMSfetch: true });
      componentsChartsGeomapCMSAction({ isCMSfetch: true });
      componentsChartsGrantsCMSAction({ isCMSfetch: true });
      componentsChartsInvestmentsCMSAction({ isCMSfetch: true });
      componentsChartsNetworkCMSAction({ isCMSfetch: true });
      componentsChartsPerformanceRatingCMSAction({ isCMSfetch: true });
      componentsChartsPledgesCMSAction({ isCMSfetch: true });
      componentsCookieDialogCMSAction({ isCMSfetch: true });
      componentsDatasetCarouselCMSAction({ isCMSfetch: true });
      componentsInformationPanelCMSAction({ isCMSfetch: true });
      componentsMobileCMSAction({ isCMSfetch: true });
      componentsPageHeaderCMSAction({ isCMSfetch: true });
      componentsPerformanceFrameworkComponentsCMSAction({ isCMSfetch: true });
      componentsSearchCMSAction({ isCMSfetch: true });
      componentsSlideInPanelCMSAction({ isCMSfetch: true });
      // MODULES
      modulesAboutCMSAction({ isCMSfetch: true });
      modulesCommonCMSAction({ isCMSfetch: true });
      modulesCountryDetailCMSAction({ isCMSfetch: true });
      modulesDatasetsCMSAction({ isCMSfetch: true });
      modulesGrantDetailCMSAction({ isCMSfetch: true });
      modulesGrantsCMSAction({ isCMSfetch: true });
      modulesLandingCMSAction({ isCMSfetch: true });
    }
  }, []);

  function formatCMSData() {
    let newData = {};
    const currentLanguage = "en";
    const items = [
      // COMPONENTS
      {
        key: "componentsAppBar",
        data: componentsAppBarCMSData || {},
      },
      {
        key: "componentsChartsBudgets",
        data: componentsChartsBudgetsCMSData || {},
      },
      {
        key: "componentsChartsCommon",
        data: componentsChartsCommonCMSData || {},
      },
      {
        key: "componentsChartsEligibility",
        data: componentsChartsEligibilityCMSData || {},
      },
      {
        key: "componentsChartsGeomap",
        data: componentsChartsGeomapCMSData || {},
      },
      {
        key: "componentsChartsGrants",
        data: componentsChartsGrantsCMSData || {},
      },
      {
        key: "componentsChartsInvestments",
        data: componentsChartsInvestmentsCMSData || {},
      },
      {
        key: "componentsChartsNetwork",
        data: componentsChartsNetworkCMSData || {},
      },
      {
        key: "componentsChartsPerformanceRating",
        data: componentsChartsPerformanceRatingCMSData || {},
      },
      {
        key: "componentsChartsPledges",
        data: componentsChartsPledgesCMSData || {},
      },
      {
        key: "componentsCookieDialog",
        data: componentsCookieDialogCMSData || {},
      },
      {
        key: "componentsDatasetCarousel",
        data: componentsDatasetCarouselCMSData || {},
      },
      {
        key: "componentsInformationPanel",
        data: componentsInformationPanelCMSData || {},
      },
      {
        key: "componentsMobile",
        data: componentsMobileCMSData || {},
      },
      {
        key: "componentsPageHeader",
        data: componentsPageHeaderCMSData || {},
      },
      {
        key: "componentsPerformanceFrameworkComponents",
        data: componentsPerformanceFrameworkComponentsCMSData || {},
      },
      {
        key: "componentsSearch",
        data: componentsSearchCMSData || {},
      },
      {
        key: "componentsSlideInPanel",
        data: componentsSlideInPanelCMSData || {},
      },
      // MODULES
      {
        key: "modulesAbout",
        data: modulesAboutCMSData || {},
      },
      {
        key: "modulesCommon",
        data: modulesCommonCMSData || {},
      },
      {
        key: "modulesCountryDetail",
        data: modulesCountryDetailCMSData || {},
      },
      {
        key: "modulesDatasets",
        data: modulesDatasetsCMSData || {},
      },
      {
        key: "modulesGrantDetail",
        data: modulesGrantDetailCMSData || {},
      },
      {
        key: "modulesGrants",
        data: modulesGrantsCMSData || {},
      },
      {
        key: "modulesLanding",
        data: modulesLandingCMSData || {},
      },
    ];
    items.forEach((item) => {
      let filteredData = {};
      Object.keys(item.data).forEach((key: string) => {
        if (currentLanguage === "en" && key.indexOf("_") === -1) {
          filteredData = {
            ...filteredData,
            [key]: get(item.data, `${key}`, ""),
          };
        } else if (key.indexOf(`_${currentLanguage}`) > -1) {
          filteredData = {
            ...filteredData,
            [`${key.replace(`_${currentLanguage}`, "")}`]: get(
              item.data,
              `${key}`,
              ""
            ),
          };
        } else {
          filteredData = {
            ...filteredData,
            [key]: get(item.data, `${key}`, ""),
          };
        }
      });
      newData = {
        ...newData,
        [item.key]: filteredData,
      };
    });
    setCMSData(newData);
  }

  useUpdateEffect(() => {
    if (props.loadData) {
      formatCMSData();
    }
  }, [
    // COMPONENTS
    componentsAppBarCMSData,
    componentsChartsBudgetsCMSData,
    componentsChartsCommonCMSData,
    componentsChartsEligibilityCMSData,
    componentsChartsGeomapCMSData,
    componentsChartsGrantsCMSData,
    componentsChartsInvestmentsCMSData,
    componentsChartsNetworkCMSData,
    componentsChartsPerformanceRatingCMSData,
    componentsChartsPledgesCMSData,
    componentsCookieDialogCMSData,
    componentsDatasetCarouselCMSData,
    componentsInformationPanelCMSData,
    componentsMobileCMSData,
    componentsPageHeaderCMSData,
    componentsPerformanceFrameworkComponentsCMSData,
    componentsSearchCMSData,
    componentsSlideInPanelCMSData,
    // MODULES
    modulesAboutCMSData,
    modulesCommonCMSData,
    modulesCountryDetailCMSData,
    modulesDatasetsCMSData,
    modulesGrantDetailCMSData,
    modulesGrantsCMSData,
    modulesLandingCMSData,
  ]);

  if (props.returnData) {
    return cmsData;
  }

  return null;
}
