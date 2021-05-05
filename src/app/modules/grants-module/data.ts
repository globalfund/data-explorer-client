export interface GrantListItemModel {
  id: string;
  title: string;
  status: string;
  component: string;
  geoLocation: string;
  rating: string;
  disbursed: number;
  committed: number;
  signed: number;
}

export interface GrantsListProps {
  listitems: GrantListItemModel[];
}

export const grantsmockitems: GrantListItemModel[] = [
  {
    id: "KEN-011-G13-M",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
  {
    id: "KEN-011-G13-N",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
  {
    id: "KEN-011-G13-O",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
  {
    id: "KEN-011-G13-P",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
  {
    id: "KEN-011-G13-Q",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
  {
    id: "KEN-011-G13-R",
    status: "Active",
    title: "Scaling up Malaria control intervention for impact",
    component: "Malaria",
    geoLocation: "Kenya",
    rating: "B1",
    signed: 81882070,
    committed: 81882070,
    disbursed: 81882070,
  },
];
