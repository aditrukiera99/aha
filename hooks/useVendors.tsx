import axios from "axios";
import { useState, useEffect } from "react";
import { VendorDataType } from "../ts/typing/interfaces";

function useVendors() {
  const [vendors, setVendors] = useState<VendorDataType[]>([]);

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/vendors",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const listVendors = await authAxios.get(`/list`, {
          signal: abortController.signal,
        });
        setVendors(listVendors.data.data);
        // console.log(listVendors.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { vendors };
}

export default useVendors;
