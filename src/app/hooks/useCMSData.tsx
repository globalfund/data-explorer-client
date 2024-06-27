import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { CMSDataValueModel } from "app/state/api/action-reducers/sync";

interface UseCMSDataProps {
  loadData?: boolean;
  returnData?: boolean;
}

export function useCMSData(props: UseCMSDataProps) {
  const cmsData = useStoreState((state) => state.CMSData.value);
  const setCMSData = useStoreActions((actions) => actions.CMSData.setValue);

  // COMPONENTS
  const componentsAppBarCMSAction = useStoreActions(
    (actions) => actions.cms.componentsAppBar.fetch
  );
  const componentsAppBarCMSData = useStoreState(
    (state) => state.cms.componentsAppBar.data
  );
  const componentsTableCMSAction = useStoreActions(
    (actions) => actions.cms.componentsTable.fetch
  );
  const componentsTableCMSData = useStoreState(
    (state) => state.cms.componentsTable.data
  );
  const componentsDialogBoxCMSAction = useStoreActions(
    (actions) => actions.cms.componentsDialogBox.fetch
  );
  const componentsDialogBoxCMSData = useStoreState(
    (state) => state.cms.componentsDialogBox.data
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
  const componentsSidebarCMSAction = useStoreActions(
    (actions) => actions.cms.componentsSidebar.fetch
  );
  const componentsSidebarCMSData = useStoreState(
    (state) => state.cms.componentsSidebar.data
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
  const modulesFundingRequestsCMSAction = useStoreActions(
    (actions) => actions.cms.modulesFundingRequests.fetch
  );
  const modulesFundingRequestsCMSData = useStoreState(
    (state) => state.cms.modulesFundingRequests.data
  );

  // PAGES

  const pagesDatasetsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasets.fetch
  );
  const pagesDatasetsCMSData = useStoreState(
    (state) => state.cms.pagesDatasets.data
  );

  const pagesGeographyCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGeography.fetch
  );

  const pagesGeographyCMSData = useStoreState(
    (state) => state.cms.pagesGeography.data
  );

  const pagesGrantDetailCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantDetail.fetch
  );

  const pagesGrantDetailCMSData = useStoreState(
    (state) => state.cms.pagesGrantDetail.data
  );

  const pagesGrantsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrants.fetch
  );

  const pagesGrantsCMSData = useStoreState(
    (state) => state.cms.pagesGrants.data
  );

  const pagesHomeCMSAction = useStoreActions(
    (actions) => actions.cms.pagesHome.fetch
  );

  const pagesHomeCMSData = useStoreState((state) => state.cms.pagesHome.data);

  const pagesLocationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocation.fetch
  );

  const pagesLocationCMSData = useStoreState(
    (state) => state.cms.pagesLocation.data
  );

  const pagesDatasetsAccessToFundingCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsAccessToFunding.fetch
  );

  const pagesDatasetsAccessToFundingCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsAccessToFunding.data
  );

  const pagesDatasetsAnnualResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsAnnualResults.fetch
  );

  const pagesDatasetsAnnualResultsCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsAnnualResults.data
  );

  const pagesDatasetsGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsGrantImplementation.fetch
  );

  const pagesDatasetsGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsGrantImplementation.data
  );

  const pagesDatasetsResourceMobilizationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsResourceMobilization.fetch
  );

  const pagesDatasetsResourceMobilizationCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsResourceMobilization.data
  );

  const pagesLocationAccessToFundingCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationAccessToFunding.fetch
  );

  const pagesLocationAccessToFundingCMSData = useStoreState(
    (state) => state.cms.pagesLocationAccessToFunding.data
  );

  const pagesLocationGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationGrantImplementation.fetch
  );

  const pagesLocationGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesLocationGrantImplementation.data
  );

  const pagesLocationOverviewCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationOverview.fetch
  );

  const pagesLocationOverviewCMSData = useStoreState(
    (state) => state.cms.pagesLocationOverview.data
  );

  const pagesLocationResourceMobilizationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationResourceMobilization.fetch
  );

  const pagesLocationResourceMobilizationCMSData = useStoreState(
    (state) => state.cms.pagesLocationResourceMobilization.data
  );

  const pagesLocationResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationResults.fetch
  );

  const pagesLocationResultsCMSData = useStoreState(
    (state) => state.cms.pagesLocationResults.data
  );

  const pagesGrantDocumentsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantDocuments.fetch
  );

  const pagesGrantDocumentsCMSData = useStoreState(
    (state) => state.cms.pagesGrantDocuments.data
  );

  const pagesGrantGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantGrantImplementation.fetch
  );

  const pagesGrantGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesGrantGrantImplementation.data
  );

  const pagesGrantOverviewCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantOverview.fetch
  );

  const pagesGrantOverviewCMSData = useStoreState(
    (state) => state.cms.pagesGrantOverview.data
  );

  const pagesGrantTargetResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantTargetResults.fetch
  );

  const pagesGrantTargetResultsCMSData = useStoreState(
    (state) => state.cms.pagesGrantTargetResults.data
  );

  // GENERAL

  const generalCMSAction = useStoreActions(
    (actions) => actions.cms.general.fetch
  );

  const generalCMSData = useStoreState((state) => state.cms.general.data);
  React.useEffect(() => {
    if (props.loadData) {
      // COMPONENTS
      componentsAppBarCMSAction({ isCMSfetch: true });
      componentsTableCMSAction({ isCMSfetch: true });
      componentsDialogBoxCMSAction({ isCMSfetch: true });
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
      componentsSidebarCMSAction({ isCMSfetch: true });
      // MODULES
      modulesAboutCMSAction({ isCMSfetch: true });
      modulesCommonCMSAction({ isCMSfetch: true });
      modulesCountryDetailCMSAction({ isCMSfetch: true });
      modulesDatasetsCMSAction({ isCMSfetch: true });
      modulesGrantDetailCMSAction({ isCMSfetch: true });
      modulesGrantsCMSAction({ isCMSfetch: true });
      modulesLandingCMSAction({ isCMSfetch: true });
      modulesFundingRequestsCMSAction({ isCMSfetch: true });
      // PAGES
      pagesDatasetsCMSAction({ isCMSfetch: true });
      pagesGeographyCMSAction({ isCMSfetch: true });
      pagesGrantDetailCMSAction({ isCMSfetch: true });
      pagesGrantsCMSAction({ isCMSfetch: true });
      pagesHomeCMSAction({ isCMSfetch: true });
      pagesLocationCMSAction({ isCMSfetch: true });
      pagesDatasetsAccessToFundingCMSAction({ isCMSfetch: true });
      pagesDatasetsAnnualResultsCMSAction({ isCMSfetch: true });
      pagesDatasetsGrantImplementationCMSAction({ isCMSfetch: true });
      pagesDatasetsResourceMobilizationCMSAction({ isCMSfetch: true });
      pagesLocationAccessToFundingCMSAction({ isCMSfetch: true });
      pagesLocationGrantImplementationCMSAction({ isCMSfetch: true });
      pagesLocationOverviewCMSAction({ isCMSfetch: true });
      pagesLocationResourceMobilizationCMSAction({ isCMSfetch: true });
      pagesLocationResultsCMSAction({ isCMSfetch: true });
      pagesGrantDocumentsCMSAction({ isCMSfetch: true });
      pagesGrantGrantImplementationCMSAction({ isCMSfetch: true });
      pagesGrantOverviewCMSAction({ isCMSfetch: true });
      pagesGrantTargetResultsCMSAction({ isCMSfetch: true });
      // GENERAL
      generalCMSAction({ isCMSfetch: true });
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
        key: "componentsTable",
        data: componentsTableCMSData || {},
      },
      {
        key: "componentsDialogBox",
        data: componentsDialogBoxCMSData || {},
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
      {
        key: "componentsSidebar",
        data: componentsSidebarCMSData || {},
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
      {
        key: "modulesFundingRequests",
        data: modulesFundingRequestsCMSData || {},
      },
      // PAGES
      {
        key: "pagesDatasets",
        data: pagesDatasetsCMSData || {},
      },
      {
        key: "pagesGeography",
        data: pagesGeographyCMSData || {},
      },
      {
        key: "pagesGrantDetail",
        data: pagesGrantDetailCMSData || {},
      },
      {
        key: "pagesGrants",
        data: pagesGrantsCMSData || {},
      },
      {
        key: "pagesHome",
        data: pagesHomeCMSData || {},
      },
      {
        key: "pagesLocation",
        data: pagesLocationCMSData || {},
      },
      {
        key: "pagesDatasetsAccessToFunding",
        data: pagesDatasetsAccessToFundingCMSData || {},
      },
      {
        key: "pagesDatasetsAnnualResults",
        data: pagesDatasetsAnnualResultsCMSData || {},
      },
      {
        key: "pagesDatasetsGrantImplementation",
        data: pagesDatasetsGrantImplementationCMSData || {},
      },
      {
        key: "pagesDatasetsResourceMobilization",
        data: pagesDatasetsResourceMobilizationCMSData || {},
      },
      {
        key: "pagesLocationAccessToFunding",
        data: pagesLocationAccessToFundingCMSData || {},
      },
      {
        key: "pagesLocationGrantImplementation",
        data: pagesLocationGrantImplementationCMSData || {},
      },
      {
        key: "pagesLocationOverview",
        data: pagesLocationOverviewCMSData || {},
      },
      {
        key: "pagesLocationResourceMobilization",
        data: pagesLocationResourceMobilizationCMSData || {},
      },
      {
        key: "pagesLocationResults",
        data: pagesLocationResultsCMSData || {},
      },
      {
        key: "pagesGrantDocuments",
        data: pagesGrantDocumentsCMSData || {},
      },
      {
        key: "pagesGrantGrantImplementation",
        data: pagesGrantGrantImplementationCMSData || {},
      },
      {
        key: "pagesGrantOverview",
        data: pagesGrantOverviewCMSData || {},
      },
      {
        key: "pagesGrantTargetResults",
        data: pagesGrantTargetResultsCMSData || {},
      },
      // GENERAL
      {
        key: "general",
        data: generalCMSData || {},
      },
    ];
    items.forEach((item) => {
      let filteredData = {};
      const data = get(item, "data.data", []) as any[];

      filteredData = data?.find(
        (d) => d.attributes.locale === currentLanguage
      )?.attributes;

      newData = {
        ...newData,
        [item.key]: filteredData,
      };
    });
    setCMSData(newData as CMSDataValueModel);
  }

  useUpdateEffect(() => {
    if (props.loadData) {
      formatCMSData();
    }
  }, [
    // COMPONENTS
    componentsAppBarCMSData,
    componentsTableCMSData,
    componentsDialogBoxCMSData,
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
    componentsSidebarCMSData,
    // MODULES
    modulesAboutCMSData,
    modulesCommonCMSData,
    modulesCountryDetailCMSData,
    modulesDatasetsCMSData,
    modulesGrantDetailCMSData,
    modulesGrantsCMSData,
    modulesLandingCMSData,
    // PAGES
    pagesDatasetsCMSData,
    pagesGeographyCMSData,
    pagesGrantDetailCMSData,
    pagesGrantsCMSData,
    pagesHomeCMSData,
    pagesLocationCMSData,
    pagesDatasetsAccessToFundingCMSData,
    pagesDatasetsAnnualResultsCMSData,
    pagesDatasetsGrantImplementationCMSData,
    pagesDatasetsResourceMobilizationCMSData,
    pagesLocationAccessToFundingCMSData,
    pagesLocationGrantImplementationCMSData,
    pagesLocationOverviewCMSData,
    pagesLocationResourceMobilizationCMSData,
    pagesLocationResultsCMSData,
    pagesGrantDocumentsCMSData,
    pagesGrantGrantImplementationCMSData,
    pagesGrantOverviewCMSData,
    pagesGrantTargetResultsCMSData,
    // GENERAL
    generalCMSData,
  ]);

  if (props.returnData) {
    return cmsData;
  }

  return null;
}
