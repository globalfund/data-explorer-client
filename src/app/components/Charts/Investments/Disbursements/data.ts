import { TreeMapNodeDatum } from "@nivo/treemap";

export interface DisbursementsTreemapDataItem {
  name: string;
  code?: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: DisbursementsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      count: number;
      investment: number;
    }[];
    totalInvestments: {
      committed: number;
      disbursed: number;
      signed: number;
    };
    percValue: string;
  };
}

export interface DisbursementsTreemapProps {
  selectedNodeId?: string;
  isChildTreemap?: boolean;
  data: DisbursementsTreemapDataItem[];
  parentNodeCoords?: { x: number; y: number };
  onNodeClick: (node: string, x: number, y: number, code?: string) => void;
}

export interface TreemapTooltipProps {
  node: TreeMapNodeDatum;
  tooltipValueLabel?: string;
}

export const mockdata1: DisbursementsTreemapDataItem[] = [
  {
    name: "HIV",
    color: "#DFE3E5",
    value: 22438503078.05002,
    formattedValue: "22,438,503,078 USD",
    _children: [
      {
        name: "ETH",
        value: 1471736435.26,
        formattedValue: "1,471,736,435 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ETH",
              count: 6,
              investment: 1471736435.26,
            },
          ],
          totalInvestments: {
            committed: 1475159376.8,
            disbursed: 1471736435.26,
            signed: 1733474881.8,
          },
          percValue: "99.7679612390476",
        },
      },
      {
        name: "TZA",
        value: 1465068314.69,
        formattedValue: "1,465,068,315 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TZA",
              count: 8,
              investment: 1465068314.69,
            },
          ],
          totalInvestments: {
            committed: 1575765642.66,
            disbursed: 1465068314.69,
            signed: 1802434435.63,
          },
          percValue: "92.97501322702179",
        },
      },
      {
        name: "ZWE",
        value: 1307430115.98,
        formattedValue: "1,307,430,116 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ZWE",
              count: 7,
              investment: 1307430115.98,
            },
          ],
          totalInvestments: {
            committed: 1448688116.16,
            disbursed: 1307430115.98,
            signed: 1729048317.27,
          },
          percValue: "90.2492469839244",
        },
      },
      {
        name: "IND",
        value: 1255412294.77,
        formattedValue: "1,255,412,295 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "IND",
              count: 16,
              investment: 1255412294.77,
            },
          ],
          totalInvestments: {
            committed: 1346856497.1,
            disbursed: 1255412294.77,
            signed: 1485157742.73,
          },
          percValue: "93.21054599900627",
        },
      },
      {
        name: "NGA",
        value: 997208545.7,
        formattedValue: "997,208,546 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "NGA",
              count: 13,
              investment: 997208545.7,
            },
          ],
          totalInvestments: {
            committed: 1131177222.73,
            disbursed: 997208545.7,
            signed: 1292467617.09,
          },
          percValue: "88.15670309320073",
        },
      },
      {
        name: "RWA",
        value: 990732588.68,
        formattedValue: "990,732,589 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RWA",
              count: 4,
              investment: 990732588.68,
            },
          ],
          totalInvestments: {
            committed: 998580684.13,
            disbursed: 990732588.68,
            signed: 998675263.41,
          },
          percValue: "99.21407497914527",
        },
      },
      {
        name: "MOZ",
        value: 863629707.14,
        formattedValue: "863,629,707 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MOZ",
              count: 7,
              investment: 863629707.14,
            },
          ],
          totalInvestments: {
            committed: 1010431808.29,
            disbursed: 863629707.14,
            signed: 1303526822.02,
          },
          percValue: "85.471349976755",
        },
      },
      {
        name: "KEN",
        value: 782322699.98,
        formattedValue: "782,322,700 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "KEN",
              count: 7,
              investment: 782322699.98,
            },
          ],
          totalInvestments: {
            committed: 831760165.27,
            disbursed: 782322699.98,
            signed: 840910760.69,
          },
          percValue: "94.05628360743245",
        },
      },
      {
        name: "UGA",
        value: 765065150.65,
        formattedValue: "765,065,151 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "UGA",
              count: 5,
              investment: 765065150.65,
            },
          ],
          totalInvestments: {
            committed: 843297776.93,
            disbursed: 765065150.65,
            signed: 1038722318.81,
          },
          percValue: "90.72301286447079",
        },
      },
      {
        name: "MWI",
        value: 676868846.45,
        formattedValue: "676,868,846 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MWI",
              count: 4,
              investment: 676868846.45,
            },
          ],
          totalInvestments: {
            committed: 676868846.45,
            disbursed: 676868846.45,
            signed: 676868846.45,
          },
          percValue: "100",
        },
      },
      {
        name: "ZMB",
        value: 656604442.92,
        formattedValue: "656,604,443 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ZMB",
              count: 17,
              investment: 656604442.92,
            },
          ],
          totalInvestments: {
            committed: 656604442.92,
            disbursed: 656604442.92,
            signed: 656604442.92,
          },
          percValue: "100",
        },
      },
      {
        name: "ZAF",
        value: 553493737.32,
        formattedValue: "553,493,737 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ZAF",
              count: 10,
              investment: 553493737.32,
            },
          ],
          totalInvestments: {
            committed: 553493737.32,
            disbursed: 553493737.32,
            signed: 553493737.32,
          },
          percValue: "100",
        },
      },
      {
        name: "COD",
        value: 528563398.49,
        formattedValue: "528,563,398 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "COD",
              count: 8,
              investment: 528563398.49,
            },
          ],
          totalInvestments: {
            committed: 537333391.39,
            disbursed: 528563398.49,
            signed: 543451778.33,
          },
          percValue: "98.36786750264797",
        },
      },
      {
        name: "MMR",
        value: 392464901.68,
        formattedValue: "392,464,902 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MMR",
              count: 3,
              investment: 392464901.68,
            },
          ],
          totalInvestments: {
            committed: 443521086.47,
            disbursed: 392464901.68,
            signed: 505065843.31,
          },
          percValue: "88.48844252336275",
        },
      },
      {
        name: "CMR",
        value: 380345040.37,
        formattedValue: "380,345,040 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CMR",
              count: 7,
              investment: 380345040.37,
            },
          ],
          totalInvestments: {
            committed: 428227805.98,
            disbursed: 380345040.37,
            signed: 524690253.14,
          },
          percValue: "88.81838943166704",
        },
      },
      {
        name: "UKR",
        value: 362796839.9,
        formattedValue: "362,796,840 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "UKR",
              count: 11,
              investment: 362796839.9,
            },
          ],
          totalInvestments: {
            committed: 362796839.89,
            disbursed: 362796839.9,
            signed: 362796839.9,
          },
          percValue: "100.00000000275637",
        },
      },
      {
        name: "IDN",
        value: 346582233.94,
        formattedValue: "346,582,234 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "IDN",
              count: 11,
              investment: 346582233.94,
            },
          ],
          totalInvestments: {
            committed: 360248484.57,
            disbursed: 346582233.94,
            signed: 360515639.74,
          },
          percValue: "96.20643771858963",
        },
      },
      {
        name: "GHA",
        value: 345760976.97,
        formattedValue: "345,760,977 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GHA",
              count: 11,
              investment: 345760976.97,
            },
          ],
          totalInvestments: {
            committed: 351833807.03,
            disbursed: 345760976.97,
            signed: 359057194.21,
          },
          percValue: "98.27394925141968",
        },
      },
      {
        name: "CHN",
        value: 323230663.89,
        formattedValue: "323,230,664 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CHN",
              count: 4,
              investment: 323230663.89,
            },
          ],
          totalInvestments: {
            committed: 323230663.89,
            disbursed: 323230663.89,
            signed: 323230663.89,
          },
          percValue: "100",
        },
      },
      {
        name: "THA",
        value: 287390159.55,
        formattedValue: "287,390,160 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "THA",
              count: 11,
              investment: 287390159.55,
            },
          ],
          totalInvestments: {
            committed: 287390159.55,
            disbursed: 287390159.55,
            signed: 287390159.79,
          },
          percValue: "100",
        },
      },
      {
        name: "RUS",
        value: 286143522.38,
        formattedValue: "286,143,522 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "RUS",
              count: 4,
              investment: 286143522.38,
            },
          ],
          totalInvestments: {
            committed: 286210068.61,
            disbursed: 286143522.38,
            signed: 286210068.61,
          },
          percValue: "99.97674916528157",
        },
      },
      {
        name: "KHM",
        value: 243508271.61,
        formattedValue: "243,508,272 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "KHM",
              count: 6,
              investment: 243508271.61,
            },
          ],
          totalInvestments: {
            committed: 243508271.61,
            disbursed: 243508271.61,
            signed: 243508271.61,
          },
          percValue: "100",
        },
      },
      {
        name: "NAM",
        value: 239562180.09,
        formattedValue: "239,562,180 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "NAM",
              count: 2,
              investment: 239562180.09,
            },
          ],
          totalInvestments: {
            committed: 239562180.09,
            disbursed: 239562180.09,
            signed: 239562180.09,
          },
          percValue: "100",
        },
      },
      {
        name: "CIV",
        value: 235772421.16,
        formattedValue: "235,772,421 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CIV",
              count: 8,
              investment: 235772421.16,
            },
          ],
          totalInvestments: {
            committed: 257920563.3,
            disbursed: 235772421.16,
            signed: 314042306.6,
          },
          percValue: "91.41280483548013",
        },
      },
      {
        name: "VNM",
        value: 230073220.75,
        formattedValue: "230,073,221 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "VNM",
              count: 5,
              investment: 230073220.75,
            },
          ],
          totalInvestments: {
            committed: 251891435.07,
            disbursed: 230073220.75,
            signed: 281888854.09,
          },
          percValue: "91.33824684672713",
        },
      },
      {
        name: "MLI",
        value: 217321225.02,
        formattedValue: "217,321,225 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MLI",
              count: 8,
              investment: 217321225.02,
            },
          ],
          totalInvestments: {
            committed: 228875914.2,
            disbursed: 217321225.02,
            signed: 230845290.97,
          },
          percValue: "94.9515486501113",
        },
      },
      {
        name: "HTI",
        value: 210422459.56,
        formattedValue: "210,422,460 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "HTI",
              count: 5,
              investment: 210422459.56,
            },
          ],
          totalInvestments: {
            committed: 210422459.56,
            disbursed: 210422459.56,
            signed: 210422459.56,
          },
          percValue: "100",
        },
      },
      {
        name: "SWZ",
        value: 192644814.16,
        formattedValue: "192,644,814 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SWZ",
              count: 5,
              investment: 192644814.16,
            },
          ],
          totalInvestments: {
            committed: 192644814.16,
            disbursed: 192644814.16,
            signed: 192644814.16,
          },
          percValue: "100",
        },
      },
      {
        name: "BFA",
        value: 181304805.79,
        formattedValue: "181,304,806 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BFA",
              count: 5,
              investment: 181304805.79,
            },
          ],
          totalInvestments: {
            committed: 197981437.44,
            disbursed: 181304805.79,
            signed: 226022828.07,
          },
          percValue: "91.57666907279932",
        },
      },
      {
        name: "TGO",
        value: 173186021.53,
        formattedValue: "173,186,022 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TGO",
              count: 5,
              investment: 173186021.53,
            },
          ],
          totalInvestments: {
            committed: 184057664.59,
            disbursed: 173186021.53,
            signed: 222345635.42,
          },
          percValue: "94.09334944881688",
        },
      },
      {
        name: "BEN",
        value: 170577956.87,
        formattedValue: "170,577,957 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BEN",
              count: 5,
              investment: 170577956.87,
            },
          ],
          totalInvestments: {
            committed: 186204245.65,
            disbursed: 170577956.87,
            signed: 216185214.69,
          },
          percValue: "91.60798470225429",
        },
      },
      {
        name: "SDN",
        value: 169298434.36,
        formattedValue: "169,298,434 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SDN",
              count: 4,
              investment: 169298434.36,
            },
          ],
          totalInvestments: {
            committed: 176466789.36,
            disbursed: 169298434.36,
            signed: 189717753.71,
          },
          percValue: "95.93784472081246",
        },
      },
      {
        name: "LSO",
        value: 168709401.86,
        formattedValue: "168,709,402 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "LSO",
              count: 9,
              investment: 168709401.86,
            },
          ],
          totalInvestments: {
            committed: 168709401.86,
            disbursed: 168709401.86,
            signed: 168709401.86,
          },
          percValue: "100",
        },
      },
      {
        name: "SEN",
        value: 159672301.57,
        formattedValue: "159,672,302 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SEN",
              count: 7,
              investment: 159672301.57,
            },
          ],
          totalInvestments: {
            committed: 171465928.13,
            disbursed: 159672301.57,
            signed: 188866767.09,
          },
          percValue: "93.12188334520988",
        },
      },
      {
        name: "ERI",
        value: 154530211.33,
        formattedValue: "154,530,211 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ERI",
              count: 4,
              investment: 154530211.33,
            },
          ],
          totalInvestments: {
            committed: 162258994.96,
            disbursed: 154530211.33,
            signed: 171886707.07,
          },
          percValue: "95.2367610609783",
        },
      },
      {
        name: "DOM",
        value: 152899220.87,
        formattedValue: "152,899,221 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "DOM",
              count: 4,
              investment: 152899220.87,
            },
          ],
          totalInvestments: {
            committed: 153065063.66,
            disbursed: 152899220.87,
            signed: 156490385.14,
          },
          percValue: "99.89165209484486",
        },
      },
      {
        name: "SLE",
        value: 148949029.99,
        formattedValue: "148,949,030 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SLE",
              count: 3,
              investment: 148949029.99,
            },
          ],
          totalInvestments: {
            committed: 150196538.2,
            disbursed: 148949029.99,
            signed: 150343811.53,
          },
          percValue: "99.16941613638338",
        },
      },
      {
        name: "BDI",
        value: 143632770.63,
        formattedValue: "143,632,771 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BDI",
              count: 6,
              investment: 143632770.63,
            },
          ],
          totalInvestments: {
            committed: 143632770.63,
            disbursed: 143632770.63,
            signed: 143632770.63,
          },
          percValue: "100",
        },
      },
      {
        name: "BGD",
        value: 142648390.75,
        formattedValue: "142,648,391 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BGD",
              count: 8,
              investment: 142648390.75,
            },
          ],
          totalInvestments: {
            committed: 149701853.94,
            disbursed: 142648390.75,
            signed: 160473247.41,
          },
          percValue: "95.28832609325801",
        },
      },
      {
        name: "GTM",
        value: 137858961.63,
        formattedValue: "137,858,962 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GTM",
              count: 5,
              investment: 137858961.63,
            },
          ],
          totalInvestments: {
            committed: 148128299.8,
            disbursed: 137858961.63,
            signed: 164732305.38,
          },
          percValue: "93.06726791310946",
        },
      },
      {
        name: "SSD",
        value: 119421631.53,
        formattedValue: "119,421,632 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SSD",
              count: 2,
              investment: 119421631.53,
            },
          ],
          totalInvestments: {
            committed: 119421631.53,
            disbursed: 119421631.53,
            signed: 119421631.53,
          },
          percValue: "100",
        },
      },
      {
        name: "CUB",
        value: 119033975.34,
        formattedValue: "119,033,975 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CUB",
              count: 3,
              investment: 119033975.34,
            },
          ],
          totalInvestments: {
            committed: 125585984.7,
            disbursed: 119033975.34,
            signed: 131243293.63,
          },
          percValue: "94.78284987321518",
        },
      },
      {
        name: "TCD",
        value: 117062197.4,
        formattedValue: "117,062,197 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TCD",
              count: 6,
              investment: 117062197.4,
            },
          ],
          totalInvestments: {
            committed: 120737511.9,
            disbursed: 117062197.4,
            signed: 135325301.46,
          },
          percValue: "96.95594646422393",
        },
      },
      {
        name: "AGO",
        value: 115822915.58,
        formattedValue: "115,822,916 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "AGO",
              count: 2,
              investment: 115822915.58,
            },
          ],
          totalInvestments: {
            committed: 115822915.58,
            disbursed: 115822915.58,
            signed: 115822915.72,
          },
          percValue: "100",
        },
      },
      {
        name: "GIN",
        value: 114919332.81,
        formattedValue: "114,919,333 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GIN",
              count: 6,
              investment: 114919332.81,
            },
          ],
          totalInvestments: {
            committed: 129013128.83,
            disbursed: 114919332.81,
            signed: 158507075.71,
          },
          percValue: "89.07568853820193",
        },
      },
      {
        name: "NPL",
        value: 113845536.76,
        formattedValue: "113,845,537 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "NPL",
              count: 8,
              investment: 113845536.76,
            },
          ],
          totalInvestments: {
            committed: 121590676.17,
            disbursed: 113845536.76,
            signed: 140610322.89,
          },
          percValue: "93.63015351672914",
        },
      },
      {
        name: "SOM",
        value: 112814285.32,
        formattedValue: "112,814,285 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SOM",
              count: 3,
              investment: 112814285.32,
            },
          ],
          totalInvestments: {
            committed: 121806732.63,
            disbursed: 112814285.32,
            signed: 129458553.88,
          },
          percValue: "92.61744641216553",
        },
      },
      {
        name: "SLV",
        value: 105102734.49,
        formattedValue: "105,102,734 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SLV",
              count: 7,
              investment: 105102734.49,
            },
          ],
          totalInvestments: {
            committed: 106800781.57,
            disbursed: 105102734.49,
            signed: 112401699.04,
          },
          percValue: "98.41007991230191",
        },
      },
      {
        name: "TJK",
        value: 98551304.56,
        formattedValue: "98,551,305 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TJK",
              count: 5,
              investment: 98551304.56,
            },
          ],
          totalInvestments: {
            committed: 98551304.56,
            disbursed: 98551304.56,
            signed: 98686065.05,
          },
          percValue: "100",
        },
      },
      {
        name: "HND",
        value: 93470584.02,
        formattedValue: "93,470,584 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "HND",
              count: 3,
              investment: 93470584.02,
            },
          ],
          totalInvestments: {
            committed: 93470584.02,
            disbursed: 93470584.02,
            signed: 93470584.02,
          },
          percValue: "100",
        },
      },
      {
        name: "QRA",
        value: 93036387.69,
        formattedValue: "93,036,388 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QRA",
              count: 12,
              investment: 93036387.69,
            },
          ],
          totalInvestments: {
            committed: 93600111.75,
            disbursed: 93036387.69,
            signed: 101953853.54,
          },
          percValue: "99.39773142418284",
        },
      },
      {
        name: "JAM",
        value: 92037881.35,
        formattedValue: "92,037,881 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "JAM",
              count: 3,
              investment: 92037881.35,
            },
          ],
          totalInvestments: {
            committed: 93766364.11,
            disbursed: 92037881.35,
            signed: 95944281.85,
          },
          percValue: "98.15660682121334",
        },
      },
      {
        name: "UZB",
        value: 89822176.31,
        formattedValue: "89,822,176 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "UZB",
              count: 4,
              investment: 89822176.31,
            },
          ],
          totalInvestments: {
            committed: 90346756.71,
            disbursed: 89822176.31,
            signed: 92241249.2,
          },
          percValue: "99.41936997065227",
        },
      },
      {
        name: "GEO",
        value: 88341417.68,
        formattedValue: "88,341,418 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GEO",
              count: 5,
              investment: 88341417.68,
            },
          ],
          totalInvestments: {
            committed: 90006095.88,
            disbursed: 88341417.68,
            signed: 93179429.39,
          },
          percValue: "98.15048282705271",
        },
      },
      {
        name: "LBR",
        value: 86247137.7,
        formattedValue: "86,247,138 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "LBR",
              count: 4,
              investment: 86247137.7,
            },
          ],
          totalInvestments: {
            committed: 86247137.7,
            disbursed: 86247137.7,
            signed: 86410869.4,
          },
          percValue: "100",
        },
      },
      {
        name: "PAK",
        value: 83621464.19,
        formattedValue: "83,621,464 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PAK",
              count: 5,
              investment: 83621464.19,
            },
          ],
          totalInvestments: {
            committed: 92764468.21,
            disbursed: 83621464.19,
            signed: 114935568.15,
          },
          percValue: "90.14385120033019",
        },
      },
      {
        name: "PER",
        value: 83371465.03,
        formattedValue: "83,371,465 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PER",
              count: 7,
              investment: 83371465.03,
            },
          ],
          totalInvestments: {
            committed: 83575734.01,
            disbursed: 83371465.03,
            signed: 84624543.21,
          },
          percValue: "99.75558817111249",
        },
      },
      {
        name: "MAR",
        value: 77126880.01,
        formattedValue: "77,126,880 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MAR",
              count: 4,
              investment: 77126880.01,
            },
          ],
          totalInvestments: {
            committed: 77447154.7,
            disbursed: 77126880.01,
            signed: 77802298.4,
          },
          percValue: "99.58646035320392",
        },
      },
      {
        name: "IRN",
        value: 70753052.36,
        formattedValue: "70,753,052 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "IRN",
              count: 3,
              investment: 70753052.36,
            },
          ],
          totalInvestments: {
            committed: 70753052.36,
            disbursed: 70753052.36,
            signed: 75563286.65,
          },
          percValue: "100",
        },
      },
      {
        name: "BLR",
        value: 69594893.19,
        formattedValue: "69,594,893 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BLR",
              count: 4,
              investment: 69594893.19,
            },
          ],
          totalInvestments: {
            committed: 69594893.18,
            disbursed: 69594893.19,
            signed: 69594893.19,
          },
          percValue: "100.00000001436887",
        },
      },
      {
        name: "NER",
        value: 68821373.04,
        formattedValue: "68,821,373 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "NER",
              count: 4,
              investment: 68821373.04,
            },
          ],
          totalInvestments: {
            committed: 78926671.88,
            disbursed: 68821373.04,
            signed: 97925159.47,
          },
          percValue: "87.19659831170372",
        },
      },
      {
        name: "MDG",
        value: 65996115.17,
        formattedValue: "65,996,115 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MDG",
              count: 7,
              investment: 65996115.17,
            },
          ],
          totalInvestments: {
            committed: 69539756.16,
            disbursed: 65996115.17,
            signed: 84836138.79,
          },
          percValue: "94.90415096963147",
        },
      },
      {
        name: "NIC",
        value: 65668398.32,
        formattedValue: "65,668,398 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "NIC",
              count: 4,
              investment: 65668398.32,
            },
          ],
          totalInvestments: {
            committed: 66507653.98,
            disbursed: 65668398.32,
            signed: 68104369.24,
          },
          percValue: "98.73810665423204",
        },
      },
      {
        name: "KAZ",
        value: 63201016.68,
        formattedValue: "63,201,017 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "KAZ",
              count: 3,
              investment: 63201016.68,
            },
          ],
          totalInvestments: {
            committed: 66531949.44,
            disbursed: 63201016.68,
            signed: 68839486.92,
          },
          percValue: "94.99348390053729",
        },
      },
      {
        name: "GMB",
        value: 60666100.07,
        formattedValue: "60,666,100 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GMB",
              count: 5,
              investment: 60666100.07,
            },
          ],
          totalInvestments: {
            committed: 60644140.92,
            disbursed: 60666100.07,
            signed: 60644140.93,
          },
          percValue: "100.03620984594203",
        },
      },
      {
        name: "LAO",
        value: 60082285.41,
        formattedValue: "60,082,285 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "LAO",
              count: 5,
              investment: 60082285.41,
            },
          ],
          totalInvestments: {
            committed: 60194906.4,
            disbursed: 60082285.41,
            signed: 60770916.92,
          },
          percValue: "99.81290611326543",
        },
      },
      {
        name: "KGZ",
        value: 59987663.62,
        formattedValue: "59,987,664 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "KGZ",
              count: 3,
              investment: 59987663.62,
            },
          ],
          totalInvestments: {
            committed: 59987663.62,
            disbursed: 59987663.62,
            signed: 59987663.62,
          },
          percValue: "100",
        },
      },
      {
        name: "COG",
        value: 58179896.88,
        formattedValue: "58,179,897 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "COG",
              count: 5,
              investment: 58179896.88,
            },
          ],
          totalInvestments: {
            committed: 58664432.91,
            disbursed: 58179896.88,
            signed: 58664432.91,
          },
          percValue: "99.17405486431046",
        },
      },
      {
        name: "COL",
        value: 58056696.17,
        formattedValue: "58,056,696 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "COL",
              count: 3,
              investment: 58056696.17,
            },
          ],
          totalInvestments: {
            committed: 62053618.11,
            disbursed: 58056696.17,
            signed: 64602773.5,
          },
          percValue: "93.5589220069089",
        },
      },
      {
        name: "PHL",
        value: 57695481.86,
        formattedValue: "57,695,482 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PHL",
              count: 6,
              investment: 57695481.86,
            },
          ],
          totalInvestments: {
            committed: 66206058.29,
            disbursed: 57695481.86,
            signed: 77554763.25,
          },
          percValue: "87.14532076094693",
        },
      },
      {
        name: "BOL",
        value: 56991893.15,
        formattedValue: "56,991,893 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BOL",
              count: 5,
              investment: 56991893.15,
            },
          ],
          totalInvestments: {
            committed: 57143299.84,
            disbursed: 56991893.15,
            signed: 57165050.6,
          },
          percValue: "99.73504034519543",
        },
      },
      {
        name: "CAF",
        value: 54173542.45,
        formattedValue: "54,173,542 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CAF",
              count: 4,
              investment: 54173542.45,
            },
          ],
          totalInvestments: {
            committed: 54173984.15,
            disbursed: 54173542.45,
            signed: 54173984.15,
          },
          percValue: "99.99918466399153",
        },
      },
      {
        name: "AZE",
        value: 53299307.35,
        formattedValue: "53,299,307 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "AZE",
              count: 3,
              investment: 53299307.35,
            },
          ],
          totalInvestments: {
            committed: 53490649.47,
            disbursed: 53299307.35,
            signed: 53490650.66,
          },
          percValue: "99.642288658119",
        },
      },
      {
        name: "QMZ",
        value: 52184184.98,
        formattedValue: "52,184,185 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QMZ",
              count: 9,
              investment: 52184184.98,
            },
          ],
          totalInvestments: {
            committed: 54711710.88,
            disbursed: 52184184.98,
            signed: 59155375.33,
          },
          percValue: "95.38028356389063",
        },
      },
      {
        name: "QPF",
        value: 51009405.22,
        formattedValue: "51,009,405 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QPF",
              count: 4,
              investment: 51009405.22,
            },
          ],
          totalInvestments: {
            committed: 50568348.76,
            disbursed: 51009405.22,
            signed: 50357840.67,
          },
          percValue: "100.87219865946835",
        },
      },
      {
        name: "MDA",
        value: 50013914.33,
        formattedValue: "50,013,914 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MDA",
              count: 4,
              investment: 50013914.33,
            },
          ],
          totalInvestments: {
            committed: 50370329.06,
            disbursed: 50013914.33,
            signed: 50370329.07,
          },
          percValue: "99.2924113527719",
        },
      },
      {
        name: "BGR",
        value: 49490867.92,
        formattedValue: "49,490,868 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BGR",
              count: 1,
              investment: 49490867.92,
            },
          ],
          totalInvestments: {
            committed: 50102363.69,
            disbursed: 49490867.92,
            signed: 50102363.68,
          },
          percValue: "98.77950714304913",
        },
      },
      {
        name: "GNB",
        value: 43893846.82,
        formattedValue: "43,893,847 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GNB",
              count: 4,
              investment: 43893846.82,
            },
          ],
          totalInvestments: {
            committed: 45092115.9,
            disbursed: 43893846.82,
            signed: 45092115.9,
          },
          percValue: "97.3426195331854",
        },
      },
      {
        name: "QPA",
        value: 41878455,
        formattedValue: "41,878,455 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QPA",
              count: 5,
              investment: 41878455,
            },
          ],
          totalInvestments: {
            committed: 41878455,
            disbursed: 41878455,
            signed: 41891248.78,
          },
          percValue: "100",
        },
      },
      {
        name: "PNG",
        value: 41843627.47,
        formattedValue: "41,843,627 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PNG",
              count: 3,
              investment: 41843627.47,
            },
          ],
          totalInvestments: {
            committed: 41843627.47,
            disbursed: 41843627.47,
            signed: 41843627.47,
          },
          percValue: "100",
        },
      },
      {
        name: "ECU",
        value: 41616833.19,
        formattedValue: "41,616,833 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ECU",
              count: 6,
              investment: 41616833.19,
            },
          ],
          totalInvestments: {
            committed: 42851503.47,
            disbursed: 41616833.19,
            signed: 43748700.74,
          },
          percValue: "97.1187235452208",
        },
      },
      {
        name: "BIH",
        value: 40047926.63,
        formattedValue: "40,047,927 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BIH",
              count: 2,
              investment: 40047926.63,
            },
          ],
          totalInvestments: {
            committed: 40445228.77,
            disbursed: 40047926.63,
            signed: 40445228.78,
          },
          percValue: "99.01767859378585",
        },
      },
      {
        name: "GUY",
        value: 38387001.71,
        formattedValue: "38,387,002 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GUY",
              count: 2,
              investment: 38387001.71,
            },
          ],
          totalInvestments: {
            committed: 38537291.94,
            disbursed: 38387001.71,
            signed: 40266421.15,
          },
          percValue: "99.6100135156513",
        },
      },
      {
        name: "ROU",
        value: 37671818.76,
        formattedValue: "37,671,819 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ROU",
              count: 2,
              investment: 37671818.76,
            },
          ],
          totalInvestments: {
            committed: 37671818.75,
            disbursed: 37671818.76,
            signed: 37671818.76,
          },
          percValue: "100.00000002654504",
        },
      },
      {
        name: "ARM",
        value: 35473559.99,
        formattedValue: "35,473,560 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ARM",
              count: 5,
              investment: 35473559.99,
            },
          ],
          totalInvestments: {
            committed: 35530265.78,
            disbursed: 35473559.99,
            signed: 35530265.74,
          },
          percValue: "99.84040144717432",
        },
      },
      {
        name: "PRY",
        value: 34862373.47,
        formattedValue: "34,862,373 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PRY",
              count: 3,
              investment: 34862373.47,
            },
          ],
          totalInvestments: {
            committed: 35710009.6,
            disbursed: 34862373.47,
            signed: 39496754.17,
          },
          percValue: "97.62633463419735",
        },
      },
      {
        name: "MEX",
        value: 34680258.1,
        formattedValue: "34,680,258 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MEX",
              count: 1,
              investment: 34680258.1,
            },
          ],
          totalInvestments: {
            committed: 34680258.1,
            disbursed: 34680258.1,
            signed: 34680258.1,
          },
          percValue: "100",
        },
      },
      {
        name: "SRB",
        value: 31842408.24,
        formattedValue: "31,842,408 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SRB",
              count: 5,
              investment: 31842408.24,
            },
          ],
          totalInvestments: {
            committed: 31802071.45,
            disbursed: 31842408.24,
            signed: 32089724.55,
          },
          percValue: "100.12683698941882",
        },
      },
      {
        name: "AFG",
        value: 31200050.44,
        formattedValue: "31,200,050 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "AFG",
              count: 3,
              investment: 31200050.44,
            },
          ],
          totalInvestments: {
            committed: 34125388.29,
            disbursed: 31200050.44,
            signed: 38557253.69,
          },
          percValue: "91.42767893176696",
        },
      },
      {
        name: "CHL",
        value: 28835307,
        formattedValue: "28,835,307 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CHL",
              count: 1,
              investment: 28835307,
            },
          ],
          totalInvestments: {
            committed: 28835307,
            disbursed: 28835307,
            signed: 28835307,
          },
          percValue: "100",
        },
      },
      {
        name: "QSD",
        value: 28788981.59,
        formattedValue: "28,788,982 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QSD",
              count: 3,
              investment: 28788981.59,
            },
          ],
          totalInvestments: {
            committed: 28788981.59,
            disbursed: 28788981.59,
            signed: 28788981.59,
          },
          percValue: "100",
        },
      },
      {
        name: "ARG",
        value: 28402468.32,
        formattedValue: "28,402,468 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ARG",
              count: 3,
              investment: 28402468.32,
            },
          ],
          totalInvestments: {
            committed: 28402468.32,
            disbursed: 28402468.32,
            signed: 28402468.32,
          },
          percValue: "100",
        },
      },
      {
        name: "TUN",
        value: 27956355.84,
        formattedValue: "27,956,356 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TUN",
              count: 2,
              investment: 27956355.84,
            },
          ],
          totalInvestments: {
            committed: 28819393.94,
            disbursed: 27956355.84,
            signed: 29345929.95,
          },
          percValue: "97.00535652555085",
        },
      },
      {
        name: "QUA",
        value: 27241098.84,
        formattedValue: "27,241,099 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QUA",
              count: 2,
              investment: 27241098.84,
            },
          ],
          totalInvestments: {
            committed: 27241098.84,
            disbursed: 27241098.84,
            signed: 27241098.84,
          },
          percValue: "100",
        },
      },
      {
        name: "MKD",
        value: 24588665.92,
        formattedValue: "24,588,666 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MKD",
              count: 3,
              investment: 24588665.92,
            },
          ],
          totalInvestments: {
            committed: 24768280.41,
            disbursed: 24588665.92,
            signed: 24768280.42,
          },
          percValue: "99.27482050821953",
        },
      },
      {
        name: "MNG",
        value: 24009666.18,
        formattedValue: "24,009,666 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MNG",
              count: 5,
              investment: 24009666.18,
            },
          ],
          totalInvestments: {
            committed: 24018274.38,
            disbursed: 24009666.18,
            signed: 24054820,
          },
          percValue: "99.96415978990078",
        },
      },
      {
        name: "TLS",
        value: 22009630.79,
        formattedValue: "22,009,631 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TLS",
              count: 2,
              investment: 22009630.79,
            },
          ],
          totalInvestments: {
            committed: 23151973.84,
            disbursed: 22009630.79,
            signed: 24989953.3,
          },
          percValue: "95.0658934832314",
        },
      },
      {
        name: "LKA",
        value: 20805483.5,
        formattedValue: "20,805,484 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "LKA",
              count: 6,
              investment: 20805483.5,
            },
          ],
          totalInvestments: {
            committed: 21270906.28,
            disbursed: 20805483.5,
            signed: 22612837.21,
          },
          percValue: "97.81192783291225",
        },
      },
      {
        name: "DJI",
        value: 19404402.41,
        formattedValue: "19,404,402 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "DJI",
              count: 3,
              investment: 19404402.41,
            },
          ],
          totalInvestments: {
            committed: 19404402.41,
            disbursed: 19404402.41,
            signed: 19404402.41,
          },
          percValue: "100",
        },
      },
      {
        name: "YEM",
        value: 16162251.66,
        formattedValue: "16,162,252 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "YEM",
              count: 4,
              investment: 16162251.66,
            },
          ],
          totalInvestments: {
            committed: 16162251.66,
            disbursed: 16162251.66,
            signed: 16162251.66,
          },
          percValue: "100",
        },
      },
      {
        name: "MUS",
        value: 15726002.77,
        formattedValue: "15,726,003 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MUS",
              count: 5,
              investment: 15726002.77,
            },
          ],
          totalInvestments: {
            committed: 16220716.75,
            disbursed: 15726002.77,
            signed: 17165627.64,
          },
          percValue: "96.95011023480205",
        },
      },
      {
        name: "MYS",
        value: 14352508.61,
        formattedValue: "14,352,509 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MYS",
              count: 1,
              investment: 14352508.61,
            },
          ],
          totalInvestments: {
            committed: 14352508.61,
            disbursed: 14352508.61,
            signed: 15415102.78,
          },
          percValue: "100",
        },
      },
      {
        name: "QSE",
        value: 13715010.31,
        formattedValue: "13,715,010 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QSE",
              count: 2,
              investment: 13715010.31,
            },
          ],
          totalInvestments: {
            committed: 13715010.31,
            disbursed: 13715010.31,
            signed: 13715010.31,
          },
          percValue: "100",
        },
      },
      {
        name: "MRT",
        value: 13281555.53,
        formattedValue: "13,281,556 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MRT",
              count: 2,
              investment: 13281555.53,
            },
          ],
          totalInvestments: {
            committed: 13281555.53,
            disbursed: 13281555.53,
            signed: 13281555.53,
          },
          percValue: "100",
        },
      },
      {
        name: "DZA",
        value: 12868164.81,
        formattedValue: "12,868,165 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "DZA",
              count: 2,
              investment: 12868164.81,
            },
          ],
          totalInvestments: {
            committed: 14493132.99,
            disbursed: 12868164.81,
            signed: 14497969.62,
          },
          percValue: "88.78801304644621",
        },
      },
      {
        name: "GAB",
        value: 12421722.87,
        formattedValue: "12,421,723 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GAB",
              count: 2,
              investment: 12421722.87,
            },
          ],
          totalInvestments: {
            committed: 12423919.09,
            disbursed: 12421722.87,
            signed: 12423919.08,
          },
          percValue: "99.98232264727345",
        },
      },
      {
        name: "QRC",
        value: 12112243.4,
        formattedValue: "12,112,243 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QRC",
              count: 2,
              investment: 12112243.4,
            },
          ],
          totalInvestments: {
            committed: 12112243.4,
            disbursed: 12112243.4,
            signed: 12112243.4,
          },
          percValue: "100",
        },
      },
      {
        name: "QNA",
        value: 11550830.56,
        formattedValue: "11,550,831 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QNA",
              count: 3,
              investment: 11550830.56,
            },
          ],
          totalInvestments: {
            committed: 11594528.19,
            disbursed: 11550830.56,
            signed: 11961468.51,
          },
          percValue: "99.62311851518298",
        },
      },
      {
        name: "EST",
        value: 10978492.88,
        formattedValue: "10,978,493 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "EST",
              count: 1,
              investment: 10978492.88,
            },
          ],
          totalInvestments: {
            committed: 10978492.88,
            disbursed: 10978492.88,
            signed: 10978492.88,
          },
          percValue: "99.99999999999999",
        },
      },
      {
        name: "CRI",
        value: 10592380.63,
        formattedValue: "10,592,381 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CRI",
              count: 3,
              investment: 10592380.63,
            },
          ],
          totalInvestments: {
            committed: 10592380.63,
            disbursed: 10592380.63,
            signed: 10651341.48,
          },
          percValue: "100",
        },
      },
      {
        name: "COM",
        value: 10451939.49,
        formattedValue: "10,451,939 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "COM",
              count: 3,
              investment: 10451939.49,
            },
          ],
          totalInvestments: {
            committed: 10547856.21,
            disbursed: 10451939.49,
            signed: 10979745.78,
          },
          percValue: "99.09065199515076",
        },
      },
      {
        name: "PSE",
        value: 9876140.25,
        formattedValue: "9,876,140 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PSE",
              count: 1,
              investment: 9876140.25,
            },
          ],
          totalInvestments: {
            committed: 9876141.25,
            disbursed: 9876140.25,
            signed: 9876140.25,
          },
          percValue: "99.99998987458791",
        },
      },
      {
        name: "MNE",
        value: 9658587.93,
        formattedValue: "9,658,588 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MNE",
              count: 3,
              investment: 9658587.93,
            },
          ],
          totalInvestments: {
            committed: 9676828.42,
            disbursed: 9658587.93,
            signed: 9683946.48,
          },
          percValue: "99.81150342645013",
        },
      },
      {
        name: "EGY",
        value: 9259337.15,
        formattedValue: "9,259,337 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "EGY",
              count: 1,
              investment: 9259337.15,
            },
          ],
          totalInvestments: {
            committed: 9259337.15,
            disbursed: 9259337.15,
            signed: 9259337.15,
          },
          percValue: "100",
        },
      },
      {
        name: "CPV",
        value: 9171163.12,
        formattedValue: "9,171,163 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "CPV",
              count: 2,
              investment: 9171163.12,
            },
          ],
          totalInvestments: {
            committed: 9171163.12,
            disbursed: 9171163.12,
            signed: 9171163.12,
          },
          percValue: "100",
        },
      },
      {
        name: "SUR",
        value: 9084200.96,
        formattedValue: "9,084,201 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SUR",
              count: 2,
              investment: 9084200.96,
            },
          ],
          totalInvestments: {
            committed: 9084200.96,
            disbursed: 9084200.96,
            signed: 9084200.96,
          },
          percValue: "100",
        },
      },
      {
        name: "BWA",
        value: 8269612,
        formattedValue: "8,269,612 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BWA",
              count: 1,
              investment: 8269612,
            },
          ],
          totalInvestments: {
            committed: 8269612,
            disbursed: 8269612,
            signed: 8269612,
          },
          percValue: "100",
        },
      },
      {
        name: "JOR",
        value: 8157519.47,
        formattedValue: "8,157,519 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "JOR",
              count: 2,
              investment: 8157519.47,
            },
          ],
          totalInvestments: {
            committed: 8157519.47,
            disbursed: 8157519.47,
            signed: 8157519.47,
          },
          percValue: "100",
        },
      },
      {
        name: "QRB",
        value: 8008679.04,
        formattedValue: "8,008,679 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QRB",
              count: 1,
              investment: 8008679.04,
            },
          ],
          totalInvestments: {
            committed: 8008679.04,
            disbursed: 8008679.04,
            signed: 8008679.04,
          },
          percValue: "100",
        },
      },
      {
        name: "GNQ",
        value: 7648737.63,
        formattedValue: "7,648,738 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "GNQ",
              count: 1,
              investment: 7648737.63,
            },
          ],
          totalInvestments: {
            committed: 7648737.63,
            disbursed: 7648737.63,
            signed: 7648737.63,
          },
          percValue: "100",
        },
      },
      {
        name: "BLZ",
        value: 7470658.56,
        formattedValue: "7,470,659 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BLZ",
              count: 2,
              investment: 7470658.56,
            },
          ],
          totalInvestments: {
            committed: 7470658.56,
            disbursed: 7470658.56,
            signed: 7470658.56,
          },
          percValue: "100",
        },
      },
      {
        name: "BTN",
        value: 5860636.83,
        formattedValue: "5,860,637 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "BTN",
              count: 2,
              investment: 5860636.83,
            },
          ],
          totalInvestments: {
            committed: 5906578.16,
            disbursed: 5860636.83,
            signed: 5984029.3,
          },
          percValue: "99.22220059134881",
        },
      },
      {
        name: "ALB",
        value: 5443975.72,
        formattedValue: "5,443,976 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "ALB",
              count: 1,
              investment: 5443975.72,
            },
          ],
          totalInvestments: {
            committed: 5443975.72,
            disbursed: 5443975.72,
            signed: 5443975.72,
          },
          percValue: "100",
        },
      },
      {
        name: "QPB",
        value: 5341858.85,
        formattedValue: "5,341,859 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QPB",
              count: 1,
              investment: 5341858.85,
            },
          ],
          totalInvestments: {
            committed: 5341858.85,
            disbursed: 5341858.85,
            signed: 5341858.85,
          },
          percValue: "100",
        },
      },
      {
        name: "HRV",
        value: 4944323.74,
        formattedValue: "4,944,324 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "HRV",
              count: 1,
              investment: 4944323.74,
            },
          ],
          totalInvestments: {
            committed: 4944323.74,
            disbursed: 4944323.74,
            signed: 4944323.74,
          },
          percValue: "100",
        },
      },
      {
        name: "QSA",
        value: 4894148,
        formattedValue: "4,894,148 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QSA",
              count: 1,
              investment: 4894148,
            },
          ],
          totalInvestments: {
            committed: 5000000,
            disbursed: 4894148,
            signed: 5000000,
          },
          percValue: "97.88296",
        },
      },
      {
        name: "MDV",
        value: 3908928.7,
        formattedValue: "3,908,929 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "MDV",
              count: 1,
              investment: 3908928.7,
            },
          ],
          totalInvestments: {
            committed: 3908928.7,
            disbursed: 3908928.7,
            signed: 3908928.7,
          },
          percValue: "100",
        },
      },
      {
        name: "PAN",
        value: 3877866.26,
        formattedValue: "3,877,866 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "PAN",
              count: 1,
              investment: 3877866.26,
            },
          ],
          totalInvestments: {
            committed: 3877866.26,
            disbursed: 3877866.26,
            signed: 3877866.26,
          },
          percValue: "100",
        },
      },
      {
        name: "QNB",
        value: 3594606.5,
        formattedValue: "3,594,607 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QNB",
              count: 3,
              investment: 3594606.5,
            },
          ],
          totalInvestments: {
            committed: 3594606.5,
            disbursed: 3594606.5,
            signed: 3594606.5,
          },
          percValue: "100",
        },
      },
      {
        name: "STP",
        value: 3486157.82,
        formattedValue: "3,486,158 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "STP",
              count: 3,
              investment: 3486157.82,
            },
          ],
          totalInvestments: {
            committed: 3486157.82,
            disbursed: 3486157.82,
            signed: 3486157.82,
          },
          percValue: "100",
        },
      },
      {
        name: "URY",
        value: 3455733.33,
        formattedValue: "3,455,733 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "URY",
              count: 2,
              investment: 3455733.33,
            },
          ],
          totalInvestments: {
            committed: 3455733.33,
            disbursed: 3455733.33,
            signed: 3455733.33,
          },
          percValue: "100",
        },
      },
      {
        name: "TUR",
        value: 3272762.62,
        formattedValue: "3,272,763 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "TUR",
              count: 1,
              investment: 3272762.62,
            },
          ],
          totalInvestments: {
            committed: 3272762.62,
            disbursed: 3272762.62,
            signed: 3272762.62,
          },
          percValue: "100",
        },
      },
      {
        name: "SYR",
        value: 2526007.66,
        formattedValue: "2,526,008 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "SYR",
              count: 1,
              investment: 2526007.66,
            },
          ],
          totalInvestments: {
            committed: 2526007.66,
            disbursed: 2526007.66,
            signed: 2526007.66,
          },
          percValue: "100",
        },
      },
      {
        name: "QTD",
        value: 700000,
        formattedValue: "700,000 USD",
        color: "#70777E",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "QTD",
              count: 1,
              investment: 700000,
            },
          ],
          totalInvestments: {
            committed: 700000,
            disbursed: 700000,
            signed: 700000,
          },
          percValue: "100",
        },
      },
    ],
    tooltip: {
      header: "HIV",
      componentsStats: [
        {
          name: "HIV",
          count: 585,
          investment: 22438503078.05002,
        },
      ],
      totalInvestments: {
        committed: 23576317202.750008,
        disbursed: 22438503078.05002,
        signed: 25767326258.459995,
      },
      percValue: "95.173910687937",
    },
  },
  {
    name: "Malaria",
    color: "#DFE3E5",
    value: 14493002457.729996,
    formattedValue: "14,493,002,458 USD",
    _children: [
      {
        name: "NGA",
        value: 1266664112.5,
        formattedValue: "1,266,664,113 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "NGA",
              count: 9,
              investment: 1266664112.5,
            },
          ],
          totalInvestments: {
            committed: 1360909685.2,
            disbursed: 1266664112.5,
            signed: 1669714736.75,
          },
          percValue: "93.0748106413726",
        },
      },
      {
        name: "COD",
        value: 1181395848.33,
        formattedValue: "1,181,395,848 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "COD",
              count: 9,
              investment: 1181395848.33,
            },
          ],
          totalInvestments: {
            committed: 1307004578.03,
            disbursed: 1181395848.33,
            signed: 1557854991.58,
          },
          percValue: "90.38957232350897",
        },
      },
      {
        name: "TZA",
        value: 746581151.57,
        formattedValue: "746,581,152 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "TZA",
              count: 5,
              investment: 746581151.57,
            },
          ],
          totalInvestments: {
            committed: 802080487.69,
            disbursed: 746581151.57,
            signed: 936123646.57,
          },
          percValue: "93.08057770114334",
        },
      },
      {
        name: "ETH",
        value: 695279464.24,
        formattedValue: "695,279,464 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "ETH",
              count: 5,
              investment: 695279464.24,
            },
          ],
          totalInvestments: {
            committed: 701228409.12,
            disbursed: 695279464.24,
            signed: 808086765.02,
          },
          percValue: "99.15163949397521",
        },
      },
      {
        name: "UGA",
        value: 646951564.09,
        formattedValue: "646,951,564 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "UGA",
              count: 7,
              investment: 646951564.09,
            },
          ],
          totalInvestments: {
            committed: 702648761.29,
            disbursed: 646951564.09,
            signed: 894992514.25,
          },
          percValue: "92.07325191924555",
        },
      },
      {
        name: "GHA",
        value: 492733354.53,
        formattedValue: "492,733,355 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GHA",
              count: 6,
              investment: 492733354.53,
            },
          ],
          totalInvestments: {
            committed: 532277528.57,
            disbursed: 492733354.53,
            signed: 613804446.46,
          },
          percValue: "92.57076019229328",
        },
      },
      {
        name: "MOZ",
        value: 473663980.43,
        formattedValue: "473,663,980 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MOZ",
              count: 6,
              investment: 473663980.43,
            },
          ],
          totalInvestments: {
            committed: 507324503.51,
            disbursed: 473663980.43,
            signed: 666782965.89,
          },
          percValue: "93.36509022388734",
        },
      },
      {
        name: "CIV",
        value: 440209709.4,
        formattedValue: "440,209,709 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "CIV",
              count: 5,
              investment: 440209709.4,
            },
          ],
          totalInvestments: {
            committed: 481254839.16,
            disbursed: 440209709.4,
            signed: 568818737.9,
          },
          percValue: "91.47122762824749",
        },
      },
      {
        name: "SDN",
        value: 436381179.55,
        formattedValue: "436,381,180 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SDN",
              count: 5,
              investment: 436381179.55,
            },
          ],
          totalInvestments: {
            committed: 446066473.29,
            disbursed: 436381179.55,
            signed: 450746148.55,
          },
          percValue: "97.82873308801594",
        },
      },
      {
        name: "KEN",
        value: 390737446.4,
        formattedValue: "390,737,446 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "KEN",
              count: 6,
              investment: 390737446.4,
            },
          ],
          totalInvestments: {
            committed: 414477456.65,
            disbursed: 390737446.4,
            signed: 415151005.92,
          },
          percValue: "94.27230362734856",
        },
      },
      {
        name: "QSE",
        value: 377435735.1,
        formattedValue: "377,435,735 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QSE",
              count: 1,
              investment: 377435735.1,
            },
          ],
          totalInvestments: {
            committed: 485818301.24,
            disbursed: 377435735.1,
            signed: 587240081.84,
          },
          percValue: "77.69071978899005",
        },
      },
      {
        name: "BFA",
        value: 343158292.28,
        formattedValue: "343,158,292 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BFA",
              count: 6,
              investment: 343158292.28,
            },
          ],
          totalInvestments: {
            committed: 435911206.06,
            disbursed: 343158292.28,
            signed: 509198859.07,
          },
          percValue: "78.72206254609722",
        },
      },
      {
        name: "MDG",
        value: 334750351.34,
        formattedValue: "334,750,351 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MDG",
              count: 13,
              investment: 334750351.34,
            },
          ],
          totalInvestments: {
            committed: 338515865.27,
            disbursed: 334750351.34,
            signed: 339038667.28,
          },
          percValue: "98.88764033939837",
        },
      },
      {
        name: "RWA",
        value: 329590442.59,
        formattedValue: "329,590,443 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "RWA",
              count: 5,
              investment: 329590442.59,
            },
          ],
          totalInvestments: {
            committed: 330956852.59,
            disbursed: 329590442.59,
            signed: 330956852.59,
          },
          percValue: "99.5871334920831",
        },
      },
      {
        name: "ZMB",
        value: 292104811.65,
        formattedValue: "292,104,812 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "ZMB",
              count: 9,
              investment: 292104811.65,
            },
          ],
          totalInvestments: {
            committed: 328980520.67,
            disbursed: 292104811.65,
            signed: 350292320.23,
          },
          percValue: "88.79091414139074",
        },
      },
      {
        name: "IDN",
        value: 283056124.07,
        formattedValue: "283,056,124 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "IDN",
              count: 6,
              investment: 283056124.07,
            },
          ],
          totalInvestments: {
            committed: 295546397.72,
            disbursed: 283056124.07,
            signed: 327555591.32,
          },
          percValue: "95.77383661369025",
        },
      },
      {
        name: "CMR",
        value: 271549083.86,
        formattedValue: "271,549,084 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "CMR",
              count: 5,
              investment: 271549083.86,
            },
          ],
          totalInvestments: {
            committed: 302447610.63,
            disbursed: 271549083.86,
            signed: 385692114.43,
          },
          percValue: "89.78384166909495",
        },
      },
      {
        name: "MWI",
        value: 261837368.2,
        formattedValue: "261,837,368 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MWI",
              count: 5,
              investment: 261837368.2,
            },
          ],
          totalInvestments: {
            committed: 316953459.39,
            disbursed: 261837368.2,
            signed: 347572951.18,
          },
          percValue: "82.61066741594337",
        },
      },
      {
        name: "ZWE",
        value: 239332539.01,
        formattedValue: "239,332,539 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "ZWE",
              count: 7,
              investment: 239332539.01,
            },
          ],
          totalInvestments: {
            committed: 262457633.93,
            disbursed: 239332539.01,
            signed: 286173571.22,
          },
          percValue: "91.189017985978",
        },
      },
      {
        name: "NER",
        value: 230521489.91,
        formattedValue: "230,521,490 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "NER",
              count: 6,
              investment: 230521489.91,
            },
          ],
          totalInvestments: {
            committed: 264261391.86,
            disbursed: 230521489.91,
            signed: 326455335.36,
          },
          percValue: "87.23237559882577",
        },
      },
      {
        name: "SSD",
        value: 230133339.71,
        formattedValue: "230,133,340 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SSD",
              count: 3,
              investment: 230133339.71,
            },
          ],
          totalInvestments: {
            committed: 233442134.71,
            disbursed: 230133339.71,
            signed: 233918694.99,
          },
          percValue: "98.58260591897411",
        },
      },
      {
        name: "IND",
        value: 227471242.08,
        formattedValue: "227,471,242 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "IND",
              count: 6,
              investment: 227471242.08,
            },
          ],
          totalInvestments: {
            committed: 256836039.27,
            disbursed: 227471242.08,
            signed: 315315386.92,
          },
          percValue: "88.56671467389741",
        },
      },
      {
        name: "TCD",
        value: 202150047.61,
        formattedValue: "202,150,048 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "TCD",
              count: 4,
              investment: 202150047.61,
            },
          ],
          totalInvestments: {
            committed: 202798108.2,
            disbursed: 202150047.61,
            signed: 206849781.31,
          },
          percValue: "99.68044051507577",
        },
      },
      {
        name: "BDI",
        value: 193417335.23,
        formattedValue: "193,417,335 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BDI",
              count: 8,
              investment: 193417335.23,
            },
          ],
          totalInvestments: {
            committed: 215404447.37,
            disbursed: 193417335.23,
            signed: 231125788.89,
          },
          percValue: "89.79263779905493",
        },
      },
      {
        name: "PNG",
        value: 169633103.5,
        formattedValue: "169,633,104 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "PNG",
              count: 7,
              investment: 169633103.5,
            },
          ],
          totalInvestments: {
            committed: 181300289.23,
            disbursed: 169633103.5,
            signed: 202964060.03,
          },
          percValue: "93.564717530484",
        },
      },
      {
        name: "GIN",
        value: 169405724.53,
        formattedValue: "169,405,725 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GIN",
              count: 4,
              investment: 169405724.53,
            },
          ],
          totalInvestments: {
            committed: 218446569.45,
            disbursed: 169405724.53,
            signed: 236952802.35,
          },
          percValue: "77.55018765299269",
        },
      },
      {
        name: "MLI",
        value: 166524804.82,
        formattedValue: "166,524,805 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MLI",
              count: 4,
              investment: 166524804.82,
            },
          ],
          totalInvestments: {
            committed: 170932632.99,
            disbursed: 166524804.82,
            signed: 172728735.71,
          },
          percValue: "97.42130680789438",
        },
      },
      {
        name: "SEN",
        value: 159863645.69,
        formattedValue: "159,863,646 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SEN",
              count: 7,
              investment: 159863645.69,
            },
          ],
          totalInvestments: {
            committed: 165197614.69,
            disbursed: 159863645.69,
            signed: 166609438.83,
          },
          percValue: "96.77115858482013",
        },
      },
      {
        name: "BEN",
        value: 150758747.35,
        formattedValue: "150,758,747 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BEN",
              count: 4,
              investment: 150758747.35,
            },
          ],
          totalInvestments: {
            committed: 153794924.28,
            disbursed: 150758747.35,
            signed: 157017540.34,
          },
          percValue: "98.02582761153266",
        },
      },
      {
        name: "TGO",
        value: 142542852.61,
        formattedValue: "142,542,853 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "TGO",
              count: 6,
              investment: 142542852.61,
            },
          ],
          totalInvestments: {
            committed: 160513085.69,
            disbursed: 142542852.61,
            signed: 204615766.68,
          },
          percValue: "88.80450587392855",
        },
      },
      {
        name: "LBR",
        value: 140600008.53,
        formattedValue: "140,600,009 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "LBR",
              count: 4,
              investment: 140600008.53,
            },
          ],
          totalInvestments: {
            committed: 147371923.78,
            disbursed: 140600008.53,
            signed: 147963001.39,
          },
          percValue: "95.4048810137613",
        },
      },
      {
        name: "SOM",
        value: 137572066.58,
        formattedValue: "137,572,067 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SOM",
              count: 4,
              investment: 137572066.58,
            },
          ],
          totalInvestments: {
            committed: 152149008.16,
            disbursed: 137572066.58,
            signed: 163225130.81,
          },
          percValue: "90.41929897783437",
        },
      },
      {
        name: "AGO",
        value: 136980459.33,
        formattedValue: "136,980,459 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "AGO",
              count: 4,
              investment: 136980459.33,
            },
          ],
          totalInvestments: {
            committed: 138480577.91,
            disbursed: 136980459.33,
            signed: 140225433.14,
          },
          percValue: "98.91672998290423",
        },
      },
      {
        name: "PAK",
        value: 135177866.05,
        formattedValue: "135,177,866 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "PAK",
              count: 6,
              investment: 135177866.05,
            },
          ],
          totalInvestments: {
            committed: 148799296.29,
            disbursed: 135177866.05,
            signed: 165384512.31,
          },
          percValue: "90.84576971825679",
        },
      },
      {
        name: "KHM",
        value: 134494653.83,
        formattedValue: "134,494,654 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "KHM",
              count: 6,
              investment: 134494653.83,
            },
          ],
          totalInvestments: {
            committed: 134494653.83,
            disbursed: 134494653.83,
            signed: 134494653.83,
          },
          percValue: "100",
        },
      },
      {
        name: "AFG",
        value: 132724229.67,
        formattedValue: "132,724,230 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "AFG",
              count: 7,
              investment: 132724229.67,
            },
          ],
          totalInvestments: {
            committed: 138019797.02,
            disbursed: 132724229.67,
            signed: 143247620.26,
          },
          percValue: "96.16318277208258",
        },
      },
      {
        name: "MMR",
        value: 127580525.05,
        formattedValue: "127,580,525 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MMR",
              count: 3,
              investment: 127580525.05,
            },
          ],
          totalInvestments: {
            committed: 127580525.05,
            disbursed: 127580525.05,
            signed: 127580525.05,
          },
          percValue: "100",
        },
      },
      {
        name: "BGD",
        value: 117187365.74,
        formattedValue: "117,187,366 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BGD",
              count: 4,
              investment: 117187365.74,
            },
          ],
          totalInvestments: {
            committed: 124136747.47,
            disbursed: 117187365.74,
            signed: 139246603.99,
          },
          percValue: "94.40183356529504",
        },
      },
      {
        name: "ERI",
        value: 115397528.44,
        formattedValue: "115,397,528 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "ERI",
              count: 4,
              investment: 115397528.44,
            },
          ],
          totalInvestments: {
            committed: 121024779.79,
            disbursed: 115397528.44,
            signed: 131529842.48,
          },
          percValue: "95.35033126293284",
        },
      },
      {
        name: "CHN",
        value: 113620575.87,
        formattedValue: "113,620,576 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "CHN",
              count: 5,
              investment: 113620575.87,
            },
          ],
          totalInvestments: {
            committed: 113620575.87,
            disbursed: 113620575.87,
            signed: 113620575.87,
          },
          percValue: "100",
        },
      },
      {
        name: "PHL",
        value: 107485152.13,
        formattedValue: "107,485,152 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "PHL",
              count: 5,
              investment: 107485152.13,
            },
          ],
          totalInvestments: {
            committed: 110671007.85,
            disbursed: 107485152.13,
            signed: 114010016.94,
          },
          percValue: "97.12132763413702",
        },
      },
      {
        name: "CAF",
        value: 101561359.2,
        formattedValue: "101,561,359 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "CAF",
              count: 5,
              investment: 101561359.2,
            },
          ],
          totalInvestments: {
            committed: 122429523.32,
            disbursed: 101561359.2,
            signed: 163637502.78,
          },
          percValue: "82.95495763268157",
        },
      },
      {
        name: "GMB",
        value: 97156838.88,
        formattedValue: "97,156,839 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GMB",
              count: 4,
              investment: 97156838.88,
            },
          ],
          totalInvestments: {
            committed: 99264904.39,
            disbursed: 97156838.88,
            signed: 99385413.53,
          },
          percValue: "97.87632343681342",
        },
      },
      {
        name: "QPA",
        value: 88919188.19,
        formattedValue: "88,919,188 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QPA",
              count: 4,
              investment: 88919188.19,
            },
          ],
          totalInvestments: {
            committed: 90049352.75,
            disbursed: 88919188.19,
            signed: 106354039.76,
          },
          percValue: "98.74494982419516",
        },
      },
      {
        name: "HTI",
        value: 87618958.72,
        formattedValue: "87,618,959 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "HTI",
              count: 4,
              investment: 87618958.72,
            },
          ],
          totalInvestments: {
            committed: 92941696.33,
            disbursed: 87618958.72,
            signed: 103461990.4,
          },
          percValue: "94.27303587068067",
        },
      },
      {
        name: "THA",
        value: 82983487.58,
        formattedValue: "82,983,488 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "THA",
              count: 3,
              investment: 82983487.58,
            },
          ],
          totalInvestments: {
            committed: 82983487.58,
            disbursed: 82983487.58,
            signed: 82983487.58,
          },
          percValue: "100",
        },
      },
      {
        name: "GNB",
        value: 77122506.16,
        formattedValue: "77,122,506 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GNB",
              count: 5,
              investment: 77122506.16,
            },
          ],
          totalInvestments: {
            committed: 86097266.04,
            disbursed: 77122506.16,
            signed: 96415216.96,
          },
          percValue: "89.57602222139037",
        },
      },
      {
        name: "SLE",
        value: 70265677.76,
        formattedValue: "70,265,678 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SLE",
              count: 4,
              investment: 70265677.76,
            },
          ],
          totalInvestments: {
            committed: 70265677.76,
            disbursed: 70265677.76,
            signed: 71258343.09,
          },
          percValue: "100",
        },
      },
      {
        name: "LAO",
        value: 63422642.75,
        formattedValue: "63,422,643 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "LAO",
              count: 5,
              investment: 63422642.75,
            },
          ],
          totalInvestments: {
            committed: 63422642.75,
            disbursed: 63422642.75,
            signed: 63422642.75,
          },
          percValue: "100",
        },
      },
      {
        name: "VNM",
        value: 62614867.42,
        formattedValue: "62,614,867 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "VNM",
              count: 3,
              investment: 62614867.42,
            },
          ],
          totalInvestments: {
            committed: 62614867.42,
            disbursed: 62614867.42,
            signed: 62614867.42,
          },
          percValue: "100",
        },
      },
      {
        name: "NPL",
        value: 48884234.74,
        formattedValue: "48,884,235 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "NPL",
              count: 7,
              investment: 48884234.74,
            },
          ],
          totalInvestments: {
            committed: 49996826.7,
            disbursed: 48884234.74,
            signed: 52810153.2,
          },
          percValue: "97.77467484751386",
        },
      },
      {
        name: "YEM",
        value: 47058789.22,
        formattedValue: "47,058,789 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "YEM",
              count: 3,
              investment: 47058789.22,
            },
          ],
          totalInvestments: {
            committed: 47058789.22,
            disbursed: 47058789.22,
            signed: 47058789.22,
          },
          percValue: "100",
        },
      },
      {
        name: "GTM",
        value: 41670507.11,
        formattedValue: "41,670,507 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GTM",
              count: 2,
              investment: 41670507.11,
            },
          ],
          totalInvestments: {
            committed: 43030302.31,
            disbursed: 41670507.11,
            signed: 43174212.3,
          },
          percValue: "96.8399125104822",
        },
      },
      {
        name: "LKA",
        value: 41198066.89,
        formattedValue: "41,198,067 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "LKA",
              count: 8,
              investment: 41198066.89,
            },
          ],
          totalInvestments: {
            committed: 41198066.89,
            disbursed: 41198066.89,
            signed: 42822944.89,
          },
          percValue: "100",
        },
      },
      {
        name: "QUA",
        value: 38076346.12,
        formattedValue: "38,076,346 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QUA",
              count: 4,
              investment: 38076346.12,
            },
          ],
          totalInvestments: {
            committed: 39078710.36,
            disbursed: 38076346.12,
            signed: 40205961.19,
          },
          percValue: "97.43501197770846",
        },
      },
      {
        name: "PRK",
        value: 35351832.71,
        formattedValue: "35,351,833 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "PRK",
              count: 2,
              investment: 35351832.71,
            },
          ],
          totalInvestments: {
            committed: 35351832.72,
            disbursed: 35351832.71,
            signed: 35351832.71,
          },
          percValue: "99.99999997171292",
        },
      },
      {
        name: "TLS",
        value: 34971477.11,
        formattedValue: "34,971,477 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "TLS",
              count: 3,
              investment: 34971477.11,
            },
          ],
          totalInvestments: {
            committed: 36538212.53,
            disbursed: 34971477.11,
            signed: 38770003.44,
          },
          percValue: "95.71206331258372",
        },
      },
      {
        name: "COG",
        value: 32588905.78,
        formattedValue: "32,588,906 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "COG",
              count: 3,
              investment: 32588905.78,
            },
          ],
          totalInvestments: {
            committed: 47708715.51,
            disbursed: 32588905.78,
            signed: 68608018.22,
          },
          percValue: "68.3080762741751",
        },
      },
      {
        name: "NIC",
        value: 32408340.65,
        formattedValue: "32,408,341 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "NIC",
              count: 4,
              investment: 32408340.65,
            },
          ],
          totalInvestments: {
            committed: 32660319.02,
            disbursed: 32408340.65,
            signed: 33205622.44,
          },
          percValue: "99.22848772589852",
        },
      },
      {
        name: "BOL",
        value: 32096908.84,
        formattedValue: "32,096,909 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BOL",
              count: 4,
              investment: 32096908.84,
            },
          ],
          totalInvestments: {
            committed: 32598473.24,
            disbursed: 32096908.84,
            signed: 32621022.73,
          },
          percValue: "98.46138683763706",
        },
      },
      {
        name: "NAM",
        value: 29571747.15,
        formattedValue: "29,571,747 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "NAM",
              count: 3,
              investment: 29571747.15,
            },
          ],
          totalInvestments: {
            committed: 29571747.15,
            disbursed: 29571747.15,
            signed: 29664494.69,
          },
          percValue: "100",
        },
      },
      {
        name: "COL",
        value: 27934986.96,
        formattedValue: "27,934,987 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "COL",
              count: 2,
              investment: 27934986.96,
            },
          ],
          totalInvestments: {
            committed: 27936467.07,
            disbursed: 27934986.96,
            signed: 27936467.07,
          },
          percValue: "99.99470187122698",
        },
      },
      {
        name: "IRN",
        value: 27041000.45,
        formattedValue: "27,041,000 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "IRN",
              count: 2,
              investment: 27041000.45,
            },
          ],
          totalInvestments: {
            committed: 27041000.45,
            disbursed: 27041000.45,
            signed: 27041000.45,
          },
          percValue: "100",
        },
      },
      {
        name: "QNB",
        value: 25367523.33,
        formattedValue: "25,367,523 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QNB",
              count: 4,
              investment: 25367523.33,
            },
          ],
          totalInvestments: {
            committed: 27921115.19,
            disbursed: 25367523.33,
            signed: 30053209.99,
          },
          percValue: "90.85426265167742",
        },
      },
      {
        name: "HND",
        value: 24873394.81,
        formattedValue: "24,873,395 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "HND",
              count: 3,
              investment: 24873394.81,
            },
          ],
          totalInvestments: {
            committed: 25901431.75,
            disbursed: 24873394.81,
            signed: 28060558.41,
          },
          percValue: "96.03096481336404",
        },
      },
      {
        name: "QRD",
        value: 23776914,
        formattedValue: "23,776,914 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QRD",
              count: 1,
              investment: 23776914,
            },
          ],
          totalInvestments: {
            committed: 23776914,
            disbursed: 23776914,
            signed: 23776914,
          },
          percValue: "100",
        },
      },
      {
        name: "COM",
        value: 22811935.3,
        formattedValue: "22,811,935 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "COM",
              count: 3,
              investment: 22811935.3,
            },
          ],
          totalInvestments: {
            committed: 23598293.97,
            disbursed: 22811935.3,
            signed: 24290007.09,
          },
          percValue: "96.66773084952803",
        },
      },
      {
        name: "GNQ",
        value: 22205169.87,
        formattedValue: "22,205,170 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GNQ",
              count: 1,
              investment: 22205169.87,
            },
          ],
          totalInvestments: {
            committed: 22205169.87,
            disbursed: 22205169.87,
            signed: 22205169.87,
          },
          percValue: "100",
        },
      },
      {
        name: "STP",
        value: 20736826.75,
        formattedValue: "20,736,827 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "STP",
              count: 3,
              investment: 20736826.75,
            },
          ],
          totalInvestments: {
            committed: 20736826.75,
            disbursed: 20736826.75,
            signed: 20736826.75,
          },
          percValue: "100",
        },
      },
      {
        name: "TJK",
        value: 18221982.64,
        formattedValue: "18,221,983 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "TJK",
              count: 2,
              investment: 18221982.64,
            },
          ],
          totalInvestments: {
            committed: 18221982.62,
            disbursed: 18221982.64,
            signed: 18221982.64,
          },
          percValue: "100.00000010975754",
        },
      },
      {
        name: "BRA",
        value: 17225846.72,
        formattedValue: "17,225,847 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BRA",
              count: 2,
              investment: 17225846.72,
            },
          ],
          totalInvestments: {
            committed: 17225846.71,
            disbursed: 17225846.72,
            signed: 17225846.72,
          },
          percValue: "100.0000000580523",
        },
      },
      {
        name: "GAB",
        value: 16567303.99,
        formattedValue: "16,567,304 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GAB",
              count: 3,
              investment: 16567303.99,
            },
          ],
          totalInvestments: {
            committed: 16566927.1,
            disbursed: 16567303.99,
            signed: 16567303.99,
          },
          percValue: "100.00227495417663",
        },
      },
      {
        name: "QRA",
        value: 15738873.6,
        formattedValue: "15,738,874 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "QRA",
              count: 2,
              investment: 15738873.6,
            },
          ],
          totalInvestments: {
            committed: 15738873.6,
            disbursed: 15738873.6,
            signed: 15738873.6,
          },
          percValue: "100",
        },
      },
      {
        name: "SWZ",
        value: 15168423.7,
        formattedValue: "15,168,424 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SWZ",
              count: 3,
              investment: 15168423.7,
            },
          ],
          totalInvestments: {
            committed: 15457885.28,
            disbursed: 15168423.7,
            signed: 16799383.89,
          },
          percValue: "98.12741798275269",
        },
      },
      {
        name: "MRT",
        value: 15153989.42,
        formattedValue: "15,153,989 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "MRT",
              count: 3,
              investment: 15153989.42,
            },
          ],
          totalInvestments: {
            committed: 15153989.42,
            disbursed: 15153989.42,
            signed: 15153989.42,
          },
          percValue: "100",
        },
      },
      {
        name: "SUR",
        value: 13761974.57,
        formattedValue: "13,761,975 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SUR",
              count: 3,
              investment: 13761974.57,
            },
          ],
          totalInvestments: {
            committed: 15147088.99,
            disbursed: 13761974.57,
            signed: 17020097.5,
          },
          percValue: "90.85557349722812",
        },
      },
      {
        name: "VEN",
        value: 12721755.4,
        formattedValue: "12,721,755 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "VEN",
              count: 1,
              investment: 12721755.4,
            },
          ],
          totalInvestments: {
            committed: 13390919.53,
            disbursed: 12721755.4,
            signed: 19800000,
          },
          percValue: "95.00285153307915",
        },
      },
      {
        name: "DJI",
        value: 12531655.32,
        formattedValue: "12,531,655 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "DJI",
              count: 2,
              investment: 12531655.32,
            },
          ],
          totalInvestments: {
            committed: 12531655.32,
            disbursed: 12531655.32,
            signed: 12531655.32,
          },
          percValue: "100",
        },
      },
      {
        name: "SLB",
        value: 8714975.72,
        formattedValue: "8,714,976 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SLB",
              count: 1,
              investment: 8714975.72,
            },
          ],
          totalInvestments: {
            committed: 10973031.53,
            disbursed: 8714975.72,
            signed: 16843713.28,
          },
          percValue: "79.42176868965947",
        },
      },
      {
        name: "BTN",
        value: 8589696.81,
        formattedValue: "8,589,697 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BTN",
              count: 3,
              investment: 8589696.81,
            },
          ],
          totalInvestments: {
            committed: 8635056.51,
            disbursed: 8589696.81,
            signed: 10108708.12,
          },
          percValue: "99.47470291656494",
        },
      },
      {
        name: "ECU",
        value: 7858627.99,
        formattedValue: "7,858,628 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "ECU",
              count: 2,
              investment: 7858627.99,
            },
          ],
          totalInvestments: {
            committed: 7858627.99,
            disbursed: 7858627.99,
            signed: 7858627.99,
          },
          percValue: "100",
        },
      },
      {
        name: "DOM",
        value: 7143689.54,
        formattedValue: "7,143,690 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "DOM",
              count: 2,
              investment: 7143689.54,
            },
          ],
          totalInvestments: {
            committed: 7143689.54,
            disbursed: 7143689.54,
            signed: 7143689.54,
          },
          percValue: "100",
        },
      },
      {
        name: "KGZ",
        value: 6386455.84,
        formattedValue: "6,386,456 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "KGZ",
              count: 3,
              investment: 6386455.84,
            },
          ],
          totalInvestments: {
            committed: 6386455.84,
            disbursed: 6386455.84,
            signed: 6386455.84,
          },
          percValue: "100",
        },
      },
      {
        name: "GUY",
        value: 6154191.24,
        formattedValue: "6,154,191 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GUY",
              count: 3,
              investment: 6154191.24,
            },
          ],
          totalInvestments: {
            committed: 6598250.43,
            disbursed: 6154191.24,
            signed: 6820648.49,
          },
          percValue: "93.27004643562763",
        },
      },
      {
        name: "AZE",
        value: 5474039.39,
        formattedValue: "5,474,039 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "AZE",
              count: 1,
              investment: 5474039.39,
            },
          ],
          totalInvestments: {
            committed: 5474039.38,
            disbursed: 5474039.39,
            signed: 5474039.38,
          },
          percValue: "100.00000018268045",
        },
      },
      {
        name: "BWA",
        value: 5323403.68,
        formattedValue: "5,323,404 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "BWA",
              count: 1,
              investment: 5323403.68,
            },
          ],
          totalInvestments: {
            committed: 5376892.68,
            disbursed: 5323403.68,
            signed: 5655982.69,
          },
          percValue: "99.00520610725674",
        },
      },
      {
        name: "UZB",
        value: 5163039.82,
        formattedValue: "5,163,040 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "UZB",
              count: 3,
              investment: 5163039.82,
            },
          ],
          totalInvestments: {
            committed: 5163039.82,
            disbursed: 5163039.82,
            signed: 5163039.82,
          },
          percValue: "100",
        },
      },
      {
        name: "GEO",
        value: 3500709.8,
        formattedValue: "3,500,710 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "GEO",
              count: 3,
              investment: 3500709.8,
            },
          ],
          totalInvestments: {
            committed: 3500709.8,
            disbursed: 3500709.8,
            signed: 3500709.8,
          },
          percValue: "100",
        },
      },
      {
        name: "PRY",
        value: 2782935.98,
        formattedValue: "2,782,936 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "PRY",
              count: 1,
              investment: 2782935.98,
            },
          ],
          totalInvestments: {
            committed: 2782935.98,
            disbursed: 2782935.98,
            signed: 2782935.98,
          },
          percValue: "100",
        },
      },
      {
        name: "CPV",
        value: 2017807.24,
        formattedValue: "2,017,807 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "CPV",
              count: 2,
              investment: 2017807.24,
            },
          ],
          totalInvestments: {
            committed: 2040529.47,
            disbursed: 2017807.24,
            signed: 2040529.47,
          },
          percValue: "98.88645421033787",
        },
      },
      {
        name: "SLV",
        value: 1855321.47,
        formattedValue: "1,855,321 USD",
        color: "#70777E",
        tooltip: {
          header: "Malaria",
          componentsStats: [
            {
              name: "SLV",
              count: 1,
              investment: 1855321.47,
            },
          ],
          totalInvestments: {
            committed: 1855321.47,
            disbursed: 1855321.47,
            signed: 1855321.47,
          },
          percValue: "100",
        },
      },
    ],
    tooltip: {
      header: "Malaria",
      componentsStats: [
        {
          name: "Malaria",
          count: 377,
          investment: 14493002457.729996,
        },
      ],
      totalInvestments: {
        committed: 15649339082.819994,
        disbursed: 14493002457.729996,
        signed: 17769498463.409992,
      },
      percValue: "92.61095552361418",
    },
  },
  {
    name: "Tuberculosis",
    color: "#DFE3E5",
    value: 7685843178.23,
    formattedValue: "7,685,843,178 USD",
    _children: [
      {
        name: "IND",
        value: 893485329.9,
        formattedValue: "893,485,330 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "IND",
              count: 14,
              investment: 893485329.9,
            },
          ],
          totalInvestments: {
            committed: 977275924.91,
            disbursed: 893485329.9,
            signed: 1216378785.19,
          },
          percValue: "91.42610670392638",
        },
      },
      {
        name: "PAK",
        value: 433024986.01,
        formattedValue: "433,024,986 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PAK",
              count: 11,
              investment: 433024986.01,
            },
          ],
          totalInvestments: {
            committed: 439635158.14,
            disbursed: 433024986.01,
            signed: 464379392.95,
          },
          percValue: "98.49644142248172",
        },
      },
      {
        name: "IDN",
        value: 406719761.76,
        formattedValue: "406,719,762 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "IDN",
              count: 8,
              investment: 406719761.76,
            },
          ],
          totalInvestments: {
            committed: 482279321.27,
            disbursed: 406719761.76,
            signed: 553608084.08,
          },
          percValue: "84.33282204365992",
        },
      },
      {
        name: "BGD",
        value: 382144082.89,
        formattedValue: "382,144,083 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BGD",
              count: 8,
              investment: 382144082.89,
            },
          ],
          totalInvestments: {
            committed: 453115644.79,
            disbursed: 382144082.89,
            signed: 503529091.95,
          },
          percValue: "84.33698709897948",
        },
      },
      {
        name: "CHN",
        value: 365410218,
        formattedValue: "365,410,218 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "CHN",
              count: 6,
              investment: 365410218,
            },
          ],
          totalInvestments: {
            committed: 365410217.99,
            disbursed: 365410218,
            signed: 365410218,
          },
          percValue: "100.00000000273664",
        },
      },
      {
        name: "NGA",
        value: 362063311.23,
        formattedValue: "362,063,311 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "NGA",
              count: 6,
              investment: 362063311.23,
            },
          ],
          totalInvestments: {
            committed: 421577275.26,
            disbursed: 362063311.23,
            signed: 520378527.01,
          },
          percValue: "85.88302370110063",
        },
      },
      {
        name: "PHL",
        value: 357323750.66,
        formattedValue: "357,323,751 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PHL",
              count: 4,
              investment: 357323750.66,
            },
          ],
          totalInvestments: {
            committed: 402523363.42,
            disbursed: 357323750.66,
            signed: 464388539.9,
          },
          percValue: "88.77093434379411",
        },
      },
      {
        name: "MMR",
        value: 242324526.97,
        formattedValue: "242,324,527 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MMR",
              count: 3,
              investment: 242324526.97,
            },
          ],
          totalInvestments: {
            committed: 285012494.97,
            disbursed: 242324526.97,
            signed: 331222865.53,
          },
          percValue: "85.02242226099831",
        },
      },
      {
        name: "ETH",
        value: 209872322.86,
        formattedValue: "209,872,323 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ETH",
              count: 3,
              investment: 209872322.86,
            },
          ],
          totalInvestments: {
            committed: 210075600.63,
            disbursed: 209872322.86,
            signed: 266969336.63,
          },
          percValue: "99.90323589727204",
        },
      },
      {
        name: "KEN",
        value: 175236985.17,
        formattedValue: "175,236,985 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "KEN",
              count: 5,
              investment: 175236985.17,
            },
          ],
          totalInvestments: {
            committed: 186256579.18,
            disbursed: 175236985.17,
            signed: 195463224.45,
          },
          percValue: "94.08364844962037",
        },
      },
      {
        name: "VNM",
        value: 153803737.35,
        formattedValue: "153,803,737 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "VNM",
              count: 4,
              investment: 153803737.35,
            },
          ],
          totalInvestments: {
            committed: 187982619.66,
            disbursed: 153803737.35,
            signed: 213174063.31,
          },
          percValue: "81.81806255715631",
        },
      },
      {
        name: "COD",
        value: 147827412.47,
        formattedValue: "147,827,412 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "COD",
              count: 7,
              investment: 147827412.47,
            },
          ],
          totalInvestments: {
            committed: 156630141.62,
            disbursed: 147827412.47,
            signed: 161863502.71,
          },
          percValue: "94.37992645671208",
        },
      },
      {
        name: "ZWE",
        value: 115242222.97,
        formattedValue: "115,242,223 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ZWE",
              count: 4,
              investment: 115242222.97,
            },
          ],
          totalInvestments: {
            committed: 128683526.59,
            disbursed: 115242222.97,
            signed: 139566662.65,
          },
          percValue: "89.55475966801447",
        },
      },
      {
        name: "RWA",
        value: 114798945,
        formattedValue: "114,798,945 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RWA",
              count: 3,
              investment: 114798945,
            },
          ],
          totalInvestments: {
            committed: 116325855,
            disbursed: 114798945,
            signed: 116325855,
          },
          percValue: "98.68738553436809",
        },
      },
      {
        name: "SOM",
        value: 112262784.93,
        formattedValue: "112,262,785 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SOM",
              count: 3,
              investment: 112262784.93,
            },
          ],
          totalInvestments: {
            committed: 124280117.88,
            disbursed: 112262784.93,
            signed: 138177821.2,
          },
          percValue: "90.33044612847611",
        },
      },
      {
        name: "RUS",
        value: 106558269.75,
        formattedValue: "106,558,270 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "RUS",
              count: 2,
              investment: 106558269.75,
            },
          ],
          totalInvestments: {
            committed: 106558269.74,
            disbursed: 106558269.75,
            signed: 106558269.75,
          },
          percValue: "100.00000000938454",
        },
      },
      {
        name: "TZA",
        value: 99405795.71,
        formattedValue: "99,405,796 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TZA",
              count: 2,
              investment: 99405795.71,
            },
          ],
          totalInvestments: {
            committed: 105732097.6,
            disbursed: 99405795.71,
            signed: 133274877.61,
          },
          percValue: "94.01666851069831",
        },
      },
      {
        name: "UZB",
        value: 98361010.16,
        formattedValue: "98,361,010 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "UZB",
              count: 4,
              investment: 98361010.16,
            },
          ],
          totalInvestments: {
            committed: 98430445.66,
            disbursed: 98361010.16,
            signed: 99322122.82,
          },
          percValue: "99.92945729389477",
        },
      },
      {
        name: "MOZ",
        value: 96330527.04,
        formattedValue: "96,330,527 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MOZ",
              count: 3,
              investment: 96330527.04,
            },
          ],
          totalInvestments: {
            committed: 128528193.43,
            disbursed: 96330527.04,
            signed: 144051182.63,
          },
          percValue: "74.94894658459839",
        },
      },
      {
        name: "KAZ",
        value: 90414449.53,
        formattedValue: "90,414,450 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "KAZ",
              count: 4,
              investment: 90414449.53,
            },
          ],
          totalInvestments: {
            committed: 91457863.48,
            disbursed: 90414449.53,
            signed: 93616205.74,
          },
          percValue: "98.85913150570352",
        },
      },
      {
        name: "PER",
        value: 89194254.4,
        formattedValue: "89,194,254 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PER",
              count: 5,
              investment: 89194254.4,
            },
          ],
          totalInvestments: {
            committed: 89265262.96,
            disbursed: 89194254.4,
            signed: 91046018.71,
          },
          percValue: "99.92045219198893",
        },
      },
      {
        name: "SDN",
        value: 88253333.35,
        formattedValue: "88,253,333 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SDN",
              count: 4,
              investment: 88253333.35,
            },
          ],
          totalInvestments: {
            committed: 91400309.35,
            disbursed: 88253333.35,
            signed: 99874609.02,
          },
          percValue: "96.55693069051961",
        },
      },
      {
        name: "TJK",
        value: 85556768.31,
        formattedValue: "85,556,768 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TJK",
              count: 5,
              investment: 85556768.31,
            },
          ],
          totalInvestments: {
            committed: 85556768.31,
            disbursed: 85556768.31,
            signed: 85689840.81,
          },
          percValue: "100",
        },
      },
      {
        name: "GHA",
        value: 85224608.61,
        formattedValue: "85,224,609 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GHA",
              count: 3,
              investment: 85224608.61,
            },
          ],
          totalInvestments: {
            committed: 85224608.61,
            disbursed: 85224608.61,
            signed: 85224608.61,
          },
          percValue: "100",
        },
      },
      {
        name: "SSD",
        value: 79596125.5,
        formattedValue: "79,596,126 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SSD",
              count: 4,
              investment: 79596125.5,
            },
          ],
          totalInvestments: {
            committed: 79596125.5,
            disbursed: 79596125.5,
            signed: 79596125.54,
          },
          percValue: "100",
        },
      },
      {
        name: "NPL",
        value: 75941802.93,
        formattedValue: "75,941,803 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "NPL",
              count: 4,
              investment: 75941802.93,
            },
          ],
          totalInvestments: {
            committed: 83964471.63,
            disbursed: 75941802.93,
            signed: 95065266.9,
          },
          percValue: "90.44516264527587",
        },
      },
      {
        name: "UGA",
        value: 74718676.4,
        formattedValue: "74,718,676 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "UGA",
              count: 3,
              investment: 74718676.4,
            },
          ],
          totalInvestments: {
            committed: 89165894.96,
            disbursed: 74718676.4,
            signed: 101759738.71,
          },
          percValue: "83.79737166718168",
        },
      },
      {
        name: "PRK",
        value: 68972576.84,
        formattedValue: "68,972,577 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PRK",
              count: 2,
              investment: 68972576.84,
            },
          ],
          totalInvestments: {
            committed: 68972576.84,
            disbursed: 68972576.84,
            signed: 68972576.84,
          },
          percValue: "100",
        },
      },
      {
        name: "AFG",
        value: 66531536.56,
        formattedValue: "66,531,537 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "AFG",
              count: 6,
              investment: 66531536.56,
            },
          ],
          totalInvestments: {
            committed: 78083194.32,
            disbursed: 66531536.56,
            signed: 90854656.36,
          },
          percValue: "85.20596158930297",
        },
      },
      {
        name: "NER",
        value: 62717307.46,
        formattedValue: "62,717,307 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "NER",
              count: 4,
              investment: 62717307.46,
            },
          ],
          totalInvestments: {
            committed: 64725052.73,
            disbursed: 62717307.46,
            signed: 69410958.61,
          },
          percValue: "96.8980399624002",
        },
      },
      {
        name: "QPA",
        value: 60469222.05,
        formattedValue: "60,469,222 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QPA",
              count: 3,
              investment: 60469222.05,
            },
          ],
          totalInvestments: {
            committed: 63762213.17,
            disbursed: 60469222.05,
            signed: 67816841.63,
          },
          percValue: "94.83551314127008",
        },
      },
      {
        name: "UKR",
        value: 60065489.01,
        formattedValue: "60,065,489 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "UKR",
              count: 2,
              investment: 60065489.01,
            },
          ],
          totalInvestments: {
            committed: 60065489.01,
            disbursed: 60065489.01,
            signed: 60065489.01,
          },
          percValue: "100",
        },
      },
      {
        name: "THA",
        value: 58962474.71,
        formattedValue: "58,962,475 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "THA",
              count: 5,
              investment: 58962474.71,
            },
          ],
          totalInvestments: {
            committed: 58962474.71,
            disbursed: 58962474.71,
            signed: 58962474.71,
          },
          percValue: "100",
        },
      },
      {
        name: "CIV",
        value: 58257272.01,
        formattedValue: "58,257,272 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "CIV",
              count: 5,
              investment: 58257272.01,
            },
          ],
          totalInvestments: {
            committed: 64794299.03,
            disbursed: 58257272.01,
            signed: 74298391.76,
          },
          percValue: "89.91110773962794",
        },
      },
      {
        name: "MDA",
        value: 57708741.85,
        formattedValue: "57,708,742 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MDA",
              count: 6,
              investment: 57708741.85,
            },
          ],
          totalInvestments: {
            committed: 57894500.27,
            disbursed: 57708741.85,
            signed: 57878207.78,
          },
          percValue: "99.67914323617323",
        },
      },
      {
        name: "AZE",
        value: 55443116.07,
        formattedValue: "55,443,116 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "AZE",
              count: 4,
              investment: 55443116.07,
            },
          ],
          totalInvestments: {
            committed: 55445420.51,
            disbursed: 55443116.07,
            signed: 55469323.07,
          },
          percValue: "99.9958437685587",
        },
      },
      {
        name: "GEO",
        value: 52755662.37,
        formattedValue: "52,755,662 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GEO",
              count: 6,
              investment: 52755662.37,
            },
          ],
          totalInvestments: {
            committed: 54254600.6,
            disbursed: 52755662.37,
            signed: 56083092.03,
          },
          percValue: "97.23721451559261",
        },
      },
      {
        name: "KHM",
        value: 49915648.24,
        formattedValue: "49,915,648 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "KHM",
              count: 4,
              investment: 49915648.24,
            },
          ],
          totalInvestments: {
            committed: 49915648.24,
            disbursed: 49915648.24,
            signed: 49915648.24,
          },
          percValue: "100",
        },
      },
      {
        name: "ZMB",
        value: 48422526.21,
        formattedValue: "48,422,526 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ZMB",
              count: 7,
              investment: 48422526.21,
            },
          ],
          totalInvestments: {
            committed: 48422526.21,
            disbursed: 48422526.21,
            signed: 48422526.21,
          },
          percValue: "100",
        },
      },
      {
        name: "BLR",
        value: 47313159.94,
        formattedValue: "47,313,160 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BLR",
              count: 3,
              investment: 47313159.94,
            },
          ],
          totalInvestments: {
            committed: 47313159.94,
            disbursed: 47313159.94,
            signed: 47313159.94,
          },
          percValue: "100",
        },
      },
      {
        name: "BFA",
        value: 46695205.6,
        formattedValue: "46,695,206 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BFA",
              count: 5,
              investment: 46695205.6,
            },
          ],
          totalInvestments: {
            committed: 53290933.16,
            disbursed: 46695205.6,
            signed: 57932088.41,
          },
          percValue: "87.62317120588399",
        },
      },
      {
        name: "IRQ",
        value: 45815374.65,
        formattedValue: "45,815,375 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "IRQ",
              count: 3,
              investment: 45815374.65,
            },
          ],
          totalInvestments: {
            committed: 45815374.65,
            disbursed: 45815374.65,
            signed: 45815374.65,
          },
          percValue: "100",
        },
      },
      {
        name: "ROU",
        value: 44131443.55,
        formattedValue: "44,131,444 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ROU",
              count: 4,
              investment: 44131443.55,
            },
          ],
          totalInvestments: {
            committed: 43914312.03,
            disbursed: 44131443.55,
            signed: 44235735.36,
          },
          percValue: "100.49444363343702",
        },
      },
      {
        name: "PNG",
        value: 43635791.63,
        formattedValue: "43,635,792 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PNG",
              count: 3,
              investment: 43635791.63,
            },
          ],
          totalInvestments: {
            committed: 43635791.63,
            disbursed: 43635791.63,
            signed: 43635791.63,
          },
          percValue: "100",
        },
      },
      {
        name: "NAM",
        value: 39647823.96,
        formattedValue: "39,647,824 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "NAM",
              count: 3,
              investment: 39647823.96,
            },
          ],
          totalInvestments: {
            committed: 39647823.96,
            disbursed: 39647823.96,
            signed: 39647823.96,
          },
          percValue: "100",
        },
      },
      {
        name: "LAO",
        value: 38768543.14,
        formattedValue: "38,768,543 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "LAO",
              count: 4,
              investment: 38768543.14,
            },
          ],
          totalInvestments: {
            committed: 38777415.64,
            disbursed: 38768543.14,
            signed: 38909110.01,
          },
          percValue: "99.97711941383002",
        },
      },
      {
        name: "KGZ",
        value: 38182464.65,
        formattedValue: "38,182,465 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "KGZ",
              count: 4,
              investment: 38182464.65,
            },
          ],
          totalInvestments: {
            committed: 38182464.65,
            disbursed: 38182464.65,
            signed: 38182464.65,
          },
          percValue: "100",
        },
      },
      {
        name: "MDG",
        value: 38167078.21,
        formattedValue: "38,167,078 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MDG",
              count: 5,
              investment: 38167078.21,
            },
          ],
          totalInvestments: {
            committed: 44315598.21,
            disbursed: 38167078.21,
            signed: 50359909.27,
          },
          percValue: "86.12560757757623",
        },
      },
      {
        name: "MNG",
        value: 37340209.83,
        formattedValue: "37,340,210 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MNG",
              count: 3,
              investment: 37340209.83,
            },
          ],
          totalInvestments: {
            committed: 38680333.54,
            disbursed: 37340209.83,
            signed: 39069179.67,
          },
          percValue: "96.53538739883369",
        },
      },
      {
        name: "SWZ",
        value: 35593268.38,
        formattedValue: "35,593,268 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SWZ",
              count: 3,
              investment: 35593268.38,
            },
          ],
          totalInvestments: {
            committed: 35593268.38,
            disbursed: 35593268.38,
            signed: 35593268.38,
          },
          percValue: "100",
        },
      },
      {
        name: "CMR",
        value: 35283438.33,
        formattedValue: "35,283,438 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "CMR",
              count: 3,
              investment: 35283438.33,
            },
          ],
          totalInvestments: {
            committed: 46420839.63,
            disbursed: 35283438.33,
            signed: 55426433.63,
          },
          percValue: "76.0077555925931",
        },
      },
      {
        name: "DOM",
        value: 34569012.11,
        formattedValue: "34,569,012 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "DOM",
              count: 5,
              investment: 34569012.11,
            },
          ],
          totalInvestments: {
            committed: 34695037.06,
            disbursed: 34569012.11,
            signed: 35720447.96,
          },
          percValue: "99.63676375447572",
        },
      },
      {
        name: "HTI",
        value: 34531944.88,
        formattedValue: "34,531,945 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "HTI",
              count: 2,
              investment: 34531944.88,
            },
          ],
          totalInvestments: {
            committed: 34531944.88,
            disbursed: 34531944.88,
            signed: 34531944.88,
          },
          percValue: "100",
        },
      },
      {
        name: "AGO",
        value: 34237455.05,
        formattedValue: "34,237,455 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "AGO",
              count: 3,
              investment: 34237455.05,
            },
          ],
          totalInvestments: {
            committed: 34237455.05,
            disbursed: 34237455.05,
            signed: 39702091.45,
          },
          percValue: "100",
        },
      },
      {
        name: "BEN",
        value: 33314242.24,
        formattedValue: "33,314,242 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BEN",
              count: 3,
              investment: 33314242.24,
            },
          ],
          totalInvestments: {
            committed: 36972198.65,
            disbursed: 33314242.24,
            signed: 40405617.6,
          },
          percValue: "90.10619724126144",
        },
      },
      {
        name: "BGR",
        value: 31094994.46,
        formattedValue: "31,094,994 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BGR",
              count: 3,
              investment: 31094994.46,
            },
          ],
          totalInvestments: {
            committed: 31257688.74,
            disbursed: 31094994.46,
            signed: 31257688.77,
          },
          percValue: "99.47950636608714",
        },
      },
      {
        name: "TKM",
        value: 27991552.41,
        formattedValue: "27,991,552 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TKM",
              count: 2,
              investment: 27991552.41,
            },
          ],
          totalInvestments: {
            committed: 31739514.96,
            disbursed: 27991552.41,
            signed: 33114956.19,
          },
          percValue: "88.19149393201691",
        },
      },
      {
        name: "ERI",
        value: 27173020.61,
        formattedValue: "27,173,021 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ERI",
              count: 2,
              investment: 27173020.61,
            },
          ],
          totalInvestments: {
            committed: 29077386.64,
            disbursed: 27173020.61,
            signed: 31348719.94,
          },
          percValue: "93.45069743172765",
        },
      },
      {
        name: "ARM",
        value: 26674232.76,
        formattedValue: "26,674,233 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ARM",
              count: 3,
              investment: 26674232.76,
            },
          ],
          totalInvestments: {
            committed: 26794665.81,
            disbursed: 26674232.76,
            signed: 26794665.82,
          },
          percValue: "99.55053348732174",
        },
      },
      {
        name: "SEN",
        value: 26396004.47,
        formattedValue: "26,396,004 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SEN",
              count: 3,
              investment: 26396004.47,
            },
          ],
          totalInvestments: {
            committed: 26905415.08,
            disbursed: 26396004.47,
            signed: 26905415.07,
          },
          percValue: "98.10666139702612",
        },
      },
      {
        name: "BOL",
        value: 25510427.25,
        formattedValue: "25,510,427 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BOL",
              count: 5,
              investment: 25510427.25,
            },
          ],
          totalInvestments: {
            committed: 26969718.81,
            disbursed: 25510427.25,
            signed: 28152738.03,
          },
          percValue: "94.58914803568915",
        },
      },
      {
        name: "SLV",
        value: 23986808.27,
        formattedValue: "23,986,808 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SLV",
              count: 5,
              investment: 23986808.27,
            },
          ],
          totalInvestments: {
            committed: 23986808.27,
            disbursed: 23986808.27,
            signed: 24103473.78,
          },
          percValue: "100",
        },
      },
      {
        name: "MLI",
        value: 23397377.48,
        formattedValue: "23,397,377 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MLI",
              count: 4,
              investment: 23397377.48,
            },
          ],
          totalInvestments: {
            committed: 24420298.57,
            disbursed: 23397377.48,
            signed: 24598132.61,
          },
          percValue: "95.81118516193473",
        },
      },
      {
        name: "LKA",
        value: 23268064.9,
        formattedValue: "23,268,065 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "LKA",
              count: 5,
              investment: 23268064.9,
            },
          ],
          totalInvestments: {
            committed: 23588863.59,
            disbursed: 23268064.9,
            signed: 23899563.8,
          },
          percValue: "98.64004177744283",
        },
      },
      {
        name: "LBR",
        value: 22463624.2,
        formattedValue: "22,463,624 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "LBR",
              count: 3,
              investment: 22463624.2,
            },
          ],
          totalInvestments: {
            committed: 22463624.2,
            disbursed: 22463624.2,
            signed: 22463624.2,
          },
          percValue: "100",
        },
      },
      {
        name: "ECU",
        value: 22254783.17,
        formattedValue: "22,254,783 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ECU",
              count: 3,
              investment: 22254783.17,
            },
          ],
          totalInvestments: {
            committed: 22254783.17,
            disbursed: 22254783.17,
            signed: 22254783.17,
          },
          percValue: "99.99999999999999",
        },
      },
      {
        name: "NIC",
        value: 21704916.31,
        formattedValue: "21,704,916 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "NIC",
              count: 4,
              investment: 21704916.31,
            },
          ],
          totalInvestments: {
            committed: 22500849.02,
            disbursed: 21704916.31,
            signed: 23611805.59,
          },
          percValue: "96.46265476785996",
        },
      },
      {
        name: "BRA",
        value: 21348358.64,
        formattedValue: "21,348,359 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BRA",
              count: 2,
              investment: 21348358.64,
            },
          ],
          totalInvestments: {
            committed: 21348358.64,
            disbursed: 21348358.64,
            signed: 21348358.64,
          },
          percValue: "100",
        },
      },
      {
        name: "PRY",
        value: 21219481.38,
        formattedValue: "21,219,481 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PRY",
              count: 3,
              investment: 21219481.38,
            },
          ],
          totalInvestments: {
            committed: 21682246.57,
            disbursed: 21219481.38,
            signed: 22435195.01,
          },
          percValue: "97.86569538121437",
        },
      },
      {
        name: "GMB",
        value: 21094780.47,
        formattedValue: "21,094,780 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GMB",
              count: 3,
              investment: 21094780.47,
            },
          ],
          totalInvestments: {
            committed: 21094780.47,
            disbursed: 21094780.47,
            signed: 21094780.47,
          },
          percValue: "100",
        },
      },
      {
        name: "BIH",
        value: 20131147.53,
        formattedValue: "20,131,148 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BIH",
              count: 2,
              investment: 20131147.53,
            },
          ],
          totalInvestments: {
            committed: 20131147.53,
            disbursed: 20131147.53,
            signed: 20131147.53,
          },
          percValue: "100",
        },
      },
      {
        name: "BDI",
        value: 19677168.04,
        formattedValue: "19,677,168 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BDI",
              count: 3,
              investment: 19677168.04,
            },
          ],
          totalInvestments: {
            committed: 19677168.04,
            disbursed: 19677168.04,
            signed: 19677168.04,
          },
          percValue: "100",
        },
      },
      {
        name: "IRN",
        value: 18585342.94,
        formattedValue: "18,585,343 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "IRN",
              count: 1,
              investment: 18585342.94,
            },
          ],
          totalInvestments: {
            committed: 18585342.94,
            disbursed: 18585342.94,
            signed: 18585342.94,
          },
          percValue: "100",
        },
      },
      {
        name: "TLS",
        value: 17886969.41,
        formattedValue: "17,886,969 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TLS",
              count: 2,
              investment: 17886969.41,
            },
          ],
          totalInvestments: {
            committed: 21383180.5,
            disbursed: 17886969.41,
            signed: 24923840.65,
          },
          percValue: "83.64971436311825",
        },
      },
      {
        name: "LSO",
        value: 16592135.27,
        formattedValue: "16,592,135 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "LSO",
              count: 3,
              investment: 16592135.27,
            },
          ],
          totalInvestments: {
            committed: 16592135.27,
            disbursed: 16592135.27,
            signed: 16592135.27,
          },
          percValue: "100",
        },
      },
      {
        name: "YEM",
        value: 16390144.03,
        formattedValue: "16,390,144 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "YEM",
              count: 2,
              investment: 16390144.03,
            },
          ],
          totalInvestments: {
            committed: 16390144.03,
            disbursed: 16390144.03,
            signed: 16390144.03,
          },
          percValue: "100",
        },
      },
      {
        name: "GIN",
        value: 16135780.61,
        formattedValue: "16,135,781 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GIN",
              count: 4,
              investment: 16135780.61,
            },
          ],
          totalInvestments: {
            committed: 16135780.62,
            disbursed: 16135780.61,
            signed: 16135780.61,
          },
          percValue: "99.99999993802594",
        },
      },
      {
        name: "TCD",
        value: 16115138.23,
        formattedValue: "16,115,138 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TCD",
              count: 4,
              investment: 16115138.23,
            },
          ],
          totalInvestments: {
            committed: 16615747.86,
            disbursed: 16115138.23,
            signed: 17050927.1,
          },
          percValue: "96.98713753832806",
        },
      },
      {
        name: "HND",
        value: 15830986.31,
        formattedValue: "15,830,986 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "HND",
              count: 2,
              investment: 15830986.31,
            },
          ],
          totalInvestments: {
            committed: 15830986.31,
            disbursed: 15830986.31,
            signed: 15830986.31,
          },
          percValue: "100",
        },
      },
      {
        name: "SLE",
        value: 15214215.44,
        formattedValue: "15,214,215 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SLE",
              count: 2,
              investment: 15214215.44,
            },
          ],
          totalInvestments: {
            committed: 15214215.44,
            disbursed: 15214215.44,
            signed: 15214215.44,
          },
          percValue: "100",
        },
      },
      {
        name: "QUA",
        value: 14887840.47,
        formattedValue: "14,887,840 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QUA",
              count: 2,
              investment: 14887840.47,
            },
          ],
          totalInvestments: {
            committed: 14887840.47,
            disbursed: 14887840.47,
            signed: 14887840.47,
          },
          percValue: "100",
        },
      },
      {
        name: "GNB",
        value: 14833137.31,
        formattedValue: "14,833,137 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GNB",
              count: 5,
              investment: 14833137.31,
            },
          ],
          totalInvestments: {
            committed: 15400527.18,
            disbursed: 14833137.31,
            signed: 15400527.18,
          },
          percValue: "96.31577631487288",
        },
      },
      {
        name: "TGO",
        value: 13826707.28,
        formattedValue: "13,826,707 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TGO",
              count: 4,
              investment: 13826707.28,
            },
          ],
          totalInvestments: {
            committed: 14151798.54,
            disbursed: 13826707.28,
            signed: 17267123.17,
          },
          percValue: "97.7028272478503",
        },
      },
      {
        name: "GTM",
        value: 13816584.95,
        formattedValue: "13,816,585 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GTM",
              count: 3,
              investment: 13816584.95,
            },
          ],
          totalInvestments: {
            committed: 15453752.6,
            disbursed: 13816584.95,
            signed: 17059247.32,
          },
          percValue: "89.4060187685417",
        },
      },
      {
        name: "EGY",
        value: 13667350.7,
        formattedValue: "13,667,351 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "EGY",
              count: 2,
              investment: 13667350.7,
            },
          ],
          totalInvestments: {
            committed: 13667350.7,
            disbursed: 13667350.7,
            signed: 13667350.7,
          },
          percValue: "100",
        },
      },
      {
        name: "MAR",
        value: 12604444.38,
        formattedValue: "12,604,444 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MAR",
              count: 3,
              investment: 12604444.38,
            },
          ],
          totalInvestments: {
            committed: 12758600.97,
            disbursed: 12604444.38,
            signed: 12869944.42,
          },
          percValue: "98.79174377847166",
        },
      },
      {
        name: "FJI",
        value: 11573365.31,
        formattedValue: "11,573,365 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "FJI",
              count: 1,
              investment: 11573365.31,
            },
          ],
          totalInvestments: {
            committed: 11573365.31,
            disbursed: 11573365.31,
            signed: 11573365.31,
          },
          percValue: "100",
        },
      },
      {
        name: "QNA",
        value: 11525073.95,
        formattedValue: "11,525,074 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QNA",
              count: 3,
              investment: 11525073.95,
            },
          ],
          totalInvestments: {
            committed: 11525321.39,
            disbursed: 11525073.95,
            signed: 11696456.7,
          },
          percValue: "99.99785307505424",
        },
      },
      {
        name: "QRA",
        value: 10403854.36,
        formattedValue: "10,403,854 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QRA",
              count: 2,
              investment: 10403854.36,
            },
          ],
          totalInvestments: {
            committed: 11505147.85,
            disbursed: 10403854.36,
            signed: 14610000,
          },
          percValue: "90.42781975200779",
        },
      },
      {
        name: "QMZ",
        value: 10212769.64,
        formattedValue: "10,212,770 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QMZ",
              count: 1,
              investment: 10212769.64,
            },
          ],
          totalInvestments: {
            committed: 10212769.64,
            disbursed: 10212769.64,
            signed: 10822808.89,
          },
          percValue: "100",
        },
      },
      {
        name: "SRB",
        value: 9972809.94,
        formattedValue: "9,972,810 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SRB",
              count: 3,
              investment: 9972809.94,
            },
          ],
          totalInvestments: {
            committed: 9972809.94,
            disbursed: 9972809.94,
            signed: 9972809.94,
          },
          percValue: "100",
        },
      },
      {
        name: "MWI",
        value: 8521555.34,
        formattedValue: "8,521,555 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MWI",
              count: 1,
              investment: 8521555.34,
            },
          ],
          totalInvestments: {
            committed: 8521555.34,
            disbursed: 8521555.34,
            signed: 8521555.34,
          },
          percValue: "100",
        },
      },
      {
        name: "MKD",
        value: 8303013.22,
        formattedValue: "8,303,013 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MKD",
              count: 2,
              investment: 8303013.22,
            },
          ],
          totalInvestments: {
            committed: 8431950.86,
            disbursed: 8303013.22,
            signed: 8431950.85,
          },
          percValue: "98.47084450394912",
        },
      },
      {
        name: "SYR",
        value: 8283978.61,
        formattedValue: "8,283,979 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SYR",
              count: 1,
              investment: 8283978.61,
            },
          ],
          totalInvestments: {
            committed: 8283978.61,
            disbursed: 8283978.61,
            signed: 8283978.61,
          },
          percValue: "100",
        },
      },
      {
        name: "BWA",
        value: 8200122.69,
        formattedValue: "8,200,123 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BWA",
              count: 1,
              investment: 8200122.69,
            },
          ],
          totalInvestments: {
            committed: 8200122.69,
            disbursed: 8200122.69,
            signed: 8200122.69,
          },
          percValue: "100",
        },
      },
      {
        name: "COL",
        value: 8151941.36,
        formattedValue: "8,151,941 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "COL",
              count: 2,
              investment: 8151941.36,
            },
          ],
          totalInvestments: {
            committed: 8151941.36,
            disbursed: 8151941.36,
            signed: 8151941.36,
          },
          percValue: "100",
        },
      },
      {
        name: "SLB",
        value: 7566594.19,
        formattedValue: "7,566,594 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SLB",
              count: 3,
              investment: 7566594.19,
            },
          ],
          totalInvestments: {
            committed: 7960079.42,
            disbursed: 7566594.19,
            signed: 8604255.19,
          },
          percValue: "95.0567675366234",
        },
      },
      {
        name: "CUB",
        value: 7426441.59,
        formattedValue: "7,426,442 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "CUB",
              count: 1,
              investment: 7426441.59,
            },
          ],
          totalInvestments: {
            committed: 7426441.59,
            disbursed: 7426441.59,
            signed: 7426441.59,
          },
          percValue: "100",
        },
      },
      {
        name: "QSE",
        value: 7337855.58,
        formattedValue: "7,337,856 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QSE",
              count: 1,
              investment: 7337855.58,
            },
          ],
          totalInvestments: {
            committed: 7337855.58,
            disbursed: 7337855.58,
            signed: 9999999,
          },
          percValue: "100",
        },
      },
      {
        name: "CAF",
        value: 7165364.28,
        formattedValue: "7,165,364 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "CAF",
              count: 3,
              investment: 7165364.28,
            },
          ],
          totalInvestments: {
            committed: 7179084.3,
            disbursed: 7165364.28,
            signed: 7179084.3,
          },
          percValue: "99.80888899716639",
        },
      },
      {
        name: "MRT",
        value: 7019197.46,
        formattedValue: "7,019,197 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MRT",
              count: 3,
              investment: 7019197.46,
            },
          ],
          totalInvestments: {
            committed: 7019197.46,
            disbursed: 7019197.46,
            signed: 7019197.46,
          },
          percValue: "100",
        },
      },
      {
        name: "BTN",
        value: 5977562.05,
        formattedValue: "5,977,562 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "BTN",
              count: 3,
              investment: 5977562.05,
            },
          ],
          totalInvestments: {
            committed: 5977648.33,
            disbursed: 5977562.05,
            signed: 5977648.33,
          },
          percValue: "99.998556623019",
        },
      },
      {
        name: "QSF",
        value: 5956465.39,
        formattedValue: "5,956,465 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QSF",
              count: 1,
              investment: 5956465.39,
            },
          ],
          totalInvestments: {
            committed: 5956465.39,
            disbursed: 5956465.39,
            signed: 5956465.39,
          },
          percValue: "100",
        },
      },
      {
        name: "COG",
        value: 5485676.99,
        formattedValue: "5,485,677 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "COG",
              count: 2,
              investment: 5485676.99,
            },
          ],
          totalInvestments: {
            committed: 5467550.11,
            disbursed: 5485676.99,
            signed: 5467550.11,
          },
          percValue: "100.33153569030571",
        },
      },
      {
        name: "QPB",
        value: 5013229.82,
        formattedValue: "5,013,230 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QPB",
              count: 1,
              investment: 5013229.82,
            },
          ],
          totalInvestments: {
            committed: 5779761.14,
            disbursed: 5013229.82,
            signed: 7262746,
          },
          percValue: "86.73766438728643",
        },
      },
      {
        name: "TUN",
        value: 4803936.07,
        formattedValue: "4,803,936 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "TUN",
              count: 2,
              investment: 4803936.07,
            },
          ],
          totalInvestments: {
            committed: 4803936.07,
            disbursed: 4803936.07,
            signed: 4803936.07,
          },
          percValue: "100",
        },
      },
      {
        name: "DJI",
        value: 4548534.55,
        formattedValue: "4,548,535 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "DJI",
              count: 2,
              investment: 4548534.55,
            },
          ],
          totalInvestments: {
            committed: 4578868.44,
            disbursed: 4548534.55,
            signed: 4578868.44,
          },
          percValue: "99.3375243163789",
        },
      },
      {
        name: "GUY",
        value: 4214536.55,
        formattedValue: "4,214,537 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GUY",
              count: 3,
              investment: 4214536.55,
            },
          ],
          totalInvestments: {
            committed: 4265808.78,
            disbursed: 4214536.55,
            signed: 4416456.98,
          },
          percValue: "98.79806543977341",
        },
      },
      {
        name: "GAB",
        value: 4187294.02,
        formattedValue: "4,187,294 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "GAB",
              count: 2,
              investment: 4187294.02,
            },
          ],
          totalInvestments: {
            committed: 4173456.84,
            disbursed: 4187294.02,
            signed: 4263812.18,
          },
          percValue: "100.33155200905348",
        },
      },
      {
        name: "JOR",
        value: 3696794.84,
        formattedValue: "3,696,795 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "JOR",
              count: 2,
              investment: 3696794.84,
            },
          ],
          totalInvestments: {
            committed: 3696794.84,
            disbursed: 3696794.84,
            signed: 3696794.84,
          },
          percValue: "100",
        },
      },
      {
        name: "QSD",
        value: 3337164.79,
        formattedValue: "3,337,165 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QSD",
              count: 1,
              investment: 3337164.79,
            },
          ],
          totalInvestments: {
            committed: 4016601.89,
            disbursed: 3337164.79,
            signed: 5000000,
          },
          percValue: "83.08428072765757",
        },
      },
      {
        name: "SUR",
        value: 3260336,
        formattedValue: "3,260,336 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "SUR",
              count: 1,
              investment: 3260336,
            },
          ],
          totalInvestments: {
            committed: 3260336,
            disbursed: 3260336,
            signed: 3260336,
          },
          percValue: "100",
        },
      },
      {
        name: "STP",
        value: 2843418.22,
        formattedValue: "2,843,418 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "STP",
              count: 2,
              investment: 2843418.22,
            },
          ],
          totalInvestments: {
            committed: 2843418.22,
            disbursed: 2843418.22,
            signed: 2843418.22,
          },
          percValue: "99.99999999999999",
        },
      },
      {
        name: "COM",
        value: 2621231.57,
        formattedValue: "2,621,232 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "COM",
              count: 2,
              investment: 2621231.57,
            },
          ],
          totalInvestments: {
            committed: 2613416.66,
            disbursed: 2621231.57,
            signed: 2758508.38,
          },
          percValue: "100.29903038882439",
        },
      },
      {
        name: "QNB",
        value: 2276773.81,
        formattedValue: "2,276,774 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "QNB",
              count: 2,
              investment: 2276773.81,
            },
          ],
          totalInvestments: {
            committed: 2276773.81,
            disbursed: 2276773.81,
            signed: 2276773.81,
          },
          percValue: "100",
        },
      },
      {
        name: "PSE",
        value: 2079054.23,
        formattedValue: "2,079,054 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PSE",
              count: 1,
              investment: 2079054.23,
            },
          ],
          totalInvestments: {
            committed: 2079054.23,
            disbursed: 2079054.23,
            signed: 2079054.23,
          },
          percValue: "100",
        },
      },
      {
        name: "MNE",
        value: 1742806.56,
        formattedValue: "1,742,807 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "MNE",
              count: 1,
              investment: 1742806.56,
            },
          ],
          totalInvestments: {
            committed: 1742806.56,
            disbursed: 1742806.56,
            signed: 1742806.56,
          },
          percValue: "100",
        },
      },
      {
        name: "ALB",
        value: 1263059.64,
        formattedValue: "1,263,060 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "ALB",
              count: 1,
              investment: 1263059.64,
            },
          ],
          totalInvestments: {
            committed: 1263059.64,
            disbursed: 1263059.64,
            signed: 1263059.64,
          },
          percValue: "100",
        },
      },
      {
        name: "PAN",
        value: 553816.54,
        formattedValue: "553,817 USD",
        color: "#70777E",
        tooltip: {
          header: "Tuberculosis",
          componentsStats: [
            {
              name: "PAN",
              count: 1,
              investment: 553816.54,
            },
          ],
          totalInvestments: {
            committed: 553816.54,
            disbursed: 553816.54,
            signed: 553816.54,
          },
          percValue: "100",
        },
      },
    ],
    tooltip: {
      header: "Tuberculosis",
      componentsStats: [
        {
          name: "Tuberculosis",
          count: 394,
          investment: 7685843178.23,
        },
      ],
      totalInvestments: {
        committed: 8290878015.610002,
        disbursed: 7685843178.23,
        signed: 9174309106.33,
      },
      percValue: "92.70240333724792",
    },
  },
  {
    name: "TB/HIV",
    color: "#DFE3E5",
    value: 3625684503.7600007,
    formattedValue: "3,625,684,504 USD",
    _children: [
      {
        name: "MWI",
        value: 663882911.42,
        formattedValue: "663,882,911 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MWI",
              count: 3,
              investment: 663882911.42,
            },
          ],
          totalInvestments: {
            committed: 751986967.92,
            disbursed: 663882911.42,
            signed: 1075233545.8,
          },
          percValue: "88.28383199994857",
        },
      },
      {
        name: "ZAF",
        value: 623765995.33,
        formattedValue: "623,765,995 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "ZAF",
              count: 13,
              investment: 623765995.33,
            },
          ],
          totalInvestments: {
            committed: 658788926.96,
            disbursed: 623765995.33,
            signed: 781827233.03,
          },
          percValue: "94.68374008779803",
        },
      },
      {
        name: "ZMB",
        value: 408006565.98,
        formattedValue: "408,006,566 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "ZMB",
              count: 2,
              investment: 408006565.98,
            },
          ],
          totalInvestments: {
            committed: 528824945.02,
            disbursed: 408006565.98,
            signed: 632681233.92,
          },
          percValue: "77.15342663432213",
        },
      },
      {
        name: "UKR",
        value: 295584362.8,
        formattedValue: "295,584,363 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "UKR",
              count: 3,
              investment: 295584362.8,
            },
          ],
          totalInvestments: {
            committed: 345645959.88,
            disbursed: 295584362.8,
            signed: 402872211.17,
          },
          percValue: "85.51651027618544",
        },
      },
      {
        name: "COD",
        value: 193451141.66,
        formattedValue: "193,451,142 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "COD",
              count: 1,
              investment: 193451141.66,
            },
          ],
          totalInvestments: {
            committed: 252650282.06,
            disbursed: 193451141.66,
            signed: 362554563.9,
          },
          percValue: "76.56874161496434",
        },
      },
      {
        name: "HTI",
        value: 140020714.03,
        formattedValue: "140,020,714 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "HTI",
              count: 2,
              investment: 140020714.03,
            },
          ],
          totalInvestments: {
            committed: 166465963.76,
            disbursed: 140020714.03,
            signed: 223772255.02,
          },
          percValue: "84.11371962611705",
        },
      },
      {
        name: "TZA",
        value: 110855766.36,
        formattedValue: "110,855,766 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "TZA",
              count: 3,
              investment: 110855766.36,
            },
          ],
          totalInvestments: {
            committed: 123935795.16,
            disbursed: 110855766.36,
            signed: 137883142.85,
          },
          percValue: "89.44612508185081",
        },
      },
      {
        name: "LSO",
        value: 107908082.61,
        formattedValue: "107,908,083 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "LSO",
              count: 2,
              investment: 107908082.61,
            },
          ],
          totalInvestments: {
            committed: 115141442.53,
            disbursed: 107908082.61,
            signed: 124379868.86,
          },
          percValue: "93.71784844703907",
        },
      },
      {
        name: "THA",
        value: 90745735.63,
        formattedValue: "90,745,736 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "THA",
              count: 2,
              investment: 90745735.63,
            },
          ],
          totalInvestments: {
            committed: 103993967.42,
            disbursed: 90745735.63,
            signed: 147293115.88,
          },
          percValue: "87.26057662893615",
        },
      },
      {
        name: "CAF",
        value: 89017533.03,
        formattedValue: "89,017,533 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "CAF",
              count: 2,
              investment: 89017533.03,
            },
          ],
          totalInvestments: {
            committed: 114115469.38,
            disbursed: 89017533.03,
            signed: 169076244.31,
          },
          percValue: "78.00654329657546",
        },
      },
      {
        name: "GHA",
        value: 85559584.44,
        formattedValue: "85,559,584 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "GHA",
              count: 2,
              investment: 85559584.44,
            },
          ],
          totalInvestments: {
            committed: 118029507.64,
            disbursed: 85559584.44,
            signed: 167237155,
          },
          percValue: "72.48999521455599",
        },
      },
      {
        name: "KHM",
        value: 63107469.77,
        formattedValue: "63,107,470 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "KHM",
              count: 1,
              investment: 63107469.77,
            },
          ],
          totalInvestments: {
            committed: 95232170.31,
            disbursed: 63107469.77,
            signed: 121330754,
          },
          percValue: "66.2669658420809",
        },
      },
      {
        name: "KGZ",
        value: 60513985.61,
        formattedValue: "60,513,986 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "KGZ",
              count: 1,
              investment: 60513985.61,
            },
          ],
          totalInvestments: {
            committed: 60513985.61,
            disbursed: 60513985.61,
            signed: 72921225.48,
          },
          percValue: "100",
        },
      },
      {
        name: "BDI",
        value: 50297527.04,
        formattedValue: "50,297,527 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "BDI",
              count: 2,
              investment: 50297527.04,
            },
          ],
          totalInvestments: {
            committed: 68823207.66,
            disbursed: 50297527.04,
            signed: 87653636.85,
          },
          percValue: "73.08221855697215",
        },
      },
      {
        name: "LBR",
        value: 47120231.79,
        formattedValue: "47,120,232 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "LBR",
              count: 2,
              investment: 47120231.79,
            },
          ],
          totalInvestments: {
            committed: 54624488.66,
            disbursed: 47120231.79,
            signed: 84049167.14,
          },
          percValue: "86.26210138696428",
        },
      },
      {
        name: "BWA",
        value: 42208461.11,
        formattedValue: "42,208,461 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "BWA",
              count: 2,
              investment: 42208461.11,
            },
          ],
          totalInvestments: {
            committed: 42459400.52,
            disbursed: 42208461.11,
            signed: 45566432.96,
          },
          percValue: "99.40898974802576",
        },
      },
      {
        name: "MOZ",
        value: 36322672.61,
        formattedValue: "36,322,673 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MOZ",
              count: 1,
              investment: 36322672.61,
            },
          ],
          totalInvestments: {
            committed: 62361869.61,
            disbursed: 36322672.61,
            signed: 89542946.73,
          },
          percValue: "58.2450026549164",
        },
      },
      {
        name: "NAM",
        value: 35087490.92,
        formattedValue: "35,087,491 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "NAM",
              count: 2,
              investment: 35087490.92,
            },
          ],
          totalInvestments: {
            committed: 35094714.95,
            disbursed: 35087490.92,
            signed: 38290641.36,
          },
          percValue: "99.97941561853318",
        },
      },
      {
        name: "SWZ",
        value: 34488208.21,
        formattedValue: "34,488,208 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "SWZ",
              count: 2,
              investment: 34488208.21,
            },
          ],
          totalInvestments: {
            committed: 42359105.4,
            disbursed: 34488208.21,
            signed: 52797895,
          },
          percValue: "81.41864159860185",
        },
      },
      {
        name: "UGA",
        value: 33376403.51,
        formattedValue: "33,376,404 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "UGA",
              count: 1,
              investment: 33376403.51,
            },
          ],
          totalInvestments: {
            committed: 50313302.85,
            disbursed: 33376403.51,
            signed: 59870588.77,
          },
          percValue: "66.33713475242462",
        },
      },
      {
        name: "PNG",
        value: 31833292.34,
        formattedValue: "31,833,292 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "PNG",
              count: 1,
              investment: 31833292.34,
            },
          ],
          totalInvestments: {
            committed: 48434092.85,
            disbursed: 31833292.34,
            signed: 72258949.91,
          },
          percValue: "65.72496864674942",
        },
      },
      {
        name: "MDA",
        value: 31798555.25,
        formattedValue: "31,798,555 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MDA",
              count: 2,
              investment: 31798555.25,
            },
          ],
          totalInvestments: {
            committed: 37103916.82,
            disbursed: 31798555.25,
            signed: 47504862.08,
          },
          percValue: "85.7013436189565",
        },
      },
      {
        name: "IND",
        value: 30141405.47,
        formattedValue: "30,141,405 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "IND",
              count: 3,
              investment: 30141405.47,
            },
          ],
          totalInvestments: {
            committed: 39119413.32,
            disbursed: 30141405.47,
            signed: 51763569,
          },
          percValue: "77.04973799949616",
        },
      },
      {
        name: "COG",
        value: 26842031.72,
        formattedValue: "26,842,032 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "COG",
              count: 2,
              investment: 26842031.72,
            },
          ],
          totalInvestments: {
            committed: 39155360.32,
            disbursed: 26842031.72,
            signed: 53092487.81,
          },
          percValue: "68.5526362179573",
        },
      },
      {
        name: "QUA",
        value: 24868392.65,
        formattedValue: "24,868,393 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QUA",
              count: 1,
              investment: 24868392.65,
            },
          ],
          totalInvestments: {
            committed: 28470558.98,
            disbursed: 24868392.65,
            signed: 33271080.54,
          },
          percValue: "87.34774988952465",
        },
      },
      {
        name: "GNB",
        value: 21603889.73,
        formattedValue: "21,603,890 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "GNB",
              count: 1,
              investment: 21603889.73,
            },
          ],
          totalInvestments: {
            committed: 32392584.86,
            disbursed: 21603889.73,
            signed: 48446527.83,
          },
          percValue: "66.69393573674812",
        },
      },
      {
        name: "BLR",
        value: 19240340.96,
        formattedValue: "19,240,341 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "BLR",
              count: 1,
              investment: 19240340.96,
            },
          ],
          totalInvestments: {
            committed: 23209428.87,
            disbursed: 19240340.96,
            signed: 23501804.53,
          },
          percValue: "82.89881266690557",
        },
      },
      {
        name: "BFA",
        value: 17931629.57,
        formattedValue: "17,931,630 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "BFA",
              count: 1,
              investment: 17931629.57,
            },
          ],
          totalInvestments: {
            committed: 21326031.54,
            disbursed: 17931629.57,
            signed: 26216910.35,
          },
          percValue: "84.08329292942611",
        },
      },
      {
        name: "GIN",
        value: 17909279.44,
        formattedValue: "17,909,279 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "GIN",
              count: 1,
              investment: 17909279.44,
            },
          ],
          totalInvestments: {
            committed: 26795694.86,
            disbursed: 17909279.44,
            signed: 37388442.32,
          },
          percValue: "66.8364061225916",
        },
      },
      {
        name: "GMB",
        value: 15164731.09,
        formattedValue: "15,164,731 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "GMB",
              count: 2,
              investment: 15164731.09,
            },
          ],
          totalInvestments: {
            committed: 16528722.19,
            disbursed: 15164731.09,
            signed: 18961972,
          },
          percValue: "91.74775228041993",
        },
      },
      {
        name: "RWA",
        value: 14641046,
        formattedValue: "14,641,046 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "RWA",
              count: 1,
              investment: 14641046,
            },
          ],
          totalInvestments: {
            committed: 14641046,
            disbursed: 14641046,
            signed: 14641046,
          },
          percValue: "100",
        },
      },
      {
        name: "NGA",
        value: 14317170.7,
        formattedValue: "14,317,171 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "NGA",
              count: 1,
              investment: 14317170.7,
            },
          ],
          totalInvestments: {
            committed: 15269275.38,
            disbursed: 14317170.7,
            signed: 20207233,
          },
          percValue: "93.76457195049946",
        },
      },
      {
        name: "QNB",
        value: 14117785.14,
        formattedValue: "14,117,785 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QNB",
              count: 1,
              investment: 14117785.14,
            },
          ],
          totalInvestments: {
            committed: 15400663.05,
            disbursed: 14117785.14,
            signed: 19500119.96,
          },
          percValue: "91.66998261156034",
        },
      },
      {
        name: "DJI",
        value: 12037369.61,
        formattedValue: "12,037,370 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "DJI",
              count: 1,
              investment: 12037369.61,
            },
          ],
          totalInvestments: {
            committed: 12037369.61,
            disbursed: 12037369.61,
            signed: 12037369.61,
          },
          percValue: "100",
        },
      },
      {
        name: "SSD",
        value: 11602354,
        formattedValue: "11,602,354 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "SSD",
              count: 1,
              investment: 11602354,
            },
          ],
          totalInvestments: {
            committed: 30627161,
            disbursed: 11602354,
            signed: 71526259,
          },
          percValue: "37.88256443357581",
        },
      },
      {
        name: "QPA",
        value: 9736721,
        formattedValue: "9,736,721 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QPA",
              count: 1,
              investment: 9736721,
            },
          ],
          totalInvestments: {
            committed: 9736721,
            disbursed: 9736721,
            signed: 9736721,
          },
          percValue: "100",
        },
      },
      {
        name: "PAN",
        value: 9658700.15,
        formattedValue: "9,658,700 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "PAN",
              count: 1,
              investment: 9658700.15,
            },
          ],
          totalInvestments: {
            committed: 9798189.27,
            disbursed: 9658700.15,
            signed: 9865413.05,
          },
          percValue: "98.57637859244987",
        },
      },
      {
        name: "TJK",
        value: 8745562.81,
        formattedValue: "8,745,563 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "TJK",
              count: 1,
              investment: 8745562.81,
            },
          ],
          totalInvestments: {
            committed: 16843513.01,
            disbursed: 8745562.81,
            signed: 25044957,
          },
          percValue: "51.92243924891295",
        },
      },
      {
        name: "ARM",
        value: 8050039.1,
        formattedValue: "8,050,039 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "ARM",
              count: 1,
              investment: 8050039.1,
            },
          ],
          totalInvestments: {
            committed: 8484180.98,
            disbursed: 8050039.1,
            signed: 8830686.76,
          },
          percValue: "94.88292528149252",
        },
      },
      {
        name: "HND",
        value: 8005479.06,
        formattedValue: "8,005,479 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "HND",
              count: 1,
              investment: 8005479.06,
            },
          ],
          totalInvestments: {
            committed: 8581719.31,
            disbursed: 8005479.06,
            signed: 15280464.53,
          },
          percValue: "93.28525870884025",
        },
      },
      {
        name: "MLI",
        value: 7976996.34,
        formattedValue: "7,976,996 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MLI",
              count: 2,
              investment: 7976996.34,
            },
          ],
          totalInvestments: {
            committed: 39093574.78,
            disbursed: 7976996.34,
            signed: 84559209.11,
          },
          percValue: "20.404878256569607",
        },
      },
      {
        name: "QRB",
        value: 7457197.32,
        formattedValue: "7,457,197 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QRB",
              count: 1,
              investment: 7457197.32,
            },
          ],
          totalInvestments: {
            committed: 7699007.92,
            disbursed: 7457197.32,
            signed: 8679353.82,
          },
          percValue: "96.85919793156934",
        },
      },
      {
        name: "QPF",
        value: 6149710.04,
        formattedValue: "6,149,710 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QPF",
              count: 1,
              investment: 6149710.04,
            },
          ],
          totalInvestments: {
            committed: 5850044.17,
            disbursed: 6149710.04,
            signed: 5850044.17,
          },
          percValue: "105.12245482755047",
        },
      },
      {
        name: "ALB",
        value: 6026976.4,
        formattedValue: "6,026,976 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "ALB",
              count: 1,
              investment: 6026976.4,
            },
          ],
          totalInvestments: {
            committed: 6237836.02,
            disbursed: 6026976.4,
            signed: 6617936.53,
          },
          percValue: "96.61966715181462",
        },
      },
      {
        name: "BLZ",
        value: 5118146.73,
        formattedValue: "5,118,147 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "BLZ",
              count: 1,
              investment: 5118146.73,
            },
          ],
          totalInvestments: {
            committed: 5118146.73,
            disbursed: 5118146.73,
            signed: 5144837.46,
          },
          percValue: "100",
        },
      },
      {
        name: "SUR",
        value: 5072634.69,
        formattedValue: "5,072,635 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "SUR",
              count: 1,
              investment: 5072634.69,
            },
          ],
          totalInvestments: {
            committed: 5072634.69,
            disbursed: 5072634.69,
            signed: 5475649,
          },
          percValue: "100",
        },
      },
      {
        name: "MNG",
        value: 3897073.34,
        formattedValue: "3,897,073 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MNG",
              count: 1,
              investment: 3897073.34,
            },
          ],
          totalInvestments: {
            committed: 7053340.34,
            disbursed: 3897073.34,
            signed: 13344330,
          },
          percValue: "55.251457495952906",
        },
      },
      {
        name: "QMZ",
        value: 3863334,
        formattedValue: "3,863,334 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "QMZ",
              count: 1,
              investment: 3863334,
            },
          ],
          totalInvestments: {
            committed: 3863334,
            disbursed: 3863334,
            signed: 3863334,
          },
          percValue: "100",
        },
      },
      {
        name: "AZE",
        value: 3792657.91,
        formattedValue: "3,792,658 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "AZE",
              count: 1,
              investment: 3792657.91,
            },
          ],
          totalInvestments: {
            committed: 9077063.61,
            disbursed: 3792657.91,
            signed: 17261208,
          },
          percValue: "41.78287244590545",
        },
      },
      {
        name: "MAR",
        value: 3268715.22,
        formattedValue: "3,268,715 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "MAR",
              count: 1,
              investment: 3268715.22,
            },
          ],
          totalInvestments: {
            committed: 11787008.37,
            disbursed: 3268715.22,
            signed: 18663763.01,
          },
          percValue: "27.7315084319398",
        },
      },
      {
        name: "CIV",
        value: 2962211.4,
        formattedValue: "2,962,211 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "CIV",
              count: 1,
              investment: 2962211.4,
            },
          ],
          totalInvestments: {
            committed: 24241804.47,
            disbursed: 2962211.4,
            signed: 41317244.14,
          },
          percValue: "12.219434422325412",
        },
      },
      {
        name: "EGY",
        value: 2522525.29,
        formattedValue: "2,522,525 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "EGY",
              count: 1,
              investment: 2522525.29,
            },
          ],
          totalInvestments: {
            committed: 2777508.29,
            disbursed: 2522525.29,
            signed: 3112421,
          },
          percValue: "90.81972136976052",
        },
      },
      {
        name: "CMR",
        value: 2510071.13,
        formattedValue: "2,510,071 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "CMR",
              count: 1,
              investment: 2510071.13,
            },
          ],
          totalInvestments: {
            committed: 18117536.52,
            disbursed: 2510071.13,
            signed: 37518372.16,
          },
          percValue: "13.854373232415595",
        },
      },
      {
        name: "CPV",
        value: 2360092.74,
        formattedValue: "2,360,093 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "CPV",
              count: 1,
              investment: 2360092.74,
            },
          ],
          totalInvestments: {
            committed: 2293600.24,
            disbursed: 2360092.74,
            signed: 2293600.24,
          },
          percValue: "102.89904486581324",
        },
      },
      {
        name: "LAO",
        value: 1913737.38,
        formattedValue: "1,913,737 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "LAO",
              count: 1,
              investment: 1913737.38,
            },
          ],
          totalInvestments: {
            committed: 6203422.86,
            disbursed: 1913737.38,
            signed: 15507232,
          },
          percValue: "30.849700611897347",
        },
      },
      {
        name: "SLB",
        value: 1225804.18,
        formattedValue: "1,225,804 USD",
        color: "#70777E",
        tooltip: {
          header: "TB/HIV",
          componentsStats: [
            {
              name: "SLB",
              count: 1,
              investment: 1225804.18,
            },
          ],
          totalInvestments: {
            committed: 1512241,
            disbursed: 1225804.18,
            signed: 1512241,
          },
          percValue: "81.05878494234715",
        },
      },
    ],
    tooltip: {
      header: "TB/HIV",
      componentsStats: [
        {
          name: "TB/HIV",
          count: 91,
          investment: 3625684503.7600007,
        },
      ],
      totalInvestments: {
        committed: 4401315220.53,
        disbursed: 3625684503.7600007,
        signed: 5766631509.95,
      },
      percValue: "82.37729683272723",
    },
  },
  {
    name: "RSSH",
    color: "#DFE3E5",
    value: 778969073.44,
    formattedValue: "778,969,073 USD",
    _children: [
      {
        name: "TZA",
        value: 110136808.53,
        formattedValue: "110,136,809 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "TZA",
              count: 1,
              investment: 110136808.53,
            },
          ],
          totalInvestments: {
            committed: 110136808.53,
            disbursed: 110136808.53,
            signed: 110136808.53,
          },
          percValue: "100",
        },
      },
      {
        name: "ETH",
        value: 93893185.29,
        formattedValue: "93,893,185 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "ETH",
              count: 2,
              investment: 93893185.29,
            },
          ],
          totalInvestments: {
            committed: 95112306.89,
            disbursed: 93893185.29,
            signed: 129691887,
          },
          percValue: "98.71822938601422",
        },
      },
      {
        name: "ZWE",
        value: 74106559.43,
        formattedValue: "74,106,559 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "ZWE",
              count: 1,
              investment: 74106559.43,
            },
          ],
          totalInvestments: {
            committed: 74106559.43,
            disbursed: 74106559.43,
            signed: 74106559.43,
          },
          percValue: "100",
        },
      },
      {
        name: "VNM",
        value: 62111060.45,
        formattedValue: "62,111,060 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "VNM",
              count: 1,
              investment: 62111060.45,
            },
          ],
          totalInvestments: {
            committed: 62111060.45,
            disbursed: 62111060.45,
            signed: 62111060.45,
          },
          percValue: "100",
        },
      },
      {
        name: "NGA",
        value: 59235626.59,
        formattedValue: "59,235,627 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "NGA",
              count: 3,
              investment: 59235626.59,
            },
          ],
          totalInvestments: {
            committed: 81258042.97,
            disbursed: 59235626.59,
            signed: 99616090,
          },
          percValue: "72.89817035326516",
        },
      },
      {
        name: "SSD",
        value: 40394243.22,
        formattedValue: "40,394,243 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "SSD",
              count: 1,
              investment: 40394243.22,
            },
          ],
          totalInvestments: {
            committed: 40394243.22,
            disbursed: 40394243.22,
            signed: 40394243.22,
          },
          percValue: "100",
        },
      },
      {
        name: "MWI",
        value: 40211129.29,
        formattedValue: "40,211,129 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "MWI",
              count: 1,
              investment: 40211129.29,
            },
          ],
          totalInvestments: {
            committed: 40211129.29,
            disbursed: 40211129.29,
            signed: 40211129.29,
          },
          percValue: "100",
        },
      },
      {
        name: "UGA",
        value: 33882325.76,
        formattedValue: "33,882,326 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "UGA",
              count: 4,
              investment: 33882325.76,
            },
          ],
          totalInvestments: {
            committed: 33882325.76,
            disbursed: 33882325.76,
            signed: 33882325.76,
          },
          percValue: "100",
        },
      },
      {
        name: "RWA",
        value: 33789554.53,
        formattedValue: "33,789,555 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "RWA",
              count: 1,
              investment: 33789554.53,
            },
          ],
          totalInvestments: {
            committed: 33789554.53,
            disbursed: 33789554.53,
            signed: 33789554.53,
          },
          percValue: "100",
        },
      },
      {
        name: "KHM",
        value: 28810707.32,
        formattedValue: "28,810,707 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "KHM",
              count: 3,
              investment: 28810707.32,
            },
          ],
          totalInvestments: {
            committed: 30989710.29,
            disbursed: 28810707.32,
            signed: 32226872.55,
          },
          percValue: "92.96862426396049",
        },
      },
      {
        name: "BEN",
        value: 28494505.3,
        formattedValue: "28,494,505 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "BEN",
              count: 2,
              investment: 28494505.3,
            },
          ],
          totalInvestments: {
            committed: 31359377.56,
            disbursed: 28494505.3,
            signed: 44471985.72,
          },
          percValue: "90.86438417178839",
        },
      },
      {
        name: "AFG",
        value: 26410019.72,
        formattedValue: "26,410,020 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "AFG",
              count: 3,
              investment: 26410019.72,
            },
          ],
          totalInvestments: {
            committed: 26545006.67,
            disbursed: 26410019.72,
            signed: 26545006.67,
          },
          percValue: "99.49147893734546",
        },
      },
      {
        name: "COD",
        value: 24075016.38,
        formattedValue: "24,075,016 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "COD",
              count: 1,
              investment: 24075016.38,
            },
          ],
          totalInvestments: {
            committed: 42299648.48,
            disbursed: 24075016.38,
            signed: 68645564,
          },
          percValue: "56.91540531686235",
        },
      },
      {
        name: "BFA",
        value: 17146618.13,
        formattedValue: "17,146,618 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "BFA",
              count: 1,
              investment: 17146618.13,
            },
          ],
          totalInvestments: {
            committed: 16738750.6,
            disbursed: 17146618.13,
            signed: 16738750.6,
          },
          percValue: "102.43666650962588",
        },
      },
      {
        name: "SDN",
        value: 16359742.91,
        formattedValue: "16,359,743 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "SDN",
              count: 1,
              investment: 16359742.91,
            },
          ],
          totalInvestments: {
            committed: 16359742.91,
            disbursed: 16359742.91,
            signed: 16359742.91,
          },
          percValue: "100",
        },
      },
      {
        name: "MOZ",
        value: 14937604.44,
        formattedValue: "14,937,604 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "MOZ",
              count: 1,
              investment: 14937604.44,
            },
          ],
          totalInvestments: {
            committed: 14937604.44,
            disbursed: 14937604.44,
            signed: 14937604.44,
          },
          percValue: "100",
        },
      },
      {
        name: "LKA",
        value: 12743582.55,
        formattedValue: "12,743,583 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "LKA",
              count: 1,
              investment: 12743582.55,
            },
          ],
          totalInvestments: {
            committed: 12743582.55,
            disbursed: 12743582.55,
            signed: 12743582.55,
          },
          percValue: "100",
        },
      },
      {
        name: "IDN",
        value: 12421365.68,
        formattedValue: "12,421,366 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "IDN",
              count: 1,
              investment: 12421365.68,
            },
          ],
          totalInvestments: {
            committed: 12421365.68,
            disbursed: 12421365.68,
            signed: 12421365.68,
          },
          percValue: "100",
        },
      },
      {
        name: "SWZ",
        value: 8212962.23,
        formattedValue: "8,212,962 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "SWZ",
              count: 1,
              investment: 8212962.23,
            },
          ],
          totalInvestments: {
            committed: 8212962.23,
            disbursed: 8212962.23,
            signed: 8212962.23,
          },
          percValue: "100",
        },
      },
      {
        name: "PRY",
        value: 7575218.88,
        formattedValue: "7,575,219 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "PRY",
              count: 1,
              investment: 7575218.88,
            },
          ],
          totalInvestments: {
            committed: 7575218.88,
            disbursed: 7575218.88,
            signed: 7575218.88,
          },
          percValue: "100",
        },
      },
      {
        name: "MAR",
        value: 6801523.77,
        formattedValue: "6,801,524 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "MAR",
              count: 1,
              investment: 6801523.77,
            },
          ],
          totalInvestments: {
            committed: 6802876.36,
            disbursed: 6801523.77,
            signed: 6802876.36,
          },
          percValue: "99.98011738081918",
        },
      },
      {
        name: "MNG",
        value: 5306003.95,
        formattedValue: "5,306,004 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "MNG",
              count: 2,
              investment: 5306003.95,
            },
          ],
          totalInvestments: {
            committed: 5306003.95,
            disbursed: 5306003.95,
            signed: 5306003.95,
          },
          percValue: "100",
        },
      },
      {
        name: "SEN",
        value: 4903437.81,
        formattedValue: "4,903,438 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "SEN",
              count: 1,
              investment: 4903437.81,
            },
          ],
          totalInvestments: {
            committed: 4958574.84,
            disbursed: 4903437.81,
            signed: 4958574.84,
          },
          percValue: "98.88804683242412",
        },
      },
      {
        name: "NER",
        value: 4310170.08,
        formattedValue: "4,310,170 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "NER",
              count: 1,
              investment: 4310170.08,
            },
          ],
          totalInvestments: {
            committed: 4919134.34,
            disbursed: 4310170.08,
            signed: 4919134.34,
          },
          percValue: "87.62049950439044",
        },
      },
      {
        name: "LAO",
        value: 3355904.32,
        formattedValue: "3,355,904 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "LAO",
              count: 1,
              investment: 3355904.32,
            },
          ],
          totalInvestments: {
            committed: 3355904.32,
            disbursed: 3355904.32,
            signed: 3355904.32,
          },
          percValue: "100",
        },
      },
      {
        name: "HTI",
        value: 2150577.97,
        formattedValue: "2,150,578 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "HTI",
              count: 1,
              investment: 2150577.97,
            },
          ],
          totalInvestments: {
            committed: 17377590.35,
            disbursed: 2150577.97,
            signed: 23460621.72,
          },
          percValue: "12.37558215313782",
        },
      },
      {
        name: "ARM",
        value: 2143126.76,
        formattedValue: "2,143,127 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "ARM",
              count: 1,
              investment: 2143126.76,
            },
          ],
          totalInvestments: {
            committed: 2142804.94,
            disbursed: 2143126.76,
            signed: 2142804.94,
          },
          percValue: "100.01501863254057",
        },
      },
      {
        name: "PAK",
        value: 1700097.09,
        formattedValue: "1,700,097 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "PAK",
              count: 1,
              investment: 1700097.09,
            },
          ],
          totalInvestments: {
            committed: 1700097.09,
            disbursed: 1700097.09,
            signed: 1700097.09,
          },
          percValue: "100",
        },
      },
      {
        name: "MLI",
        value: 1375389.49,
        formattedValue: "1,375,389 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "MLI",
              count: 1,
              investment: 1375389.49,
            },
          ],
          totalInvestments: {
            committed: 15796257.23,
            disbursed: 1375389.49,
            signed: 26077172,
          },
          percValue: "8.707059336738846",
        },
      },
      {
        name: "GUY",
        value: 1342707.89,
        formattedValue: "1,342,708 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "GUY",
              count: 1,
              investment: 1342707.89,
            },
          ],
          totalInvestments: {
            committed: 1342707.89,
            disbursed: 1342707.89,
            signed: 1342707.89,
          },
          percValue: "100.00000000000001",
        },
      },
      {
        name: "GNB",
        value: 632297.68,
        formattedValue: "632,298 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "GNB",
              count: 1,
              investment: 632297.68,
            },
          ],
          totalInvestments: {
            committed: 632297.69,
            disbursed: 632297.68,
            signed: 632297.68,
          },
          percValue: "99.99999841846649",
        },
      },
      {
        name: "CIV",
        value: 0,
        formattedValue: "0 USD",
        color: "#70777E",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "CIV",
              count: 1,
              investment: 0,
            },
          ],
          totalInvestments: {
            committed: 0,
            disbursed: 0,
            signed: 28079014.36,
          },
          percValue: "NaN",
        },
      },
    ],
    tooltip: {
      header: "RSSH",
      componentsStats: [
        {
          name: "RSSH",
          count: 44,
          investment: 778969073.44,
        },
      ],
      totalInvestments: {
        committed: 855519250.36,
        disbursed: 778969073.44,
        signed: 993595523.93,
      },
      percValue: "91.05219702680122",
    },
  },
  {
    name: "Multicomponent",
    color: "#DFE3E5",
    value: 255224955.28000003,
    formattedValue: "255,224,955 USD",
    _children: [
      {
        name: "SLE",
        value: 102946647.53,
        formattedValue: "102,946,648 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "SLE",
              count: 1,
              investment: 102946647.53,
            },
          ],
          totalInvestments: {
            committed: 110261561.74,
            disbursed: 102946647.53,
            signed: 115127088.71,
          },
          percValue: "93.36585289146477",
        },
      },
      {
        name: "QSF",
        value: 63349338.74,
        formattedValue: "63,349,339 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "QSF",
              count: 1,
              investment: 63349338.74,
            },
          ],
          totalInvestments: {
            committed: 69237390.36,
            disbursed: 63349338.74,
            signed: 76314083.4,
          },
          percValue: "91.49584987333425",
        },
      },
      {
        name: "SEN",
        value: 23156440.99,
        formattedValue: "23,156,441 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "SEN",
              count: 2,
              investment: 23156440.99,
            },
          ],
          totalInvestments: {
            committed: 52901819.49,
            disbursed: 23156440.99,
            signed: 73839967.95,
          },
          percValue: "43.77248497923072",
        },
      },
      {
        name: "PRK",
        value: 15679305.21,
        formattedValue: "15,679,305 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "PRK",
              count: 1,
              investment: 15679305.21,
            },
          ],
          totalInvestments: {
            committed: 25889984.34,
            disbursed: 15679305.21,
            signed: 43409437,
          },
          percValue: "60.56127730357677",
        },
      },
      {
        name: "AGO",
        value: 14609640.14,
        formattedValue: "14,609,640 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "AGO",
              count: 1,
              investment: 14609640.14,
            },
          ],
          totalInvestments: {
            committed: 22577090,
            disbursed: 14609640.14,
            signed: 22577090,
          },
          percValue: "64.71002303662695",
        },
      },
      {
        name: "MRT",
        value: 10541087.97,
        formattedValue: "10,541,088 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "MRT",
              count: 1,
              investment: 10541087.97,
            },
          ],
          totalInvestments: {
            committed: 11532663.66,
            disbursed: 10541087.97,
            signed: 13664387,
          },
          percValue: "91.40202368478681",
        },
      },
      {
        name: "STP",
        value: 8679233.88,
        formattedValue: "8,679,234 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "STP",
              count: 2,
              investment: 8679233.88,
            },
          ],
          totalInvestments: {
            committed: 13777989.58,
            disbursed: 8679233.88,
            signed: 20988809.53,
          },
          percValue: "62.993471069238545",
        },
      },
      {
        name: "CPV",
        value: 5704541.86,
        formattedValue: "5,704,542 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "CPV",
              count: 1,
              investment: 5704541.86,
            },
          ],
          totalInvestments: {
            committed: 6551777.86,
            disbursed: 5704541.86,
            signed: 9631175.54,
          },
          percValue: "87.06860919121577",
        },
      },
      {
        name: "NAM",
        value: 5055056.11,
        formattedValue: "5,055,056 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "NAM",
              count: 1,
              investment: 5055056.11,
            },
          ],
          totalInvestments: {
            committed: 19281082.05,
            disbursed: 5055056.11,
            signed: 39563486,
          },
          percValue: "26.21769928104217",
        },
      },
      {
        name: "DJI",
        value: 3832002.85,
        formattedValue: "3,832,003 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "DJI",
              count: 1,
              investment: 3832002.85,
            },
          ],
          totalInvestments: {
            committed: 6899040.09,
            disbursed: 3832002.85,
            signed: 10896526,
          },
          percValue: "55.5440003248336",
        },
      },
      {
        name: "RWA",
        value: 1671660,
        formattedValue: "1,671,660 USD",
        color: "#70777E",
        tooltip: {
          header: "Multicomponent",
          componentsStats: [
            {
              name: "RWA",
              count: 1,
              investment: 1671660,
            },
          ],
          totalInvestments: {
            committed: 1671660,
            disbursed: 1671660,
            signed: 1671660,
          },
          percValue: "100",
        },
      },
    ],
    tooltip: {
      header: "Multicomponent",
      componentsStats: [
        {
          name: "Multicomponent",
          count: 13,
          investment: 255224955.28000003,
        },
      ],
      totalInvestments: {
        committed: 340582059.17,
        disbursed: 255224955.28000003,
        signed: 427683711.13,
      },
      percValue: "74.93787426794717",
    },
  },
];

export const mockdata2: DisbursementsTreemapDataItem[] = [
  {
    name: "HIV",
    value: 22406794003.499992,
    formattedValue: "US$22,406,794,003",
    tooltip: {
      header: "HIV",
      componentsStats: [
        {
          name: "HIV",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        committed: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Comprehensive prevention programes for MSM 1",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM  1",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            committed: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Comprehensive prevention programes for MSM 2",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 2",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            committed: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
  {
    name: "RSSH",
    value: 12406794003.499992,
    formattedValue: "US$12,406,794,003",
    tooltip: {
      header: "RSSH",
      componentsStats: [
        {
          name: "RSSH",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        committed: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Comprehensive prevention programes for MSM 1",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 1",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            committed: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Comprehensive prevention programes for MSM 2",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 2",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            committed: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
];
