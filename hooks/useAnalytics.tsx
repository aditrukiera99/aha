import axios from "axios";
import { useState, useEffect } from "react";
import { IAnalytics } from "../ts/typing/interfaces";

function useAnalytics(url: string) {
  const [analytics, setAnalytics] = useState<IAnalytics>();

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const analytics = await authAxios.get(url, {
          signal: abortController.signal,
        });
        setAnalytics(analytics.data.data);
        // console.log(analytics.data.data);
        // setLoading(false);
      } catch (error) {
        // console.log("there was an error:", error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const reFetch = async (filterUrl: string) => {
    try {
      const analytics = await authAxios.get(filterUrl);
      setAnalytics(analytics.data.data);
      // console.log(analytics.data.data);
      console.log("refetch");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(url);

  return { analytics, reFetch };
}

export default useAnalytics;
