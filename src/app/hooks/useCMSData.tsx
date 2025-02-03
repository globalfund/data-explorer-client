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
  const componentsChartsEligibilityCMSAction = useStoreActions(
    (actions) => actions.cms.componentsChartsEligibility.fetch,
  );
  const componentsChartsEligibilityCMSData = useStoreState(
    (state) => state.cms.componentsChartsEligibility.data,
  );

  const componentsSearchCMSAction = useStoreActions(
    (actions) => actions.cms.componentsSearch.fetch,
  );
  const componentsSearchCMSData = useStoreState(
    (state) => state.cms.componentsSearch.data,
  );

  // PAGES

  const pagesDatasetsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasets.fetch,
  );
  const pagesDatasetsCMSData = useStoreState(
    (state) => state.cms.pagesDatasets.data,
  );

  const pagesGeographyCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGeography.fetch,
  );
  const pagesGeographyCMSData = useStoreState(
    (state) => state.cms.pagesGeography.data,
  );

  // const pagesGrantDetailCMSAction = useStoreActions(
  //   (actions) => actions.cms.pagesGrantDetail.fetch
  // );
  // const pagesGrantDetailCMSData = useStoreState(
  //   (state) => state.cms.pagesGrantDetail.data
  // );

  const pagesGrantsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrants.fetch,
  );
  const pagesGrantsCMSData = useStoreState(
    (state) => state.cms.pagesGrants.data,
  );

  const pagesHomeCMSAction = useStoreActions(
    (actions) => actions.cms.pagesHome.fetch,
  );
  const pagesHomeCMSData = useStoreState((state) => state.cms.pagesHome.data);

  // const pagesLocationCMSAction = useStoreActions(
  //   (actions) => actions.cms.pagesLocation.fetch
  // );
  // const pagesLocationCMSData = useStoreState(
  //   (state) => state.cms.pagesLocation.data
  // );

  const pagesDatasetsAccessToFundingCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsAccessToFunding.fetch,
  );
  const pagesDatasetsAccessToFundingCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsAccessToFunding.data,
  );

  const pagesDatasetsAnnualResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsAnnualResults.fetch,
  );
  const pagesDatasetsAnnualResultsCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsAnnualResults.data,
  );

  const pagesDatasetsGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsGrantImplementation.fetch,
  );
  const pagesDatasetsGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsGrantImplementation.data,
  );

  const pagesDatasetsResourceMobilizationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesDatasetsResourceMobilization.fetch,
  );
  const pagesDatasetsResourceMobilizationCMSData = useStoreState(
    (state) => state.cms.pagesDatasetsResourceMobilization.data,
  );

  const pagesLocationAccessToFundingCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationAccessToFunding.fetch,
  );
  const pagesLocationAccessToFundingCMSData = useStoreState(
    (state) => state.cms.pagesLocationAccessToFunding.data,
  );

  const pagesLocationGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationGrantImplementation.fetch,
  );
  const pagesLocationGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesLocationGrantImplementation.data,
  );

  const pagesLocationOverviewCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationOverview.fetch,
  );
  const pagesLocationOverviewCMSData = useStoreState(
    (state) => state.cms.pagesLocationOverview.data,
  );

  const pagesLocationResourceMobilizationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationResourceMobilization.fetch,
  );
  const pagesLocationResourceMobilizationCMSData = useStoreState(
    (state) => state.cms.pagesLocationResourceMobilization.data,
  );

  const pagesLocationResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesLocationResults.fetch,
  );
  const pagesLocationResultsCMSData = useStoreState(
    (state) => state.cms.pagesLocationResults.data,
  );

  const pagesGrantDocumentsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantDocuments.fetch,
  );
  const pagesGrantDocumentsCMSData = useStoreState(
    (state) => state.cms.pagesGrantDocuments.data,
  );

  const pagesGrantGrantImplementationCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantGrantImplementation.fetch,
  );
  const pagesGrantGrantImplementationCMSData = useStoreState(
    (state) => state.cms.pagesGrantGrantImplementation.data,
  );

  const pagesGrantOverviewCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantOverview.fetch,
  );
  const pagesGrantOverviewCMSData = useStoreState(
    (state) => state.cms.pagesGrantOverview.data,
  );

  const pagesGrantTargetResultsCMSAction = useStoreActions(
    (actions) => actions.cms.pagesGrantTargetResults.fetch,
  );
  const pagesGrantTargetResultsCMSData = useStoreState(
    (state) => state.cms.pagesGrantTargetResults.data,
  );

  // GENERAL

  const generalCMSAction = useStoreActions(
    (actions) => actions.cms.general.fetch,
  );
  const generalCMSData = useStoreState((state) => state.cms.general.data);

  React.useEffect(() => {
    if (props.loadData) {
      // COMPONENTS
      componentsChartsEligibilityCMSAction({ isCMSfetch: true });
      componentsSearchCMSAction({ isCMSfetch: true });
      // PAGES
      pagesDatasetsCMSAction({ isCMSfetch: true });
      pagesGeographyCMSAction({ isCMSfetch: true });
      // pagesGrantDetailCMSAction({ isCMSfetch: true });
      pagesGrantsCMSAction({ isCMSfetch: true });
      pagesHomeCMSAction({ isCMSfetch: true });
      // pagesLocationCMSAction({ isCMSfetch: true });
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
        key: "componentsChartsEligibility",
        data: componentsChartsEligibilityCMSData || {},
      },
      {
        key: "componentsSearch",
        data: componentsSearchCMSData || {},
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
      // {
      //   key: "pagesGrantDetail",
      //   data: pagesGrantDetailCMSData || {},
      // },
      {
        key: "pagesGrants",
        data: pagesGrantsCMSData || {},
      },
      {
        key: "pagesHome",
        data: pagesHomeCMSData || {},
      },
      // {
      //   key: "pagesLocation",
      //   data: pagesLocationCMSData || {},
      // },
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
        (d) => d.attributes.locale === currentLanguage,
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
    componentsChartsEligibilityCMSData,
    componentsSearchCMSData,
    // PAGES
    pagesDatasetsCMSData,
    pagesGeographyCMSData,
    // pagesGrantDetailCMSData,
    pagesGrantsCMSData,
    pagesHomeCMSData,
    // pagesLocationCMSData,
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
