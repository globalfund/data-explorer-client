import { InputNode, InputLink } from "@nivo/network";

export interface PerformanceFrameworkData {
  nodes: InputNode[];
  links: InputLink[];
}

export interface NetworkVizProps {
  data: {
    nodes: InputNode[];
    links: InputLink[];
  };
  selectedNodeId?: string;
  onNodeClick: (node: string, x: number, y: number) => void;
}

export const mockdata = {
  nodes: [
    {
      id: "Jan, 2017 - Jun, 2017",
      radius: 12,
      depth: 0,
      color: "#231d2c",
      borderColor: "#ADB5BD",
    },
    {
      id: "Coverage / Output indicator",
      radius: 12,
      depth: 1,
      color: "#ADB5BD",
      borderColor: "#231d2c",
    },
    {
      id: "Process indicator / WPTM",
      radius: 12,
      depth: 1,
      color: "#ADB5BD",
      borderColor: "#231d2c",
    },
    {
      id: "PMTCT|Coverage / Output indicator",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "Prevention programs for general population|Coverage / Output indicator",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "TB/HIV|Coverage / Output indicator",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "Treatment, care and support|Coverage / Output indicator",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "PMTCT|Process indicator / WPTM",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "TB/HIV|Process indicator / WPTM",
      radius: 12,
      depth: 2,
      color: "#fff",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of HIV-positive pregnant women who received antiretrovirals to reduce the risk of mother-to-child transmission",
      radius: 12,
      depth: 3,
      color: "#97ff46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of infants born to HIV-positive women receiving a virological test for HIV within 2 months of birth",
      radius: 12,
      depth: 3,
      color: "#ffaa46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of pregnant women who know their HIV status",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "Number of women and men aged 15+ who received an HIV test and know their results",
      radius: 12,
      depth: 3,
      color: "#60ff46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of HIV-positive patients who were screened for TB in HIV care or treatment settings",
      radius: 12,
      depth: 3,
      color: "#97ff46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of HIV-positive registered TB patients given anti-retroviral therapy during TB treatment",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of TB patients who had an HIV test result recorded in the TB register",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "Percentage of adults and children that initiated ART, with an undetectable viral load at 12 months (<1000 copies/ml)",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "TCS-other 1: Percentage of adults currently receiving ART among all adults living with HIV",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "TCS-other 2: Percentage of children currently receiving ART among all children living with HIV",
      radius: 12,
      depth: 3,
      color: "#daff46",
      borderColor: "#231d2c",
    },
    {
      id: "TCS-other 3: Percentage of adults and children enrolled in care who have received a CD4 count.",
      radius: 12,
      depth: 3,
      color: "#fa9a55",
      borderColor: "#231d2c",
    },
    {
      id: "Ensure the supervision of community service providers and primary healthcare centers (CSPS) (50% of sites performing poorly) by the District Team each semester",
      radius: 12,
      depth: 3,
      color: "#E2E2E2",
      borderColor: "#231d2c",
    },
    {
      id: "TB/HIV-4: Percentage of new HIV-positive patients starting IPT during the reporting period",
      radius: 12,
      depth: 3,
      color: "#E2E2E2",
      borderColor: "#231d2c",
    },
  ],
  links: [
    {
      source: "Jan, 2017 - Jun, 2017",
      target: "Coverage / Output indicator",
      distance: 10,
    },
    {
      source: "Coverage / Output indicator",
      target: "PMTCT|Coverage / Output indicator",
      distance: 60,
    },
    {
      source: "PMTCT|Coverage / Output indicator",
      target:
        "Percentage of HIV-positive pregnant women who received antiretrovirals to reduce the risk of mother-to-child transmission",
      distance: 70,
    },
    {
      source: "PMTCT|Coverage / Output indicator",
      target:
        "Percentage of infants born to HIV-positive women receiving a virological test for HIV within 2 months of birth",
      distance: 70,
    },
    {
      source: "PMTCT|Coverage / Output indicator",
      target: "Percentage of pregnant women who know their HIV status",
      distance: 70,
    },
    {
      source: "Coverage / Output indicator",
      target:
        "Prevention programs for general population|Coverage / Output indicator",
      distance: 60,
    },
    {
      source:
        "Prevention programs for general population|Coverage / Output indicator",
      target:
        "Number of women and men aged 15+ who received an HIV test and know their results",
      distance: 70,
    },
    {
      source: "Coverage / Output indicator",
      target: "TB/HIV|Coverage / Output indicator",
      distance: 60,
    },
    {
      source: "TB/HIV|Coverage / Output indicator",
      target:
        "Percentage of HIV-positive patients who were screened for TB in HIV care or treatment settings",
      distance: 70,
    },
    {
      source: "TB/HIV|Coverage / Output indicator",
      target:
        "Percentage of HIV-positive registered TB patients given anti-retroviral therapy during TB treatment",
      distance: 70,
    },
    {
      source: "TB/HIV|Coverage / Output indicator",
      target:
        "Percentage of TB patients who had an HIV test result recorded in the TB register",
      distance: 70,
    },
    {
      source: "Coverage / Output indicator",
      target: "Treatment, care and support|Coverage / Output indicator",
      distance: 60,
    },
    {
      source: "Treatment, care and support|Coverage / Output indicator",
      target:
        "Percentage of adults and children that initiated ART, with an undetectable viral load at 12 months (<1000 copies/ml)",
      distance: 70,
    },
    {
      source: "Treatment, care and support|Coverage / Output indicator",
      target:
        "TCS-other 1: Percentage of adults currently receiving ART among all adults living with HIV",
      distance: 70,
    },
    {
      source: "Treatment, care and support|Coverage / Output indicator",
      target:
        "TCS-other 2: Percentage of children currently receiving ART among all children living with HIV",
      distance: 70,
    },
    {
      source: "Treatment, care and support|Coverage / Output indicator",
      target:
        "TCS-other 3: Percentage of adults and children enrolled in care who have received a CD4 count.",
      distance: 70,
    },
    {
      source: "Jan, 2017 - Jun, 2017",
      target: "Process indicator / WPTM",
      distance: 10,
    },
    {
      source: "Process indicator / WPTM",
      target: "PMTCT|Process indicator / WPTM",
      distance: 60,
    },
    {
      source: "PMTCT|Process indicator / WPTM",
      target:
        "Ensure the supervision of community service providers and primary healthcare centers (CSPS) (50% of sites performing poorly) by the District Team each semester",
      distance: 70,
    },
    {
      source: "Process indicator / WPTM",
      target: "TB/HIV|Process indicator / WPTM",
      distance: 60,
    },
    {
      source: "TB/HIV|Process indicator / WPTM",
      target:
        "TB/HIV-4: Percentage of new HIV-positive patients starting IPT during the reporting period",
      distance: 70,
    },
  ],
};
