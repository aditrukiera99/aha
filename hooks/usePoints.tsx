import axios from "axios";
import { useState, useEffect } from "react";
import { IRewards } from "../ts/typing/interfaces";
function usePoints() {
  const [rewards, setRewards] = useState<IRewards[]>([]);

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/point-setting",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const rewards = await authAxios.get(`/get`, {
          signal: abortController.signal,
        });
        setRewards(rewards.data.data);
        // console.log(rewards.data.data);
        // setLoading(false);
      } catch (error) {
        // console.log("there was an error:", error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { rewards };
}

export default usePoints;
