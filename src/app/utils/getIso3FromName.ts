import find from "lodash/find";

export const countryList = [
  {
    name: "Afghanistan",
    iso2: "AF",
    iso3: "AFG",
  },
  {
    name: "Åland Islands",
    iso2: "AX",
    iso3: "ALA",
  },
  {
    name: "Albania",
    iso2: "AL",
    iso3: "ALB",
  },
  {
    name: "Algeria",
    iso2: "DZ",
    iso3: "DZA",
  },
  {
    name: "American Samoa",
    iso2: "AS",
    iso3: "ASM",
  },
  {
    name: "Andorra",
    iso2: "AD",
    iso3: "AND",
  },
  {
    name: "Angola",
    iso2: "AO",
    iso3: "AGO",
  },
  {
    name: "Anguilla",
    iso2: "AI",
    iso3: "AIA",
  },
  {
    name: "Antarctica",
    iso2: "AQ",
    iso3: "ATA",
  },
  {
    name: "Antigua and Barbuda",
    iso2: "AG",
    iso3: "ATG",
  },
  {
    name: "Argentina",
    iso2: "AR",
    iso3: "ARG",
  },
  {
    name: "Armenia",
    iso2: "AM",
    iso3: "ARM",
  },
  {
    name: "Aruba",
    iso2: "AW",
    iso3: "ABW",
  },
  {
    name: "Australia",
    iso2: "AU",
    iso3: "AUS",
  },
  {
    name: "Austria",
    iso2: "AT",
    iso3: "AUT",
  },
  {
    name: "Azerbaijan",
    iso2: "AZ",
    iso3: "AZE",
  },
  {
    name: "Bahamas (the)",
    iso2: "BS",
    iso3: "BHS",
  },
  {
    name: "Bahrain",
    iso2: "BH",
    iso3: "BHR",
  },
  {
    name: "Bangladesh",
    iso2: "BD",
    iso3: "BGD",
  },
  {
    name: "Barbados",
    iso2: "BB",
    iso3: "BRB",
  },
  {
    name: "Belarus",
    iso2: "BY",
    iso3: "BLR",
  },
  {
    name: "Belgium",
    iso2: "BE",
    iso3: "BEL",
  },
  {
    name: "Belize",
    iso2: "BZ",
    iso3: "BLZ",
  },
  {
    name: "Benin",
    iso2: "BJ",
    iso3: "BEN",
  },
  {
    name: "Bermuda",
    iso2: "BM",
    iso3: "BMU",
  },
  {
    name: "Bhutan",
    iso2: "BT",
    iso3: "BTN",
  },
  {
    name: "Bolivia (Plurinational State of)",
    iso2: "BO",
    iso3: "BOL",
  },
  {
    name: "Bonaire, Sint Eustatius and Saba",
    iso2: "BQ",
    iso3: "BES",
  },
  {
    name: "Bosnia and Herzegovina",
    iso2: "BA",
    iso3: "BIH",
  },
  {
    name: "Botswana",
    iso2: "BW",
    iso3: "BWA",
  },
  {
    name: "Bouvet Island",
    iso2: "BV",
    iso3: "BVT",
  },
  {
    name: "Brazil",
    iso2: "BR",
    iso3: "BRA",
  },
  {
    name: "British Indian Ocean Territory (the)",
    iso2: "IO",
    iso3: "IOT",
  },
  {
    name: "Brunei Darussalam",
    iso2: "BN",
    iso3: "BRN",
  },
  {
    name: "Bulgaria",
    iso2: "BG",
    iso3: "BGR",
  },
  {
    name: "Burkina Faso",
    iso2: "BF",
    iso3: "BFA",
  },
  {
    name: "Burundi",
    iso2: "BI",
    iso3: "BDI",
  },
  {
    name: "Cambodia",
    iso2: "KH",
    iso3: "KHM",
  },
  {
    name: "Cameroon",
    iso2: "CM",
    iso3: "CMR",
  },
  {
    name: "Canada",
    iso2: "CA",
    iso3: "CAN",
  },
  {
    name: "Cabo Verde",
    iso2: "CV",
    iso3: "CPV",
  },
  {
    name: "Cayman Islands (the)",
    iso2: "KY",
    iso3: "CYM",
  },
  {
    name: "Central African Republic (the)",
    iso2: "CF",
    iso3: "CAF",
  },
  {
    name: "Chad",
    iso2: "TD",
    iso3: "TCD",
  },
  {
    name: "Chile",
    iso2: "CL",
    iso3: "CHL",
  },
  {
    name: "China",
    iso2: "CN",
    iso3: "CHN",
  },
  {
    name: "Christmas Island",
    iso2: "CX",
    iso3: "CXR",
  },
  {
    name: "Cocos (Keeling) Islands (the)",
    iso2: "CC",
    iso3: "CCK",
  },
  {
    name: "Colombia",
    iso2: "CO",
    iso3: "COL",
  },
  {
    name: "Comoros (the)",
    iso2: "KM",
    iso3: "COM",
  },
  {
    name: "Congo (Democratic Republic)",
    iso2: "CD",
    iso3: "COD",
  },
  {
    name: "Cook Islands (the)",
    iso2: "CK",
    iso3: "COK",
  },
  {
    name: "Costa Rica",
    iso2: "CR",
    iso3: "CRI",
  },
  {
    name: "Côte d'Ivoire",
    iso2: "CI",
    iso3: "CIV",
  },
  {
    name: "Croatia",
    iso2: "HR",
    iso3: "HRV",
  },
  {
    name: "Cuba",
    iso2: "CU",
    iso3: "CUB",
  },
  {
    name: "Cyprus",
    iso2: "CY",
    iso3: "CYP",
  },
  {
    name: "Czechia",
    iso2: "CZ",
    iso3: "CZE",
  },
  {
    name: "Denmark",
    iso2: "DK",
    iso3: "DNK",
  },
  {
    name: "Djibouti",
    iso2: "DJ",
    iso3: "DJI",
  },
  {
    name: "Dominica",
    iso2: "DM",
    iso3: "DMA",
  },
  {
    name: "Dominican Republic (the)",
    iso2: "DO",
    iso3: "DOM",
  },
  {
    name: "Ecuador",
    iso2: "EC",
    iso3: "ECU",
  },
  {
    name: "Egypt",
    iso2: "EG",
    iso3: "EGY",
  },
  {
    name: "El Salvador",
    iso2: "SV",
    iso3: "SLV",
  },
  {
    name: "Equatorial Guinea",
    iso2: "GQ",
    iso3: "GNQ",
  },
  {
    name: "Eritrea",
    iso2: "ER",
    iso3: "ERI",
  },
  {
    name: "Estonia",
    iso2: "EE",
    iso3: "EST",
  },
  {
    name: "Ethiopia",
    iso2: "ET",
    iso3: "ETH",
  },
  {
    name: "Falkland Islands (the) [Malvinas]",
    iso2: "FK",
    iso3: "FLK",
  },
  {
    name: "Faroe Islands (the)",
    iso2: "FO",
    iso3: "FRO",
  },
  {
    name: "Fiji",
    iso2: "FJ",
    iso3: "FJI",
  },
  {
    name: "Finland",
    iso2: "FI",
    iso3: "FIN",
  },
  {
    name: "France",
    iso2: "FR",
    iso3: "FRA",
  },
  {
    name: "French Guiana",
    iso2: "GF",
    iso3: "GUF",
  },
  {
    name: "French Polynesia",
    iso2: "PF",
    iso3: "PYF",
  },
  {
    name: "French Southern Territories (the)",
    iso2: "TF",
    iso3: "ATF",
  },
  {
    name: "Gabon",
    iso2: "GA",
    iso3: "GAB",
  },
  {
    name: "Gambia (the)",
    iso2: "GM",
    iso3: "GMB",
  },
  {
    name: "Georgia",
    iso2: "GE",
    iso3: "GEO",
  },
  {
    name: "Germany",
    iso2: "DE",
    iso3: "DEU",
  },
  {
    name: "Ghana",
    iso2: "GH",
    iso3: "GHA",
  },
  {
    name: "Gibraltar",
    iso2: "GI",
    iso3: "GIB",
  },
  {
    name: "Greece",
    iso2: "GR",
    iso3: "GRC",
  },
  {
    name: "Greenland",
    iso2: "GL",
    iso3: "GRL",
  },
  {
    name: "Grenada",
    iso2: "GD",
    iso3: "GRD",
  },
  {
    name: "Guadeloupe",
    iso2: "GP",
    iso3: "GLP",
  },
  {
    name: "Guam",
    iso2: "GU",
    iso3: "GUM",
  },
  {
    name: "Guatemala",
    iso2: "GT",
    iso3: "GTM",
  },
  {
    name: "Guernsey",
    iso2: "GG",
    iso3: "GGY",
  },
  {
    name: "Guinea",
    iso2: "GN",
    iso3: "GIN",
  },
  {
    name: "Guinea-Bissau",
    iso2: "GW",
    iso3: "GNB",
  },
  {
    name: "Guyana",
    iso2: "GY",
    iso3: "GUY",
  },
  {
    name: "Haiti",
    iso2: "HT",
    iso3: "HTI",
  },
  {
    name: "Heard Island and McDonald Islands",
    iso2: "HM",
    iso3: "HMD",
  },
  {
    name: "Holy See (the)",
    iso2: "VA",
    iso3: "VAT",
  },
  {
    name: "Honduras",
    iso2: "HN",
    iso3: "HND",
  },
  {
    name: "Hong Kong",
    iso2: "HK",
    iso3: "HKG",
  },
  {
    name: "Hungary",
    iso2: "HU",
    iso3: "HUN",
  },
  {
    name: "Iceland",
    iso2: "IS",
    iso3: "ISL",
  },
  {
    name: "India",
    iso2: "IN",
    iso3: "IND",
  },
  {
    name: "Indonesia",
    iso2: "ID",
    iso3: "IDN",
  },
  {
    name: "Iran (Islamic Republic of)",
    iso2: "IR",
    iso3: "IRN",
  },
  {
    name: "Iraq",
    iso2: "IQ",
    iso3: "IRQ",
  },
  {
    name: "Ireland",
    iso2: "IE",
    iso3: "IRL",
  },
  {
    name: "Isle of Man",
    iso2: "IM",
    iso3: "IMN",
  },
  {
    name: "Israel",
    iso2: "IL",
    iso3: "ISR",
  },
  {
    name: "Italy",
    iso2: "IT",
    iso3: "ITA",
  },
  {
    name: "Jamaica",
    iso2: "JM",
    iso3: "JAM",
  },
  {
    name: "Japan",
    iso2: "JP",
    iso3: "JPN",
  },
  {
    name: "Jersey",
    iso2: "JE",
    iso3: "JEY",
  },
  {
    name: "Jordan",
    iso2: "JO",
    iso3: "JOR",
  },
  {
    name: "Kazakhstan",
    iso2: "KZ",
    iso3: "KAZ",
  },
  {
    name: "Kenya",
    iso2: "KE",
    iso3: "KEN",
  },
  {
    name: "Kiribati",
    iso2: "KI",
    iso3: "KIR",
  },
  {
    name: "Korea (the Democratic People's Republic of)",
    iso2: "KP",
    iso3: "PRK",
  },
  {
    name: "Korea (the Republic of)",
    iso2: "KR",
    iso3: "KOR",
  },
  {
    name: "Kosovo",
    iso2: "XK",
    iso3: "XKX",
  },
  {
    name: "Kuwait",
    iso2: "KW",
    iso3: "KWT",
  },
  {
    name: "Kyrgyzstan",
    iso2: "KG",
    iso3: "KGZ",
  },
  {
    name: "Lao People's Democratic Republic (the)",
    iso2: "LA",
    iso3: "LAO",
  },
  {
    name: "Latvia",
    iso2: "LV",
    iso3: "LVA",
  },
  {
    name: "Lebanon",
    iso2: "LB",
    iso3: "LBN",
  },
  {
    name: "Lesotho",
    iso2: "LS",
    iso3: "LSO",
  },
  {
    name: "Liberia",
    iso2: "LR",
    iso3: "LBR",
  },
  {
    name: "Libya",
    iso2: "LY",
    iso3: "LBY",
  },
  {
    name: "Liechtenstein",
    iso2: "LI",
    iso3: "LIE",
  },
  {
    name: "Lithuania",
    iso2: "LT",
    iso3: "LTU",
  },
  {
    name: "Luxembourg",
    iso2: "LU",
    iso3: "LUX",
  },
  {
    name: "Macao",
    iso2: "MO",
    iso3: "MAC",
  },
  {
    name: "North Macedonia",
    iso2: "MK",
    iso3: "MKD",
  },
  {
    name: "Madagascar",
    iso2: "MG",
    iso3: "MDG",
  },
  {
    name: "Malawi",
    iso2: "MW",
    iso3: "MWI",
  },
  {
    name: "Malaysia",
    iso2: "MY",
    iso3: "MYS",
  },
  {
    name: "Maldives",
    iso2: "MV",
    iso3: "MDV",
  },
  {
    name: "Mali",
    iso2: "ML",
    iso3: "MLI",
  },
  {
    name: "Malta",
    iso2: "MT",
    iso3: "MLT",
  },
  {
    name: "Marshall Islands",
    iso2: "MH",
    iso3: "MHL",
  },
  {
    name: "Martinique",
    iso2: "MQ",
    iso3: "MTQ",
  },
  {
    name: "Mauritania",
    iso2: "MR",
    iso3: "MRT",
  },
  {
    name: "Mauritius",
    iso2: "MU",
    iso3: "MUS",
  },
  {
    name: "Mayotte",
    iso2: "YT",
    iso3: "MYT",
  },
  {
    name: "Mexico",
    iso2: "MX",
    iso3: "MEX",
  },
  {
    name: "Micronesia (Federated States of)",
    iso2: "FM",
    iso3: "FSM",
  },
  {
    name: "Moldova (the Republic of)",
    iso2: "MD",
    iso3: "MDA",
  },
  {
    name: "Monaco",
    iso2: "MC",
    iso3: "MCO",
  },
  {
    name: "Mongolia",
    iso2: "MN",
    iso3: "MNG",
  },
  {
    name: "Montenegro",
    iso2: "ME",
    iso3: "MNE",
  },
  {
    name: "Montserrat",
    iso2: "MS",
    iso3: "MSR",
  },
  {
    name: "Morocco",
    iso2: "MA",
    iso3: "MAR",
  },
  {
    name: "Mozambique",
    iso2: "MZ",
    iso3: "MOZ",
  },
  {
    name: "Myanmar",
    iso2: "MM",
    iso3: "MMR",
  },
  {
    name: "Namibia",
    iso2: "NA",
    iso3: "NAM",
  },
  {
    name: "Nauru",
    iso2: "NR",
    iso3: "NRU",
  },
  {
    name: "Nepal",
    iso2: "NP",
    iso3: "NPL",
  },
  {
    name: "Netherlands",
    iso2: "NL",
    iso3: "NLD",
  },
  {
    name: "Netherlands Antilles",
    iso2: "AN",
    iso3: "ANT",
  },
  {
    name: "New Caledonia",
    iso2: "NC",
    iso3: "NCL",
  },
  {
    name: "New Zealand",
    iso2: "NZ",
    iso3: "NZL",
  },
  {
    name: "Nicaragua",
    iso2: "NI",
    iso3: "NIC",
  },
  {
    name: "Niger (the)",
    iso2: "NE",
    iso3: "NER",
  },
  {
    name: "Nigeria",
    iso2: "NG",
    iso3: "NGA",
  },
  {
    name: "Niue",
    iso2: "NU",
    iso3: "NIU",
  },
  {
    name: "Norfolk Island",
    iso2: "NF",
    iso3: "NFK",
  },
  {
    name: "Northern Mariana Islands (the)",
    iso2: "MP",
    iso3: "MNP",
  },
  {
    name: "Norway",
    iso2: "NO",
    iso3: "NOR",
  },
  {
    name: "Oman",
    iso2: "OM",
    iso3: "OMN",
  },
  {
    name: "Pakistan",
    iso2: "PK",
    iso3: "PAK",
  },
  {
    name: "Palau",
    iso2: "PW",
    iso3: "PLW",
  },
  {
    name: "Palestine, State of",
    iso2: "PS",
    iso3: "PSE",
  },
  {
    name: "Panama",
    iso2: "PA",
    iso3: "PAN",
  },
  {
    name: "Papua New Guinea",
    iso2: "PG",
    iso3: "PNG",
  },
  {
    name: "Paraguay",
    iso2: "PY",
    iso3: "PRY",
  },
  {
    name: "Peru",
    iso2: "PE",
    iso3: "PER",
  },
  {
    name: "Philippines (the)",
    iso2: "PH",
    iso3: "PHL",
  },
  {
    name: "Pitcairn",
    iso2: "PN",
    iso3: "PCN",
  },
  {
    name: "Poland",
    iso2: "PL",
    iso3: "POL",
  },
  {
    name: "Portugal",
    iso2: "PT",
    iso3: "PRT",
  },
  {
    name: "Puerto Rico",
    iso2: "PR",
    iso3: "PRI",
  },
  {
    name: "Qatar",
    iso2: "QA",
    iso3: "QAT",
  },
  {
    name: "Réunion",
    iso2: "RE",
    iso3: "REU",
  },
  {
    name: "Romania",
    iso2: "RO",
    iso3: "ROU",
  },
  {
    name: "Russian Federation (the)",
    iso2: "RU",
    iso3: "RUS",
  },
  {
    name: "Rwanda",
    iso2: "RW",
    iso3: "RWA",
  },
  {
    name: "Saint Barthélemy",
    iso2: "BL",
    iso3: "",
  },
  {
    name: "Saint Helena, Ascension and Tristan da Cunha",
    iso2: "SH",
    iso3: "SHN",
  },
  {
    name: "Saint Kitts and Nevis",
    iso2: "KN",
    iso3: "KNA",
  },
  {
    name: "Saint Lucia",
    iso2: "LC",
    iso3: "LCA",
  },
  {
    name: "Saint Pierre and Miquelon",
    iso2: "PM",
    iso3: "SPM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    iso2: "VC",
    iso3: "VCT",
  },
  {
    name: "Samoa",
    iso2: "WS",
    iso3: "WSM",
  },
  {
    name: "San Marino",
    iso2: "SM",
    iso3: "SMR",
  },
  {
    name: "Sao Tome and Principe",
    iso2: "ST",
    iso3: "STP",
  },
  {
    name: "Saudi Arabia",
    iso2: "SA",
    iso3: "SAU",
  },
  {
    name: "Senegal",
    iso2: "SN",
    iso3: "SEN",
  },
  {
    name: "Serbia",
    iso2: "RS",
    iso3: "SRB",
  },
  {
    name: "Seychelles",
    iso2: "SC",
    iso3: "SYC",
  },
  {
    name: "Sierra Leone",
    iso2: "SL",
    iso3: "SLE",
  },
  {
    name: "Singapore",
    iso2: "SG",
    iso3: "SGP",
  },
  {
    name: "Slovakia",
    iso2: "SK",
    iso3: "SVK",
  },
  {
    name: "Slovenia",
    iso2: "SI",
    iso3: "SVN",
  },
  {
    name: "Solomon Islands",
    iso2: "SB",
    iso3: "SLB",
  },
  {
    name: "Somalia",
    iso2: "SO",
    iso3: "SOM",
  },
  {
    name: "South Africa",
    iso2: "ZA",
    iso3: "ZAF",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    iso2: "GS",
    iso3: "SGS",
  },
  {
    name: "Spain",
    iso2: "ES",
    iso3: "ESP",
  },
  {
    name: "Sri Lanka",
    iso2: "LK",
    iso3: "LKA",
  },
  {
    name: "Sudan (the)",
    iso2: "SD",
    iso3: "SDN",
  },
  {
    name: "South Sudan",
    iso2: "SD",
    iso3: "SSD",
  },
  {
    name: "Suriname",
    iso2: "SR",
    iso3: "SUR",
  },
  {
    name: "Svalbard and Jan Mayen",
    iso2: "SJ",
    iso3: "SJM",
  },
  {
    name: "Eswatini",
    iso2: "SZ",
    iso3: "SWZ",
  },
  {
    name: "Sweden",
    iso2: "SE",
    iso3: "SWE",
  },
  {
    name: "Switzerland",
    iso2: "CH",
    iso3: "CHE",
  },
  {
    name: "Syrian Arab Republic",
    iso2: "SY",
    iso3: "SYR",
  },
  {
    name: "Taiwan (Province of China)",
    iso2: "TW",
    iso3: "TWN",
  },
  {
    name: "Tajikistan",
    iso2: "TJ",
    iso3: "TJK",
  },
  {
    name: "Tanzania, United Republic of",
    iso2: "TZ",
    iso3: "TZA",
  },
  {
    name: "Thailand",
    iso2: "TH",
    iso3: "THA",
  },
  {
    name: "Timor-Leste",
    iso2: "TL",
    iso3: "TLS",
  },
  {
    name: "Togo",
    iso2: "TG",
    iso3: "TGO",
  },
  {
    name: "Tokelau",
    iso2: "TK",
    iso3: "TKL",
  },
  {
    name: "Tonga",
    iso2: "TO",
    iso3: "TON",
  },
  {
    name: "Trinidad and Tobago",
    iso2: "TT",
    iso3: "TTO",
  },
  {
    name: "Tunisia",
    iso2: "TN",
    iso3: "TUN",
  },
  {
    name: "Turkey",
    iso2: "TR",
    iso3: "TUR",
  },
  {
    name: "Turkmenistan",
    iso2: "TM",
    iso3: "TKM",
  },
  {
    name: "Turks and Caicos Islands (the)",
    iso2: "TC",
    iso3: "TCA",
  },
  {
    name: "Tuvalu",
    iso2: "TV",
    iso3: "TUV",
  },
  {
    name: "Uganda",
    iso2: "UG",
    iso3: "UGA",
  },
  {
    name: "Ukraine",
    iso2: "UA",
    iso3: "UKR",
  },
  {
    name: "United Arab Emirates (the)",
    iso2: "AE",
    iso3: "ARE",
  },
  {
    name: "United Kingdom of Great Britain and Northern Ireland (the)",
    iso2: "GB",
    iso3: "GBR",
  },
  {
    name: "United States of America (the)",
    iso2: "US",
    iso3: "USA",
  },
  {
    name: "United States Minor Outlying Islands (the)",
    iso2: "UM",
    iso3: "UMI",
  },
  {
    name: "Uruguay",
    iso2: "UY",
    iso3: "URY",
  },
  {
    name: "Uzbekistan",
    iso2: "UZ",
    iso3: "UZB",
  },
  {
    name: "Vanuatu",
    iso2: "VU",
    iso3: "VUT",
  },
  {
    name: "Venezuela (Bolivarian Republic of)",
    iso2: "VE",
    iso3: "VEN",
  },
  {
    name: "Viet Nam",
    iso2: "VN",
    iso3: "VNM",
  },
  {
    name: "Virgin Islands (British)",
    iso2: "VG",
    iso3: "VGB",
  },
  {
    name: "Virgin Islands (U.S.)",
    iso2: "VI",
    iso3: "VIR",
  },
  {
    name: "Wallis and Futuna",
    iso2: "WF",
    iso3: "WLF",
  },
  {
    name: "Western Sahara",
    iso2: "EH",
    iso3: "ESH",
  },
  {
    name: "Yemen",
    iso2: "YE",
    iso3: "YEM",
  },
  {
    name: "Zambia",
    iso2: "ZM",
    iso3: "ZMB",
  },
  {
    name: "Zanzibar",
    iso2: "",
    iso3: "QNB",
  },
  {
    name: "Zimbabwe",
    iso2: "ZW",
    iso3: "ZWE",
  },
];

export function getIso3FromName(name: string): string {
  const fCountry = find(countryList, (country) => {
    return country.name.toLowerCase() === name.toLowerCase();
  });

  if (fCountry) {
    return fCountry.iso3;
  }

  return name;
}

export function getNameFromIso3(code: string): string {
  const fCountry = find(countryList, (country) => {
    return country.iso3 === code;
  });

  if (fCountry) {
    return fCountry.name;
  }

  return code;
}
