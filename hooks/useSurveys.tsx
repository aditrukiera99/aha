import axios from "axios";
import { useState, useEffect } from "react";
import { ISurveyData } from "../ts/typing/interfaces";

function useSurveys(url: string) {
  const [surveys, setSurveys] = useState<ISurveyData>();
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const surveys = await authAxios.get(url, {
          signal: abortController.signal,
        });
        setSurveys(surveys.data);
        // console.log(surveys.data);
        // setLoading(false);
      } catch (error) {
        // react on errors.
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { surveys };
}

export default useSurveys;
