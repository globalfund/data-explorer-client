/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface CMSDataValueModel {
  componentsAppBar: {
    [key: string]: any;
  };
  componentsChartsBudgets: {
    [key: string]: any;
  };
  componentsChartsCommon: {
    [key: string]: any;
  };
  componentsChartsEligibility: {
    [key: string]: any;
  };
  componentsChartsGeomap: {
    [key: string]: any;
  };
  componentsChartsGrants: {
    [key: string]: any;
  };
  componentsChartsInvestments: {
    [key: string]: any;
  };
  componentsChartsNetwork: {
    [key: string]: any;
  };
  componentsChartsPerformanceRating: {
    [key: string]: any;
  };
  componentsChartsPledges: {
    [key: string]: any;
  };
  componentsCookieDialog: {
    [key: string]: any;
  };
  componentsDatasetCarousel: {
    [key: string]: any;
  };
  componentsInformationPanel: {
    [key: string]: any;
  };
  componentsMobile: {
    [key: string]: any;
  };
  componentsPageHeader: {
    [key: string]: any;
  };
  componentsPerformanceFrameworkComponents: {
    [key: string]: any;
  };
  componentsSearch: {
    [key: string]: any;
  };
  componentsSlideInPanel: {
    [key: string]: any;
  };
  modulesLanding: {
    [key: string]: any;
  };
  modulesAbout: {
    [key: string]: any;
  };
  modulesCommon: {
    [key: string]: any;
  };
  modulesCountryDetail: {
    [key: string]: any;
  };
  modulesDatasets: {
    [key: string]: any;
  };
  modulesGrantDetail: {
    [key: string]: any;
  };
  modulesGrants: {
    [key: string]: any;
  };
}

export interface CMSDataModel {
  value: CMSDataValueModel;
  setValue: Action<CMSDataModel, CMSDataValueModel>;
}

export const CMSData: CMSDataModel = {
  value: {
    componentsAppBar: {},
    componentsChartsBudgets: {},
    componentsChartsCommon: {},
    componentsChartsEligibility: {},
    componentsChartsGeomap: {},
    componentsChartsGrants: {},
    componentsChartsInvestments: {},
    componentsChartsNetwork: {},
    componentsChartsPerformanceRating: {},
    componentsChartsPledges: {},
    componentsCookieDialog: {},
    componentsDatasetCarousel: {},
    componentsInformationPanel: {},
    componentsMobile: {},
    componentsPageHeader: {},
    componentsPerformanceFrameworkComponents: {},
    componentsSearch: {},
    componentsSlideInPanel: {},
    modulesLanding: {},
    modulesAbout: {},
    modulesCommon: {},
    modulesCountryDetail: {},
    modulesDatasets: {},
    modulesGrantDetail: {},
    modulesGrants: {},
  },
  setValue: action((state, payload: CMSDataValueModel) => {
    state.value = payload;
  }),
};
