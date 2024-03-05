export interface GeoCategoryProps {
  name: string;
  value: string;
  search?: boolean;
  highlighted?: boolean;
  items: GeoSubCategoryProps[];
}

export interface GeoSubCategoryProps {
  name: string;
  value: string;
  items: GeoItem[];
  search?: boolean;
  highlighted?: boolean;
}

export interface GeoItem {
  name: string;
  value: string;
  search?: boolean;
  highlighted?: boolean;
}

export const GEO_CATEGORIES: GeoCategoryProps[] = [
  {
    name: "Africa",
    value: "QPA",
    items: [
      {
        name: "Eastern Africa",
        value: "QPB",
        items: [
          {
            name: "Burundi",
            value: "BDI",
          },
          {
            name: "Comoros",
            value: "COM",
          },
          {
            name: "Djibouti",
            value: "DJI",
          },
          {
            name: "Eritrea",
            value: "ERI",
          },
          {
            name: "Ethiopia",
            value: "ETH",
          },
          {
            name: "Kenya",
            value: "KEN",
          },
          {
            name: "Madagascar",
            value: "MDG",
          },
          {
            name: "Malawi",
            value: "MWI",
          },
          {
            name: "Mauritius",
            value: "MUS",
          },
          {
            name: "Mayotte",
            value: "MYT",
          },
          {
            name: "Mozambique",
            value: "MOZ",
          },
          {
            name: "Rwanda",
            value: "RWA",
          },
          {
            name: "Réunion",
            value: "REU",
          },
          {
            name: "Seychelles",
            value: "SYC",
          },
          {
            name: "Somalia",
            value: "SOM",
          },
          {
            name: "South Sudan",
            value: "SSD",
          },
          {
            name: "Tanzania (United Republic)",
            value: "TZA",
          },
          {
            name: "Uganda",
            value: "UGA",
          },
          {
            name: "Zambia",
            value: "ZMB",
          },
          {
            name: "Zanzibar",
            value: "QNB",
          },
          {
            name: "Zimbabwe",
            value: "ZWE",
          },
        ],
      },
      {
        name: "Middle Africa",
        value: "QPC",
        items: [
          {
            name: "Angola",
            value: "AGO",
          },
          {
            name: "Cameroon",
            value: "CMR",
          },
          {
            name: "Central African Republic",
            value: "CAF",
          },
          {
            name: "Chad",
            value: "TCD",
          },
          {
            name: "Congo",
            value: "COG",
          },
          {
            name: "Congo (Democratic Republic)",
            value: "COD",
          },
          {
            name: "Equatorial Guinea",
            value: "GNQ",
          },
          {
            name: "Gabon",
            value: "GAB",
          },
          {
            name: "Sao Tome and Principe",
            value: "STP",
          },
        ],
      },
      {
        name: "Northern Africa",
        value: "QPD",
        items: [
          {
            name: "Algeria",
            value: "DZA",
          },
          {
            name: "Egypt",
            value: "EGY",
          },
          {
            name: "Libya",
            value: "LBY",
          },
          {
            name: "Morocco",
            value: "MAR",
          },
          {
            name: "Sudan",
            value: "SDN",
          },
          {
            name: "Tunisia",
            value: "TUN",
          },
          {
            name: "Western Sahara",
            value: "ESH",
          },
        ],
      },
      {
        name: "Southern Africa",
        value: "QPE",
        items: [
          {
            name: "Botswana",
            value: "BWA",
          },
          {
            name: "Eswatini",
            value: "SWZ",
          },
          {
            name: "Lesotho",
            value: "LSO",
          },
          {
            name: "Namibia",
            value: "NAM",
          },
          {
            name: "South Africa",
            value: "ZAF",
          },
        ],
      },
      {
        name: "Western Africa",
        value: "QPF",
        items: [
          {
            name: "Benin",
            value: "BEN",
          },
          {
            name: "Burkina Faso",
            value: "BFA",
          },
          {
            name: "Cabo Verde",
            value: "CPV",
          },
          {
            name: "Côte d'Ivoire",
            value: "CIV",
          },
          {
            name: "Gambia",
            value: "GMB",
          },
          {
            name: "Ghana",
            value: "GHA",
          },
          {
            name: "Guinea",
            value: "GIN",
          },
          {
            name: "Guinea-Bissau",
            value: "GNB",
          },
          {
            name: "Liberia",
            value: "LBR",
          },
          {
            name: "Mali",
            value: "MLI",
          },
          {
            name: "Mauritania",
            value: "MRT",
          },
          {
            name: "Niger",
            value: "NER",
          },
          {
            name: "Nigeria",
            value: "NGA",
          },
          {
            name: "Saint Helena",
            value: "SHN",
          },
          {
            name: "Senegal",
            value: "SEN",
          },
          {
            name: "Sierra Leone",
            value: "SLE",
          },
          {
            name: "Togo",
            value: "TGO",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "",
        items: [
          {
            name: "Multicountry Eastern Africa IGAD",
            value: "Multicountry Eastern Africa IGAD",
          },
          {
            name: "Multicountry Eastern Africa KANCO",
            value: "Multicountry Eastern Africa KANCO",
          },
          {
            name: "Multicountry North Africa",
            value: "Multicountry North Africa",
          },
          {
            name: "Multicountry West Africa ALCO",
            value: "Multicountry West Africa ALCO",
          },
          {
            name: "Multicountry West Africa ITPC",
            value: "Multicountry West Africa ITPC",
          },
          {
            name: "Multicountry Western Africa ANCS",
            value: "Multicountry Western Africa ANCS",
          },
          {
            name: "Multicountry Western Africa HI",
            value: "Multicountry Western Africa HI",
          },
        ],
      },
    ],
  },
  {
    name: "Americas",
    value: "QRA",
    items: [
      {
        name: "Caribbean",
        value: "QRB",
        items: [
          {
            name: "Anguilla",
            value: "AIA",
          },
          {
            name: "Antigua and Barbuda",
            value: "ATG",
          },
          {
            name: "Aruba",
            value: "ABW",
          },
          {
            name: "Bahamas",
            value: "BHS",
          },
          {
            name: "Barbados",
            value: "BRB",
          },
          {
            name: "Bonaire, Sint Eustatius and Saba",
            value: "BES",
          },
          {
            name: "British Virgin Islands",
            value: "VGB",
          },
          {
            name: "Cayman Islands",
            value: "CYM",
          },
          {
            name: "Cuba",
            value: "CUB",
          },
          {
            name: "Curacao",
            value: "CUW",
          },
          {
            name: "Dominica",
            value: "DMA",
          },
          {
            name: "Dominican Republic",
            value: "DOM",
          },
          {
            name: "Grenada",
            value: "GRD",
          },
          {
            name: "Guadeloupe",
            value: "GLP",
          },
          {
            name: "Haiti",
            value: "HTI",
          },
          {
            name: "Jamaica",
            value: "JAM",
          },
          {
            name: "Martinique",
            value: "MTQ",
          },
          {
            name: "Montserrat",
            value: "MSR",
          },
          {
            name: "Netherlands Antilles",
            value: "ANT",
          },
          {
            name: "Puerto Rico",
            value: "PRI",
          },
          {
            name: "Saint Kitts and Nevis",
            value: "KNA",
          },
          {
            name: "Saint Lucia",
            value: "LCA",
          },
          {
            name: "Saint Vincent and Grenadines",
            value: "VCT",
          },
          {
            name: "Sint Maarten (Dutch part)",
            value: "SXM",
          },
          {
            name: "Trinidad and Tobago",
            value: "TTO",
          },
          {
            name: "Turks and Caicos Islands",
            value: "TCA",
          },
          {
            name: "United States Virgin Islands",
            value: "VIR",
          },
        ],
      },
      {
        name: "Central America",
        value: "QRC",
        items: [
          {
            name: "Belize",
            value: "BLZ",
          },
          {
            name: "Costa Rica",
            value: "CRI",
          },
          {
            name: "El Salvador",
            value: "SLV",
          },
          {
            name: "Guatemala",
            value: "GTM",
          },
          {
            name: "Honduras",
            value: "HND",
          },
          {
            name: "Mexico",
            value: "MEX",
          },
          {
            name: "Nicaragua",
            value: "NIC",
          },
          {
            name: "Panama",
            value: "PAN",
          },
        ],
      },
      {
        name: "Northern America",
        value: "QRE",
        items: [
          {
            name: "Bermuda",
            value: "BMU",
          },
          {
            name: "Canada",
            value: "CAN",
          },
          {
            name: "Greenland",
            value: "GRL",
          },
          {
            name: "Saint Pierre and Miquelon",
            value: "SPM",
          },
          {
            name: "United States",
            value: "USA",
          },
        ],
      },
      {
        name: "South America",
        value: "QRD",
        items: [
          {
            name: "Argentina",
            value: "ARG",
          },
          {
            name: "Bolivia (Plurinational State)",
            value: "BOL",
          },
          {
            name: "Brazil",
            value: "BRA",
          },
          {
            name: "Chile",
            value: "CHL",
          },
          {
            name: "Colombia",
            value: "COL",
          },
          {
            name: "Ecuador",
            value: "ECU",
          },
          {
            name: "Falkland Islands (Malvinas)",
            value: "FLK",
          },
          {
            name: "French Guiana",
            value: "GUF",
          },
          {
            name: "Guyana",
            value: "GUY",
          },
          {
            name: "Paraguay",
            value: "PRY",
          },
          {
            name: "Peru",
            value: "PER",
          },
          {
            name: "Suriname",
            value: "SUR",
          },
          {
            name: "Uruguay",
            value: "URY",
          },
          {
            name: "Venezuela",
            value: "VEN",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "",
        items: [
          {
            name: "Multicountry Americas (Andean)",
            value: "Multicountry Americas (Andean)",
          },
          {
            name: "Multicountry Americas (OECS)",
            value: "Multicountry Americas (OECS)",
          },
          {
            name: "Multicountry Caribbean MCC",
            value: "Multicountry Caribbean MCC",
          },
          {
            name: "Multicountry Central Americas REDCA",
            value: "Multicountry Central Americas REDCA",
          },
        ],
      },
    ],
  },
  {
    name: "Asia",
    value: "QSA",
    items: [
      {
        name: "Central Asia",
        value: "QSB",
        items: [
          {
            name: "Kazakhstan",
            value: "KAZ",
          },
          {
            name: "Kyrgyzstan",
            value: "KGZ",
          },
          {
            name: "Tajikistan",
            value: "TJK",
          },
          {
            name: "Turkmenistan",
            value: "TKM",
          },
          {
            name: "Uzbekistan",
            value: "UZB",
          },
        ],
      },
      {
        name: "Eastern Asia",
        value: "QSC",
        items: [
          {
            name: "China",
            value: "CHN",
          },
          {
            name: "Hong Kong",
            value: "HKG",
          },
          {
            name: "Japan",
            value: "JPN",
          },
          {
            name: "Korea (Democratic Peoples Republic)",
            value: "PRK",
          },
          {
            name: "Korea (Republic)",
            value: "KOR",
          },
          {
            name: "Macao",
            value: "MAC",
          },
          {
            name: "Mongolia",
            value: "MNG",
          },
          {
            name: "Taiwan",
            value: "TWN",
          },
        ],
      },
      {
        name: "South-Eastern Asia",
        value: "QSE",
        items: [
          {
            name: "Brunei Darussalam",
            value: "BRN",
          },
          {
            name: "Cambodia",
            value: "KHM",
          },
          {
            name: "Indonesia",
            value: "IDN",
          },
          {
            name: "Lao (Peoples Democratic Republic)",
            value: "LAO",
          },
          {
            name: "Malaysia",
            value: "MYS",
          },
          {
            name: "Myanmar",
            value: "MMR",
          },
          {
            name: "Philippines",
            value: "PHL",
          },
          {
            name: "Singapore",
            value: "SGP",
          },
          {
            name: "Thailand",
            value: "THA",
          },
          {
            name: "Timor-Leste",
            value: "TLS",
          },
          {
            name: "Viet Nam",
            value: "VNM",
          },
        ],
      },
      {
        name: "Southern Asia",
        value: "QSD",
        items: [
          {
            name: "Afghanistan",
            value: "AFG",
          },
          {
            name: "Bangladesh",
            value: "BGD",
          },
          {
            name: "Bhutan",
            value: "BTN",
          },
          {
            name: "India",
            value: "IND",
          },
          {
            name: "Iran (Islamic Republic)",
            value: "IRN",
          },
          {
            name: "Maldives",
            value: "MDV",
          },
          {
            name: "Nepal",
            value: "NPL",
          },
          {
            name: "Pakistan",
            value: "PAK",
          },
          {
            name: "Sri Lanka",
            value: "LKA",
          },
        ],
      },
      {
        name: "Western Asia",
        value: "QSF",
        items: [
          {
            name: "Armenia",
            value: "ARM",
          },
          {
            name: "Azerbaijan",
            value: "AZE",
          },
          {
            name: "Bahrain",
            value: "BHR",
          },
          {
            name: "Cyprus",
            value: "CYP",
          },
          {
            name: "Georgia",
            value: "GEO",
          },
          {
            name: "Iraq",
            value: "IRQ",
          },
          {
            name: "Israel",
            value: "ISR",
          },
          {
            name: "Jordan",
            value: "JOR",
          },
          {
            name: "Kuwait",
            value: "KWT",
          },
          {
            name: "Lebanon",
            value: "LBN",
          },
          {
            name: "Oman",
            value: "OMN",
          },
          {
            name: "Palestine",
            value: "PSE",
          },
          {
            name: "Qatar",
            value: "QAT",
          },
          {
            name: "Saudi Arabia",
            value: "SAU",
          },
          {
            name: "Syrian Arab Republic",
            value: "SYR",
          },
          {
            name: "Türkiye",
            value: "TUR",
          },
          {
            name: "United Arab Emirates",
            value: "ARE",
          },
          {
            name: "Yemen",
            value: "YEM",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "",
        items: [
          {
            name: "Multicountry East Asia and Pacific HIVOS",
            value: "Multicountry East Asia and Pacific HIVOS",
          },
          {
            name: "Multicountry East Asia and Pacific RAI",
            value: "Multicountry East Asia and Pacific RAI",
          },
          {
            name: "Multicountry Middle East MER",
            value: "Multicountry Middle East MER",
          },
          {
            name: "Multicountry South Asia",
            value: "Multicountry South Asia",
          },
          {
            name: "Multicountry South-Eastern Asia AFAO",
            value: "Multicountry South-Eastern Asia AFAO",
          },
          {
            name: "Multicountry TB Asia TEAM",
            value: "Multicountry TB Asia TEAM",
          },
          {
            name: "Multicountry TB Asia UNDP",
            value: "Multicountry TB Asia UNDP",
          },
        ],
      },
    ],
  },
  {
    name: "Europe",
    value: "QTA",
    items: [
      {
        name: "Eastern Europe",
        value: "QTB",
        items: [
          {
            name: "Belarus",
            value: "BLR",
          },
          {
            name: "Bulgaria",
            value: "BGR",
          },
          {
            name: "Czechia",
            value: "CZE",
          },
          {
            name: "Hungary",
            value: "HUN",
          },
          {
            name: "Moldova",
            value: "MDA",
          },
          {
            name: "Poland",
            value: "POL",
          },
          {
            name: "Romania",
            value: "ROU",
          },
          {
            name: "Russian Federation",
            value: "RUS",
          },
          {
            name: "Slovakia",
            value: "SVK",
          },
          {
            name: "Ukraine",
            value: "UKR",
          },
        ],
      },
      {
        name: "Northern Europe",
        value: "QTC",
        items: [
          {
            name: "Aland Islands",
            value: "ALA",
          },
          {
            name: "Denmark",
            value: "DNK",
          },
          {
            name: "Estonia",
            value: "EST",
          },
          {
            name: "Faeroe Islands",
            value: "FRO",
          },
          {
            name: "Finland",
            value: "FIN",
          },
          {
            name: "Guernsey",
            value: "GGY",
          },
          {
            name: "Iceland",
            value: "ISL",
          },
          {
            name: "Ireland",
            value: "IRL",
          },
          {
            name: "Isle of Man",
            value: "IMN",
          },
          {
            name: "Jersey",
            value: "JEY",
          },
          {
            name: "Latvia",
            value: "LVA",
          },
          {
            name: "Lithuania",
            value: "LTU",
          },
          {
            name: "Norway",
            value: "NOR",
          },
          {
            name: "Svalbard and Jan Mayen Islands",
            value: "SJM",
          },
          {
            name: "Sweden",
            value: "SWE",
          },
          {
            name: "United Kingdom",
            value: "GBR",
          },
        ],
      },
      {
        name: "Southern Europe",
        value: "QTD",
        items: [
          {
            name: "Albania",
            value: "ALB",
          },
          {
            name: "Andorra",
            value: "AND",
          },
          {
            name: "Bosnia and Herzegovina",
            value: "BIH",
          },
          {
            name: "Croatia",
            value: "HRV",
          },
          {
            name: "Gibraltar",
            value: "GIB",
          },
          {
            name: "Greece",
            value: "GRC",
          },
          {
            name: "Holy See",
            value: "VAT",
          },
          {
            name: "Italy",
            value: "ITA",
          },
          {
            name: "Kosovo",
            value: "QNA",
          },
          {
            name: "Malta",
            value: "MLT",
          },
          {
            name: "Montenegro",
            value: "MNE",
          },
          {
            name: "North Macedonia",
            value: "MKD",
          },
          {
            name: "Portugal",
            value: "PRT",
          },
          {
            name: "San Marino",
            value: "SMR",
          },
          {
            name: "Serbia",
            value: "SRB",
          },
          {
            name: "Slovenia",
            value: "SVN",
          },
          {
            name: "Spain",
            value: "ESP",
          },
        ],
      },
      {
        name: "Western Europe",
        value: "QTE",
        items: [
          {
            name: "Austria",
            value: "AUT",
          },
          {
            name: "Belgium",
            value: "BEL",
          },
          {
            name: "France",
            value: "FRA",
          },
          {
            name: "Germany",
            value: "DEU",
          },
          {
            name: "Liechtenstein",
            value: "LIE",
          },
          {
            name: "Luxembourg",
            value: "LUX",
          },
          {
            name: "Monaco",
            value: "MCO",
          },
          {
            name: "Netherlands",
            value: "NLD",
          },
          {
            name: "Switzerland",
            value: "CHE",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "",
        items: [
          {
            name: "The Lutheran World Federation",
            value: "The Lutheran World Federation",
          },
        ],
      },
    ],
  },
  {
    name: "Oceania",
    value: "QUA",
    items: [
      {
        name: "Australia and New Zealand",
        value: "QUB",
        items: [
          {
            name: "Australia",
            value: "AUS",
          },
          {
            name: "New Zealand",
            value: "NZL",
          },
          {
            name: "Norfolk Island",
            value: "NFK",
          },
        ],
      },
      {
        name: "Melanesia",
        value: "QUC",
        items: [
          {
            name: "Fiji",
            value: "FJI",
          },
          {
            name: "New Caledonia",
            value: "NCL",
          },
          {
            name: "Papua New Guinea",
            value: "PNG",
          },
          {
            name: "Solomon Islands",
            value: "SLB",
          },
          {
            name: "Vanuatu",
            value: "VUT",
          },
        ],
      },
      {
        name: "Micronesia",
        value: "QUD",
        items: [
          {
            name: "Guam",
            value: "GUM",
          },
          {
            name: "Kiribati",
            value: "KIR",
          },
          {
            name: "Marshall Islands",
            value: "MHL",
          },
          {
            name: "Micronesia (Federated States)",
            value: "FSM",
          },
          {
            name: "Nauru",
            value: "NRU",
          },
          {
            name: "Northern Mariana Islands",
            value: "MNP",
          },
          {
            name: "Palau",
            value: "PLW",
          },
        ],
      },
      {
        name: "Polynesia",
        value: "QUE",
        items: [
          {
            name: "American Samoa",
            value: "ASM",
          },
          {
            name: "Cook Islands",
            value: "COK",
          },
          {
            name: "French Polynesia",
            value: "PYF",
          },
          {
            name: "Niue",
            value: "NIU",
          },
          {
            name: "Pitcairn",
            value: "PCN",
          },
          {
            name: "Samoa",
            value: "WSM",
          },
          {
            name: "Tokelau",
            value: "TKL",
          },
          {
            name: "Tonga",
            value: "TON",
          },
          {
            name: "Tuvalu",
            value: "TUV",
          },
          {
            name: "Wallis and Futuna Islands",
            value: "WLF",
          },
        ],
      },
    ],
  },
];
