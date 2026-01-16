/**
 * @file Custom Hook for Fetching Quotes
 * @module hooks/useQuotes
 * @description This custom React hook (`useQuotes`) utilizes the `useSWR` library
 *              to fetch a list of quotes from the `/api/quotes` endpoint.
 *              It provides state for the fetched data, loading status, and any errors encountered.
 *              This hook encapsulates the logic for data fetching and caching for quote-related data.
 */
import useSWR from "swr";
// what does swr do 
interface Quote {
  id: number;
  text: string;
  author: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function useQuotes() {
  const { data, error, isLoading } = useSWR("/api/quotes", fetcher);

  return {
    quotes: data,
    isLoading,
    isError: error,
  };
}
