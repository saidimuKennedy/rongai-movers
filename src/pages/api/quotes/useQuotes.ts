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
