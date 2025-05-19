import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetching error.");
      }
      const result = await response.json();
      setData(result);
      setErrors(null);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  },[url]);

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [fetchData]);

  return { data, isLoading, errors };
};
