export interface InvestmentsTimeCycleProps {
  type?: string;
  selectedNodeId?: string;
  data: Record<string, unknown>[];
  onNodeClick: (node: string, x: number, y: number) => void;
}

export const mockdata: Record<string, unknown>[] = [
  {
    year: "2002",
    disbursed: 897869,
    cumulative: 897869,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 429599,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 468270,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 429599,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 468270,
      },
    ],
  },
  {
    year: "2003",
    disbursed: 231200246,
    cumulative: 232098115,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 121075744,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 49499456,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 19945715,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 40679331,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 121505343,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 49499456,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 19945715,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 41147601,
      },
    ],
  },
  {
    year: "2004",
    disbursed: 627505820,
    cumulative: 859603935,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 360849559,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 135534537,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 1687514,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 22243780,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 107190430,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 482354902,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 185033993,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 1687514,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 42189495,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 148338031,
      },
    ],
  },
  {
    year: "2005",
    disbursed: 1053520591,
    cumulative: 1913124526,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 579339937,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 308168894,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 8663218,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 30120009,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 127228533,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1061694839,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 493202887,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 10350732,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 72309504,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 275566564,
      },
    ],
  },
  {
    year: "2006",
    disbursed: 1325873198,
    cumulative: 3238997724,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 695754234,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 407778996,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 7446356,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 18427720,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 196465892,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1757449073,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 900981883,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 17797088,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 90737224,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 472032456,
      },
    ],
  },
  {
    year: "2007",
    disbursed: 1725151295,
    cumulative: 4964149019,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1073208983,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 350932605,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 3690337,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 21865222,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 275454148,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 2830658056,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1251914488,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 21487425,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 112602446,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 747486604,
      },
    ],
  },
  {
    year: "2008",
    disbursed: 2246870479,
    cumulative: 7211019498,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1332447275,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 518707176,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 28524156,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 52026664,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 315165208,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 4163105331,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1770621664,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 50011581,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 164629110,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 1062651812,
      },
    ],
  },
  {
    year: "2009",
    disbursed: 2749053423,
    cumulative: 9960072921,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1292024100,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1014012166,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 37271117,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 18505090,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 387240950,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 5455129431,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 2784633830,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 87282698,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 183134200,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 1449892762,
      },
    ],
  },
  {
    year: "2010",
    disbursed: 3070865139,
    cumulative: 13030938060,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1582140741,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 927976947,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 33379909,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 11949675,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 515417867,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 7037270172,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 3712610777,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 120662607,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 195083875,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 1965310629,
      },
    ],
  },
  {
    year: "2011",
    disbursed: 2631916590,
    cumulative: 15662854650,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1468501089,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 620913962,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 109669412,
      },
      {
        name: "TB/HIV",
        color: "",
        value: -1450758,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 434282885,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 8505771261,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 4333524739,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 230332019,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 193633117,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 2399593514,
      },
    ],
  },
  {
    year: "2012",
    disbursed: 3331939274,
    cumulative: 18994793924,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1759918012,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 962553004,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 115228322,
      },
      {
        name: "TB/HIV",
        color: "",
        value: -4250,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 494244186,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 10265689273,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 5296077743,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 345560341,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 193628867,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 2893837700,
      },
    ],
  },
  {
    year: "2013",
    disbursed: 3968752783,
    cumulative: 22769917840,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 2101675199,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1043369627,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 93107174,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 730600783,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 12367364472,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 6339447370,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 438667515,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 3624438483,
      },
    ],
  },
  {
    year: "2014",
    disbursed: 2878907411,
    cumulative: 25648825251,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1540131665,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 825130452,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 59164211,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 1064213,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 453416870,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 13907496137,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 7164577822,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 497831726,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 1064213,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 4077855353,
      },
    ],
  },
  {
    year: "2015",
    disbursed: 3181728142,
    cumulative: 28830553393,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1604054733,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 910560104,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 48025164,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 113876530,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 505211611,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 15511550870,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 8075137926,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 545856890,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 114940743,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 4583066964,
      },
    ],
  },
  {
    year: "2016",
    disbursed: 3546149191,
    cumulative: 32376702584,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1493871016,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1054855326,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 9808263,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 65621908,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 327853205,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 594139473,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 17005421886,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 9129993252,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 9808263,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 611478798,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 442793948,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 5177206437,
      },
    ],
  },
  {
    year: "2017",
    disbursed: 4230214270,
    cumulative: 36606916854,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1524372905,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1335906418,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 34286748,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 78971342,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 524764737,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 731912120,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 18529794791,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 10465899670,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 44095011,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 690450140,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 967558685,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 5909118557,
      },
    ],
  },
  {
    year: "2018",
    disbursed: 3177524823,
    cumulative: 39784441677,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1049601115,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 957773885,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 56907824,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 17892997,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 603176575,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 492172427,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 19579395906,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 11423673555,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 101002835,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 708343137,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 1570735260,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 6401290984,
      },
    ],
  },
  {
    year: "2019",
    disbursed: 3492046192,
    cumulative: 43276487869,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1058823267,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1178274992,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 36979459,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 17173383,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 699173179,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 501621912,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 20638219173,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 12601948547,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 137982294,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 725516520,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 2269908439,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 6902912896,
      },
    ],
  },
  {
    year: "2020",
    disbursed: 4198792109,
    cumulative: 47475279978,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 1360234653,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 1369764711,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 78756522,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 41843592,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 740717633,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 607474998,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 21998453826,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 13971713258,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 216738816,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 767360112,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 3010626072,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 7510387894,
      },
    ],
  },
  {
    year: "2021",
    disbursed: 1608318355,
    cumulative: 49083598333,
    disbursedChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 440049241,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 521289190,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 38486137,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 11608953,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 421429559,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 175455275,
      },
    ],
    cumulativeChildren: [
      {
        name: "HIV",
        color: "#70777E",
        value: 22438503067,
      },
      {
        name: "Malaria",
        color: "#231d2c",
        value: 14493002448,
      },
      {
        name: "Multicomponent",
        color: "#373D43",
        value: 255224953,
      },
      {
        name: "RSSH",
        color: "#ADB5BD",
        value: 778969065,
      },
      {
        name: "TB/HIV",
        color: "",
        value: 3432055631,
      },
      {
        name: "Tuberculosis",
        color: "#252C34",
        value: 7685843169,
      },
    ],
  },
];
