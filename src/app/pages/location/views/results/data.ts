export const RESULT_YEARS = ["2017", "2018", "2019", "2020", "2021", "2022"];

export interface ResultsProps {
  resultsYear: string;
  setResultsYear: (year: string) => void;
}
