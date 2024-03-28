import axios from "axios";

export const DEFAULT_PER_PAGE = 10 as const;

export type PaginationResponse<T> = {
  metadata: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
    isLastPage: boolean;
  };
  items: T[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type PaginationRequest<T = {}> = {
  perPage: number;
  page: number;
} & T;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});
