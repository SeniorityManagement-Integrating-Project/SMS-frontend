import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, componentIsReady: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    if (componentIsReady) {
      fetch(url)
        .then((response) => response.json())
        .then((response_data) => setData(response_data))
        .catch((response_error) => setError(response_error))
        .finally(() => setLoading(false));
    }

    return () => abortController.abort();
  }, [url, componentIsReady]);

  return { data, loading, error };
};
