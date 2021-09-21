import { useEffect, useState } from "react";
import { get } from "../utils/requests";

const useFetch = (url: string, lazy = false) => {
  const [isLoading, setIsLoading] = useState(!lazy);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const fetch = (loading = true) => {
    setIsLoading(loading);
    get(url)
      .then((data: any) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!lazy) {
      fetch();
    }
  }, []);

  return { isLoading, error, data, fetch };
};

export default useFetch;
