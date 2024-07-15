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
    name: "World",
    value: "QMZ",
    items: [
      {
        name: "Multicountries",
        value: "Multicountries",
        items: [
          {
            name: "Multicountry HIV Caribbean PCC Consortium",
            value: "MCLACPCC",
          },
          {
            name: "Multicountry Americas (Andean)",
            value: "MCANDEAN",
          },
          {
            name: "Multicountry Americas (CRN+)",
            value: "MCCRN",
          },
          {
            name: "Multicountry East Asia and Pacific APN",
            value: "MCAPN",
          },
          {
            name: "Multicountry Americas COPRECOS",
            value: "MCCOPRECOS",
          },
          {
            name: "Multicountry HIV EECA APH",
            value: "MCEECAAPH",
          },
          {
            name: "Multicountry SEAF RMCC",
            value: "MCSEAF",
          },
          {
            name: "Multicountry HIV Latin America ALEP",
            value: "MCALEP",
          },
          {
            name: "Multicountry HIV SEA AFAO",
            value: "MCSEAAFAO",
          },
          {
            name: "Multicountry MENA Key Populations",
            value: "MCMENA",
          },
          {
            name: "Multicountry MENA HRA",
            value: "MCMENAHRA",
          },
          {
            name: "Multicountry EECA ECOM",
            value: "MCECOM",
          },
          {
            name: "Multicountry EECA ECUO",
            value: "MCECUO",
          },
          {
            name: "The Lutheran World Federation",
            value: "MCLWF",
          },
          {
            name: "Multicountry East Asia and Pacific KPRA SCF",
            value: "MCKPRA",
          },
          {
            name: "Multicountry EECA EHRN",
            value: "MCEHRN",
          },
          {
            name: "Multicountry EECA PAS",
            value: "MCPAS",
          },
          {
            name: "Multicountry EECA IHAU",
            value: "MCIHAU",
          },
          {
            name: "Multicountry Africa (RMCC)",
            value: "MCRMCC",
          },
        ],
      },
    ],
  },
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
            name: "Mozambique",
            value: "MOZ",
          },
          {
            name: "Rwanda",
            value: "RWA",
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
        value: "Multicountries",
        items: [
          {
            name: "Multicountry Africa ECSA-HC",
            value: "MCECSA-HC",
          },
          {
            name: "Multicountry Eastern Africa ANECCA",
            value: "MCANECCA",
          },
          {
            name: "Multicountry Southern Africa ARASA",
            value: "MCARASA-ENDA",
          },
          {
            name: "Multicountry Southern Africa E8",
            value: "MCE8",
          },
          {
            name: "Multicountry Southern Africa HIVOS",
            value: "MCHIVOS",
          },
          {
            name: "Multicountry Southern Africa MOSASWA",
            value: "MCMOSASWA",
          },
          {
            name: "Multicountry Southern Africa SADC",
            value: "MCSADC",
          },
          {
            name: "Multicountry Southern Africa TIMS",
            value: "MCTIMS",
          },
          {
            name: "Multicountry Southern Africa WHC",
            value: "MCWHC",
          },
          {
            name: "Multicountry TB WC Africa NTP/SRL",
            value: "MCNTPSRL",
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
            name: "Cuba",
            value: "CUB",
          },
          {
            name: "Dominican Republic",
            value: "DOM",
          },
          {
            name: "Haiti",
            value: "HTI",
          },
          {
            name: "Jamaica",
            value: "JAM",
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
        value: "Multicountries",
        items: [
          {
            name: "Multicountry Americas CVC-COIN",
            value: "MCCVC/COIN",
          },
          {
            name: "Multicountry Americas EMMIE",
            value: "MCEMMIE",
          },
          {
            name: "Multicountry Americas ICW",
            value: "MCICW",
          },
          {
            name: "Multicountry Americas ORAS-CONHU",
            value: "MCORAS-CONHU",
          },
          {
            name: "Multicountry Americas REDLACTRANS",
            value: "MCREDLACTRANS",
          },
          {
            name: "Multicountry Americas REDTRASEX",
            value: "MCREDTRASEX",
          },
          {
            name: "Multicountry Caribbean CARICOM-PANCAP",
            value: "MCCARICOM/PANCAP",
          },
          {
            name: "Multicountry South-Eastern Asia HIV",
            value: "MCSAHIV",
          },
          {
            name: "Multicountry TB LAC PIH",
            value: "MCPIH",
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
            name: "Korea (Democratic Peoples Republic)",
            value: "PRK",
          },
          {
            name: "Mongolia",
            value: "MNG",
          },
        ],
      },
      {
        name: "South-Eastern Asia",
        value: "QSE",
        items: [
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
            name: "Georgia",
            value: "GEO",
          },
          {
            name: "Iraq",
            value: "IRQ",
          },
          {
            name: "Jordan",
            value: "JOR",
          },
          {
            name: "Palestine",
            value: "PSE",
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
            name: "Yemen",
            value: "YEM",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "Multicountries",
        items: [
          {
            name: "Multicountry Asia IHAA",
            value: "MCIHAA",
          },
          {
            name: "Multicountry TB Asia TEAM",
            value: "MCASIATEAM",
          },
          {
            name: "Multicountry TB Asia UNDP",
            value: "MCASIAUNDP",
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
            name: "Moldova",
            value: "MDA",
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
            name: "Estonia",
            value: "EST",
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
            name: "Bosnia and Herzegovina",
            value: "BIH",
          },
          {
            name: "Croatia",
            value: "HRV",
          },
          {
            name: "Kosovo",
            value: "QNA",
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
            name: "Serbia",
            value: "SRB",
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
        name: "Melanesia",
        value: "QUC",
        items: [
          {
            name: "Fiji",
            value: "FJI",
          },
          {
            name: "Papua New Guinea",
            value: "PNG",
          },
          {
            name: "Solomon Islands",
            value: "SLB",
          },
        ],
      },
      {
        name: "Multicountries",
        value: "Multicountries",
        items: [
          {
            name: "Multicountry Western Pacific",
            value: "MCWP",
          },
        ],
      },
    ],
  },
];
