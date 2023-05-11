import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, componentIsReady: boolean = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);
    if (componentIsReady) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((response_data) => setData(response_data))
        .catch((response_error) => setError(response_error))
        .finally(() => setLoading(false));
    }

    return () => abortController.abort();
  }, [url, componentIsReady, reloadFlag]);

  const reload = () => setReloadFlag(!reloadFlag);

  return { data, loading, error, reload };
};
