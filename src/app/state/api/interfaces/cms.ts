// MODULES INTERFACES
export interface CMSApiModulesLanding {
  data: {
    title: string;
    subTitle: string;
    datasetsTitle: string;
    datasetsLink: string;
  }
}

export interface CMSApiModulesAbout {
  data: {
    title: string;
    titleShort: string;
    breadCrumbHome: string;
    deTitle: string;
    deContent: string;
    gfTitle: string;
    gfContent: string;
    crTitle: string;
    crContent: string;
    diTitle: string;
    diContent: string;
    doTitle: string;
    doContent: string;
    linksResultMethodology: string;
    linksPrivacyStatements: string;
    linksLegalDisclaimers: string;
    linksFeedback: string;
    linksCovid: string;
    linksTitle: string;
  }
}

export interface CMSApiModulesCommon {
  data: {
    noMatchOops: string;
    noMatch404: string;
    noMatchSorry: string;
    noMatchBack: string;
  }
}

export interface CMSApiModulesCountryDetail {
  data: {
    seeResultsStart: string;
    seeResultsEnd: string;
    investments: string;
    disbursed: string;
    committed: string;
    signed: string;
    fundManager: string;
  }
}

export interface CMSApiModulesDatasets {
  data: {
    title: string;
    titleShort: string;
    home: string;
  }
}

export interface CMSApiModulesGrantDetail {
  data: {
    titleStart: string;
    titleEnd: string;
    titleShort: string;
    rating: string;
    disbursed: string;
    committed: string;
    signed: string;
    fundManager: string;
    latestRating: string;
    finance: string;
  }
}

export interface CMSApiModulesGrants {
  data: {
    titleStart: string;
    titleEnd: string;
    titleShort: string;
    home: string;
    datasets: string;
    grants: string;
    searchPlaceholder: string;
  }
}