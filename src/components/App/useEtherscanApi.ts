import React, { useState, useEffect } from "react";

export function useFetch<T>(url: string, initialData: T): [T, boolean, string] {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError("");
      try {
        const result = await fetch(url).then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Error occurred");
        });
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  return [data, loading, error];
}

