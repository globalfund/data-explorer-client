export interface PerformanceRatingProps {
  data: Record<string, unknown>[];
}

export const ratingValues = ["N/A", "C", "B2", "B1", "A2", "A1"];

export const mockdata: Record<string, unknown>[] = [
  {
    year: "May 2010 - Jul 2010",
    rating: 3,
  },
  {
    year: "Aug 2010 - Oct 2010",
    rating: 3,
  },
  {
    year: "Nov 2010 - Jan 2011",
    rating: 3,
  },
  {
    year: "Feb 2011 - Apr 2011",
    rating: 3,
  },
  {
    year: "May 2011 - Jul 2011",
    rating: 3,
  },
];
