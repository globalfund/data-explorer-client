export interface ResultListItemModel {
  id: string;
  title: string;
  value: number;
  component: string;
  geoLocations: {
    name: string;
    value: number;
  }[];
}

export interface ResultsListProps {
  listitems: ResultListItemModel[];
}

export const resultsmockitems: ResultListItemModel[] = [
  {
    id: "2ba6c112-4844-4f71-a869-00031c26cccf",
    title: "Cases of malaria treated",
    value: 124375749,
    component: "Malaria",
    geoLocations: [
      {
        name: "Eritrea",
        value: 105092,
      },
      {
        name: "Central African Republic",
        value: 1763411,
      },
      {
        name: "Nepal",
        value: 685,
      },
      {
        name: "Timor-Leste",
        value: 9,
      },
      {
        name: "Guyana",
        value: 12463,
      },
      {
        name: "Sudan",
        value: 36619,
      },
      {
        name: "Benin",
        value: 611527,
      },
      {
        name: "Bhutan",
        value: 27,
      },
      {
        name: "South Sudan",
        value: 122665,
      },
      {
        name: "Guatemala",
        value: 2022,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 6551,
      },
      {
        name: "Cameroon",
        value: 822370,
      },
      {
        name: "Pakistan",
        value: 472670,
      },
      {
        name: "Malawi",
        value: 5089716,
      },
      {
        name: "Papua New Guinea",
        value: 540826,
      },
      {
        name: "Viet Nam",
        value: 4665,
      },
      {
        name: "Myanmar",
        value: 38359,
      },
      {
        name: "Botswana",
        value: 79,
      },
      {
        name: "Mali",
        value: 1943043,
      },
      {
        name: "Nicaragua",
        value: 13135,
      },
      {
        name: "Zimbabwe",
        value: 302643,
      },
      {
        name: "Côte d'Ivoire",
        value: 5205665,
      },
      {
        name: "Ghana",
        value: 4352040,
      },
      {
        name: "Philippines",
        value: 5298,
      },
      {
        name: "Mozambique",
        value: 10833036,
      },
      {
        name: "Somalia",
        value: 38112,
      },
      {
        name: "Uganda",
        value: 9728920,
      },
      {
        name: "Guinea-Bissau",
        value: 149107,
      },
      {
        name: "Togo",
        value: 2275129,
      },
      {
        name: "Thailand",
        value: 4036,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 1869,
      },
      {
        name: "Djibouti",
        value: 47691,
      },
      {
        name: "Cambodia",
        value: 31664,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 12446559,
      },
      {
        name: "Liberia",
        value: 953523,
      },
      {
        name: "Burundi",
        value: 8444710,
      },
      {
        name: "Gambia",
        value: 65926,
      },
      {
        name: "Kenya",
        value: 6374080,
      },
      {
        name: "Zambia",
        value: 3042341,
      },
      {
        name: "Nigeria",
        value: 20684338,
      },
      {
        name: "Guinea",
        value: 1696515,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 10416,
      },
      {
        name: "Sierra Leone",
        value: 2177143,
      },
      {
        name: "Honduras",
        value: 338,
      },
      {
        name: "Eswatini",
        value: 587,
      },
      {
        name: "Haiti",
        value: 8861,
      },
      {
        name: "Chad",
        value: 1547687,
      },
      {
        name: "Burkina Faso",
        value: 10435758,
      },
      {
        name: "Zanzibar",
        value: 5082,
      },
      {
        name: "Suriname",
        value: 202,
      },
      {
        name: "Niger",
        value: 503758,
      },
      {
        name: "Indonesia",
        value: 238147,
      },
      {
        name: "Madagascar",
        value: 1008480,
      },
      {
        name: "Comoros",
        value: 11593,
      },
      {
        name: "Afghanistan",
        value: 112247,
      },
      {
        name: "Tanzania (United Republic)",
        value: 8284106,
      },
      {
        name: "Namibia",
        value: 2227,
      },
      {
        name: "Senegal",
        value: 360081,
      },
      {
        name: "Ethiopia",
        value: 1383326,
      },
      {
        name: "Bangladesh",
        value: 14117,
      },
      {
        name: "Sao Tome and Principe",
        value: 2457,
      },
    ],
  },
  {
    id: "2f68a8e5-098a-44e1-94fd-002cbc9958e7",
    title: "Treatment success rate for all forms TB cases",
    value: 3165516,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Uzbekistan",
        value: 13267,
      },
      {
        name: "Liberia",
        value: 5486,
      },
      {
        name: "Ethiopia",
        value: 93061,
      },
      {
        name: "Myanmar",
        value: 116264,
      },
      {
        name: "Nepal",
        value: 29770,
      },
      {
        name: "Belize",
        value: 63,
      },
      {
        name: "Mozambique",
        value: 83416,
      },
      {
        name: "Dominican Republic",
        value: 2975,
      },
      {
        name: "Côte d'Ivoire",
        value: 17553,
      },
      {
        name: "Philippines",
        value: 289524,
      },
      {
        name: "Paraguay",
        value: 1704,
      },
      {
        name: "Angola",
        value: 34463,
      },
      {
        name: "Pakistan",
        value: 329197,
      },
      {
        name: "Somalia",
        value: 14592,
      },
      {
        name: "India",
        value: 1170418,
      },
      {
        name: "Guyana",
        value: 362,
      },
      {
        name: "Suriname",
        value: 155,
      },
      {
        name: "Sudan",
        value: 8832,
      },
      {
        name: "Rwanda",
        value: 2433,
      },
      {
        name: "Comoros",
        value: 94,
      },
      {
        name: "Morocco",
        value: 27014,
      },
      {
        name: "Afghanistan",
        value: 41060,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 74757,
      },
      {
        name: "Benin",
        value: 3495,
      },
      {
        name: "Uganda",
        value: 42010,
      },
      {
        name: "Malawi",
        value: 12862,
      },
      {
        name: "Burkina Faso",
        value: 4917,
      },
      {
        name: "Djibouti",
        value: 1683,
      },
      {
        name: "Haiti",
        value: 11155,
      },
      {
        name: "Ghana",
        value: 11343,
      },
      {
        name: "Bangladesh",
        value: 253082,
      },
      {
        name: "Peru",
        value: 45786,
      },
      {
        name: "Cabo Verde",
        value: 178,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 63156,
      },
      {
        name: "Gabon",
        value: 2679,
      },
      {
        name: "Central African Republic",
        value: 8270,
      },
      {
        name: "Gambia",
        value: 2107,
      },
      {
        name: "Honduras",
        value: 2444,
      },
      {
        name: "Guinea-Bissau",
        value: 1580,
      },
      {
        name: "Albania",
        value: 388,
      },
      {
        name: "Nicaragua",
        value: 1832,
      },
      {
        name: "El Salvador",
        value: 1833,
      },
      {
        name: "Mauritania",
        value: 908,
      },
      {
        name: "Bhutan",
        value: 411,
      },
      {
        name: "Panama",
        value: 1287,
      },
      {
        name: "Chad",
        value: 12475,
      },
      {
        name: "Togo",
        value: 1031,
      },
      {
        name: "Mongolia",
        value: 3438,
      },
      {
        name: "Guatemala",
        value: 5695,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 5783,
      },
      {
        name: "Congo",
        value: 6923,
      },
      {
        name: "Papua New Guinea",
        value: 20185,
      },
      {
        name: "Lesotho",
        value: 5479,
      },
      {
        name: "Viet Nam",
        value: 89999,
      },
      {
        name: "Kenya",
        value: 76478,
      },
      {
        name: "Burundi",
        value: 5182,
      },
      {
        name: "Eritrea",
        value: 1737,
      },
      {
        name: "Guinea",
        value: 12895,
      },
      {
        name: "Cameroon",
        value: 19780,
      },
      {
        name: "Sri Lanka",
        value: 7031,
      },
      {
        name: "Niger",
        value: 8689,
      },
      {
        name: "Mali",
        value: 5519,
      },
      {
        name: "Sao Tome and Principe",
        value: 108,
      },
      {
        name: "Timor-Leste",
        value: 3451,
      },
      {
        name: "Senegal",
        value: 11753,
      },
      {
        name: "Oceania",
        value: 899,
      },
      {
        name: "Caribbean",
        value: 21,
      },
      {
        name: "Madagascar",
        value: 24898,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 6201,
      },
    ],
  },
  {
    id: "08b886ff-01c2-4266-9056-005445f0b4a3",
    title: "People who use drugs reached with HIV prevention programs",
    value: 1032880,
    component: "HIV",
    geoLocations: [
      {
        name: "Montenegro",
        value: 1306,
      },
      {
        name: "Morocco",
        value: 925,
      },
      {
        name: "Mauritius",
        value: 12115,
      },
      {
        name: "Côte d'Ivoire",
        value: 4587,
      },
      {
        name: "Serbia",
        value: 345,
      },
      {
        name: "Tunisia",
        value: 9240,
      },
      {
        name: "Madagascar",
        value: 1955,
      },
      {
        name: "Nigeria",
        value: 5422,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 7855,
      },
      {
        name: "Bangladesh",
        value: 10368,
      },
      {
        name: "Kyrgyzstan",
        value: 16195,
      },
      {
        name: "Egypt",
        value: 549,
      },
      {
        name: "Indonesia",
        value: 28708,
      },
      {
        name: "Myanmar",
        value: 46222,
      },
      {
        name: "Colombia",
        value: 2425,
      },
      {
        name: "Nepal",
        value: 26280,
      },
      {
        name: "South Africa",
        value: 3053,
      },
      {
        name: "Armenia",
        value: 4053,
      },
      {
        name: "Zanzibar",
        value: 4326,
      },
      {
        name: "Eswatini",
        value: 452,
      },
      {
        name: "Viet Nam",
        value: 132804,
      },
      {
        name: "Uzbekistan",
        value: 28968,
      },
      {
        name: "Moldova",
        value: 15627,
      },
      {
        name: "Ukraine",
        value: 328130,
      },
      {
        name: "Tajikistan",
        value: 27818,
      },
      {
        name: "Albania",
        value: 1477,
      },
      {
        name: "Sri Lanka",
        value: 365,
      },
      {
        name: "Tanzania (United Republic)",
        value: 8525,
      },
      {
        name: "Afghanistan",
        value: 8265,
      },
      {
        name: "Thailand",
        value: 3618,
      },
      {
        name: "Kosovo",
        value: 3204,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 112022,
      },
      {
        name: "Azerbaijan",
        value: 31540,
      },
      {
        name: "Benin",
        value: 2039,
      },
      {
        name: "Pakistan",
        value: 27515,
      },
      {
        name: "Belarus",
        value: 46764,
      },
      {
        name: "Cambodia",
        value: 485,
      },
      {
        name: "Senegal",
        value: 1999,
      },
      {
        name: "Kazakhstan",
        value: 17274,
      },
      {
        name: "Kenya",
        value: 12249,
      },
      {
        name: "Georgia",
        value: 35811,
      },
    ],
  },
  {
    id: "d87ad775-89ce-44a5-b9f2-00ccbe2c8dc5",
    title: "People aged 10-24 years reached with HIV prevention programs",
    value: 3385147,
    component: "HIV",
    geoLocations: [
      {
        name: "Kenya",
        value: 54043,
      },
      {
        name: "Namibia",
        value: 284751,
      },
      {
        name: "South Africa",
        value: 16028,
      },
      {
        name: "Central African Republic",
        value: 15042,
      },
      {
        name: "Zimbabwe",
        value: 29512,
      },
      {
        name: "Tanzania (United Republic)",
        value: 159186,
      },
      {
        name: "Malawi",
        value: 1023826,
      },
      {
        name: "Chad",
        value: 292788,
      },
      {
        name: "Togo",
        value: 12775,
      },
      {
        name: "Botswana",
        value: 5851,
      },
      {
        name: "Eswatini",
        value: 60042,
      },
      {
        name: "Lesotho",
        value: 185926,
      },
      {
        name: "Côte d'Ivoire",
        value: 168847,
      },
      {
        name: "Zambia",
        value: 276509,
      },
      {
        name: "Mozambique",
        value: 456077,
      },
      {
        name: "Cameroon",
        value: 43310,
      },
      {
        name: "Angola",
        value: 40428,
      },
      {
        name: "Madagascar",
        value: 219712,
      },
      {
        name: "Uganda",
        value: 36910,
      },
      {
        name: "Cabo Verde",
        value: 3584,
      },
    ],
  },
  {
    id: "20d8ca87-60e0-470e-9d12-00d5e35931f7",
    title: "Men who have sex with men reached with HIV prevention programs",
    value: 1832694,
    component: "HIV",
    geoLocations: [
      {
        name: "Pakistan",
        value: 12317,
      },
      {
        name: "Viet Nam",
        value: 26813,
      },
      {
        name: "Belize",
        value: 1040,
      },
      {
        name: "Azerbaijan",
        value: 12537,
      },
      {
        name: "Burundi",
        value: 14801,
      },
      {
        name: "Bangladesh",
        value: 58977,
      },
      {
        name: "Central African Republic",
        value: 852,
      },
      {
        name: "Cuba",
        value: 257253,
      },
      {
        name: "Mali",
        value: 10393,
      },
      {
        name: "Tunisia",
        value: 11415,
      },
      {
        name: "Mozambique",
        value: 2904,
      },
      {
        name: "Ecuador",
        value: 37360,
      },
      {
        name: "Tajikistan",
        value: 13799,
      },
      {
        name: "Kenya",
        value: 16687,
      },
      {
        name: "Uganda",
        value: 6289,
      },
      {
        name: "Panama",
        value: 8128,
      },
      {
        name: "Armenia",
        value: 7883,
      },
      {
        name: "Jamaica",
        value: 5845,
      },
      {
        name: "Burkina Faso",
        value: 3841,
      },
      {
        name: "Serbia",
        value: 1047,
      },
      {
        name: "Guinea",
        value: 1902,
      },
      {
        name: "Timor-Leste",
        value: 1193,
      },
      {
        name: "Zimbabwe",
        value: 4282,
      },
      {
        name: "Suriname",
        value: 876,
      },
      {
        name: "Kosovo",
        value: 1746,
      },
      {
        name: "Myanmar",
        value: 85597,
      },
      {
        name: "Nicaragua",
        value: 19593,
      },
      {
        name: "Montenegro",
        value: 895,
      },
      {
        name: "Haiti",
        value: 37516,
      },
      {
        name: "Malaysia",
        value: 5100,
      },
      {
        name: "Togo",
        value: 7497,
      },
      {
        name: "Malawi",
        value: 4564,
      },
      {
        name: "Kazakhstan",
        value: 5169,
      },
      {
        name: "Philippines",
        value: 127174,
      },
      {
        name: "Kyrgyzstan",
        value: 9565,
      },
      {
        name: "Papua New Guinea",
        value: 7024,
      },
      {
        name: "Egypt",
        value: 269,
      },
      {
        name: "Georgia",
        value: 8798,
      },
      {
        name: "South Africa",
        value: 3131,
      },
      {
        name: "Honduras",
        value: 12718,
      },
      {
        name: "Comoros",
        value: 314,
      },
      {
        name: "Nepal",
        value: 51757,
      },
      {
        name: "Angola",
        value: 989,
      },
      {
        name: "Colombia",
        value: 42945,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 10377,
      },
      {
        name: "Costa Rica",
        value: 3792,
      },
      {
        name: "Dominican Republic",
        value: 104522,
      },
      {
        name: "Madagascar",
        value: 13670,
      },
      {
        name: "Cameroon",
        value: 8035,
      },
      {
        name: "Caribbean",
        value: 562,
      },
      {
        name: "Zanzibar",
        value: 3937,
      },
      {
        name: "Peru",
        value: 119048,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 1399,
      },
      {
        name: "Côte d'Ivoire",
        value: 4153,
      },
      {
        name: "Botswana",
        value: 1976,
      },
      {
        name: "Paraguay",
        value: 7607,
      },
      {
        name: "Tanzania (United Republic)",
        value: 5587,
      },
      {
        name: "Cambodia",
        value: 17647,
      },
      {
        name: "Ghana",
        value: 9815,
      },
      {
        name: "Moldova",
        value: 4376,
      },
      {
        name: "Thailand",
        value: 4375,
      },
      {
        name: "Afghanistan",
        value: 11045,
      },
      {
        name: "Indonesia",
        value: 278104,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 27017,
      },
      {
        name: "Sierra Leone",
        value: 10721,
      },
      {
        name: "Liberia",
        value: 6520,
      },
      {
        name: "Guatemala",
        value: 16702,
      },
      {
        name: "Mauritius",
        value: 1702,
      },
      {
        name: "Mongolia",
        value: 2783,
      },
      {
        name: "Ukraine",
        value: 60556,
      },
      {
        name: "Morocco",
        value: 27642,
      },
      {
        name: "Lesotho",
        value: 7907,
      },
      {
        name: "Oceania",
        value: 1472,
      },
      {
        name: "Albania",
        value: 1103,
      },
      {
        name: "Belarus",
        value: 12820,
      },
      {
        name: "Eswatini",
        value: 1278,
      },
      {
        name: "Namibia",
        value: 394,
      },
      {
        name: "Sudan",
        value: 25661,
      },
      {
        name: "Nigeria",
        value: 22711,
      },
      {
        name: "Guinea-Bissau",
        value: 780,
      },
      {
        name: "Zambia",
        value: 2282,
      },
      {
        name: "El Salvador",
        value: 24606,
      },
      {
        name: "Guyana",
        value: 2189,
      },
      {
        name: "Sri Lanka",
        value: 4102,
      },
      {
        name: "Bhutan",
        value: 93,
      },
      {
        name: "Uzbekistan",
        value: 2242,
      },
      {
        name: "Benin",
        value: 6390,
      },
      {
        name: "Niger",
        value: 2199,
      },
    ],
  },
  {
    id: "f7a2ac95-0176-4120-b4ab-00db5925c5c8",
    title: "People receiving Opioid Substitution Therapy",
    value: 69540,
    component: "HIV",
    geoLocations: [
      {
        name: "Senegal",
        value: 174,
      },
      {
        name: "Cambodia",
        value: 86,
      },
      {
        name: "Morocco",
        value: 182,
      },
      {
        name: "Afghanistan",
        value: 632,
      },
      {
        name: "Kosovo",
        value: 32,
      },
      {
        name: "Bangladesh",
        value: 1257,
      },
      {
        name: "Zanzibar",
        value: 1096,
      },
      {
        name: "Ukraine",
        value: 456,
      },
      {
        name: "Kyrgyzstan",
        value: 114,
      },
      {
        name: "Indonesia",
        value: 5,
      },
      {
        name: "Viet Nam",
        value: 45179,
      },
      {
        name: "South Africa",
        value: 72,
      },
      {
        name: "Thailand",
        value: 28,
      },
      {
        name: "Tajikistan",
        value: 144,
      },
      {
        name: "Myanmar",
        value: 19991,
      },
      {
        name: "Armenia",
        value: 92,
      },
    ],
  },
  {
    id: "cf9bd9e9-68f1-4b6e-a75b-00e0beda1869",
    title: "Rifampicin- and/or multidrug-resistant TB cases notified",
    value: 131902,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Cambodia",
        value: 135,
      },
      {
        name: "Kyrgyzstan",
        value: 1440,
      },
      {
        name: "Ghana",
        value: 252,
      },
      {
        name: "Haiti",
        value: 149,
      },
      {
        name: "Honduras",
        value: 5,
      },
      {
        name: "Africa",
        value: 94,
      },
      {
        name: "Papua New Guinea",
        value: 574,
      },
      {
        name: "Lesotho",
        value: 185,
      },
      {
        name: "South Sudan",
        value: 68,
      },
      {
        name: "Guatemala",
        value: 103,
      },
      {
        name: "Madagascar",
        value: 78,
      },
      {
        name: "Zambia",
        value: 556,
      },
      {
        name: "Chad",
        value: 85,
      },
      {
        name: "Timor-Leste",
        value: 9,
      },
      {
        name: "Tanzania (United Republic)",
        value: 535,
      },
      {
        name: "Gabon",
        value: 63,
      },
      {
        name: "Viet Nam",
        value: 3434,
      },
      {
        name: "Bhutan",
        value: 31,
      },
      {
        name: "Kenya",
        value: 681,
      },
      {
        name: "Burundi",
        value: 64,
      },
      {
        name: "Guinea",
        value: 303,
      },
      {
        name: "Indonesia",
        value: 10024,
      },
      {
        name: "Guinea-Bissau",
        value: 33,
      },
      {
        name: "Turkmenistan",
        value: 838,
      },
      {
        name: "Niger",
        value: 79,
      },
      {
        name: "Egypt",
        value: 118,
      },
      {
        name: "Nepal",
        value: 622,
      },
      {
        name: "Moldova",
        value: 631,
      },
      {
        name: "Central African Republic",
        value: 103,
      },
      {
        name: "South Africa",
        value: 2859,
      },
      {
        name: "Ethiopia",
        value: 653,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 121,
      },
      {
        name: "Pakistan",
        value: 2866,
      },
      {
        name: "Senegal",
        value: 58,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 914,
      },
      {
        name: "Belarus",
        value: 1180,
      },
      {
        name: "Ukraine",
        value: 6489,
      },
      {
        name: "Sudan",
        value: 221,
      },
      {
        name: "Eritrea",
        value: 17,
      },
      {
        name: "Panama",
        value: 36,
      },
      {
        name: "Mozambique",
        value: 1358,
      },
      {
        name: "Djibouti",
        value: 49,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 2354,
      },
      {
        name: "Angola",
        value: 1345,
      },
      {
        name: "Benin",
        value: 29,
      },
      {
        name: "Zanzibar",
        value: 8,
      },
      {
        name: "Bangladesh",
        value: 1384,
      },
      {
        name: "Peru",
        value: 548,
      },
      {
        name: "Dominican Republic",
        value: 179,
      },
      {
        name: "Azerbaijan",
        value: 752,
      },
      {
        name: "Suriname",
        value: 12,
      },
      {
        name: "Morocco",
        value: 233,
      },
      {
        name: "Mongolia",
        value: 211,
      },
      {
        name: "Tajikistan",
        value: 1272,
      },
      {
        name: "Togo",
        value: 9,
      },
      {
        name: "Uzbekistan",
        value: 3535,
      },
      {
        name: "India",
        value: 66470,
      },
      {
        name: "Congo",
        value: 151,
      },
      {
        name: "Mauritania",
        value: 22,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 48,
      },
      {
        name: "Nicaragua",
        value: 70,
      },
      {
        name: "Philippines",
        value: 6452,
      },
      {
        name: "Somalia",
        value: 372,
      },
      {
        name: "Myanmar",
        value: 3205,
      },
      {
        name: "Côte d'Ivoire",
        value: 396,
      },
      {
        name: "Nigeria",
        value: 2384,
      },
      {
        name: "Gambia",
        value: 8,
      },
      {
        name: "Burkina Faso",
        value: 74,
      },
      {
        name: "Liberia",
        value: 101,
      },
      {
        name: "Eswatini",
        value: 158,
      },
      {
        name: "Armenia",
        value: 65,
      },
      {
        name: "Thailand",
        value: 1067,
      },
      {
        name: "Sao Tome and Principe",
        value: 2,
      },
      {
        name: "Malawi",
        value: 102,
      },
      {
        name: "Afghanistan",
        value: 486,
      },
      {
        name: "Sri Lanka",
        value: 21,
      },
      {
        name: "Botswana",
        value: 52,
      },
      {
        name: "Paraguay",
        value: 14,
      },
      {
        name: "Cameroon",
        value: 198,
      },
    ],
  },
  {
    id: "15bbb4d5-aa66-4452-8ec8-00e206294525",
    title:
      "Rifampicin- and/or multidrug-resistant TB cases that began second-line treatment",
    value: 125194,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Congo (Democratic Republic)",
        value: 791,
      },
      {
        name: "Cambodia",
        value: 135,
      },
      {
        name: "Bhutan",
        value: 31,
      },
      {
        name: "Angola",
        value: 640,
      },
      {
        name: "Armenia",
        value: 67,
      },
      {
        name: "Chad",
        value: 76,
      },
      {
        name: "Tajikistan",
        value: 1041,
      },
      {
        name: "Benin",
        value: 25,
      },
      {
        name: "Somalia",
        value: 369,
      },
      {
        name: "Bangladesh",
        value: 1243,
      },
      {
        name: "Guinea-Bissau",
        value: 26,
      },
      {
        name: "South Africa",
        value: 8634,
      },
      {
        name: "Mauritania",
        value: 22,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 39,
      },
      {
        name: "Morocco",
        value: 233,
      },
      {
        name: "Myanmar",
        value: 2581,
      },
      {
        name: "Cabo Verde",
        value: 2,
      },
      {
        name: "Zambia",
        value: 494,
      },
      {
        name: "Ukraine",
        value: 7517,
      },
      {
        name: "Congo",
        value: 120,
      },
      {
        name: "Senegal",
        value: 48,
      },
      {
        name: "Turkmenistan",
        value: 838,
      },
      {
        name: "Guatemala",
        value: 79,
      },
      {
        name: "Sao Tome and Principe",
        value: 2,
      },
      {
        name: "Nicaragua",
        value: 63,
      },
      {
        name: "Papua New Guinea",
        value: 362,
      },
      {
        name: "Pakistan",
        value: 2998,
      },
      {
        name: "Haiti",
        value: 105,
      },
      {
        name: "Oceania",
        value: 5,
      },
      {
        name: "Cameroon",
        value: 167,
      },
      {
        name: "Dominican Republic",
        value: 159,
      },
      {
        name: "El Salvador",
        value: 21,
      },
      {
        name: "Kenya",
        value: 681,
      },
      {
        name: "Honduras",
        value: 12,
      },
      {
        name: "Namibia",
        value: 193,
      },
      {
        name: "Côte d'Ivoire",
        value: 393,
      },
      {
        name: "Togo",
        value: 4,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 113,
      },
      {
        name: "Zanzibar",
        value: 8,
      },
      {
        name: "Lesotho",
        value: 180,
      },
      {
        name: "Uzbekistan",
        value: 2267,
      },
      {
        name: "Guinea",
        value: 234,
      },
      {
        name: "Peru",
        value: 2709,
      },
      {
        name: "Niger",
        value: 65,
      },
      {
        name: "Kyrgyzstan",
        value: 1339,
      },
      {
        name: "Afghanistan",
        value: 379,
      },
      {
        name: "Belarus",
        value: 1058,
      },
      {
        name: "Guyana",
        value: 13,
      },
      {
        name: "Paraguay",
        value: 14,
      },
      {
        name: "Nigeria",
        value: 1975,
      },
      {
        name: "Eswatini",
        value: 161,
      },
      {
        name: "Mali",
        value: 41,
      },
      {
        name: "Mongolia",
        value: 193,
      },
      {
        name: "Azerbaijan",
        value: 1005,
      },
      {
        name: "Georgia",
        value: 298,
      },
      {
        name: "Sudan",
        value: 206,
      },
      {
        name: "Viet Nam",
        value: 3243,
      },
      {
        name: "Kazakhstan",
        value: 6118,
      },
      {
        name: "Timor-Leste",
        value: 8,
      },
      {
        name: "Djibouti",
        value: 44,
      },
      {
        name: "Indonesia",
        value: 5479,
      },
      {
        name: "Sri Lanka",
        value: 21,
      },
      {
        name: "Malawi",
        value: 104,
      },
      {
        name: "Nepal",
        value: 429,
      },
      {
        name: "Burundi",
        value: 64,
      },
      {
        name: "South Sudan",
        value: 61,
      },
      {
        name: "Ghana",
        value: 216,
      },
      {
        name: "Ethiopia",
        value: 604,
      },
      {
        name: "Botswana",
        value: 52,
      },
      {
        name: "Mozambique",
        value: 1306,
      },
      {
        name: "Thailand",
        value: 916,
      },
      {
        name: "Panama",
        value: 36,
      },
      {
        name: "Egypt",
        value: 98,
      },
      {
        name: "Sierra Leone",
        value: 144,
      },
      {
        name: "India",
        value: 52278,
      },
      {
        name: "Zimbabwe",
        value: 342,
      },
      {
        name: "Philippines",
        value: 6360,
      },
      {
        name: "Burkina Faso",
        value: 59,
      },
      {
        name: "Moldova",
        value: 883,
      },
      {
        name: "Liberia",
        value: 80,
      },
      {
        name: "Gabon",
        value: 53,
      },
      {
        name: "Eritrea",
        value: 17,
      },
      {
        name: "Madagascar",
        value: 50,
      },
      {
        name: "Gambia",
        value: 8,
      },
      {
        name: "Central African Republic",
        value: 91,
      },
      {
        name: "Albania",
        value: 6,
      },
      {
        name: "Uganda",
        value: 549,
      },
      {
        name: "Tanzania (United Republic)",
        value: 510,
      },
      {
        name: "Western Asia",
        value: 179,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 2312,
      },
    ],
  },
  {
    id: "e8efe24d-97a0-472e-8294-00ee7b887921",
    title:
      "People on ART with suppressed viral load at 12 months (<1000 copies/ml)",
    value: 2234576,
    component: "HIV",
    geoLocations: [
      {
        name: "Malawi",
        value: 1527287,
      },
      {
        name: "Rwanda",
        value: 528,
      },
      {
        name: "Liberia",
        value: 3127,
      },
      {
        name: "Uzbekistan",
        value: 3164,
      },
      {
        name: "Guinea",
        value: 478,
      },
      {
        name: "Viet Nam",
        value: 61452,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 7045,
      },
      {
        name: "Algeria",
        value: 8411,
      },
      {
        name: "Djibouti",
        value: 27,
      },
      {
        name: "South Africa",
        value: 12801,
      },
      {
        name: "Burkina Faso",
        value: 2083,
      },
      {
        name: "Sudan",
        value: 181,
      },
      {
        name: "India",
        value: 89630,
      },
      {
        name: "Honduras",
        value: 209,
      },
      {
        name: "Pakistan",
        value: 937,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 880,
      },
      {
        name: "Armenia",
        value: 288,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 4350,
      },
      {
        name: "El Salvador",
        value: 664,
      },
      {
        name: "Sri Lanka",
        value: 243,
      },
      {
        name: "Indonesia",
        value: 2207,
      },
      {
        name: "Cuba",
        value: 1224,
      },
      {
        name: "Guatemala",
        value: 1218,
      },
      {
        name: "Eswatini",
        value: 84967,
      },
      {
        name: "Chad",
        value: 1259,
      },
      {
        name: "Zanzibar",
        value: 9311,
      },
      {
        name: "Togo",
        value: 614,
      },
      {
        name: "Cameroon",
        value: 3398,
      },
      {
        name: "Bhutan",
        value: 17,
      },
      {
        name: "Lesotho",
        value: 120652,
      },
      {
        name: "Jamaica",
        value: 1072,
      },
      {
        name: "Papua New Guinea",
        value: 371,
      },
      {
        name: "Guyana",
        value: 125,
      },
      {
        name: "Myanmar",
        value: 7294,
      },
      {
        name: "Ghana",
        value: 63526,
      },
      {
        name: "Afghanistan",
        value: 53,
      },
      {
        name: "Namibia",
        value: 4728,
      },
      {
        name: "Senegal",
        value: 409,
      },
      {
        name: "Congo",
        value: 543,
      },
      {
        name: "Central African Republic",
        value: 2013,
      },
      {
        name: "Cabo Verde",
        value: 142,
      },
      {
        name: "Timor-Leste",
        value: 109,
      },
      {
        name: "Kyrgyzstan",
        value: 2151,
      },
      {
        name: "Nicaragua",
        value: 313,
      },
      {
        name: "Tajikistan",
        value: 976,
      },
      {
        name: "Botswana",
        value: 201219,
      },
      {
        name: "Nepal",
        value: 880,
      },
    ],
  },
  {
    id: "48938183-0d3c-45fd-8c4d-011f07496417",
    title: "Number of HIV tests taken among sex workers",
    value: 1236819,
    component: "HIV",
    geoLocations: [
      {
        name: "Uganda",
        value: 37625,
      },
      {
        name: "Burkina Faso",
        value: 19660,
      },
      {
        name: "Morocco",
        value: 19213,
      },
      {
        name: "Oceania",
        value: 1364,
      },
      {
        name: "Madagascar",
        value: 96022,
      },
      {
        name: "Papua New Guinea",
        value: 11123,
      },
      {
        name: "Nigeria",
        value: 43848,
      },
      {
        name: "Zanzibar",
        value: 5509,
      },
      {
        name: "Ghana",
        value: 22717,
      },
      {
        name: "Malaysia",
        value: 572,
      },
      {
        name: "Sierra Leone",
        value: 45374,
      },
      {
        name: "Nepal",
        value: 10968,
      },
      {
        name: "Namibia",
        value: 1879,
      },
      {
        name: "Albania",
        value: 234,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 41471,
      },
      {
        name: "Moldova",
        value: 4980,
      },
      {
        name: "Tajikistan",
        value: 10416,
      },
      {
        name: "Gambia",
        value: 1075,
      },
      {
        name: "Panama",
        value: 2010,
      },
      {
        name: "Afghanistan",
        value: 2495,
      },
      {
        name: "Belarus",
        value: 4879,
      },
      {
        name: "Cameroon",
        value: 24584,
      },
      {
        name: "Togo",
        value: 8845,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 40996,
      },
      {
        name: "Niger",
        value: 3047,
      },
      {
        name: "Bangladesh",
        value: 14808,
      },
      {
        name: "Suriname",
        value: 858,
      },
      {
        name: "Ethiopia",
        value: 116830,
      },
      {
        name: "Benin",
        value: 12743,
      },
      {
        name: "Honduras",
        value: 2128,
      },
      {
        name: "Dominican Republic",
        value: 70653,
      },
      {
        name: "Mozambique",
        value: 21615,
      },
      {
        name: "Senegal",
        value: 5916,
      },
      {
        name: "Eritrea",
        value: 3375,
      },
      {
        name: "Botswana",
        value: 1659,
      },
      {
        name: "Uzbekistan",
        value: 9059,
      },
      {
        name: "Indonesia",
        value: 76767,
      },
      {
        name: "Sri Lanka",
        value: 4599,
      },
      {
        name: "Timor-Leste",
        value: 2387,
      },
      {
        name: "Cabo Verde",
        value: 1388,
      },
      {
        name: "Chad",
        value: 194,
      },
      {
        name: "Paraguay",
        value: 2225,
      },
      {
        name: "Viet Nam",
        value: 41244,
      },
      {
        name: "Tunisia",
        value: 3398,
      },
      {
        name: "Guatemala",
        value: 4378,
      },
      {
        name: "Serbia",
        value: 72,
      },
      {
        name: "Kosovo",
        value: 237,
      },
      {
        name: "Guinea-Bissau",
        value: 769,
      },
      {
        name: "Central African Republic",
        value: 1361,
      },
      {
        name: "Bhutan",
        value: 471,
      },
      {
        name: "Guyana",
        value: 2821,
      },
      {
        name: "El Salvador",
        value: 7118,
      },
      {
        name: "South Sudan",
        value: 14730,
      },
      {
        name: "Armenia",
        value: 2231,
      },
      {
        name: "Kyrgyzstan",
        value: 3399,
      },
      {
        name: "Jamaica",
        value: 6059,
      },
      {
        name: "Ukraine",
        value: 37120,
      },
      {
        name: "Mongolia",
        value: 2945,
      },
      {
        name: "Myanmar",
        value: 55739,
      },
      {
        name: "South Africa",
        value: 3347,
      },
      {
        name: "Algeria",
        value: 7477,
      },
      {
        name: "Haiti",
        value: 35523,
      },
      {
        name: "Zimbabwe",
        value: 15542,
      },
      {
        name: "Comoros",
        value: 784,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 9288,
      },
      {
        name: "Mauritius",
        value: 1023,
      },
      {
        name: "Eswatini",
        value: 82,
      },
      {
        name: "Guinea",
        value: 9239,
      },
      {
        name: "Malawi",
        value: 4671,
      },
      {
        name: "Pakistan",
        value: 1591,
      },
      {
        name: "Caribbean",
        value: 260,
      },
      {
        name: "Georgia",
        value: 2632,
      },
      {
        name: "Lesotho",
        value: 1770,
      },
      {
        name: "Azerbaijan",
        value: 15507,
      },
      {
        name: "Liberia",
        value: 13056,
      },
      {
        name: "Cuba",
        value: 58584,
      },
      {
        name: "Sudan",
        value: 14983,
      },
      {
        name: "Nicaragua",
        value: 11664,
      },
      {
        name: "Montenegro",
        value: 4,
      },
      {
        name: "Burundi",
        value: 37590,
      },
    ],
  },
  {
    id: "4c424f4a-cff2-48b1-b87a-013c35a03836",
    title: "People with TB treated",
    value: 5765786,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Sudan",
        value: 20273,
      },
      {
        name: "Cameroon",
        value: 24673,
      },
      {
        name: "Sao Tome and Principe",
        value: 142,
      },
      {
        name: "Cambodia",
        value: 29906,
      },
      {
        name: "Caribbean",
        value: 25,
      },
      {
        name: "Congo",
        value: 11773,
      },
      {
        name: "Timor-Leste",
        value: 4240,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 6816,
      },
      {
        name: "Burundi",
        value: 6827,
      },
      {
        name: "Viet Nam",
        value: 101749,
      },
      {
        name: "Mongolia",
        value: 4089,
      },
      {
        name: "Eswatini",
        value: 2859,
      },
      {
        name: "Zambia",
        value: 35061,
      },
      {
        name: "Dominican Republic",
        value: 3749,
      },
      {
        name: "Mozambique",
        value: 95100,
      },
      {
        name: "Chad",
        value: 17310,
      },
      {
        name: "Belize",
        value: 91,
      },
      {
        name: "Guyana",
        value: 497,
      },
      {
        name: "Ukraine",
        value: 27574,
      },
      {
        name: "Botswana",
        value: 2378,
      },
      {
        name: "Ethiopia",
        value: 110755,
      },
      {
        name: "Pakistan",
        value: 331936,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 180203,
      },
      {
        name: "Ghana",
        value: 14778,
      },
      {
        name: "Kyrgyzstan",
        value: 6264,
      },
      {
        name: "Cabo Verde",
        value: 199,
      },
      {
        name: "South Sudan",
        value: 16323,
      },
      {
        name: "Honduras",
        value: 2447,
      },
      {
        name: "Namibia",
        value: 5757,
      },
      {
        name: "South Africa",
        value: 209545,
      },
      {
        name: "Thailand",
        value: 87789,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 7406,
      },
      {
        name: "Morocco",
        value: 30297,
      },
      {
        name: "Somalia",
        value: 16952,
      },
      {
        name: "Burkina Faso",
        value: 5916,
      },
      {
        name: "Nicaragua",
        value: 2181,
      },
      {
        name: "Bangladesh",
        value: 293318,
      },
      {
        name: "Malawi",
        value: 16836,
      },
      {
        name: "Angola",
        value: 72632,
      },
      {
        name: "Kosovo",
        value: 603,
      },
      {
        name: "Bhutan",
        value: 455,
      },
      {
        name: "Nepal",
        value: 31199,
      },
      {
        name: "Kazakhstan",
        value: 12501,
      },
      {
        name: "Guinea",
        value: 16384,
      },
      {
        name: "Armenia",
        value: 621,
      },
      {
        name: "Eritrea",
        value: 1828,
      },
      {
        name: "Uzbekistan",
        value: 18080,
      },
      {
        name: "Tanzania (United Republic)",
        value: 81187,
      },
      {
        name: "Guinea-Bissau",
        value: 2407,
      },
      {
        name: "Liberia",
        value: 8265,
      },
      {
        name: "Gabon",
        value: 5399,
      },
      {
        name: "Côte d'Ivoire",
        value: 21219,
      },
      {
        name: "Lesotho",
        value: 6911,
      },
      {
        name: "India",
        value: 2102462,
      },
      {
        name: "Panama",
        value: 1716,
      },
      {
        name: "El Salvador",
        value: 1328,
      },
      {
        name: "Comoros",
        value: 93,
      },
      {
        name: "Senegal",
        value: 13193,
      },
      {
        name: "Peru",
        value: 15465,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 95722,
      },
      {
        name: "Oceania",
        value: 895,
      },
      {
        name: "Niger",
        value: 11510,
      },
      {
        name: "Paraguay",
        value: 2514,
      },
      {
        name: "Djibouti",
        value: 1825,
      },
      {
        name: "Kenya",
        value: 86963,
      },
      {
        name: "Zimbabwe",
        value: 21710,
      },
      {
        name: "Rwanda",
        value: 5812,
      },
      {
        name: "Mali",
        value: 6909,
      },
      {
        name: "Afghanistan",
        value: 50952,
      },
      {
        name: "Mauritania",
        value: 2433,
      },
      {
        name: "Zanzibar",
        value: 967,
      },
      {
        name: "Gambia",
        value: 2637,
      },
      {
        name: "Philippines",
        value: 396939,
      },
      {
        name: "Togo",
        value: 1211,
      },
      {
        name: "Madagascar",
        value: 34436,
      },
      {
        name: "Guatemala",
        value: 3651,
      },
      {
        name: "Western Asia",
        value: 20616,
      },
      {
        name: "Papua New Guinea",
        value: 28952,
      },
      {
        name: "Suriname",
        value: 139,
      },
      {
        name: "Sri Lanka",
        value: 8186,
      },
      {
        name: "Benin",
        value: 4266,
      },
      {
        name: "Nigeria",
        value: 120266,
      },
      {
        name: "Albania",
        value: 412,
      },
      {
        name: "Egypt",
        value: 906,
      },
      {
        name: "Sierra Leone",
        value: 17865,
      },
      {
        name: "Uganda",
        value: 65867,
      },
      {
        name: "Myanmar",
        value: 131339,
      },
      {
        name: "Haiti",
        value: 13027,
      },
      {
        name: "Central African Republic",
        value: 11979,
      },
      {
        name: "Indonesia",
        value: 466898,
      },
    ],
  },
  {
    id: "630b79a1-9745-4d7d-b663-0140476629d7",
    title: "Number of HIV tests taken among general population",
    value: 126380108,
    component: "HIV",
    geoLocations: [
      {
        name: "Uganda",
        value: 9386065,
      },
      {
        name: "South Sudan",
        value: 469176,
      },
      {
        name: "Djibouti",
        value: 26535,
      },
      {
        name: "Eritrea",
        value: 195647,
      },
      {
        name: "Madagascar",
        value: 835188,
      },
      {
        name: "Tanzania (United Republic)",
        value: 12088591,
      },
      {
        name: "Côte d'Ivoire",
        value: 2799978,
      },
      {
        name: "Kenya",
        value: 10360880,
      },
      {
        name: "Zimbabwe",
        value: 2377554,
      },
      {
        name: "South Africa",
        value: 1248,
      },
      {
        name: "Indonesia",
        value: 187197,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 2839902,
      },
      {
        name: "Lesotho",
        value: 897412,
      },
      {
        name: "Somalia",
        value: 249709,
      },
      {
        name: "Guinea",
        value: 576718,
      },
      {
        name: "Zanzibar",
        value: 254349,
      },
      {
        name: "Burkina Faso",
        value: 234837,
      },
      {
        name: "Liberia",
        value: 284427,
      },
      {
        name: "Western Asia",
        value: 24548,
      },
      {
        name: "India",
        value: 53472926,
      },
      {
        name: "Togo",
        value: 451779,
      },
      {
        name: "Sierra Leone",
        value: 576482,
      },
      {
        name: "Nigeria",
        value: 7109424,
      },
      {
        name: "Sudan",
        value: 208229,
      },
      {
        name: "Chad",
        value: 175363,
      },
      {
        name: "Zambia",
        value: 4470571,
      },
      {
        name: "Ghana",
        value: 1819573,
      },
      {
        name: "Eswatini",
        value: 335605,
      },
      {
        name: "Mozambique",
        value: 8842001,
      },
      {
        name: "Cambodia",
        value: 23694,
      },
      {
        name: "Malawi",
        value: 4059292,
      },
      {
        name: "Botswana",
        value: 398650,
      },
      {
        name: "Namibia",
        value: 346558,
      },
    ],
  },
  {
    id: "a11951db-8909-42c1-bf28-01458e459b12",
    title: "TB patients with documented HIV status",
    value: 2954498,
    component: "TB/HIV",
    geoLocations: [
      {
        name: "Niger",
        value: 9277,
      },
      {
        name: "Guinea",
        value: 14319,
      },
      {
        name: "Cameroon",
        value: 22307,
      },
      {
        name: "Namibia",
        value: 5592,
      },
      {
        name: "Liberia",
        value: 8061,
      },
      {
        name: "Uganda",
        value: 65677,
      },
      {
        name: "Zambia",
        value: 33825,
      },
      {
        name: "Senegal",
        value: 12673,
      },
      {
        name: "Congo",
        value: 470,
      },
      {
        name: "India",
        value: 1180074,
      },
      {
        name: "Pakistan",
        value: 170963,
      },
      {
        name: "Côte d'Ivoire",
        value: 20824,
      },
      {
        name: "Guatemala",
        value: 1832,
      },
      {
        name: "Kosovo",
        value: 424,
      },
      {
        name: "Tanzania (United Republic)",
        value: 80419,
      },
      {
        name: "Zanzibar",
        value: 966,
      },
      {
        name: "Tajikistan",
        value: 8119,
      },
      {
        name: "Eswatini",
        value: 2856,
      },
      {
        name: "Bangladesh",
        value: 10707,
      },
      {
        name: "Nepal",
        value: 21204,
      },
      {
        name: "Somalia",
        value: 15469,
      },
      {
        name: "Mali",
        value: 5396,
      },
      {
        name: "Zimbabwe",
        value: 20617,
      },
      {
        name: "South Africa",
        value: 20993,
      },
      {
        name: "Kenya",
        value: 84452,
      },
      {
        name: "Philippines",
        value: 138154,
      },
      {
        name: "South Sudan",
        value: 15105,
      },
      {
        name: "Angola",
        value: 55298,
      },
      {
        name: "Benin",
        value: 4138,
      },
      {
        name: "Eritrea",
        value: 1825,
      },
      {
        name: "Kyrgyzstan",
        value: 5851,
      },
      {
        name: "Mauritania",
        value: 214,
      },
      {
        name: "Ukraine",
        value: 25005,
      },
      {
        name: "Viet Nam",
        value: 87423,
      },
      {
        name: "Papua New Guinea",
        value: 16558,
      },
      {
        name: "Albania",
        value: 368,
      },
      {
        name: "Burkina Faso",
        value: 5294,
      },
      {
        name: "Sierra Leone",
        value: 17416,
      },
      {
        name: "Burundi",
        value: 6618,
      },
      {
        name: "Malawi",
        value: 16706,
      },
      {
        name: "Ethiopia",
        value: 88300,
      },
      {
        name: "Madagascar",
        value: 23052,
      },
      {
        name: "Ghana",
        value: 12420,
      },
      {
        name: "Mozambique",
        value: 94750,
      },
      {
        name: "Togo",
        value: 1173,
      },
      {
        name: "Sudan",
        value: 6736,
      },
      {
        name: "Gabon",
        value: 1568,
      },
      {
        name: "Lesotho",
        value: 6714,
      },
      {
        name: "Chad",
        value: 12075,
      },
      {
        name: "Indonesia",
        value: 245495,
      },
      {
        name: "Guinea-Bissau",
        value: 2017,
      },
      {
        name: "Myanmar",
        value: 123251,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 123328,
      },
      {
        name: "Suriname",
        value: 130,
      },
    ],
  },
  {
    id: "d677a73f-2f35-423f-a81f-0186d8f307cb",
    title: "Mosquito nets distributed",
    value: 160030604,
    component: "Malaria",
    geoLocations: [
      {
        name: "Honduras",
        value: 32091,
      },
      {
        name: "Philippines",
        value: 596250,
      },
      {
        name: "Uganda",
        value: 1144205,
      },
      {
        name: "Indonesia",
        value: 60889,
      },
      {
        name: "Tanzania (United Republic)",
        value: 4888204,
      },
      {
        name: "Guatemala",
        value: 129016,
      },
      {
        name: "Bhutan",
        value: 9886,
      },
      {
        name: "Zambia",
        value: 1733535,
      },
      {
        name: "Bangladesh",
        value: 727253,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 15243,
      },
      {
        name: "Togo",
        value: 406099,
      },
      {
        name: "Timor-Leste",
        value: 97602,
      },
      {
        name: "Mozambique",
        value: 795659,
      },
      {
        name: "Zimbabwe",
        value: 2264983,
      },
      {
        name: "Afghanistan",
        value: 1336070,
      },
      {
        name: "Zanzibar",
        value: 215400,
      },
      {
        name: "Ghana",
        value: 2637137,
      },
      {
        name: "Sudan",
        value: 9288816,
      },
      {
        name: "Papua New Guinea",
        value: 1266525,
      },
      {
        name: "Sao Tome and Principe",
        value: 16258,
      },
      {
        name: "Guinea-Bissau",
        value: 101417,
      },
      {
        name: "Haiti",
        value: 19238,
      },
      {
        name: "South Sudan",
        value: 417197,
      },
      {
        name: "Eritrea",
        value: 132172,
      },
      {
        name: "Central African Republic",
        value: 220076,
      },
      {
        name: "Niger",
        value: 675658,
      },
      {
        name: "Congo",
        value: 2640360,
      },
      {
        name: "Chad",
        value: 1013114,
      },
      {
        name: "Thailand",
        value: 62571,
      },
      {
        name: "Côte d'Ivoire",
        value: 1398328,
      },
      {
        name: "Malawi",
        value: 886255,
      },
      {
        name: "Burkina Faso",
        value: 13125857,
      },
      {
        name: "Nepal",
        value: 162375,
      },
      {
        name: "Madagascar",
        value: 992183,
      },
      {
        name: "Oceania",
        value: 80623,
      },
      {
        name: "Gambia",
        value: 1115780,
      },
      {
        name: "Suriname",
        value: 6847,
      },
      {
        name: "Western Asia",
        value: 613174,
      },
      {
        name: "Cameroon",
        value: 8448790,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 899653,
      },
      {
        name: "Myanmar",
        value: 5981840,
      },
      {
        name: "Botswana",
        value: 7516,
      },
      {
        name: "Guinea",
        value: 8962761,
      },
      {
        name: "India",
        value: 9523363,
      },
      {
        name: "Cambodia",
        value: 562805,
      },
      {
        name: "Viet Nam",
        value: 134084,
      },
      {
        name: "Senegal",
        value: 4562225,
      },
      {
        name: "Nicaragua",
        value: 227452,
      },
      {
        name: "Pakistan",
        value: 3918998,
      },
      {
        name: "Ethiopia",
        value: 10176453,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 19137191,
      },
      {
        name: "Mali",
        value: 3062414,
      },
      {
        name: "Nigeria",
        value: 32250018,
      },
      {
        name: "Somalia",
        value: 803523,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 30928,
      },
      {
        name: "Comoros",
        value: 16244,
      },
    ],
  },
  {
    id: "4c2e9cbf-6175-4650-91af-01d208acd29d",
    title: "Pregnant women who know their HIV status",
    value: 39942953,
    component: "HIV",
    geoLocations: [
      {
        name: "Côte d'Ivoire",
        value: 1066250,
      },
      {
        name: "Guinea",
        value: 426061,
      },
      {
        name: "Niger",
        value: 634194,
      },
      {
        name: "Eritrea",
        value: 91678,
      },
      {
        name: "Burkina Faso",
        value: 773050,
      },
      {
        name: "Senegal",
        value: 453141,
      },
      {
        name: "Benin",
        value: 807634,
      },
      {
        name: "Nigeria",
        value: 2834241,
      },
      {
        name: "Togo",
        value: 197760,
      },
      {
        name: "Liberia",
        value: 162052,
      },
      {
        name: "India",
        value: 18484596,
      },
      {
        name: "Eswatini",
        value: 29147,
      },
      {
        name: "Burundi",
        value: 418249,
      },
      {
        name: "Mali",
        value: 303866,
      },
      {
        name: "Timor-Leste",
        value: 18771,
      },
      {
        name: "Ghana",
        value: 869615,
      },
      {
        name: "Central African Republic",
        value: 96134,
      },
      {
        name: "Malawi",
        value: 643569,
      },
      {
        name: "Myanmar",
        value: 895139,
      },
      {
        name: "Indonesia",
        value: 2341895,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 1052108,
      },
      {
        name: "Cameroon",
        value: 615180,
      },
      {
        name: "Tanzania (United Republic)",
        value: 2280644,
      },
      {
        name: "Kenya",
        value: 1370967,
      },
      {
        name: "Chad",
        value: 693075,
      },
      {
        name: "Guinea-Bissau",
        value: 48797,
      },
      {
        name: "Zanzibar",
        value: 64275,
      },
      {
        name: "Madagascar",
        value: 412218,
      },
      {
        name: "Mozambique",
        value: 1662510,
      },
      {
        name: "Haiti",
        value: 196137,
      },
    ],
  },
  {
    id: "1b4482e8-811c-406c-87dd-01fc2d13c25d",
    title: "TB patients tested using WHO recommended rapid tests",
    value: 246121,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Kazakhstan",
        value: 11279,
      },
      {
        name: "Thailand",
        value: 28451,
      },
      {
        name: "Zimbabwe",
        value: 20131,
      },
      {
        name: "Georgia",
        value: 1602,
      },
      {
        name: "Moldova",
        value: 2529,
      },
      {
        name: "Pakistan",
        value: 23037,
      },
      {
        name: "Albania",
        value: 135,
      },
      {
        name: "Tajikistan",
        value: 6717,
      },
      {
        name: "Armenia",
        value: 512,
      },
      {
        name: "Cabo Verde",
        value: 2,
      },
      {
        name: "Philippines",
        value: 151726,
      },
    ],
  },
  {
    id: "885f8e87-a9e4-41ff-9736-021abe364078",
    title: "Sex workers reached with HIV prevention programs",
    value: 1956921,
    component: "HIV",
    geoLocations: [
      {
        name: "Kosovo",
        value: 763,
      },
      {
        name: "Guatemala",
        value: 7276,
      },
      {
        name: "Kenya",
        value: 37417,
      },
      {
        name: "Suriname",
        value: 2133,
      },
      {
        name: "Uganda",
        value: 22185,
      },
      {
        name: "Madagascar",
        value: 156490,
      },
      {
        name: "Sudan",
        value: 28209,
      },
      {
        name: "Senegal",
        value: 6038,
      },
      {
        name: "Angola",
        value: 10024,
      },
      {
        name: "Panama",
        value: 2057,
      },
      {
        name: "Zanzibar",
        value: 6150,
      },
      {
        name: "Guinea-Bissau",
        value: 1659,
      },
      {
        name: "Niger",
        value: 4519,
      },
      {
        name: "Liberia",
        value: 13122,
      },
      {
        name: "Haiti",
        value: 72783,
      },
      {
        name: "Honduras",
        value: 2841,
      },
      {
        name: "Oceania",
        value: 1369,
      },
      {
        name: "Armenia",
        value: 2416,
      },
      {
        name: "Togo",
        value: 10063,
      },
      {
        name: "South Africa",
        value: 30452,
      },
      {
        name: "Benin",
        value: 17812,
      },
      {
        name: "Dominican Republic",
        value: 65995,
      },
      {
        name: "Ukraine",
        value: 64390,
      },
      {
        name: "Chad",
        value: 1818,
      },
      {
        name: "Georgia",
        value: 4589,
      },
      {
        name: "Ethiopia",
        value: 167005,
      },
      {
        name: "Bhutan",
        value: 584,
      },
      {
        name: "Montenegro",
        value: 114,
      },
      {
        name: "Mozambique",
        value: 30162,
      },
      {
        name: "Serbia",
        value: 91,
      },
      {
        name: "Paraguay",
        value: 2870,
      },
      {
        name: "Moldova",
        value: 7332,
      },
      {
        name: "Mauritius",
        value: 2848,
      },
      {
        name: "Albania",
        value: 234,
      },
      {
        name: "Afghanistan",
        value: 4282,
      },
      {
        name: "Jamaica",
        value: 7635,
      },
      {
        name: "Nepal",
        value: 14865,
      },
      {
        name: "Malaysia",
        value: 1106,
      },
      {
        name: "Indonesia",
        value: 254967,
      },
      {
        name: "Tajikistan",
        value: 21119,
      },
      {
        name: "Kyrgyzstan",
        value: 3782,
      },
      {
        name: "Côte d'Ivoire",
        value: 8521,
      },
      {
        name: "Tunisia",
        value: 8618,
      },
      {
        name: "Nicaragua",
        value: 9539,
      },
      {
        name: "South Sudan",
        value: 25871,
      },
      {
        name: "Bangladesh",
        value: 18970,
      },
      {
        name: "Eswatini",
        value: 2113,
      },
      {
        name: "Sierra Leone",
        value: 86620,
      },
      {
        name: "Caribbean",
        value: 566,
      },
      {
        name: "Pakistan",
        value: 3547,
      },
      {
        name: "Cameroon",
        value: 29210,
      },
      {
        name: "Belarus",
        value: 8977,
      },
      {
        name: "Cambodia",
        value: 26619,
      },
      {
        name: "Eritrea",
        value: 2597,
      },
      {
        name: "Central African Republic",
        value: 1876,
      },
      {
        name: "El Salvador",
        value: 7765,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 55241,
      },
      {
        name: "Ghana",
        value: 25568,
      },
      {
        name: "Guyana",
        value: 2909,
      },
      {
        name: "Azerbaijan",
        value: 19290,
      },
      {
        name: "Viet Nam",
        value: 45482,
      },
      {
        name: "Morocco",
        value: 47856,
      },
      {
        name: "Namibia",
        value: 1019,
      },
      {
        name: "Papua New Guinea",
        value: 17644,
      },
      {
        name: "Nigeria",
        value: 41987,
      },
      {
        name: "Comoros",
        value: 1319,
      },
      {
        name: "Uzbekistan",
        value: 15563,
      },
      {
        name: "Sri Lanka",
        value: 3895,
      },
      {
        name: "Burundi",
        value: 49989,
      },
      {
        name: "Cuba",
        value: 69609,
      },
      {
        name: "Malawi",
        value: 11119,
      },
      {
        name: "Botswana",
        value: 1822,
      },
      {
        name: "Sao Tome and Principe",
        value: 90,
      },
      {
        name: "Guinea",
        value: 10070,
      },
      {
        name: "Burkina Faso",
        value: 27139,
      },
      {
        name: "Timor-Leste",
        value: 1297,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 45502,
      },
      {
        name: "Lesotho",
        value: 6079,
      },
      {
        name: "Myanmar",
        value: 71784,
      },
      {
        name: "Tanzania (United Republic)",
        value: 26904,
      },
      {
        name: "Gambia",
        value: 3565,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 10451,
      },
      {
        name: "Kazakhstan",
        value: 7580,
      },
      {
        name: "Mongolia",
        value: 3173,
      },
    ],
  },
  {
    id: "6fd69233-2ed7-4d60-b8f1-0284b56c7373",
    title: "HIV-positive pregnant women who received ART during pregnancy",
    value: 717967,
    component: "HIV",
    geoLocations: [
      {
        name: "Tajikistan",
        value: 167,
      },
      {
        name: "Indonesia",
        value: 2128,
      },
      {
        name: "Kyrgyzstan",
        value: 121,
      },
      {
        name: "Mali",
        value: 1885,
      },
      {
        name: "Somalia",
        value: 161,
      },
      {
        name: "Senegal",
        value: 1305,
      },
      {
        name: "Zanzibar",
        value: 391,
      },
      {
        name: "Congo",
        value: 504,
      },
      {
        name: "Burkina Faso",
        value: 4529,
      },
      {
        name: "Zimbabwe",
        value: 57594,
      },
      {
        name: "Viet Nam",
        value: 2056,
      },
      {
        name: "Sao Tome and Principe",
        value: 34,
      },
      {
        name: "Benin",
        value: 5523,
      },
      {
        name: "Central African Republic",
        value: 2896,
      },
      {
        name: "Chad",
        value: 7783,
      },
      {
        name: "Eritrea",
        value: 185,
      },
      {
        name: "Guinea",
        value: 7120,
      },
      {
        name: "Ethiopia",
        value: 20338,
      },
      {
        name: "Nepal",
        value: 123,
      },
      {
        name: "Honduras",
        value: 88,
      },
      {
        name: "Mauritius",
        value: 120,
      },
      {
        name: "Liberia",
        value: 1768,
      },
      {
        name: "Zambia",
        value: 55807,
      },
      {
        name: "Cameroon",
        value: 17070,
      },
      {
        name: "Madagascar",
        value: 453,
      },
      {
        name: "Uzbekistan",
        value: 581,
      },
      {
        name: "Mauritania",
        value: 177,
      },
      {
        name: "India",
        value: 11158,
      },
      {
        name: "Togo",
        value: 4175,
      },
      {
        name: "Tanzania (United Republic)",
        value: 74347,
      },
      {
        name: "Haiti",
        value: 5235,
      },
      {
        name: "Ghana",
        value: 11682,
      },
      {
        name: "Nigeria",
        value: 41949,
      },
      {
        name: "Niger",
        value: 794,
      },
      {
        name: "Timor-Leste",
        value: 11,
      },
      {
        name: "Kenya",
        value: 59156,
      },
      {
        name: "Guyana",
        value: 140,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 13878,
      },
      {
        name: "Myanmar",
        value: 4081,
      },
      {
        name: "Gambia",
        value: 624,
      },
      {
        name: "South Sudan",
        value: 4217,
      },
      {
        name: "Guinea-Bissau",
        value: 1173,
      },
      {
        name: "Angola",
        value: 14890,
      },
      {
        name: "Burundi",
        value: 6472,
      },
      {
        name: "Malawi",
        value: 45416,
      },
      {
        name: "Sierra Leone",
        value: 4193,
      },
      {
        name: "Djibouti",
        value: 41,
      },
      {
        name: "Mozambique",
        value: 111925,
      },
      {
        name: "Uganda",
        value: 96120,
      },
      {
        name: "Cambodia",
        value: 547,
      },
      {
        name: "Côte d'Ivoire",
        value: 14836,
      },
    ],
  },
  {
    id: "0bb29949-84d3-4b3c-83da-02b85ded9e73",
    title: "Suspected malaria cases that received a parasitological test",
    value: 242932870,
    component: "Malaria",
    geoLocations: [
      {
        name: "Guinea-Bissau",
        value: 491808,
      },
      {
        name: "Mauritania",
        value: 44140,
      },
      {
        name: "Zanzibar",
        value: 379646,
      },
      {
        name: "Kenya",
        value: 368160,
      },
      {
        name: "Rwanda",
        value: 8784690,
      },
      {
        name: "Philippines",
        value: 303722,
      },
      {
        name: "Chad",
        value: 2550300,
      },
      {
        name: "Mozambique",
        value: 19690800,
      },
      {
        name: "Senegal",
        value: 2052322,
      },
      {
        name: "Burundi",
        value: 14406612,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 112397,
      },
      {
        name: "Nepal",
        value: 209221,
      },
      {
        name: "Timor-Leste",
        value: 130634,
      },
      {
        name: "Bangladesh",
        value: 1410735,
      },
      {
        name: "Central African Republic",
        value: 2353703,
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        value: 270154,
      },
      {
        name: "Zimbabwe",
        value: 1291344,
      },
      {
        name: "Guyana",
        value: 103671,
      },
      {
        name: "Malawi",
        value: 11208133,
      },
      {
        name: "Papua New Guinea",
        value: 992652,
      },
      {
        name: "Benin",
        value: 930091,
      },
      {
        name: "Madagascar",
        value: 3018341,
      },
      {
        name: "Liberia",
        value: 1737511,
      },
      {
        name: "South Sudan",
        value: 3041145,
      },
      {
        name: "Cameroon",
        value: 4093423,
      },
      {
        name: "Indonesia",
        value: 1926939,
      },
      {
        name: "Ethiopia",
        value: 5948778,
      },
      {
        name: "Thailand",
        value: 1147831,
      },
      {
        name: "Gambia",
        value: 588684,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 568896,
      },
      {
        name: "Nigeria",
        value: 23017274,
      },
      {
        name: "Afghanistan",
        value: 1010042,
      },
      {
        name: "Honduras",
        value: 136062,
      },
      {
        name: "Eritrea",
        value: 259044,
      },
      {
        name: "Namibia",
        value: 244214,
      },
      {
        name: "Somalia",
        value: 374625,
      },
      {
        name: "Mali",
        value: 4165329,
      },
      {
        name: "Cambodia",
        value: 591746,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 17823411,
      },
      {
        name: "Bhutan",
        value: 61415,
      },
      {
        name: "Sierra Leone",
        value: 3623018,
      },
      {
        name: "Djibouti",
        value: 214101,
      },
      {
        name: "Côte d'Ivoire",
        value: 6609763,
      },
      {
        name: "Zambia",
        value: 12131044,
      },
      {
        name: "Togo",
        value: 3439973,
      },
      {
        name: "Comoros",
        value: 102324,
      },
      {
        name: "Pakistan",
        value: 5592008,
      },
      {
        name: "Sao Tome and Principe",
        value: 163188,
      },
      {
        name: "Niger",
        value: 1163783,
      },
      {
        name: "Uganda",
        value: 18211015,
      },
      {
        name: "Guinea",
        value: 2834392,
      },
      {
        name: "Haiti",
        value: 232092,
      },
      {
        name: "Botswana",
        value: 3892,
      },
      {
        name: "Guatemala",
        value: 412229,
      },
      {
        name: "Viet Nam",
        value: 1745135,
      },
      {
        name: "Eswatini",
        value: 28916,
      },
      {
        name: "Burkina Faso",
        value: 14943843,
      },
      {
        name: "Myanmar",
        value: 3233296,
      },
      {
        name: "Sudan",
        value: 49391,
      },
      {
        name: "Tanzania (United Republic)",
        value: 22201979,
      },
      {
        name: "Ghana",
        value: 8146045,
      },
      {
        name: "Suriname",
        value: 11798,
      },
    ],
  },
  {
    id: "6167f952-a80d-4542-a023-0374ccaea1e7",
    title:
      "HIV-positive TB patients on antiretroviral therapy during TB treatment",
    value: 315173,
    component: "TB/HIV",
    geoLocations: [
      {
        name: "Malawi",
        value: 7673,
      },
      {
        name: "Central African Republic",
        value: 2276,
      },
      {
        name: "Lesotho",
        value: 3772,
      },
      {
        name: "Indonesia",
        value: 3710,
      },
      {
        name: "Kenya",
        value: 21120,
      },
      {
        name: "Dominican Republic",
        value: 456,
      },
      {
        name: "Guyana",
        value: 70,
      },
      {
        name: "Mauritania",
        value: 4,
      },
      {
        name: "Suriname",
        value: 33,
      },
      {
        name: "Zimbabwe",
        value: 11242,
      },
      {
        name: "Zanzibar",
        value: 131,
      },
      {
        name: "Morocco",
        value: 203,
      },
      {
        name: "Burkina Faso",
        value: 455,
      },
      {
        name: "Uzbekistan",
        value: 535,
      },
      {
        name: "Rwanda",
        value: 1173,
      },
      {
        name: "Guatemala",
        value: 299,
      },
      {
        name: "Eritrea",
        value: 70,
      },
      {
        name: "Liberia",
        value: 680,
      },
      {
        name: "Philippines",
        value: 1689,
      },
      {
        name: "Mozambique",
        value: 31274,
      },
      {
        name: "Viet Nam",
        value: 2266,
      },
      {
        name: "Nigeria",
        value: 5501,
      },
      {
        name: "Togo",
        value: 401,
      },
      {
        name: "Cambodia",
        value: 725,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 242,
      },
      {
        name: "Timor-Leste",
        value: 32,
      },
      {
        name: "Cameroon",
        value: 6457,
      },
      {
        name: "Madagascar",
        value: 275,
      },
      {
        name: "Uganda",
        value: 25125,
      },
      {
        name: "Botswana",
        value: 955,
      },
      {
        name: "Angola",
        value: 1790,
      },
      {
        name: "Namibia",
        value: 1804,
      },
      {
        name: "Guinea-Bissau",
        value: 443,
      },
      {
        name: "Ukraine",
        value: 4678,
      },
      {
        name: "Gambia",
        value: 361,
      },
      {
        name: "Somalia",
        value: 105,
      },
      {
        name: "Mali",
        value: 502,
      },
      {
        name: "Papua New Guinea",
        value: 945,
      },
      {
        name: "Azerbaijan",
        value: 63,
      },
      {
        name: "Burundi",
        value: 566,
      },
      {
        name: "Thailand",
        value: 5105,
      },
      {
        name: "Guinea",
        value: 3186,
      },
      {
        name: "Nepal",
        value: 142,
      },
      {
        name: "Sao Tome and Principe",
        value: 23,
      },
      {
        name: "Benin",
        value: 565,
      },
      {
        name: "Tajikistan",
        value: 107,
      },
      {
        name: "Myanmar",
        value: 7312,
      },
      {
        name: "Mongolia",
        value: 4,
      },
      {
        name: "Djibouti",
        value: 74,
      },
      {
        name: "Niger",
        value: 279,
      },
      {
        name: "Kyrgyzstan",
        value: 121,
      },
      {
        name: "Chad",
        value: 2092,
      },
      {
        name: "Eswatini",
        value: 1826,
      },
      {
        name: "Panama",
        value: 314,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 12500,
      },
      {
        name: "Paraguay",
        value: 196,
      },
      {
        name: "Haiti",
        value: 1549,
      },
      {
        name: "Cabo Verde",
        value: 24,
      },
      {
        name: "Sierra Leone",
        value: 2292,
      },
      {
        name: "Senegal",
        value: 587,
      },
      {
        name: "Gabon",
        value: 450,
      },
      {
        name: "Côte d'Ivoire",
        value: 4000,
      },
      {
        name: "Belarus",
        value: 148,
      },
      {
        name: "Peru",
        value: 498,
      },
      {
        name: "Sudan",
        value: 175,
      },
      {
        name: "Tanzania (United Republic)",
        value: 18869,
      },
      {
        name: "South Africa",
        value: 88309,
      },
      {
        name: "Comoros",
        value: 1,
      },
      {
        name: "Ghana",
        value: 1969,
      },
      {
        name: "Ethiopia",
        value: 4711,
      },
      {
        name: "South Sudan",
        value: 1564,
      },
      {
        name: "Congo",
        value: 283,
      },
      {
        name: "Zambia",
        value: 15797,
      },
    ],
  },
  {
    id: "55da6fc4-4697-4069-88ea-038a141a034d",
    title: "Infants tested for HIV",
    value: 436115,
    component: "HIV",
    geoLocations: [
      {
        name: "Senegal",
        value: 814,
      },
      {
        name: "Guinea-Bissau",
        value: 574,
      },
      {
        name: "Tajikistan",
        value: 164,
      },
      {
        name: "Kenya",
        value: 41998,
      },
      {
        name: "Zanzibar",
        value: 343,
      },
      {
        name: "Burundi",
        value: 3495,
      },
      {
        name: "Côte d'Ivoire",
        value: 9860,
      },
      {
        name: "Nepal",
        value: 223,
      },
      {
        name: "Guinea",
        value: 2111,
      },
      {
        name: "Nigeria",
        value: 26247,
      },
      {
        name: "Malawi",
        value: 32618,
      },
      {
        name: "Ethiopia",
        value: 9971,
      },
      {
        name: "Mozambique",
        value: 76304,
      },
      {
        name: "Togo",
        value: 2471,
      },
      {
        name: "Cameroon",
        value: 14970,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 1428,
      },
      {
        name: "Central African Republic",
        value: 1065,
      },
      {
        name: "Chad",
        value: 1558,
      },
      {
        name: "Liberia",
        value: 457,
      },
      {
        name: "Mali",
        value: 1998,
      },
      {
        name: "South Sudan",
        value: 1211,
      },
      {
        name: "Benin",
        value: 3484,
      },
      {
        name: "Eswatini",
        value: 11380,
      },
      {
        name: "Lesotho",
        value: 6595,
      },
      {
        name: "Cambodia",
        value: 612,
      },
      {
        name: "Zambia",
        value: 39507,
      },
      {
        name: "Tanzania (United Republic)",
        value: 36547,
      },
      {
        name: "Niger",
        value: 98,
      },
      {
        name: "Indonesia",
        value: 177,
      },
      {
        name: "Uganda",
        value: 55642,
      },
      {
        name: "India",
        value: 7775,
      },
      {
        name: "Congo",
        value: 88,
      },
      {
        name: "Burkina Faso",
        value: 959,
      },
      {
        name: "Ghana",
        value: 10063,
      },
      {
        name: "Sierra Leone",
        value: 277,
      },
      {
        name: "Zimbabwe",
        value: 33031,
      },
    ],
  },
  {
    id: "0777a8dd-55a7-43ec-9e06-03961bf0518c",
    title: "Number of HIV tests taken among men who have sex with men",
    value: 1412723,
    component: "HIV",
    geoLocations: [
      {
        name: "Azerbaijan",
        value: 10109,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 25606,
      },
      {
        name: "Madagascar",
        value: 9223,
      },
      {
        name: "Albania",
        value: 1017,
      },
      {
        name: "Togo",
        value: 2624,
      },
      {
        name: "Kyrgyzstan",
        value: 8392,
      },
      {
        name: "Indonesia",
        value: 112406,
      },
      {
        name: "Cuba",
        value: 157376,
      },
      {
        name: "Namibia",
        value: 921,
      },
      {
        name: "Mauritius",
        value: 729,
      },
      {
        name: "South Africa",
        value: 2422,
      },
      {
        name: "Dominican Republic",
        value: 101807,
      },
      {
        name: "Malaysia",
        value: 2666,
      },
      {
        name: "Central African Republic",
        value: 583,
      },
      {
        name: "Uganda",
        value: 8371,
      },
      {
        name: "Myanmar",
        value: 65388,
      },
      {
        name: "Belarus",
        value: 9280,
      },
      {
        name: "Zanzibar",
        value: 2670,
      },
      {
        name: "Honduras",
        value: 13065,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 9656,
      },
      {
        name: "Lesotho",
        value: 2069,
      },
      {
        name: "Egypt",
        value: 81,
      },
      {
        name: "Cabo Verde",
        value: 604,
      },
      {
        name: "Ukraine",
        value: 45662,
      },
      {
        name: "El Salvador",
        value: 22355,
      },
      {
        name: "Burkina Faso",
        value: 2492,
      },
      {
        name: "Costa Rica",
        value: 257,
      },
      {
        name: "Ghana",
        value: 9461,
      },
      {
        name: "Montenegro",
        value: 39,
      },
      {
        name: "Pakistan",
        value: 6768,
      },
      {
        name: "Kosovo",
        value: 430,
      },
      {
        name: "Afghanistan",
        value: 6389,
      },
      {
        name: "Benin",
        value: 5048,
      },
      {
        name: "Papua New Guinea",
        value: 3851,
      },
      {
        name: "Panama",
        value: 7493,
      },
      {
        name: "Serbia",
        value: 1861,
      },
      {
        name: "Cambodia",
        value: 17066,
      },
      {
        name: "Sri Lanka",
        value: 5655,
      },
      {
        name: "Haiti",
        value: 18486,
      },
      {
        name: "Nigeria",
        value: 25765,
      },
      {
        name: "Bhutan",
        value: 50,
      },
      {
        name: "Viet Nam",
        value: 76415,
      },
      {
        name: "Burundi",
        value: 6591,
      },
      {
        name: "Georgia",
        value: 7512,
      },
      {
        name: "Timor-Leste",
        value: 2949,
      },
      {
        name: "Guinea-Bissau",
        value: 357,
      },
      {
        name: "Malawi",
        value: 2392,
      },
      {
        name: "Moldova",
        value: 2411,
      },
      {
        name: "Colombia",
        value: 38308,
      },
      {
        name: "Mali",
        value: 8425,
      },
      {
        name: "Guyana",
        value: 2113,
      },
      {
        name: "Sudan",
        value: 13085,
      },
      {
        name: "Peru",
        value: 111846,
      },
      {
        name: "Paraguay",
        value: 6073,
      },
      {
        name: "Senegal",
        value: 3464,
      },
      {
        name: "Cameroon",
        value: 8148,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 1279,
      },
      {
        name: "Mozambique",
        value: 1329,
      },
      {
        name: "Tajikistan",
        value: 5241,
      },
      {
        name: "Eswatini",
        value: 30,
      },
      {
        name: "Oceania",
        value: 1160,
      },
      {
        name: "Thailand",
        value: 92012,
      },
      {
        name: "Morocco",
        value: 10606,
      },
      {
        name: "Armenia",
        value: 6779,
      },
      {
        name: "Jamaica",
        value: 5315,
      },
      {
        name: "Sierra Leone",
        value: 7623,
      },
      {
        name: "Mongolia",
        value: 2195,
      },
      {
        name: "Philippines",
        value: 109734,
      },
      {
        name: "Nepal",
        value: 38032,
      },
      {
        name: "Guatemala",
        value: 18674,
      },
      {
        name: "Suriname",
        value: 420,
      },
      {
        name: "Niger",
        value: 1505,
      },
      {
        name: "Bangladesh",
        value: 17681,
      },
      {
        name: "Botswana",
        value: 1768,
      },
      {
        name: "Nicaragua",
        value: 23843,
      },
      {
        name: "Comoros",
        value: 282,
      },
      {
        name: "Tunisia",
        value: 3993,
      },
      {
        name: "Uzbekistan",
        value: 988,
      },
      {
        name: "Ecuador",
        value: 31634,
      },
      {
        name: "Guinea",
        value: 1550,
      },
      {
        name: "Algeria",
        value: 5913,
      },
      {
        name: "Liberia",
        value: 6482,
      },
      {
        name: "Caribbean",
        value: 373,
      },
    ],
  },
  {
    id: "f88eaaba-396b-44b1-a73d-03c05be168db",
    title:
      "Pregnant women attending antenatal clinics who received intermittent preventive treatment for malaria",
    value: 10881827,
    component: "Malaria",
    geoLocations: [
      {
        name: "Congo (Democratic Republic)",
        value: 1280363,
      },
      {
        name: "Côte d'Ivoire",
        value: 426643,
      },
      {
        name: "Nigeria",
        value: 2571843,
      },
      {
        name: "Zambia",
        value: 298999,
      },
      {
        name: "Tanzania (United Republic)",
        value: 1636269,
      },
      {
        name: "Chad",
        value: 212602,
      },
      {
        name: "Niger",
        value: 203459,
      },
      {
        name: "Ghana",
        value: 451991,
      },
      {
        name: "Uganda",
        value: 628928,
      },
      {
        name: "Guinea",
        value: 360692,
      },
      {
        name: "Central African Republic",
        value: 65290,
      },
      {
        name: "Senegal",
        value: 286973,
      },
      {
        name: "Gambia",
        value: 44600,
      },
      {
        name: "Mali",
        value: 341360,
      },
      {
        name: "Mozambique",
        value: 793887,
      },
      {
        name: "Guinea-Bissau",
        value: 30450,
      },
      {
        name: "Togo",
        value: 107077,
      },
      {
        name: "Liberia",
        value: 2016,
      },
      {
        name: "Burundi",
        value: 306049,
      },
      {
        name: "Cameroon",
        value: 297125,
      },
      {
        name: "Sierra Leone",
        value: 194751,
      },
      {
        name: "Madagascar",
        value: 243083,
      },
      {
        name: "South Sudan",
        value: 97377,
      },
    ],
  },
  {
    id: "e02877ac-a276-40da-a4d7-0453dba21cca",
    title: "People on antiretroviral therapy for HIV",
    value: 20070449,
    component: "HIV",
    geoLocations: [
      {
        name: "Papua New Guinea",
        value: 30379,
      },
      {
        name: "Ecuador",
        value: 26047,
      },
      {
        name: "Caribbean",
        value: 1402,
      },
      {
        name: "Cambodia",
        value: 61193,
      },
      {
        name: "Myanmar",
        value: 184544,
      },
      {
        name: "Nigeria",
        value: 1146720,
      },
      {
        name: "Sierra Leone",
        value: 33274,
      },
      {
        name: "Armenia",
        value: 2190,
      },
      {
        name: "Jamaica",
        value: 14188,
      },
      {
        name: "Paraguay",
        value: 9480,
      },
      {
        name: "Honduras",
        value: 11849,
      },
      {
        name: "Ghana",
        value: 153901,
      },
      {
        name: "Angola",
        value: 91164,
      },
      {
        name: "Cuba",
        value: 24873,
      },
      {
        name: "Guinea-Bissau",
        value: 15926,
      },
      {
        name: "Nicaragua",
        value: 5696,
      },
      {
        name: "Cameroon",
        value: 311963,
      },
      {
        name: "Ethiopia",
        value: 473355,
      },
      {
        name: "Ukraine",
        value: 136105,
      },
      {
        name: "India",
        value: 1347866,
      },
      {
        name: "Egypt",
        value: 8365,
      },
      {
        name: "Morocco",
        value: 15048,
      },
      {
        name: "Eswatini",
        value: 191037,
      },
      {
        name: "Tunisia",
        value: 1242,
      },
      {
        name: "Zambia",
        value: 1065657,
      },
      {
        name: "Peru",
        value: 66292,
      },
      {
        name: "Central African Republic",
        value: 47032,
      },
      {
        name: "Kyrgyzstan",
        value: 4058,
      },
      {
        name: "Western Asia",
        value: 4648,
      },
      {
        name: "Belarus",
        value: 17739,
      },
      {
        name: "Mauritius",
        value: 2786,
      },
      {
        name: "Madagascar",
        value: 5166,
      },
      {
        name: "Mauritania",
        value: 3212,
      },
      {
        name: "South Africa",
        value: 4855841,
      },
      {
        name: "Somalia",
        value: 3471,
      },
      {
        name: "Bangladesh",
        value: 3687,
      },
      {
        name: "Burundi",
        value: 66344,
      },
      {
        name: "Lesotho",
        value: 221138,
      },
      {
        name: "Nepal",
        value: 18628,
      },
      {
        name: "Tajikistan",
        value: 7086,
      },
      {
        name: "Montenegro",
        value: 181,
      },
      {
        name: "Mozambique",
        value: 1338100,
      },
      {
        name: "Oceania",
        value: 56,
      },
      {
        name: "Benin",
        value: 48986,
      },
      {
        name: "Thailand",
        value: 375332,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 7300,
      },
      {
        name: "Zimbabwe",
        value: 1146532,
      },
      {
        name: "Georgia",
        value: 5098,
      },
      {
        name: "Sao Tome and Principe",
        value: 842,
      },
      {
        name: "Belize",
        value: 1530,
      },
      {
        name: "Sri Lanka",
        value: 1845,
      },
      {
        name: "Zanzibar",
        value: 6519,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 277592,
      },
      {
        name: "Cabo Verde",
        value: 2386,
      },
      {
        name: "Tanzania (United Republic)",
        value: 1266521,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 14646,
      },
      {
        name: "Mongolia",
        value: 198,
      },
      {
        name: "Chad",
        value: 69379,
      },
      {
        name: "Guyana",
        value: 5942,
      },
      {
        name: "Senegal",
        value: 28960,
      },
      {
        name: "Indonesia",
        value: 128522,
      },
      {
        name: "Algeria",
        value: 14390,
      },
      {
        name: "Namibia",
        value: 191702,
      },
      {
        name: "Haiti",
        value: 114816,
      },
      {
        name: "Uzbekistan",
        value: 28265,
      },
      {
        name: "Gambia",
        value: 8229,
      },
      {
        name: "Niger",
        value: 20427,
      },
      {
        name: "Guatemala",
        value: 20923,
      },
      {
        name: "Togo",
        value: 76090,
      },
      {
        name: "Rwanda",
        value: 196310,
      },
      {
        name: "Sudan",
        value: 10449,
      },
      {
        name: "Côte d'Ivoire",
        value: 271039,
      },
      {
        name: "Malawi",
        value: 831729,
      },
      {
        name: "Kenya",
        value: 1137922,
      },
      {
        name: "Moldova",
        value: 6689,
      },
      {
        name: "Azerbaijan",
        value: 5086,
      },
      {
        name: "El Salvador",
        value: 13193,
      },
      {
        name: "Djibouti",
        value: 2907,
      },
      {
        name: "Timor-Leste",
        value: 524,
      },
      {
        name: "Uganda",
        value: 1231334,
      },
      {
        name: "Albania",
        value: 611,
      },
      {
        name: "Guinea",
        value: 55631,
      },
      {
        name: "Pakistan",
        value: 22947,
      },
      {
        name: "Congo",
        value: 26030,
      },
      {
        name: "Viet Nam",
        value: 144664,
      },
      {
        name: "Bhutan",
        value: 483,
      },
      {
        name: "Liberia",
        value: 15423,
      },
      {
        name: "Afghanistan",
        value: 1044,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 10696,
      },
      {
        name: "Burkina Faso",
        value: 68730,
      },
      {
        name: "Eritrea",
        value: 8830,
      },
      {
        name: "Comoros",
        value: 77,
      },
      {
        name: "Mali",
        value: 45867,
      },
      {
        name: "Dominican Republic",
        value: 34892,
      },
      {
        name: "South Sudan",
        value: 35441,
      },
    ],
  },
  {
    id: "b150e7c4-b418-4039-bc50-056561bf85e8",
    title: "Transgender people reached with HIV prevention programs",
    value: 152491,
    component: "HIV",
    geoLocations: [
      {
        name: "Pakistan",
        value: 4089,
      },
      {
        name: "Malaysia",
        value: 2404,
      },
      {
        name: "Colombia",
        value: 4089,
      },
      {
        name: "Oceania",
        value: 2046,
      },
      {
        name: "Jamaica",
        value: 355,
      },
      {
        name: "Guyana",
        value: 77,
      },
      {
        name: "Armenia",
        value: 64,
      },
      {
        name: "Paraguay",
        value: 517,
      },
      {
        name: "Nicaragua",
        value: 2727,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 1143,
      },
      {
        name: "Philippines",
        value: 32659,
      },
      {
        name: "Cuba",
        value: 3421,
      },
      {
        name: "Sri Lanka",
        value: 424,
      },
      {
        name: "Caribbean",
        value: 4,
      },
      {
        name: "Timor-Leste",
        value: 321,
      },
      {
        name: "Cambodia",
        value: 3769,
      },
      {
        name: "Guatemala",
        value: 1343,
      },
      {
        name: "Costa Rica",
        value: 401,
      },
      {
        name: "Benin",
        value: 866,
      },
      {
        name: "Nepal",
        value: 12899,
      },
      {
        name: "Dominican Republic",
        value: 4535,
      },
      {
        name: "Bangladesh",
        value: 4655,
      },
      {
        name: "Viet Nam",
        value: 2044,
      },
      {
        name: "Ecuador",
        value: 8097,
      },
      {
        name: "Mauritius",
        value: 324,
      },
      {
        name: "El Salvador",
        value: 1456,
      },
      {
        name: "Bhutan",
        value: 11,
      },
      {
        name: "South Africa",
        value: 1126,
      },
      {
        name: "Honduras",
        value: 657,
      },
      {
        name: "Peru",
        value: 8976,
      },
      {
        name: "Indonesia",
        value: 43372,
      },
      {
        name: "Panama",
        value: 436,
      },
      {
        name: "Thailand",
        value: 437,
      },
      {
        name: "Ukraine",
        value: 2747,
      },
    ],
  },
  {
    id: "b3948f5a-1902-429e-a451-0590ea175b92",
    title: "Children who received seasonal malaria chemoprophylaxis",
    value: 9802347,
    component: "Malaria",
    geoLocations: [
      {
        name: "Ghana",
        value: 901967,
      },
      {
        name: "Togo",
        value: 243547,
      },
      {
        name: "Guinea",
        value: 374369,
      },
      {
        name: "Chad",
        value: 351778,
      },
      {
        name: "Nigeria",
        value: 4173291,
      },
      {
        name: "Mali",
        value: 193223,
      },
      {
        name: "Burkina Faso",
        value: 3476525,
      },
      {
        name: "Guinea-Bissau",
        value: 87647,
      },
    ],
  },
  {
    id: "5fb2f43e-f5ac-4975-9886-06d29c2b398c",
    title: "Malaria foci fully investigated and classified",
    value: 5991,
    component: "Malaria",
    geoLocations: [
      {
        name: "Suriname",
        value: 6,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 19,
      },
      {
        name: "Timor-Leste",
        value: 4,
      },
      {
        name: "Zanzibar",
        value: 2210,
      },
      {
        name: "Cabo Verde",
        value: 40,
      },
      {
        name: "Viet Nam",
        value: 834,
      },
      {
        name: "Eswatini",
        value: 50,
      },
      {
        name: "Comoros",
        value: 88,
      },
      {
        name: "Nepal",
        value: 53,
      },
      {
        name: "Guatemala",
        value: 71,
      },
      {
        name: "Honduras",
        value: 105,
      },
      {
        name: "Bhutan",
        value: 2,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 6,
      },
      {
        name: "Thailand",
        value: 2050,
      },
      {
        name: "Myanmar",
        value: 453,
      },
    ],
  },
  {
    id: "4230fc72-fbed-45fc-8422-070876f60f05",
    title: "Number of HIV tests taken among people who use drugs",
    value: 788881,
    component: "HIV",
    geoLocations: [
      {
        name: "Eswatini",
        value: 14,
      },
      {
        name: "Belarus",
        value: 12842,
      },
      {
        name: "Nigeria",
        value: 10456,
      },
      {
        name: "Mauritius",
        value: 5392,
      },
      {
        name: "Myanmar",
        value: 33200,
      },
      {
        name: "Nepal",
        value: 21229,
      },
      {
        name: "Kyrgyzstan",
        value: 16635,
      },
      {
        name: "Zanzibar",
        value: 3671,
      },
      {
        name: "Kosovo",
        value: 986,
      },
      {
        name: "Viet Nam",
        value: 209832,
      },
      {
        name: "Tunisia",
        value: 5750,
      },
      {
        name: "Afghanistan",
        value: 4916,
      },
      {
        name: "Cambodia",
        value: 391,
      },
      {
        name: "South Africa",
        value: 1058,
      },
      {
        name: "Egypt",
        value: 240,
      },
      {
        name: "Armenia",
        value: 3690,
      },
      {
        name: "Morocco",
        value: 328,
      },
      {
        name: "Ukraine",
        value: 206286,
      },
      {
        name: "Senegal",
        value: 1368,
      },
      {
        name: "Montenegro",
        value: 133,
      },
      {
        name: "Madagascar",
        value: 1355,
      },
      {
        name: "Uzbekistan",
        value: 17758,
      },
      {
        name: "Philippines",
        value: 3708,
      },
      {
        name: "Benin",
        value: 1886,
      },
      {
        name: "Azerbaijan",
        value: 25157,
      },
      {
        name: "Albania",
        value: 2007,
      },
      {
        name: "Sierra Leone",
        value: 1487,
      },
      {
        name: "Algeria",
        value: 846,
      },
      {
        name: "Serbia",
        value: 166,
      },
      {
        name: "Sri Lanka",
        value: 104,
      },
      {
        name: "Indonesia",
        value: 8917,
      },
      {
        name: "Thailand",
        value: 3362,
      },
      {
        name: "Georgia",
        value: 29403,
      },
      {
        name: "Bangladesh",
        value: 9741,
      },
      {
        name: "Pakistan",
        value: 11869,
      },
      {
        name: "Tajikistan",
        value: 22253,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 7371,
      },
      {
        name: "Colombia",
        value: 1676,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 93476,
      },
      {
        name: "Moldova",
        value: 7922,
      },
    ],
  },
  {
    id: "75620eb8-5426-48b5-b92b-0727183467c6",
    title:
      "Children <5 in contact with TB patients received preventive therapy",
    value: 169571,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Liberia",
        value: 59,
      },
      {
        name: "Mozambique",
        value: 30951,
      },
      {
        name: "Haiti",
        value: 2170,
      },
      {
        name: "Burundi",
        value: 1214,
      },
      {
        name: "Benin",
        value: 2444,
      },
      {
        name: "Ethiopia",
        value: 3532,
      },
      {
        name: "Indonesia",
        value: 5383,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 29293,
      },
      {
        name: "Zimbabwe",
        value: 2611,
      },
      {
        name: "Somalia",
        value: 639,
      },
      {
        name: "Cambodia",
        value: 3033,
      },
      {
        name: "Kenya",
        value: 7990,
      },
      {
        name: "Guatemala",
        value: 889,
      },
      {
        name: "Eswatini",
        value: 292,
      },
      {
        name: "Sri Lanka",
        value: 243,
      },
      {
        name: "Namibia",
        value: 1104,
      },
      {
        name: "South Africa",
        value: 5173,
      },
      {
        name: "Madagascar",
        value: 5176,
      },
      {
        name: "Senegal",
        value: 1321,
      },
      {
        name: "Côte d'Ivoire",
        value: 5929,
      },
      {
        name: "Guinea",
        value: 7112,
      },
      {
        name: "Afghanistan",
        value: 24313,
      },
      {
        name: "Sudan",
        value: 2268,
      },
      {
        name: "Myanmar",
        value: 1218,
      },
      {
        name: "Rwanda",
        value: 686,
      },
      {
        name: "Nigeria",
        value: 9772,
      },
      {
        name: "Nepal",
        value: 2293,
      },
      {
        name: "Viet Nam",
        value: 6031,
      },
      {
        name: "Niger",
        value: 6432,
      },
    ],
  },
  {
    id: "c86734d2-4dfc-4921-abfd-0769238d0942",
    title: "Other vulnerable populations reached with HIV prevention programs",
    value: 1472885,
    component: "HIV",
    geoLocations: [
      {
        name: "Afghanistan",
        value: 20082,
      },
      {
        name: "South Africa",
        value: 479806,
      },
      {
        name: "Philippines",
        value: 33463,
      },
      {
        name: "Guyana",
        value: 2642,
      },
      {
        name: "Eritrea",
        value: 39923,
      },
      {
        name: "Burkina Faso",
        value: 8636,
      },
      {
        name: "Sri Lanka",
        value: 1724,
      },
      {
        name: "Honduras",
        value: 7966,
      },
      {
        name: "Guatemala",
        value: 2815,
      },
      {
        name: "Gambia",
        value: 1505,
      },
      {
        name: "Thailand",
        value: 13568,
      },
      {
        name: "Tajikistan",
        value: 9368,
      },
      {
        name: "Eswatini",
        value: 3535,
      },
      {
        name: "Ethiopia",
        value: 349013,
      },
      {
        name: "Somalia",
        value: 10463,
      },
      {
        name: "Benin",
        value: 10589,
      },
      {
        name: "Ukraine",
        value: 29058,
      },
      {
        name: "Dominican Republic",
        value: 130419,
      },
      {
        name: "Lesotho",
        value: 64546,
      },
      {
        name: "South Sudan",
        value: 253764,
      },
    ],
  },
  {
    id: "4c919fff-0c20-4e59-a842-08187fe871cd",
    title: "Confirmed malaria cases fully investigated and classified",
    value: 37313,
    component: "Malaria",
    geoLocations: [
      {
        name: "Philippines",
        value: 102,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 39,
      },
      {
        name: "Guatemala",
        value: 2001,
      },
      {
        name: "Indonesia",
        value: 2497,
      },
      {
        name: "Nepal",
        value: 671,
      },
      {
        name: "Zanzibar",
        value: 5712,
      },
      {
        name: "Cambodia",
        value: 189,
      },
      {
        name: "Botswana",
        value: 33,
      },
      {
        name: "Bhutan",
        value: 27,
      },
      {
        name: "Guyana",
        value: 10,
      },
      {
        name: "El Salvador",
        value: 3,
      },
      {
        name: "Comoros",
        value: 98,
      },
      {
        name: "Zimbabwe",
        value: 2137,
      },
      {
        name: "Eswatini",
        value: 575,
      },
      {
        name: "Namibia",
        value: 2175,
      },
      {
        name: "Myanmar",
        value: 1874,
      },
      {
        name: "Cabo Verde",
        value: 7867,
      },
      {
        name: "Honduras",
        value: 360,
      },
      {
        name: "Haiti",
        value: 1264,
      },
      {
        name: "Viet Nam",
        value: 4400,
      },
      {
        name: "Timor-Leste",
        value: 9,
      },
      {
        name: "Thailand",
        value: 5010,
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        value: 57,
      },
      {
        name: "Suriname",
        value: 203,
      },
    ],
  },
  {
    id: "90e50abe-51a1-4cef-b764-0a2a95d9f451",
    title: "Number of HIV tests taken among transgender population",
    value: 106911,
    component: "HIV",
    geoLocations: [
      {
        name: "Paraguay",
        value: 324,
      },
      {
        name: "South Africa",
        value: 668,
      },
      {
        name: "Nicaragua",
        value: 3767,
      },
      {
        name: "Dominican Republic",
        value: 4496,
      },
      {
        name: "Peru",
        value: 8410,
      },
      {
        name: "Colombia",
        value: 1856,
      },
      {
        name: "Indonesia",
        value: 12489,
      },
      {
        name: "Philippines",
        value: 28196,
      },
      {
        name: "Timor-Leste",
        value: 729,
      },
      {
        name: "Nepal",
        value: 10093,
      },
      {
        name: "Honduras",
        value: 516,
      },
      {
        name: "Mauritius",
        value: 47,
      },
      {
        name: "Bhutan",
        value: 3,
      },
      {
        name: "El Salvador",
        value: 1039,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 348,
      },
      {
        name: "Guatemala",
        value: 1076,
      },
      {
        name: "Oceania",
        value: 1910,
      },
      {
        name: "Sri Lanka",
        value: 572,
      },
      {
        name: "Malaysia",
        value: 939,
      },
      {
        name: "Cuba",
        value: 1622,
      },
      {
        name: "Viet Nam",
        value: 1801,
      },
      {
        name: "Benin",
        value: 636,
      },
      {
        name: "Pakistan",
        value: 2504,
      },
      {
        name: "Cambodia",
        value: 3793,
      },
      {
        name: "Guyana",
        value: 77,
      },
      {
        name: "Ukraine",
        value: 1477,
      },
      {
        name: "Jamaica",
        value: 300,
      },
      {
        name: "Costa Rica",
        value: 54,
      },
      {
        name: "Ecuador",
        value: 6158,
      },
      {
        name: "Thailand",
        value: 8178,
      },
      {
        name: "Armenia",
        value: 52,
      },
      {
        name: "Bangladesh",
        value: 2547,
      },
      {
        name: "Panama",
        value: 232,
      },
      {
        name: "Caribbean",
        value: 2,
      },
    ],
  },
  {
    id: "acae7f85-1e95-4975-a4b4-0a99ac46ea6e",
    title: "People living with HIV in care screened for TB",
    value: 13799799,
    component: "TB/HIV",
    geoLocations: [
      {
        name: "Mozambique",
        value: 1339532,
      },
      {
        name: "Burundi",
        value: 62898,
      },
      {
        name: "Sudan",
        value: 6770,
      },
      {
        name: "Myanmar",
        value: 291306,
      },
      {
        name: "Chad",
        value: 30308,
      },
      {
        name: "Uzbekistan",
        value: 49285,
      },
      {
        name: "Guinea",
        value: 92350,
      },
      {
        name: "Nigeria",
        value: 1956770,
      },
      {
        name: "Togo",
        value: 74904,
      },
      {
        name: "Gambia",
        value: 11444,
      },
      {
        name: "Zanzibar",
        value: 13012,
      },
      {
        name: "Haiti",
        value: 172764,
      },
      {
        name: "Ethiopia",
        value: 532578,
      },
      {
        name: "Eritrea",
        value: 330,
      },
      {
        name: "Tajikistan",
        value: 13280,
      },
      {
        name: "Ghana",
        value: 224937,
      },
      {
        name: "Niger",
        value: 3420,
      },
      {
        name: "Cameroon",
        value: 540194,
      },
      {
        name: "Burkina Faso",
        value: 56472,
      },
      {
        name: "Namibia",
        value: 263460,
      },
      {
        name: "Lesotho",
        value: 190879,
      },
      {
        name: "Liberia",
        value: 33582,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 25409,
      },
      {
        name: "Kyrgyzstan",
        value: 3888,
      },
      {
        name: "Zimbabwe",
        value: 198898,
      },
      {
        name: "Somalia",
        value: 7186,
      },
      {
        name: "Eswatini",
        value: 298205,
      },
      {
        name: "South Sudan",
        value: 53462,
      },
      {
        name: "Ukraine",
        value: 6686,
      },
      {
        name: "Cambodia",
        value: 83559,
      },
      {
        name: "Comoros",
        value: 44,
      },
      {
        name: "Benin",
        value: 69181,
      },
      {
        name: "Côte d'Ivoire",
        value: 371773,
      },
      {
        name: "India",
        value: 569851,
      },
      {
        name: "Philippines",
        value: 64499,
      },
      {
        name: "Tanzania (United Republic)",
        value: 2140037,
      },
      {
        name: "Malawi",
        value: 1632796,
      },
      {
        name: "Pakistan",
        value: 23090,
      },
      {
        name: "Indonesia",
        value: 179596,
      },
      {
        name: "Mali",
        value: 48561,
      },
      {
        name: "Kenya",
        value: 2062603,
      },
    ],
  },
  {
    id: "c9ce5b77-55f7-4a69-a787-0dc1715815d0",
    title:
      "People living with HIV newly enrolled in HIV care on TB preventive therapy",
    value: 3161830,
    component: "TB/HIV",
    geoLocations: [
      {
        name: "Mozambique",
        value: 273827,
      },
      {
        name: "Guyana",
        value: 329,
      },
      {
        name: "Philippines",
        value: 5114,
      },
      {
        name: "Senegal",
        value: 207,
      },
      {
        name: "Ukraine",
        value: 9511,
      },
      {
        name: "Thailand",
        value: 201,
      },
      {
        name: "Burundi",
        value: 3350,
      },
      {
        name: "Zambia",
        value: 187383,
      },
      {
        name: "Kenya",
        value: 1693755,
      },
      {
        name: "Liberia",
        value: 2639,
      },
      {
        name: "Tanzania (United Republic)",
        value: 578401,
      },
      {
        name: "India",
        value: 18649,
      },
      {
        name: "Myanmar",
        value: 7558,
      },
      {
        name: "Central African Republic",
        value: 85,
      },
      {
        name: "Sudan",
        value: 215,
      },
      {
        name: "Cambodia",
        value: 2813,
      },
      {
        name: "Nigeria",
        value: 111402,
      },
      {
        name: "Ethiopia",
        value: 10691,
      },
      {
        name: "Namibia",
        value: 5904,
      },
      {
        name: "Guinea",
        value: 2079,
      },
      {
        name: "Indonesia",
        value: 6568,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 16752,
      },
      {
        name: "Mali",
        value: 3159,
      },
      {
        name: "South Africa",
        value: 128419,
      },
      {
        name: "Tajikistan",
        value: 937,
      },
      {
        name: "Eritrea",
        value: 131,
      },
      {
        name: "Somalia",
        value: 134,
      },
      {
        name: "Sierra Leone",
        value: 5435,
      },
      {
        name: "Uganda",
        value: 70652,
      },
      {
        name: "Papua New Guinea",
        value: 713,
      },
      {
        name: "Guatemala",
        value: 642,
      },
      {
        name: "Chad",
        value: 5404,
      },
      {
        name: "Viet Nam",
        value: 8771,
      },
    ],
  },
  {
    id: "d9055965-319b-4f18-8417-0e333dd6c84c",
    title:
      "Number of TB patients with drug-susceptibility testing result for at least Rifampicin",
    value: 1432410,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "El Salvador",
        value: 2450,
      },
      {
        name: "Rwanda",
        value: 1989,
      },
      {
        name: "Ethiopia",
        value: 8018,
      },
      {
        name: "Afghanistan",
        value: 11887,
      },
      {
        name: "Uzbekistan",
        value: 8295,
      },
      {
        name: "Uganda",
        value: 32685,
      },
      {
        name: "Myanmar",
        value: 65190,
      },
      {
        name: "Bangladesh",
        value: 114434,
      },
      {
        name: "Madagascar",
        value: 1292,
      },
      {
        name: "Cameroon",
        value: 8208,
      },
      {
        name: "Bolivia (Plurinational State)",
        value: 5663,
      },
      {
        name: "Benin",
        value: 1136,
      },
      {
        name: "Guatemala",
        value: 1075,
      },
      {
        name: "India",
        value: 896255,
      },
      {
        name: "Tanzania (United Republic)",
        value: 30525,
      },
      {
        name: "Indonesia",
        value: 160958,
      },
      {
        name: "Guinea-Bissau",
        value: 1036,
      },
      {
        name: "Pakistan",
        value: 46577,
      },
      {
        name: "Thailand",
        value: 25477,
      },
      {
        name: "Malawi",
        value: 4435,
      },
      {
        name: "Kosovo",
        value: 220,
      },
      {
        name: "Tajikistan",
        value: 4605,
      },
    ],
  },
  {
    id: "d677a493-b280-486e-8d07-0ebc05550fa7",
    title: "Number of HIV tests taken among other vulnerable population",
    value: 1664039,
    component: "HIV",
    geoLocations: [
      {
        name: "Myanmar",
        value: 91070,
      },
      {
        name: "Gambia",
        value: 97,
      },
      {
        name: "Thailand",
        value: 120105,
      },
      {
        name: "Guyana",
        value: 2608,
      },
      {
        name: "Zimbabwe",
        value: 6470,
      },
      {
        name: "El Salvador",
        value: 22703,
      },
      {
        name: "Benin",
        value: 14221,
      },
      {
        name: "Azerbaijan",
        value: 15265,
      },
      {
        name: "Armenia",
        value: 596,
      },
      {
        name: "Ethiopia",
        value: 270554,
      },
      {
        name: "Georgia",
        value: 3073,
      },
      {
        name: "Eritrea",
        value: 38609,
      },
      {
        name: "Kyrgyzstan",
        value: 5296,
      },
      {
        name: "Burkina Faso",
        value: 5808,
      },
      {
        name: "Sri Lanka",
        value: 16666,
      },
      {
        name: "Viet Nam",
        value: 55506,
      },
      {
        name: "Tajikistan",
        value: 8904,
      },
      {
        name: "Afghanistan",
        value: 28868,
      },
      {
        name: "Indonesia",
        value: 70672,
      },
      {
        name: "Eswatini",
        value: 156,
      },
      {
        name: "Peru",
        value: 21345,
      },
      {
        name: "Iran (Islamic Republic)",
        value: 365243,
      },
      {
        name: "Honduras",
        value: 9555,
      },
      {
        name: "Côte d'Ivoire",
        value: 23345,
      },
      {
        name: "Dominican Republic",
        value: 135505,
      },
      {
        name: "Lesotho",
        value: 14719,
      },
      {
        name: "Madagascar",
        value: 160390,
      },
      {
        name: "South Africa",
        value: 129355,
      },
      {
        name: "Senegal",
        value: 27335,
      },
    ],
  },
  {
    id: "728c5d63-087b-46e8-bf9d-0fbe93a7b1b6",
    title: "Households covered by Indoor Residual Spraying",
    value: 7988911,
    component: "Malaria",
    geoLocations: [
      {
        name: "Gambia",
        value: 63484,
      },
      {
        name: "Zimbabwe",
        value: 740776,
      },
      {
        name: "Eswatini",
        value: 10126,
      },
      {
        name: "El Salvador",
        value: 4275,
      },
      {
        name: "Djibouti",
        value: 5782,
      },
      {
        name: "Rwanda",
        value: 938407,
      },
      {
        name: "Botswana",
        value: 83488,
      },
      {
        name: "Sudan",
        value: 736359,
      },
      {
        name: "Burundi",
        value: 339541,
      },
      {
        name: "Zanzibar",
        value: 94339,
      },
      {
        name: "Sao Tome and Principe",
        value: 12242,
      },
      {
        name: "Zambia",
        value: 1475316,
      },
      {
        name: "Ethiopia",
        value: 1576447,
      },
      {
        name: "Nicaragua",
        value: 27614,
      },
      {
        name: "Eritrea",
        value: 153189,
      },
      {
        name: "Honduras",
        value: 58074,
      },
      {
        name: "Mozambique",
        value: 1442515,
      },
      {
        name: "Timor-Leste",
        value: 19701,
      },
      {
        name: "Ghana",
        value: 207236,
      },
    ],
  },
  {
    id: "33cd1d99-06fe-41b3-86a7-0fd8ff7dc2fd",
    title: "Care and support services provided to people living with HIV",
    value: 1665801,
    component: "HIV",
    geoLocations: [
      {
        name: "Kosovo",
        value: 36,
      },
      {
        name: "Lesotho",
        value: 27884,
      },
      {
        name: "Honduras",
        value: 671,
      },
      {
        name: "Pakistan",
        value: 4052,
      },
      {
        name: "Armenia",
        value: 441,
      },
      {
        name: "Guyana",
        value: 607,
      },
      {
        name: "Côte d'Ivoire",
        value: 52098,
      },
      {
        name: "Malawi",
        value: 112817,
      },
      {
        name: "Mauritius",
        value: 1014,
      },
      {
        name: "India",
        value: 630104,
      },
      {
        name: "Nigeria",
        value: 8580,
      },
      {
        name: "Malaysia",
        value: 124,
      },
      {
        name: "Sierra Leone",
        value: 8656,
      },
      {
        name: "Burkina Faso",
        value: 38676,
      },
      {
        name: "South Africa",
        value: 558733,
      },
      {
        name: "Ukraine",
        value: 63438,
      },
      {
        name: "Suriname",
        value: 455,
      },
      {
        name: "Kenya",
        value: 95174,
      },
      {
        name: "Ghana",
        value: 2367,
      },
      {
        name: "Mozambique",
        value: 59874,
      },
    ],
  },
  {
    id: "2cc03e64-4872-4a6b-8c9f-16c74a18ad08",
    title: "People with extensively drug-resistant TB on treatment",
    value: 6107,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Ukraine",
        value: 1504,
      },
      {
        name: "Georgia",
        value: 31,
      },
      {
        name: "Kazakhstan",
        value: 333,
      },
      {
        name: "Turkmenistan",
        value: 113,
      },
      {
        name: "Azerbaijan",
        value: 186,
      },
      {
        name: "Uzbekistan",
        value: 688,
      },
      {
        name: "Tajikistan",
        value: 97,
      },
      {
        name: "Belarus",
        value: 655,
      },
      {
        name: "Thailand",
        value: 13,
      },
      {
        name: "Moldova",
        value: 50,
      },
      {
        name: "India",
        value: 2073,
      },
      {
        name: "Kyrgyzstan",
        value: 102,
      },
      {
        name: "Armenia",
        value: 34,
      },
      {
        name: "Viet Nam",
        value: 228,
      },
    ],
  },
  {
    id: "8c28a015-e1aa-449b-9b76-2263457c536c",
    title: "Population covered by Indoor Residual Spraying",
    value: 12804434,
    component: "Malaria",
    geoLocations: [
      {
        name: "Mozambique",
        value: 6303792,
      },
      {
        name: "Rwanda",
        value: 1851345,
      },
      {
        name: "Zimbabwe",
        value: 3022370,
      },
      {
        name: "Zanzibar",
        value: 477243,
      },
      {
        name: "Eswatini",
        value: 38749,
      },
      {
        name: "Ghana",
        value: 1110935,
      },
    ],
  },
  {
    id: "13b17d51-386e-4a34-8174-22e2ee73fdfc",
    title: "Number of HIV tests taken among adolescents and youth",
    value: 639358,
    component: "HIV",
    geoLocations: [
      {
        name: "Namibia",
        value: 22752,
      },
      {
        name: "Botswana",
        value: 3812,
      },
      {
        name: "Cameroon",
        value: 40971,
      },
      {
        name: "Nigeria",
        value: 37239,
      },
      {
        name: "Tanzania (United Republic)",
        value: 35839,
      },
      {
        name: "Liberia",
        value: 22511,
      },
      {
        name: "Eswatini",
        value: 517,
      },
      {
        name: "Côte d'Ivoire",
        value: 185616,
      },
      {
        name: "South Africa",
        value: 72794,
      },
      {
        name: "Uganda",
        value: 10774,
      },
      {
        name: "Chad",
        value: 106938,
      },
      {
        name: "Lesotho",
        value: 15434,
      },
      {
        name: "Malawi",
        value: 84161,
      },
    ],
  },
  {
    id: "bb4f698b-c5ee-4145-8be7-27075ba5b44d",
    title: "People using pre-exposure prophylaxis",
    value: 20650,
    component: "HIV",
    geoLocations: [
      {
        name: "Viet Nam",
        value: 3773,
      },
      {
        name: "Zimbabwe",
        value: 5498,
      },
      {
        name: "Lesotho",
        value: 531,
      },
      {
        name: "Thailand",
        value: 10709,
      },
      {
        name: "Georgia",
        value: 139,
      },
    ],
  },
  {
    id: "22b3a674-6ec8-48f6-bbe4-2815dc3f5eb0",
    title: "Medical male circumcisions",
    value: 1260403,
    component: "HIV",
    geoLocations: [
      {
        name: "Zambia",
        value: 607513,
      },
      {
        name: "Lesotho",
        value: 34466,
      },
      {
        name: "Malawi",
        value: 111135,
      },
      {
        name: "Rwanda",
        value: 346157,
      },
      {
        name: "Kenya",
        value: 118752,
      },
      {
        name: "Namibia",
        value: 36388,
      },
      {
        name: "Eswatini",
        value: 1648,
      },
      {
        name: "Botswana",
        value: 4344,
      },
    ],
  },
  {
    id: "d920daf8-91c3-4b87-a366-3d69a2c9ba08",
    title:
      "Number of confirmed MDR-TB cases tested for susceptibility to any fluoroquinolone and any second-line injectable drug",
    value: 8632,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "Philippines",
        value: 6207,
      },
      {
        name: "Kyrgyzstan",
        value: 949,
      },
      {
        name: "Tajikistan",
        value: 252,
      },
      {
        name: "Azerbaijan",
        value: 704,
      },
      {
        name: "Thailand",
        value: 520,
      },
    ],
  },
  {
    id: "e0f887c4-4ef1-427a-a207-58e79b548755",
    title: "Pregnant women tested for syphilis",
    value: 600614,
    component: "HIV",
    geoLocations: [
      {
        name: "Malawi",
        value: 520160,
      },
      {
        name: "Eritrea",
        value: 80454,
      },
    ],
  },
  {
    id: "f8000773-b16b-4d84-86bf-b7d792d6613c",
    title: "Care and support services provided to TB patients",
    value: 29889,
    component: "Tuberculosis",
    geoLocations: [
      {
        name: "South Africa",
        value: 2159,
      },
      {
        name: "Congo (Democratic Republic)",
        value: 27730,
      },
    ],
  },
];

export interface ResultsInfoContentStatsProps {
  name: string;
  value: number;
  description: string;
}

export interface ResultsInfoContentProps {
  description: string;
  stats: ResultsInfoContentStatsProps[];
}

export const sidePanelInfoData: ResultsInfoContentProps = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar condimentum aliquet. Cras bibendum, lectus sit amet venenatis efficitur, magna nisl scelerisque ligula, ac laoreet odio est eget nunc. Fusce semlectus, viverra sit amet nulla nec, sollicitudin scelerisque magna. Proin consequat arcu vitae volutpat tincidunt.",
  stats: [
    {
      name: "HIV",
      value: 20070449,
      description: "People on antiretroviral therapy for HIV",
    },
    {
      name: "Tuberculosis",
      value: 5765786,
      description: "People with TB treated",
    },
    {
      name: "Malaria",
      value: 160030604,
      description: "Mosquito nets distributed",
    },
  ],
};
