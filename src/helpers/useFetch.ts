import { useState, useEffect } from "react";

/* Reusable hook to fetch data and maintain loading/error states */
export function useFetch<T>(
  url: string,
  initialData: T,
  resultTransformFunction?: (result: any) => T
): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    async function getData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);

        if (response.status === 200) {
          const json = await response.json();
          /* Transform if needed after successful query */
          setData(
            resultTransformFunction ? resultTransformFunction(json) : json
          );
        } else {
          throw new Error("Error occurred, while getting data from server.");
        }
      } catch (error) {
        setData(initialData);
        setError(error.message || error || "Error occurred");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url, resultTransformFunction, initialData]);

  return [data, loading, error];
}
