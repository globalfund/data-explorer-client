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
  // Modules - Landing
  const modulesLandingCMSAction = useStoreActions(
    (actions) => actions.cms.modulesLanding.fetch
  );
  const modulesLandingCMSData = useStoreState(
    (state) => state.cms.modulesLanding.data
  );

  // Modules - About
  const modulesAboutCMSAction = useStoreActions(
    (actions) => actions.cms.modulesAbout.fetch
  );
  const modulesAboutCMSData = useStoreState(
    (state) => state.cms.modulesAbout.data
  );

  React.useEffect(() => {
    if (props.loadData) {
      modulesLandingCMSAction({
        isCMSfetch: true,
      });
      modulesAboutCMSAction({
        isCMSfetch: true,
      });
    }
  }, []);

  function formatCMSData() {
    let newData = {};
    const currentLanguage = "en";
    const items = [
      {
        key: "modulesLanding",
        data: modulesLandingCMSData || {},
      },
      {
        key: "modulesAbout",
        data: modulesAboutCMSData || {},
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
    modulesLandingCMSData,
    modulesAboutCMSData,
  ]);

  if (props.returnData) {
    return cmsData;
  }

  return null;
}