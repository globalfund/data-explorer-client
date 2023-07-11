export interface GrantListItemModel {
  id: string;
  title: string;
  status: string;
  component: string;
  geoLocation: string;
  rating: string | null;
  disbursed: number;
  committed: number;
  signed: number;
  recipientName: string;
  recipientShortName: string;
}

export interface GrantsListProps {
  listitems: GrantListItemModel[];
}

export const grantsmockitems: GrantListItemModel[] = [
  {
    id: "AFG-011-G12-T",
    title:
      "Afghanistan - Tuberculosis - JICA (Japan International Cooperation Agency)",
    status: "Administratively Closed",
    component: "Tuberculosis",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 2054170.36,
    committed: 2134606.27,
    signed: 2134606.27,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-012-G13-T",
    title: "Afghanistan - Tuberculosis - Ministry of Public Health",
    status: "Administratively Closed",
    component: "Tuberculosis",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 289853.94,
    committed: 289853.94,
    signed: 289853.94,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-202-G01-I-00",
    title:
      "Afghanistan - RSSH - Ministry of Public Health of the Islamic Republic of Afghanistan",
    status: "Administratively Closed",
    component: "RSSH",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 3125605,
    committed: 3125605,
    signed: 3125605,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-405-G02-T",
    title:
      "Afghanistan - Tuberculosis - Ministry of Public Health of the Islamic Republic of Afghanistan",
    status: "Administratively Closed",
    component: "Tuberculosis",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 2678960.64,
    committed: 2678960.64,
    signed: 2678960.64,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-506-G03-M",
    title:
      "Afghanistan - Malaria - Ministry of Public Health of the Islamic Republic of Afghanistan",
    status: "Administratively Closed",
    component: "Malaria",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 16713179.95,
    committed: 16713179.95,
    signed: 16713179.95,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-509-G06-M",
    title: "Afghanistan - Malaria - HealthNet International TPO",
    status: "Administratively Closed",
    component: "Malaria",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 7171871.31,
    committed: 7171871.31,
    signed: 7171871.31,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-708-G04-H",
    title: "Strenthening Provincial HIV Program",
    status: "In Closure",
    component: "HIV",
    geoLocation: "Afghanistan",
    rating: "B1",
    disbursed: 4342300.69,
    committed: 4342300.69,
    signed: 4342300.69,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-708-G05-H",
    title:
      "Afghanistan - HIV - GTZ-IS (Gesellchaft fur Technische Zusammenarbeit - German Technical Cooperation - International Services)",
    status: "Administratively Closed",
    component: "HIV",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 8008288,
    committed: 8008288,
    signed: 8008288,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-809-G07-T",
    title:
      "Afghanistan - Tuberculosis - Bangladesh Rural Advancement Committee (BRAC)-Afghanistan",
    status: "Administratively Closed",
    component: "Tuberculosis",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 17321111.78,
    committed: 17401656.51,
    signed: 17401656.52,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
  {
    id: "AFG-809-G08-M",
    title: "Afghanistan - Malaria - Ministry of Public Health",
    status: "Administratively Closed",
    component: "Malaria",
    geoLocation: "Afghanistan",
    rating: null,
    disbursed: 2810463.97,
    committed: 2810463.97,
    signed: 2810463.97,
    recipientName: "United Nations Development Programme",
    recipientShortName: "UNDP",
  },
];
