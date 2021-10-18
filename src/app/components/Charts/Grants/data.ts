export interface GrantsVizProps {
  data: any;
}

export const ratingColor = {
  None: "#fff",
  A1: "#3B873E",
  A2: "#7BC67E",
  B1: "#FFAB00",
  B2: "#FF6D00",
  C: "#E57373",
};

export const statusBorderStyle = {
  Active: "solid",
  "In Closure": "dashed",
  "Administratively Closed": "dotted",
};

export const circleLegendPositions = [
  [
    {
      top: -30,
      left: "49%",
    },
  ],
  [
    {
      top: 150,
      left: 30,
    },
    {
      top: 150,
      right: 30,
    },
  ],
  [
    {
      top: 150,
      left: 30,
    },
    {
      top: -30,
      left: "49%",
    },
    {
      top: 150,
      right: 30,
    },
  ],
  [
    {
      top: 200,
    },
    {
      left: 200,
    },
    {
      right: 200,
    },
    {
      top: 200,
      right: -20,
    },
  ],
  [
    {
      top: 250,
    },
    {
      top: 70,
      left: 100,
    },
    {
      top: -30,
      left: "49%",
    },
    {
      top: 70,
      right: 100,
    },
    {
      top: 250,
      right: 0,
    },
  ],
  [
    {
      top: 275,
    },
    {
      top: 75,
      left: 75,
    },
    {
      top: -30,
      left: 300,
    },
    {
      top: -30,
      right: 300,
    },
    {
      top: 75,
      right: 75,
    },
    {
      top: 275,
      right: 0,
    },
  ],
];

export const mockdata = [
  {
    name: null,
    years: [2012, 2014],
    value: 2054170.36,
    component: "Tuberculosis",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2012, 2014],
        value: 2054170.36,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name:
      "Strengthening and Scaling-up Malaria Prevention and Case Management to Improve Health Status in Afghanistan",
    years: [2015, 2023],
    value: 54891868.16,
    component: "Malaria",
    status: "Active",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2015, 2017],
        value: 19582107,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2018, 2020],
        value: 25510715.87,
        status: "Financial Closure",
        rating: null,
      },
      {
        name: 3,
        years: [2021, 2023],
        value: 9799045.29,
        status: "Active",
        rating: null,
      },
    ],
  },
  {
    name:
      "Scaling Up Innovative Approaches to Respond to TB Challenges and Strengthening Health Systems Initiatives in Afghanistan",
    years: [2015, 2023],
    value: 32330993.22,
    component: "Tuberculosis",
    status: "Active",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2015, 2017],
        value: 11002846,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2018, 2020],
        value: 15757197.37,
        status: "Financial Closure",
        rating: null,
      },
      {
        name: 3,
        years: [2021, 2023],
        value: 5570949.85,
        status: "Active",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2009, 2015],
    value: 17321111.78,
    component: "Tuberculosis",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2009, 2011],
        value: 6669747.68,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2011, 2015],
        value: 10651364.1,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: "Strenthening Provincial HIV Program",
    years: [2008, 2016],
    value: 4342300.6899999995,
    component: "HIV",
    status: "In Closure",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2008, 2013],
        value: 1370648.4,
        status: "Financially Closed",
        rating: "B1",
      },
      {
        name: 2,
        years: [2013, 2016],
        value: 2971652.29,
        status: "Financial Closure",
        rating: "B1",
      },
    ],
  },
  // {
  //   name: "Strenghtening Health System Initiatives in Afghanistan",
  //   years: [2012, 2017],
  //   value: 14829933.72,
  //   component: "RSSH",
  //   status: "Administratively Closed",
  //   rating: "None",
  //   implementationPeriods: [
  //     {
  //       name: 1,
  //       years: [2012, 2015],
  //       value: 11763800.72,
  //       status: "Financially Closed",
  //       rating: null,
  //     },
  //     {
  //       name: 2,
  //       years: [2015, 2017],
  //       value: 3066133,
  //       status: "Financially Closed",
  //       rating: null,
  //     },
  //   ],
  // },
  {
    name:
      "Scaling HIV Interventions among Key Affected Populations in Afghanistan",
    years: [2016, 2023],
    value: 18849461.75,
    component: "HIV",
    status: "Active",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2016, 2017],
        value: 7570496,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2018, 2020],
        value: 8737650.7,
        status: "Financial Closure",
        rating: null,
      },
      {
        name: 3,
        years: [2021, 2023],
        value: 2541315.05,
        status: "Active",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2012, 2015],
    value: 1417951.98,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2012, 2015],
        value: 1417951.98,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2008, 2015],
    value: 8008288,
    component: "HIV",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2008, 2013],
        value: 7288807,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2013, 2015],
        value: 719481,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2009, 2010],
    value: 7171871.31,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2009, 2010],
        value: 7171871.31,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name:
      "Scaling up Innovative Approaches to Respond to TB Challenges and Strengthening Health Systems Initiatives in Afghanistan",
    years: [2015, 2023],
    value: 11856446.620000001,
    component: "Tuberculosis",
    status: "Active",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2015, 2017],
        value: 2041907,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2018, 2020],
        value: 8340947.32,
        status: "Financial Closure",
        rating: null,
      },
      {
        name: 3,
        years: [2021, 2023],
        value: 1473592.3,
        status: "Active",
        rating: null,
      },
    ],
  },
  // {
  //   name: "Strengthening Health Systems in Afghanistan",
  //   years: [2015, 2017],
  //   value: 8454481,
  //   component: "RSSH",
  //   status: "Administratively Closed",
  //   rating: "None",
  //   implementationPeriods: [
  //     {
  //       name: 1,
  //       years: [2015, 2017],
  //       value: 8454481,
  //       status: "Financially Closed",
  //       rating: null,
  //     },
  //   ],
  // },
  {
    name: null,
    years: [2010, 2015],
    value: 5691108.1899999995,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2010, 2012],
        value: 2391281.54,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2012, 2015],
        value: 3299826.65,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2012, 2013],
    value: 289853.94,
    component: "Tuberculosis",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2012, 2013],
        value: 289853.94,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2005, 2009],
    value: 2678960.64,
    component: "Tuberculosis",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2005, 2009],
        value: 2678960.64,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  // {
  //   name: null,
  //   years: [2004, 2006],
  //   value: 3125605,
  //   component: "RSSH",
  //   status: "Administratively Closed",
  //   rating: "None",
  //   implementationPeriods: [
  //     {
  //       name: 1,
  //       years: [2004, 2006],
  //       value: 3125605,
  //       status: "Financially Closed",
  //       rating: null,
  //     },
  //   ],
  // },
  {
    name: null,
    years: [2010, 2012],
    value: 2810463.97,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2010, 2012],
        value: 2810463.97,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2010, 2015],
    value: 44027786.11,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2010, 2011],
        value: 9856483.57,
        status: "Financially Closed",
        rating: null,
      },
      {
        name: 2,
        years: [2012, 2015],
        value: 34171302.54,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
  {
    name: null,
    years: [2006, 2011],
    value: 16713179.95,
    component: "Malaria",
    status: "Administratively Closed",
    rating: "None",
    implementationPeriods: [
      {
        name: 1,
        years: [2006, 2011],
        value: 16713179.95,
        status: "Financially Closed",
        rating: null,
      },
    ],
  },
];
