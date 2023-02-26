import { useEffect, useState } from "react";
import axios from "axios";
import { BaseLayout } from "../../components/layouts";
import Head from "next/head";
import { IPlan } from "../../ts/typing/interfaces";

const getToken =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

const authAxios = axios.create({
  baseURL: "https://app.vinprotocol.com/api/v1/user-office/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
});

const ListPlan = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState([]);
  const [usernameAdmin, setUsernameAdmin] = useState<string | null>("");

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const plan = await authAxios.get(`/list-plan`, {
          signal: abortController.signal,
        });
        setPlan(plan.data.data);
        // console.log(plan.data.data);
        setLoading(false);
      } catch (error) {
        // react on errors.
      }
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Plans</title>
      </Head>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6  whitespace-nowrap">
                Price (IDR)
              </th>
              <th scope="col" className="py-3 px-6">
                Surveys
              </th>
              <th scope="col" className="py-3 px-6">
                Members
              </th>
              <th scope="col" className="py-3 px-6">
                Audiences
              </th>
              <th scope="col" className="py-3 px-6">
                Datasets
              </th>
              <th scope="col" className="py-3 px-6">
                Collection
              </th>
            </tr>
          </thead>
          {plan.map((data: IPlan) => {
            return (
              <tbody key={data.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.name}
                  </th>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {data.description}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{data.price}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {data.numberOfSurveys}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {data.numberOfMembers}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {data.numberOfAudiences}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {data.numberOfDatasets}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">-</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </BaseLayout>
  );
};

export default ListPlan;
