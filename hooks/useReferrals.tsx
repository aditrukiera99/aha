import axios from "axios";
import { useState, useEffect } from "react";
import { IReferrals } from "../ts/typing/interfaces";

function useReferrals() {
  const [referrals, setReferrals] = useState<IReferrals[]>([]);

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
        const referrals = await authAxios.get(`/list-referral`, {
          signal: abortController.signal,
        });
        setReferrals(referrals.data.data);
        // console.log(referrals.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { referrals };
}

export default useReferrals;
