export interface PerformanceRatingProps {
  data: Record<string, unknown>[];
}

export const ratingValues = ["N/A", "C", "B2", "B1", "A2", "A1"];

export const mockdata: Record<string, unknown>[] = [
  {
    year: "2017",
    rating: 5,
  },
  {
    year: "2018",
    rating: 4,
  },
  {
    year: "2019",
    rating: 3,
  },
];
