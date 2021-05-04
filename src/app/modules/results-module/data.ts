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
