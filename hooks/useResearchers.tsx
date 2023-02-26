import axios from "axios";
import { useState, useEffect } from "react";
import { IResearcherData } from "../ts/typing/interfaces";

function useResearchers(url: string) {
  const [researchers, setResearchers] = useState<IResearcherData>();
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
        const researchers = await authAxios.get(url, {
          signal: abortController.signal,
        });
        setResearchers(researchers.data);
        // console.log(researchers.data);
        // setLoading(false);
      } catch (error) {
        // react on errors.
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { researchers };
}

export default useResearchers;
