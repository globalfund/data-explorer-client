import { TreeMapNodeDatum } from "@nivo/treemap";

export interface BudgetsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: BudgetsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export interface BudgetsTreemapProps {
  selectedNodeId?: string;
  isChildTreemap?: boolean;
  data: BudgetsTreemapDataItem[];
  parentNodeCoords?: { x: number; y: number };
  onNodeClick: (node: string, x: number, y: number) => void;
}

export interface TreemapTooltipProps {
  node: TreeMapNodeDatum;
}

export const mockdata3: BudgetsTreemapDataItem[] = [
  {
    name: "HIV",
    color: "#DFE3E5",
    value: 1428439124,
    formattedValue: "1,428,439,124 USD",
    _children: [
      {
        name: "Program management",
        value: 562457674,
        formattedValue: "562,457,674 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Program management",
              value: 562457674,
            },
          ],
          value: 562457674,
        },
      },
      {
        name: "Treatment, care and support",
        value: 155843269,
        formattedValue: "155,843,269 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Treatment, care and support",
              value: 155843269,
            },
          ],
          value: 155843269,
        },
      },
      {
        name: "Prevention",
        value: 133506288,
        formattedValue: "133,506,288 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Prevention",
              value: 133506288,
            },
          ],
          value: 133506288,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 86614187,
        formattedValue: "86,614,187 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 86614187,
            },
          ],
          value: 86614187,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 80938953,
        formattedValue: "80,938,953 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 80938953,
            },
          ],
          value: 80938953,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 65706967,
        formattedValue: "65,706,967 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 65706967,
            },
          ],
          value: 65706967,
        },
      },
      {
        name: "Differentiated HIV Testing Services",
        value: 62831379,
        formattedValue: "62,831,379 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Differentiated HIV Testing Services",
              value: 62831379,
            },
          ],
          value: 62831379,
        },
      },
      {
        name:
          "Comprehensive prevention programs for people who inject drugs (PWID) and their partners",
        value: 38093788,
        formattedValue: "38,093,788 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name:
                "Comprehensive prevention programs for people who inject drugs (PWID) and their partners",
              value: 38093788,
            },
          ],
          value: 38093788,
        },
      },
      {
        name: "Comprehensive prevention programs for MSM",
        value: 35735106,
        formattedValue: "35,735,106 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programs for MSM",
              value: 35735106,
            },
          ],
          value: 35735106,
        },
      },
      {
        name:
          "Comprehensive prevention programs for sex workers and their clients",
        value: 30648775,
        formattedValue: "30,648,775 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name:
                "Comprehensive prevention programs for sex workers and their clients",
              value: 30648775,
            },
          ],
          value: 30648775,
        },
      },
      {
        name: "PMTCT",
        value: 28674174,
        formattedValue: "28,674,174 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PMTCT",
              value: 28674174,
            },
          ],
          value: 28674174,
        },
      },
      {
        name: "COVID-19",
        value: 27254269,
        formattedValue: "27,254,269 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "COVID-19",
              value: 27254269,
            },
          ],
          value: 27254269,
        },
      },
      {
        name: "Prevention programs for other vulnerable populations",
        value: 26146674,
        formattedValue: "26,146,674 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Prevention programs for other vulnerable populations",
              value: 26146674,
            },
          ],
          value: 26146674,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 23120011,
        formattedValue: "23,120,011 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 23120011,
            },
          ],
          value: 23120011,
        },
      },
      {
        name:
          "Prevention programs for adolescents and youth, in and out of school",
        value: 15173907,
        formattedValue: "15,173,907 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name:
                "Prevention programs for adolescents and youth, in and out of school",
              value: 15173907,
            },
          ],
          value: 15173907,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 14833693,
        formattedValue: "14,833,693 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 14833693,
            },
          ],
          value: 14833693,
        },
      },
      {
        name: "Reducing human rights-related barriers to HIV/TB services",
        value: 11859483,
        formattedValue: "11,859,483 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Reducing human rights-related barriers to HIV/TB services",
              value: 11859483,
            },
          ],
          value: 11859483,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 6918354,
        formattedValue: "6,918,354 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 6918354,
            },
          ],
          value: 6918354,
        },
      },
      {
        name: "Prevention programs for general population",
        value: 6865107,
        formattedValue: "6,865,107 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Prevention programs for general population",
              value: 6865107,
            },
          ],
          value: 6865107,
        },
      },
      {
        name: "Comprehensive prevention programs for TGs",
        value: 4913446,
        formattedValue: "4,913,446 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programs for TGs",
              value: 4913446,
            },
          ],
          value: 4913446,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 4022265,
        formattedValue: "4,022,265 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 4022265,
            },
          ],
          value: 4022265,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 3277193,
        formattedValue: "3,277,193 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 3277193,
            },
          ],
          value: 3277193,
        },
      },
      {
        name:
          "Comprehensive programs for people in prisons and other closed settings",
        value: 1717168,
        formattedValue: "1,717,168 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name:
                "Comprehensive programs for people in prisons and other closed settings",
              value: 1717168,
            },
          ],
          value: 1717168,
        },
      },
      {
        name: "TB/HIV",
        value: 1286994,
        formattedValue: "1,286,994 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TB/HIV",
              value: 1286994,
            },
          ],
          value: 1286994,
        },
      },
    ],
    tooltip: {
      header: "HIV",
      value: 1428439124,
      componentsStats: [
        {
          name: "HIV",
          value: 1428439124,
        },
      ],
    },
  },
  {
    name: "Malaria",
    color: "#DFE3E5",
    value: 1406841351,
    formattedValue: "1,406,841,351 USD",
    _children: [
      {
        name: "Program management",
        value: 813812980,
        formattedValue: "813,812,980 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "Program management",
              value: 813812980,
            },
          ],
          value: 813812980,
        },
      },
      {
        name: "Vector control",
        value: 110997566,
        formattedValue: "110,997,566 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "Vector control",
              value: 110997566,
            },
          ],
          value: 110997566,
        },
      },
      {
        name: "Case management",
        value: 110451046,
        formattedValue: "110,451,046 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "Case management",
              value: 110451046,
            },
          ],
          value: 110451046,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 100790737,
        formattedValue: "100,790,737 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 100790737,
            },
          ],
          value: 100790737,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 61922545,
        formattedValue: "61,922,545 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 61922545,
            },
          ],
          value: 61922545,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 55724513,
        formattedValue: "55,724,513 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 55724513,
            },
          ],
          value: 55724513,
        },
      },
      {
        name: "Specific prevention interventions (SPI)",
        value: 55519009,
        formattedValue: "55,519,009 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "Specific prevention interventions (SPI)",
              value: 55519009,
            },
          ],
          value: 55519009,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 35745808,
        formattedValue: "35,745,808 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 35745808,
            },
          ],
          value: 35745808,
        },
      },
      {
        name: "COVID-19",
        value: 29404165,
        formattedValue: "29,404,165 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "COVID-19",
              value: 29404165,
            },
          ],
          value: 29404165,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 16080072,
        formattedValue: "16,080,072 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 16080072,
            },
          ],
          value: 16080072,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 7063449,
        formattedValue: "7,063,449 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 7063449,
            },
          ],
          value: 7063449,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 5497789,
        formattedValue: "5,497,789 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 5497789,
            },
          ],
          value: 5497789,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 3761454,
        formattedValue: "3,761,454 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 3761454,
            },
          ],
          value: 3761454,
        },
      },
      {
        name: "Payment for results",
        value: 70218,
        formattedValue: "70,218 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "Payment for results",
              value: 70218,
            },
          ],
          value: 70218,
        },
      },
    ],
    tooltip: {
      header: "Malaria",
      value: 1406841351,
      componentsStats: [
        {
          name: "Malaria",
          value: 1406841351,
        },
      ],
    },
  },
  {
    name: "TB/HIV",
    color: "#DFE3E5",
    value: 1233430737,
    formattedValue: "1,233,430,737 USD",
    _children: [
      {
        name: "Program management",
        value: 568577895,
        formattedValue: "568,577,895 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Program management",
              value: 568577895,
            },
          ],
          value: 568577895,
        },
      },
      {
        name: "TB care and prevention",
        value: 105668927,
        formattedValue: "105,668,927 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "TB care and prevention",
              value: 105668927,
            },
          ],
          value: 105668927,
        },
      },
      {
        name: "Treatment, care and support",
        value: 96562129,
        formattedValue: "96,562,129 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Treatment, care and support",
              value: 96562129,
            },
          ],
          value: 96562129,
        },
      },
      {
        name: "Prevention",
        value: 71833749,
        formattedValue: "71,833,749 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Prevention",
              value: 71833749,
            },
          ],
          value: 71833749,
        },
      },
      {
        name:
          "Prevention programs for adolescents and youth, in and out of school",
        value: 52414717,
        formattedValue: "52,414,717 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "Prevention programs for adolescents and youth, in and out of school",
              value: 52414717,
            },
          ],
          value: 52414717,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 46556368,
        formattedValue: "46,556,368 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 46556368,
            },
          ],
          value: 46556368,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 39631961,
        formattedValue: "39,631,961 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 39631961,
            },
          ],
          value: 39631961,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 32145063,
        formattedValue: "32,145,063 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 32145063,
            },
          ],
          value: 32145063,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 28168242,
        formattedValue: "28,168,242 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 28168242,
            },
          ],
          value: 28168242,
        },
      },
      {
        name: "MDR-TB",
        value: 27811066,
        formattedValue: "27,811,066 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MDR-TB",
              value: 27811066,
            },
          ],
          value: 27811066,
        },
      },
      {
        name:
          "Comprehensive prevention programs for people who inject drugs (PWID) and their partners",
        value: 22421852,
        formattedValue: "22,421,852 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "Comprehensive prevention programs for people who inject drugs (PWID) and their partners",
              value: 22421852,
            },
          ],
          value: 22421852,
        },
      },
      {
        name:
          "Comprehensive prevention programs for sex workers and their clients",
        value: 20477783,
        formattedValue: "20,477,783 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "Comprehensive prevention programs for sex workers and their clients",
              value: 20477783,
            },
          ],
          value: 20477783,
        },
      },
      {
        name: "COVID-19",
        value: 18965127,
        formattedValue: "18,965,127 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "COVID-19",
              value: 18965127,
            },
          ],
          value: 18965127,
        },
      },
      {
        name: "Reducing human rights-related barriers to HIV/TB services",
        value: 17115731,
        formattedValue: "17,115,731 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Reducing human rights-related barriers to HIV/TB services",
              value: 17115731,
            },
          ],
          value: 17115731,
        },
      },
      {
        name: "TB/HIV",
        value: 15474760,
        formattedValue: "15,474,760 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "TB/HIV",
              value: 15474760,
            },
          ],
          value: 15474760,
        },
      },
      {
        name: "Comprehensive prevention programs for MSM",
        value: 13732199,
        formattedValue: "13,732,199 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programs for MSM",
              value: 13732199,
            },
          ],
          value: 13732199,
        },
      },
      {
        name: "PMTCT",
        value: 10971040,
        formattedValue: "10,971,040 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "PMTCT",
              value: 10971040,
            },
          ],
          value: 10971040,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 10145386,
        formattedValue: "10,145,386 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 10145386,
            },
          ],
          value: 10145386,
        },
      },
      {
        name: "Prevention programs for general population",
        value: 7781934,
        formattedValue: "7,781,934 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Prevention programs for general population",
              value: 7781934,
            },
          ],
          value: 7781934,
        },
      },
      {
        name: "Differentiated HIV Testing Services",
        value: 7759158,
        formattedValue: "7,759,158 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Differentiated HIV Testing Services",
              value: 7759158,
            },
          ],
          value: 7759158,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 7179188,
        formattedValue: "7,179,188 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 7179188,
            },
          ],
          value: 7179188,
        },
      },
      {
        name: "Prevention programs for other vulnerable populations",
        value: 4286169,
        formattedValue: "4,286,169 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Prevention programs for other vulnerable populations",
              value: 4286169,
            },
          ],
          value: 4286169,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 3617380,
        formattedValue: "3,617,380 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 3617380,
            },
          ],
          value: 3617380,
        },
      },
      {
        name:
          "Comprehensive programs for people in prisons and other closed settings",
        value: 1324357,
        formattedValue: "1,324,357 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "Comprehensive programs for people in prisons and other closed settings",
              value: 1324357,
            },
          ],
          value: 1324357,
        },
      },
      {
        name: "Comprehensive prevention programs for TGs",
        value: 1236049,
        formattedValue: "1,236,049 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programs for TGs",
              value: 1236049,
            },
          ],
          value: 1236049,
        },
      },
      {
        name: "Payment for results",
        value: 956578,
        formattedValue: "956,578 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "Payment for results",
              value: 956578,
            },
          ],
          value: 956578,
        },
      },
      {
        name:
          "Removing human rights and gender related barriers to TB services",
        value: 425376,
        formattedValue: "425,376 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name:
                "Removing human rights and gender related barriers to TB services",
              value: 425376,
            },
          ],
          value: 425376,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 190553,
        formattedValue: "190,553 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 190553,
            },
          ],
          value: 190553,
        },
      },
    ],
    tooltip: {
      header: "TB/HIV",
      value: 1233430737,
      componentsStats: [
        {
          name: "TB/HIV",
          value: 1233430737,
        },
      ],
    },
  },
  {
    name: "Tuberculosis",
    color: "#DFE3E5",
    value: 784565974,
    formattedValue: "784,565,974 USD",
    _children: [
      {
        name: "Program management",
        value: 348618394,
        formattedValue: "348,618,394 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "Program management",
              value: 348618394,
            },
          ],
          value: 348618394,
        },
      },
      {
        name: "TB care and prevention",
        value: 282780640,
        formattedValue: "282,780,640 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TB care and prevention",
              value: 282780640,
            },
          ],
          value: 282780640,
        },
      },
      {
        name: "MDR-TB",
        value: 72498754,
        formattedValue: "72,498,754 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MDR-TB",
              value: 72498754,
            },
          ],
          value: 72498754,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 17444021,
        formattedValue: "17,444,021 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 17444021,
            },
          ],
          value: 17444021,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 14903301,
        formattedValue: "14,903,301 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 14903301,
            },
          ],
          value: 14903301,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 13014245,
        formattedValue: "13,014,245 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 13014245,
            },
          ],
          value: 13014245,
        },
      },
      {
        name: "COVID-19",
        value: 10297398,
        formattedValue: "10,297,398 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "COVID-19",
              value: 10297398,
            },
          ],
          value: 10297398,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 6661684,
        formattedValue: "6,661,684 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 6661684,
            },
          ],
          value: 6661684,
        },
      },
      {
        name: "TB/HIV",
        value: 5343167,
        formattedValue: "5,343,167 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TB/HIV",
              value: 5343167,
            },
          ],
          value: 5343167,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 3812200,
        formattedValue: "3,812,200 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 3812200,
            },
          ],
          value: 3812200,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 3697581,
        formattedValue: "3,697,581 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 3697581,
            },
          ],
          value: 3697581,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 2994726,
        formattedValue: "2,994,726 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 2994726,
            },
          ],
          value: 2994726,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 2297721,
        formattedValue: "2,297,721 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 2297721,
            },
          ],
          value: 2297721,
        },
      },
      {
        name:
          "Removing human rights and gender related barriers to TB services",
        value: 202142,
        formattedValue: "202,142 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name:
                "Removing human rights and gender related barriers to TB services",
              value: 202142,
            },
          ],
          value: 202142,
        },
      },
    ],
    tooltip: {
      header: "Tuberculosis",
      value: 784565974,
      componentsStats: [
        {
          name: "Tuberculosis",
          value: 784565974,
        },
      ],
    },
  },
  {
    name: "RSSH",
    color: "#DFE3E5",
    value: 117500571,
    formattedValue: "117,500,571 USD",
    _children: [
      {
        name: "Program management",
        value: 32735939,
        formattedValue: "32,735,939 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Program management",
              value: 32735939,
            },
          ],
          value: 32735939,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 24800098,
        formattedValue: "24,800,098 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 24800098,
            },
          ],
          value: 24800098,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 17114635,
        formattedValue: "17,114,635 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 17114635,
            },
          ],
          value: 17114635,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 10924793,
        formattedValue: "10,924,793 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 10924793,
            },
          ],
          value: 10924793,
        },
      },
      {
        name: "COVID-19",
        value: 10558384,
        formattedValue: "10,558,384 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "COVID-19",
              value: 10558384,
            },
          ],
          value: 10558384,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 8321637,
        formattedValue: "8,321,637 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 8321637,
            },
          ],
          value: 8321637,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 6356981,
        formattedValue: "6,356,981 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 6356981,
            },
          ],
          value: 6356981,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 4192134,
        formattedValue: "4,192,134 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 4192134,
            },
          ],
          value: 4192134,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 1544486,
        formattedValue: "1,544,486 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 1544486,
            },
          ],
          value: 1544486,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 951484,
        formattedValue: "951,484 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 951484,
            },
          ],
          value: 951484,
        },
      },
    ],
    tooltip: {
      header: "RSSH",
      value: 117500571,
      componentsStats: [
        {
          name: "RSSH",
          value: 117500571,
        },
      ],
    },
  },
  {
    name: "Multicomponent",
    color: "#DFE3E5",
    value: 100068911,
    formattedValue: "100,068,911 USD",
    _children: [
      {
        name: "Program management",
        value: 54437878,
        formattedValue: "54,437,878 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Program management",
              value: 54437878,
            },
          ],
          value: 54437878,
        },
      },
      {
        name:
          "RSSH: Human resources for health, including community health workers",
        value: 11194867,
        formattedValue: "11,194,867 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name:
                "RSSH: Human resources for health, including community health workers",
              value: 11194867,
            },
          ],
          value: 11194867,
        },
      },
      {
        name: "TB care and prevention",
        value: 10175434,
        formattedValue: "10,175,434 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "TB care and prevention",
              value: 10175434,
            },
          ],
          value: 10175434,
        },
      },
      {
        name: "Prevention",
        value: 4087596,
        formattedValue: "4,087,596 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Prevention",
              value: 4087596,
            },
          ],
          value: 4087596,
        },
      },
      {
        name: "RSSH: Health management information systems and M&E",
        value: 3937801,
        formattedValue: "3,937,801 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Health management information systems and M&E",
              value: 3937801,
            },
          ],
          value: 3937801,
        },
      },
      {
        name: "RSSH: Health products management systems",
        value: 3593838,
        formattedValue: "3,593,838 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Health products management systems",
              value: 3593838,
            },
          ],
          value: 3593838,
        },
      },
      {
        name: "Treatment, care and support",
        value: 2870422,
        formattedValue: "2,870,422 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Treatment, care and support",
              value: 2870422,
            },
          ],
          value: 2870422,
        },
      },
      {
        name: "Case management",
        value: 2661975,
        formattedValue: "2,661,975 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Case management",
              value: 2661975,
            },
          ],
          value: 2661975,
        },
      },
      {
        name: "Vector control",
        value: 2411796,
        formattedValue: "2,411,796 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Vector control",
              value: 2411796,
            },
          ],
          value: 2411796,
        },
      },
      {
        name: "RSSH: Integrated service delivery and quality improvement",
        value: 881168,
        formattedValue: "881,168 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Integrated service delivery and quality improvement",
              value: 881168,
            },
          ],
          value: 881168,
        },
      },
      {
        name: "COVID-19",
        value: 751097,
        formattedValue: "751,097 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "COVID-19",
              value: 751097,
            },
          ],
          value: 751097,
        },
      },
      {
        name: "MDR-TB",
        value: 657326,
        formattedValue: "657,326 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "MDR-TB",
              value: 657326,
            },
          ],
          value: 657326,
        },
      },
      {
        name:
          "Comprehensive prevention programs for sex workers and their clients",
        value: 489963,
        formattedValue: "489,963 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name:
                "Comprehensive prevention programs for sex workers and their clients",
              value: 489963,
            },
          ],
          value: 489963,
        },
      },
      {
        name:
          "Prevention programs for adolescents and youth, in and out of school",
        value: 484000,
        formattedValue: "484,000 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name:
                "Prevention programs for adolescents and youth, in and out of school",
              value: 484000,
            },
          ],
          value: 484000,
        },
      },
      {
        name: "RSSH: Community systems strengthening",
        value: 451694,
        formattedValue: "451,694 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Community systems strengthening",
              value: 451694,
            },
          ],
          value: 451694,
        },
      },
      {
        name: "PMTCT",
        value: 323024,
        formattedValue: "323,024 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "PMTCT",
              value: 323024,
            },
          ],
          value: 323024,
        },
      },
      {
        name: "RSSH: Financial management systems",
        value: 278729,
        formattedValue: "278,729 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Financial management systems",
              value: 278729,
            },
          ],
          value: 278729,
        },
      },
      {
        name: "RSSH: Laboratory systems",
        value: 178134,
        formattedValue: "178,134 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Laboratory systems",
              value: 178134,
            },
          ],
          value: 178134,
        },
      },
      {
        name: "Specific prevention interventions (SPI)",
        value: 79002,
        formattedValue: "79,002 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Specific prevention interventions (SPI)",
              value: 79002,
            },
          ],
          value: 79002,
        },
      },
      {
        name: "Comprehensive prevention programs for MSM",
        value: 60859,
        formattedValue: "60,859 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Comprehensive prevention programs for MSM",
              value: 60859,
            },
          ],
          value: 60859,
        },
      },
      {
        name: "RSSH: Health sector governance and planning",
        value: 55148,
        formattedValue: "55,148 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RSSH: Health sector governance and planning",
              value: 55148,
            },
          ],
          value: 55148,
        },
      },
      {
        name: "Prevention programs for other vulnerable populations",
        value: 7160,
        formattedValue: "7,160 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "Prevention programs for other vulnerable populations",
              value: 7160,
            },
          ],
          value: 7160,
        },
      },
    ],
    tooltip: {
      header: "Multicomponent",
      value: 100068911,
      componentsStats: [
        {
          name: "Multicomponent",
          value: 100068911,
        },
      ],
    },
  },
];
