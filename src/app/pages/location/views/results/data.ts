export const RESULT_YEARS = [
  { name: "2017", value: "2017" },
  { name: "2018", value: "2018" },
  { name: "2019", value: "2019" },
  { name: "2020", value: "2020" },
  { name: "2021", value: "2021" },
  { name: "2022", value: "2022" },
];

export interface ResultsProps {
  resultsYear: { name: string; value: string };
  setResultsYear: (value: { name: string; value: string }) => void;
}
