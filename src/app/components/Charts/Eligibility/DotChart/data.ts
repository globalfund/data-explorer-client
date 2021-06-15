export interface DotChartProps {
  aggregateBy: "component" | "country";
}

export interface DotChartModel {
  name: string;
  items: {
    name: string;
    status: "Eligible" | "Not Eligible" | "Transition Funding";
  }[];
}

export const mockdata: DotChartModel[] = [
  {
    name: "HIV",
    items: [
      {
        name: "Afghanistan",
        status: "Eligible",
      },
      {
        name: "Albania",
        status: "Not Eligible",
      },
      {
        name: "Algeria",
        status: "Not Eligible",
      },
      {
        name: "Angola",
        status: "Eligible",
      },
      {
        name: "Armenia",
        status: "Transition Funding",
      },
      {
        name: "Azerbaijan",
        status: "Eligible",
      },
      {
        name: "Bangladesh",
        status: "Eligible",
      },
      {
        name: "Belarus",
        status: "Eligible",
      },
      {
        name: "Belize",
        status: "Eligible",
      },
      {
        name: "Benin",
        status: "Eligible",
      },
      {
        name: "Bhutan",
        status: "Eligible",
      },
      {
        name: "Bolivia (Plurinational State)",
        status: "Eligible",
      },
      {
        name: "Botswana",
        status: "Eligible",
      },
      {
        name: "Bulgaria",
        status: "Not Eligible",
      },
      {
        name: "Burkina Faso",
        status: "Eligible",
      },
      {
        name: "Burundi",
        status: "Eligible",
      },
      {
        name: "Cabo Verde",
        status: "Eligible",
      },
      {
        name: "Cambodia",
        status: "Eligible",
      },
      {
        name: "Cameroon",
        status: "Eligible",
      },
      {
        name: "Central African Republic",
        status: "Eligible",
      },
      {
        name: "Chad",
        status: "Eligible",
      },
      {
        name: "Colombia",
        status: "Eligible",
      },
      {
        name: "Comoros",
        status: "Eligible",
      },
      {
        name: "Congo",
        status: "Eligible",
      },
      {
        name: "Congo (Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Costa Rica",
        status: "Eligible",
      },
      {
        name: "Cuba",
        status: "Eligible",
      },
      {
        name: "Côte d'Ivoire",
        status: "Eligible",
      },
      {
        name: "Djibouti",
        status: "Eligible",
      },
      {
        name: "Dominica",
        status: "Eligible",
      },
      {
        name: "Dominican Republic",
        status: "Eligible",
      },
      {
        name: "Ecuador",
        status: "Eligible",
      },
      {
        name: "Egypt",
        status: "Eligible",
      },
      {
        name: "El Salvador",
        status: "Eligible",
      },
      {
        name: "Equatorial Guinea",
        status: "Eligible",
      },
      {
        name: "Eritrea",
        status: "Eligible",
      },
      {
        name: "Eswatini",
        status: "Eligible",
      },
      {
        name: "Ethiopia",
        status: "Eligible",
      },
      {
        name: "Fiji",
        status: "Not Eligible",
      },
      {
        name: "Gabon",
        status: "Eligible",
      },
      {
        name: "Gambia",
        status: "Eligible",
      },
      {
        name: "Georgia",
        status: "Eligible",
      },
      {
        name: "Ghana",
        status: "Eligible",
      },
      {
        name: "Grenada",
        status: "Eligible",
      },
      {
        name: "Guatemala",
        status: "Eligible",
      },
      {
        name: "Guinea",
        status: "Eligible",
      },
      {
        name: "Guinea-Bissau",
        status: "Eligible",
      },
      {
        name: "Guyana",
        status: "Eligible",
      },
      {
        name: "Haiti",
        status: "Eligible",
      },
      {
        name: "Honduras",
        status: "Eligible",
      },
      {
        name: "India",
        status: "Eligible",
      },
      {
        name: "Indonesia",
        status: "Eligible",
      },
      {
        name: "Iran (Islamic Republic)",
        status: "Eligible",
      },
      {
        name: "Iraq",
        status: "Not Eligible",
      },
      {
        name: "Jamaica",
        status: "Eligible",
      },
      {
        name: "Jordan",
        status: "Not Eligible",
      },
      {
        name: "Kazakhstan",
        status: "Eligible",
      },
      {
        name: "Kenya",
        status: "Eligible",
      },
      {
        name: "Kiribati",
        status: "Eligible",
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        status: "Eligible",
      },
      {
        name: "Kosovo",
        status: "Transition Funding",
      },
      {
        name: "Kyrgyzstan",
        status: "Eligible",
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Lebanon",
        status: "Eligible",
      },
      {
        name: "Lesotho",
        status: "Eligible",
      },
      {
        name: "Liberia",
        status: "Eligible",
      },
      {
        name: "Madagascar",
        status: "Eligible",
      },
      {
        name: "Malawi",
        status: "Eligible",
      },
      {
        name: "Malaysia",
        status: "Eligible",
      },
      {
        name: "Maldives",
        status: "Eligible",
      },
      {
        name: "Mali",
        status: "Eligible",
      },
      {
        name: "Marshall Islands",
        status: "Eligible",
      },
      {
        name: "Mauritania",
        status: "Eligible",
      },
      {
        name: "Mauritius",
        status: "Eligible",
      },
      {
        name: "Micronesia (Federated States)",
        status: "Eligible",
      },
      {
        name: "Moldova",
        status: "Eligible",
      },
      {
        name: "Mongolia",
        status: "Eligible",
      },
      {
        name: "Montenegro",
        status: "Eligible",
      },
      {
        name: "Morocco",
        status: "Eligible",
      },
      {
        name: "Mozambique",
        status: "Eligible",
      },
      {
        name: "Myanmar",
        status: "Eligible",
      },
      {
        name: "Namibia",
        status: "Eligible",
      },
      {
        name: "Nauru",
        status: "Not Eligible",
      },
      {
        name: "Nepal",
        status: "Eligible",
      },
      {
        name: "Nicaragua",
        status: "Eligible",
      },
      {
        name: "Niger",
        status: "Eligible",
      },
      {
        name: "Nigeria",
        status: "Eligible",
      },
      {
        name: "North Macedonia",
        status: "Eligible",
      },
      {
        name: "Pakistan",
        status: "Eligible",
      },
      {
        name: "Palau",
        status: "Not Eligible",
      },
      {
        name: "Palestine",
        status: "Eligible",
      },
      {
        name: "Panama",
        status: "Not Eligible",
      },
      {
        name: "Papua New Guinea",
        status: "Eligible",
      },
      {
        name: "Paraguay",
        status: "Eligible",
      },
      {
        name: "Peru",
        status: "Eligible",
      },
      {
        name: "Philippines",
        status: "Eligible",
      },
      {
        name: "Romania",
        status: "Not Eligible",
      },
      {
        name: "Russian Federation",
        status: "Eligible",
      },
      {
        name: "Rwanda",
        status: "Eligible",
      },
      {
        name: "Saint Lucia",
        status: "Eligible",
      },
      {
        name: "Saint Vincent and Grenadines",
        status: "Eligible",
      },
      {
        name: "Samoa",
        status: "Eligible",
      },
      {
        name: "Sao Tome and Principe",
        status: "Eligible",
      },
      {
        name: "Senegal",
        status: "Eligible",
      },
      {
        name: "Serbia",
        status: "Eligible",
      },
      {
        name: "Sierra Leone",
        status: "Eligible",
      },
      {
        name: "Solomon Islands",
        status: "Eligible",
      },
      {
        name: "Somalia",
        status: "Eligible",
      },
      {
        name: "South Africa",
        status: "Eligible",
      },
      {
        name: "South Sudan",
        status: "Eligible",
      },
      {
        name: "Sri Lanka",
        status: "Eligible",
      },
      {
        name: "Sudan",
        status: "Eligible",
      },
      {
        name: "Suriname",
        status: "Eligible",
      },
      {
        name: "Syrian Arab Republic",
        status: "Eligible",
      },
      {
        name: "Tajikistan",
        status: "Eligible",
      },
      {
        name: "Tanzania (United Republic)",
        status: "Eligible",
      },
      {
        name: "Thailand",
        status: "Eligible",
      },
      {
        name: "Timor-Leste",
        status: "Eligible",
      },
      {
        name: "Togo",
        status: "Eligible",
      },
      {
        name: "Tonga",
        status: "Eligible",
      },
      {
        name: "Tunisia",
        status: "Eligible",
      },
      {
        name: "Turkmenistan",
        status: "Not Eligible",
      },
      {
        name: "Tuvalu",
        status: "Eligible",
      },
      {
        name: "Uganda",
        status: "Eligible",
      },
      {
        name: "Ukraine",
        status: "Eligible",
      },
      {
        name: "Uzbekistan",
        status: "Eligible",
      },
      {
        name: "Vanuatu",
        status: "Eligible",
      },
      {
        name: "Venezuela",
        status: "Not Eligible",
      },
      {
        name: "Viet Nam",
        status: "Eligible",
      },
      {
        name: "Yemen",
        status: "Eligible",
      },
      {
        name: "Zambia",
        status: "Eligible",
      },
      {
        name: "Zanzibar",
        status: "Eligible",
      },
      {
        name: "Zimbabwe",
        status: "Eligible",
      },
    ],
  },
  {
    name: "Malaria",
    items: [
      {
        name: "Afghanistan",
        status: "Eligible",
      },
      {
        name: "Albania",
        status: "Not Eligible",
      },
      {
        name: "Algeria",
        status: "Not Eligible",
      },
      {
        name: "Angola",
        status: "Eligible",
      },
      {
        name: "Armenia",
        status: "Not Eligible",
      },
      {
        name: "Azerbaijan",
        status: "Not Eligible",
      },
      {
        name: "Bangladesh",
        status: "Eligible",
      },
      {
        name: "Belarus",
        status: "Not Eligible",
      },
      {
        name: "Belize",
        status: "Not Eligible",
      },
      {
        name: "Benin",
        status: "Eligible",
      },
      {
        name: "Bhutan",
        status: "Eligible",
      },
      {
        name: "Bolivia (Plurinational State)",
        status: "Eligible",
      },
      {
        name: "Botswana",
        status: "Not Eligible",
      },
      {
        name: "Bulgaria",
        status: "Not Eligible",
      },
      {
        name: "Burkina Faso",
        status: "Eligible",
      },
      {
        name: "Burundi",
        status: "Eligible",
      },
      {
        name: "Cabo Verde",
        status: "Eligible",
      },
      {
        name: "Cambodia",
        status: "Eligible",
      },
      {
        name: "Cameroon",
        status: "Eligible",
      },
      {
        name: "Central African Republic",
        status: "Eligible",
      },
      {
        name: "Chad",
        status: "Eligible",
      },
      {
        name: "Colombia",
        status: "Not Eligible",
      },
      {
        name: "Comoros",
        status: "Eligible",
      },
      {
        name: "Congo",
        status: "Eligible",
      },
      {
        name: "Congo (Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Costa Rica",
        status: "Not Eligible",
      },
      {
        name: "Cuba",
        status: "Not Eligible",
      },
      {
        name: "Côte d'Ivoire",
        status: "Eligible",
      },
      {
        name: "Djibouti",
        status: "Eligible",
      },
      {
        name: "Dominica",
        status: "Not Eligible",
      },
      {
        name: "Dominican Republic",
        status: "Not Eligible",
      },
      {
        name: "Ecuador",
        status: "Eligible",
      },
      {
        name: "Egypt",
        status: "Not Eligible",
      },
      {
        name: "El Salvador",
        status: "Eligible",
      },
      {
        name: "Equatorial Guinea",
        status: "Eligible",
      },
      {
        name: "Eritrea",
        status: "Eligible",
      },
      {
        name: "Eswatini",
        status: "Eligible",
      },
      {
        name: "Ethiopia",
        status: "Eligible",
      },
      {
        name: "Fiji",
        status: "Not Eligible",
      },
      {
        name: "Gabon",
        status: "Eligible",
      },
      {
        name: "Gambia",
        status: "Eligible",
      },
      {
        name: "Georgia",
        status: "Not Eligible",
      },
      {
        name: "Ghana",
        status: "Eligible",
      },
      {
        name: "Grenada",
        status: "Not Eligible",
      },
      {
        name: "Guatemala",
        status: "Transition Funding",
      },
      {
        name: "Guinea",
        status: "Eligible",
      },
      {
        name: "Guinea-Bissau",
        status: "Eligible",
      },
      {
        name: "Guyana",
        status: "Transition Funding",
      },
      {
        name: "Haiti",
        status: "Eligible",
      },
      {
        name: "Honduras",
        status: "Eligible",
      },
      {
        name: "India",
        status: "Eligible",
      },
      {
        name: "Indonesia",
        status: "Eligible",
      },
      {
        name: "Iran (Islamic Republic)",
        status: "Not Eligible",
      },
      {
        name: "Iraq",
        status: "Not Eligible",
      },
      {
        name: "Jamaica",
        status: "Not Eligible",
      },
      {
        name: "Jordan",
        status: "Not Eligible",
      },
      {
        name: "Kazakhstan",
        status: "Not Eligible",
      },
      {
        name: "Kenya",
        status: "Eligible",
      },
      {
        name: "Kiribati",
        status: "Not Eligible",
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        status: "Eligible",
      },
      {
        name: "Kosovo",
        status: "Not Eligible",
      },
      {
        name: "Kyrgyzstan",
        status: "Not Eligible",
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Lebanon",
        status: "Not Eligible",
      },
      {
        name: "Lesotho",
        status: "Not Eligible",
      },
      {
        name: "Liberia",
        status: "Eligible",
      },
      {
        name: "Madagascar",
        status: "Eligible",
      },
      {
        name: "Malawi",
        status: "Eligible",
      },
      {
        name: "Malaysia",
        status: "Not Eligible",
      },
      {
        name: "Maldives",
        status: "Not Eligible",
      },
      {
        name: "Mali",
        status: "Eligible",
      },
      {
        name: "Marshall Islands",
        status: "Not Eligible",
      },
      {
        name: "Mauritania",
        status: "Eligible",
      },
      {
        name: "Mauritius",
        status: "Not Eligible",
      },
      {
        name: "Micronesia (Federated States)",
        status: "Not Eligible",
      },
      {
        name: "Moldova",
        status: "Not Eligible",
      },
      {
        name: "Mongolia",
        status: "Not Eligible",
      },
      {
        name: "Montenegro",
        status: "Not Eligible",
      },
      {
        name: "Morocco",
        status: "Not Eligible",
      },
      {
        name: "Mozambique",
        status: "Eligible",
      },
      {
        name: "Myanmar",
        status: "Eligible",
      },
      {
        name: "Namibia",
        status: "Eligible",
      },
      {
        name: "Nauru",
        status: "Not Eligible",
      },
      {
        name: "Nepal",
        status: "Eligible",
      },
      {
        name: "Nicaragua",
        status: "Eligible",
      },
      {
        name: "Niger",
        status: "Eligible",
      },
      {
        name: "Nigeria",
        status: "Eligible",
      },
      {
        name: "North Macedonia",
        status: "Not Eligible",
      },
      {
        name: "Pakistan",
        status: "Eligible",
      },
      {
        name: "Palau",
        status: "Not Eligible",
      },
      {
        name: "Palestine",
        status: "Not Eligible",
      },
      {
        name: "Panama",
        status: "Not Eligible",
      },
      {
        name: "Papua New Guinea",
        status: "Eligible",
      },
      {
        name: "Paraguay",
        status: "Not Eligible",
      },
      {
        name: "Peru",
        status: "Not Eligible",
      },
      {
        name: "Philippines",
        status: "Eligible",
      },
      {
        name: "Romania",
        status: "Not Eligible",
      },
      {
        name: "Russian Federation",
        status: "Not Eligible",
      },
      {
        name: "Rwanda",
        status: "Eligible",
      },
      {
        name: "Saint Lucia",
        status: "Not Eligible",
      },
      {
        name: "Saint Vincent and Grenadines",
        status: "Not Eligible",
      },
      {
        name: "Samoa",
        status: "Not Eligible",
      },
      {
        name: "Sao Tome and Principe",
        status: "Eligible",
      },
      {
        name: "Senegal",
        status: "Eligible",
      },
      {
        name: "Serbia",
        status: "Not Eligible",
      },
      {
        name: "Sierra Leone",
        status: "Eligible",
      },
      {
        name: "Solomon Islands",
        status: "Eligible",
      },
      {
        name: "Somalia",
        status: "Eligible",
      },
      {
        name: "South Africa",
        status: "Not Eligible",
      },
      {
        name: "South Sudan",
        status: "Eligible",
      },
      {
        name: "Sri Lanka",
        status: "Not Eligible",
      },
      {
        name: "Sudan",
        status: "Eligible",
      },
      {
        name: "Suriname",
        status: "Eligible",
      },
      {
        name: "Syrian Arab Republic",
        status: "Not Eligible",
      },
      {
        name: "Tajikistan",
        status: "Not Eligible",
      },
      {
        name: "Tanzania (United Republic)",
        status: "Eligible",
      },
      {
        name: "Thailand",
        status: "Eligible",
      },
      {
        name: "Timor-Leste",
        status: "Eligible",
      },
      {
        name: "Togo",
        status: "Eligible",
      },
      {
        name: "Tonga",
        status: "Not Eligible",
      },
      {
        name: "Tunisia",
        status: "Not Eligible",
      },
      {
        name: "Turkmenistan",
        status: "Not Eligible",
      },
      {
        name: "Tuvalu",
        status: "Not Eligible",
      },
      {
        name: "Uganda",
        status: "Eligible",
      },
      {
        name: "Ukraine",
        status: "Not Eligible",
      },
      {
        name: "Uzbekistan",
        status: "Not Eligible",
      },
      {
        name: "Vanuatu",
        status: "Eligible",
      },
      {
        name: "Venezuela",
        status: "Eligible",
      },
      {
        name: "Viet Nam",
        status: "Eligible",
      },
      {
        name: "Yemen",
        status: "Eligible",
      },
      {
        name: "Zambia",
        status: "Eligible",
      },
      {
        name: "Zanzibar",
        status: "Eligible",
      },
      {
        name: "Zimbabwe",
        status: "Eligible",
      },
    ],
  },
  {
    name: "Tuberculosis",
    items: [
      {
        name: "Afghanistan",
        status: "Eligible",
      },
      {
        name: "Albania",
        status: "Not Eligible",
      },
      {
        name: "Algeria",
        status: "Eligible",
      },
      {
        name: "Angola",
        status: "Eligible",
      },
      {
        name: "Armenia",
        status: "Eligible",
      },
      {
        name: "Azerbaijan",
        status: "Eligible",
      },
      {
        name: "Bangladesh",
        status: "Eligible",
      },
      {
        name: "Belarus",
        status: "Eligible",
      },
      {
        name: "Belize",
        status: "Not Eligible",
      },
      {
        name: "Benin",
        status: "Eligible",
      },
      {
        name: "Bhutan",
        status: "Eligible",
      },
      {
        name: "Bolivia (Plurinational State)",
        status: "Eligible",
      },
      {
        name: "Botswana",
        status: "Eligible",
      },
      {
        name: "Bulgaria",
        status: "Not Eligible",
      },
      {
        name: "Burkina Faso",
        status: "Eligible",
      },
      {
        name: "Burundi",
        status: "Eligible",
      },
      {
        name: "Cabo Verde",
        status: "Eligible",
      },
      {
        name: "Cambodia",
        status: "Eligible",
      },
      {
        name: "Cameroon",
        status: "Eligible",
      },
      {
        name: "Central African Republic",
        status: "Eligible",
      },
      {
        name: "Chad",
        status: "Eligible",
      },
      {
        name: "Colombia",
        status: "Not Eligible",
      },
      {
        name: "Comoros",
        status: "Eligible",
      },
      {
        name: "Congo",
        status: "Eligible",
      },
      {
        name: "Congo (Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Costa Rica",
        status: "Not Eligible",
      },
      {
        name: "Cuba",
        status: "Not Eligible",
      },
      {
        name: "Côte d'Ivoire",
        status: "Eligible",
      },
      {
        name: "Djibouti",
        status: "Eligible",
      },
      {
        name: "Dominica",
        status: "Eligible",
      },
      {
        name: "Dominican Republic",
        status: "Not Eligible",
      },
      {
        name: "Ecuador",
        status: "Not Eligible",
      },
      {
        name: "Egypt",
        status: "Eligible",
      },
      {
        name: "El Salvador",
        status: "Eligible",
      },
      {
        name: "Equatorial Guinea",
        status: "Eligible",
      },
      {
        name: "Eritrea",
        status: "Eligible",
      },
      {
        name: "Eswatini",
        status: "Eligible",
      },
      {
        name: "Ethiopia",
        status: "Eligible",
      },
      {
        name: "Fiji",
        status: "Not Eligible",
      },
      {
        name: "Gabon",
        status: "Eligible",
      },
      {
        name: "Gambia",
        status: "Eligible",
      },
      {
        name: "Georgia",
        status: "Eligible",
      },
      {
        name: "Ghana",
        status: "Eligible",
      },
      {
        name: "Grenada",
        status: "Eligible",
      },
      {
        name: "Guatemala",
        status: "Transition Funding",
      },
      {
        name: "Guinea",
        status: "Eligible",
      },
      {
        name: "Guinea-Bissau",
        status: "Eligible",
      },
      {
        name: "Guyana",
        status: "Eligible",
      },
      {
        name: "Haiti",
        status: "Eligible",
      },
      {
        name: "Honduras",
        status: "Eligible",
      },
      {
        name: "India",
        status: "Eligible",
      },
      {
        name: "Indonesia",
        status: "Eligible",
      },
      {
        name: "Iran (Islamic Republic)",
        status: "Not Eligible",
      },
      {
        name: "Iraq",
        status: "Eligible",
      },
      {
        name: "Jamaica",
        status: "Not Eligible",
      },
      {
        name: "Jordan",
        status: "Eligible",
      },
      {
        name: "Kazakhstan",
        status: "Eligible",
      },
      {
        name: "Kenya",
        status: "Eligible",
      },
      {
        name: "Kiribati",
        status: "Eligible",
      },
      {
        name: "Korea (Democratic Peoples Republic)",
        status: "Eligible",
      },
      {
        name: "Kosovo",
        status: "Transition Funding",
      },
      {
        name: "Kyrgyzstan",
        status: "Eligible",
      },
      {
        name: "Lao (Peoples Democratic Republic)",
        status: "Eligible",
      },
      {
        name: "Lebanon",
        status: "Not Eligible",
      },
      {
        name: "Lesotho",
        status: "Eligible",
      },
      {
        name: "Liberia",
        status: "Eligible",
      },
      {
        name: "Madagascar",
        status: "Eligible",
      },
      {
        name: "Malawi",
        status: "Eligible",
      },
      {
        name: "Malaysia",
        status: "Eligible",
      },
      {
        name: "Maldives",
        status: "Eligible",
      },
      {
        name: "Mali",
        status: "Eligible",
      },
      {
        name: "Marshall Islands",
        status: "Eligible",
      },
      {
        name: "Mauritania",
        status: "Eligible",
      },
      {
        name: "Mauritius",
        status: "Not Eligible",
      },
      {
        name: "Micronesia (Federated States)",
        status: "Eligible",
      },
      {
        name: "Moldova",
        status: "Eligible",
      },
      {
        name: "Mongolia",
        status: "Eligible",
      },
      {
        name: "Montenegro",
        status: "Not Eligible",
      },
      {
        name: "Morocco",
        status: "Eligible",
      },
      {
        name: "Mozambique",
        status: "Eligible",
      },
      {
        name: "Myanmar",
        status: "Eligible",
      },
      {
        name: "Namibia",
        status: "Eligible",
      },
      {
        name: "Nauru",
        status: "Eligible",
      },
      {
        name: "Nepal",
        status: "Eligible",
      },
      {
        name: "Nicaragua",
        status: "Eligible",
      },
      {
        name: "Niger",
        status: "Eligible",
      },
      {
        name: "Nigeria",
        status: "Eligible",
      },
      {
        name: "North Macedonia",
        status: "Not Eligible",
      },
      {
        name: "Pakistan",
        status: "Eligible",
      },
      {
        name: "Palau",
        status: "Not Eligible",
      },
      {
        name: "Palestine",
        status: "Eligible",
      },
      {
        name: "Panama",
        status: "Not Eligible",
      },
      {
        name: "Papua New Guinea",
        status: "Eligible",
      },
      {
        name: "Paraguay",
        status: "Not Eligible",
      },
      {
        name: "Peru",
        status: "Eligible",
      },
      {
        name: "Philippines",
        status: "Eligible",
      },
      {
        name: "Romania",
        status: "Eligible",
      },
      {
        name: "Russian Federation",
        status: "Not Eligible",
      },
      {
        name: "Rwanda",
        status: "Eligible",
      },
      {
        name: "Saint Lucia",
        status: "Eligible",
      },
      {
        name: "Saint Vincent and Grenadines",
        status: "Eligible",
      },
      {
        name: "Samoa",
        status: "Eligible",
      },
      {
        name: "Sao Tome and Principe",
        status: "Eligible",
      },
      {
        name: "Senegal",
        status: "Eligible",
      },
      {
        name: "Serbia",
        status: "Not Eligible",
      },
      {
        name: "Sierra Leone",
        status: "Eligible",
      },
      {
        name: "Solomon Islands",
        status: "Eligible",
      },
      {
        name: "Somalia",
        status: "Eligible",
      },
      {
        name: "South Africa",
        status: "Eligible",
      },
      {
        name: "South Sudan",
        status: "Eligible",
      },
      {
        name: "Sri Lanka",
        status: "Eligible",
      },
      {
        name: "Sudan",
        status: "Eligible",
      },
      {
        name: "Suriname",
        status: "Eligible",
      },
      {
        name: "Syrian Arab Republic",
        status: "Eligible",
      },
      {
        name: "Tajikistan",
        status: "Eligible",
      },
      {
        name: "Tanzania (United Republic)",
        status: "Eligible",
      },
      {
        name: "Thailand",
        status: "Eligible",
      },
      {
        name: "Timor-Leste",
        status: "Eligible",
      },
      {
        name: "Togo",
        status: "Eligible",
      },
      {
        name: "Tonga",
        status: "Eligible",
      },
      {
        name: "Tunisia",
        status: "Eligible",
      },
      {
        name: "Turkmenistan",
        status: "Eligible",
      },
      {
        name: "Tuvalu",
        status: "Eligible",
      },
      {
        name: "Uganda",
        status: "Eligible",
      },
      {
        name: "Ukraine",
        status: "Eligible",
      },
      {
        name: "Uzbekistan",
        status: "Eligible",
      },
      {
        name: "Vanuatu",
        status: "Eligible",
      },
      {
        name: "Venezuela",
        status: "Not Eligible",
      },
      {
        name: "Viet Nam",
        status: "Eligible",
      },
      {
        name: "Yemen",
        status: "Eligible",
      },
      {
        name: "Zambia",
        status: "Eligible",
      },
      {
        name: "Zanzibar",
        status: "Eligible",
      },
      {
        name: "Zimbabwe",
        status: "Eligible",
      },
    ],
  },
];

export const mockdata2: DotChartModel[] = [
  {
      "name": "Afghanistan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Albania",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Algeria",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Angola",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Armenia",
      "items": [
          {
              "name": "HIV",
              "status": "Transition Funding"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Azerbaijan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Bangladesh",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Belarus",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Belize",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Benin",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Bhutan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Bolivia (Plurinational State)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Botswana",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Bulgaria",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Burkina Faso",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Burundi",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Cabo Verde",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Cambodia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Cameroon",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Central African Republic",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Chad",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Colombia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Comoros",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Congo",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Congo (Democratic Republic)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Costa Rica",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Cuba",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Côte d'Ivoire",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Djibouti",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Dominica",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Dominican Republic",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Ecuador",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Egypt",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "El Salvador",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Equatorial Guinea",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Eritrea",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Eswatini",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Ethiopia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Fiji",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Gabon",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Gambia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Georgia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Ghana",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Grenada",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Guatemala",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Transition Funding"
          },
          {
              "name": "Tuberculosis",
              "status": "Transition Funding"
          }
      ]
  },
  {
      "name": "Guinea",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Guinea-Bissau",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Guyana",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Transition Funding"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Haiti",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Honduras",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "India",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Indonesia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Iran (Islamic Republic)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Iraq",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Jamaica",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Jordan",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Kazakhstan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Kenya",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Kiribati",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Korea (Democratic Peoples Republic)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Kosovo",
      "items": [
          {
              "name": "HIV",
              "status": "Transition Funding"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Transition Funding"
          }
      ]
  },
  {
      "name": "Kyrgyzstan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Lao (Peoples Democratic Republic)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Lebanon",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Lesotho",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Liberia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Madagascar",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Malawi",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Malaysia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Maldives",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Mali",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Marshall Islands",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Mauritania",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Mauritius",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Micronesia (Federated States)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Moldova",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Mongolia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Montenegro",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Morocco",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Mozambique",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Myanmar",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Namibia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Nauru",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Nepal",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Nicaragua",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Niger",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Nigeria",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "North Macedonia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Pakistan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Palau",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Palestine",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Panama",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Papua New Guinea",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Paraguay",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Peru",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Philippines",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Romania",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Russian Federation",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Rwanda",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Saint Lucia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Saint Vincent and Grenadines",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Samoa",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Sao Tome and Principe",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Senegal",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Serbia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Sierra Leone",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Solomon Islands",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Somalia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "South Africa",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "South Sudan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Sri Lanka",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Sudan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Suriname",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Syrian Arab Republic",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Tajikistan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Tanzania (United Republic)",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Thailand",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Timor-Leste",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Togo",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Tonga",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Tunisia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Turkmenistan",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Tuvalu",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Uganda",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Ukraine",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Uzbekistan",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Not Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Vanuatu",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Venezuela",
      "items": [
          {
              "name": "HIV",
              "status": "Not Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Not Eligible"
          }
      ]
  },
  {
      "name": "Viet Nam",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Yemen",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Zambia",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Zanzibar",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  },
  {
      "name": "Zimbabwe",
      "items": [
          {
              "name": "HIV",
              "status": "Eligible"
          },
          {
              "name": "Malaria",
              "status": "Eligible"
          },
          {
              "name": "Tuberculosis",
              "status": "Eligible"
          }
      ]
  }
];
