import { createContext } from "react";

interface Review1 {
  stars: number;
}

interface MedianFunctionProps {
  children: React.ReactElement;
}

interface MedianContextType {
  calculateMedianRating: (reviewsList: any) => number;
}

export const FuncMedian = createContext<MedianContextType>({
  calculateMedianRating: (reviewsList: Review1[]) => {
    if (!reviewsList || reviewsList.length === 0) return 0;
    const stars = reviewsList
      .map((review) => review.stars)
      .filter((star) => star !== undefined)
      .sort((a, b) => a - b);
    const mid = Math.floor(stars.length / 2);

    if (stars.length === 0) {
      return 0;
    } else if (stars.length % 2 === 0) {
      if (stars[mid - 1] !== undefined && stars[mid] !== undefined) {
        return (stars[mid - 1] + stars[mid]) / 2;
      } else {
        return 0;
      }
    } else {
      return stars[mid];
    }
  },
});

export function MedianFunction({ children }: MedianFunctionProps) {
  const calculateMedianRating = (reviewsList: Review1[]) => {
    if (!reviewsList || reviewsList.length === 0) return 0;
    const stars = reviewsList
      .map((review: any) => review.stars)
      .filter((star: number) => star !== undefined)
      .sort((a: number, b: number) => a - b);

    const mid = Math.floor(stars.length / 2);

    if (stars.length === 0) {
      return 0;
    } else if (stars.length % 2 === 0) {
      if (stars[mid - 1] !== undefined && stars[mid] !== undefined) {
        return (stars[mid - 1] + stars[mid]) / 2;
      } else {
        return 0;
      }
    } else {
      return stars[mid];
    }
  };

  return (
    <FuncMedian.Provider value={{ calculateMedianRating }}>
      {children}
    </FuncMedian.Provider>
  );
}
