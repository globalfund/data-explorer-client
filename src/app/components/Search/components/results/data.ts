export interface SearchResultModel {
  label: string;
  value: string;
  type?: string;
}

export interface SearchResultsTabModel {
  name: string;
  results: SearchResultModel[];
}
