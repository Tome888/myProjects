import {create} from 'zustand';

interface Review {
  id: number;
  author?: string;
  rating?: number;
  comment?: string;
  stars: number;
}

interface ReviewState {
  review: Review;
  setAuthor: (author: string) => void;
  setComment: (comment: string) => void;
  setStars: (stars: number) => void;
  resetReview: () => void;
}

const initialReviewState: Review = {
  id: new Date().getTime(),
  author: undefined,
  rating: undefined,
  comment: undefined,
  stars: 1,
};

export const useReviewStore = create<ReviewState>((set) => ({
  review: initialReviewState,
  setAuthor: (author) =>
    set((state) => ({ review: { ...state.review, author } })),
  setComment: (comment) =>
    set((state) => ({ review: { ...state.review, comment } })),
  setStars: (stars) =>
    set((state) => ({ review: { ...state.review, stars } })),
  resetReview: () =>
    set({ review: { ...initialReviewState, id: new Date().getTime() } }),
}));