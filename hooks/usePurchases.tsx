import axios from "axios";
import { useState, useEffect } from "react";
import { IPurchases } from "../ts/typing/interfaces";

function usePurchases() {
  const [purchases, setPurchases] = useState<IPurchases[]>([]);
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
        const purchases = await authAxios.get(`/list-sales`, {
          signal: abortController.signal,
        });
        setPurchases(purchases.data.data);
        // console.log(purchases.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { purchases };
}

export default usePurchases;
