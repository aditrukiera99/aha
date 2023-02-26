import axios from "axios";
import { useState, useEffect } from "react";
import { IRespondentData } from "../ts/typing/interfaces";

const useRespondents = (url: string) => {
  const [respondents, setRespondents] = useState<IRespondentData>();
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
        const respondents = await authAxios.get(url, {
          signal: abortController.signal,
        });
        setRespondents(respondents.data);
        // console.log(respondents.data);
        // setLoading(false);
      } catch (error) {
        // react on errors.
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { respondents };
};

export default useRespondents;
