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
      modulesAboutCMSAction({
        isCMSfetch: true,
      });
      modulesCommonCMSAction({
        isCMSfetch: true,
      });
      modulesCountryDetailCMSAction({
        isCMSfetch: true,
      });
      modulesDatasetsCMSAction({
        isCMSfetch: true,
      });
      modulesGrantDetailCMSAction({
        isCMSfetch: true,
      });
      modulesGrantsCMSAction({
        isCMSfetch: true,
      });
      modulesLandingCMSAction({
        isCMSfetch: true,
      });
    }
  }, []);

  function formatCMSData() {
    let newData = {};
    const currentLanguage = "en";
    const items = [
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