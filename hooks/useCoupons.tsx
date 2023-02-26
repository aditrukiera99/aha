import axios from "axios";
import { useEffect, useState } from "react";
import { ICoupons } from "../ts/typing/interfaces";

function useCoupons() {
  const [coupons, setCoupons] = useState<ICoupons[]>([]);

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/coupons",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const analytics = await authAxios.get(`/list`, {
          signal: abortController.signal,
        });
        setCoupons(analytics.data.data);
        // console.log(analytics.data.data);
        // setLoading(false);
      } catch (error) {
        // console.log("there was an error:", error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { coupons };
}

export default useCoupons;
