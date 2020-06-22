import React, { useState, useEffect } from "react";

export function useFetch<T>(
  url: string,
  initialData: T,
  resultTransformFunction?: (result: any) => T
): [T, boolean, string|null] {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>("");

  useEffect(() => {
    if (!url) {
      return;
    }
    async function getData() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const json = await response.json();
          setData(
            resultTransformFunction ? resultTransformFunction(json) : json
          );
        } else {
          throw new Error("Error occurred, while getting data from server.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url, resultTransformFunction]);

  return [data, loading, error];
}
