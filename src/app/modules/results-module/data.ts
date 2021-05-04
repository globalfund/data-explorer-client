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
    id: "result-a",
    title: "Sex workers reached with HIV prevention programs",
    value: 5110485,
    component: "HIV",
    geoLocations: [
      {
        name: "Kenya",
        value: 1000000,
      },
    ],
  },
];
