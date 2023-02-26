import { Pipes } from "../../components/tools/pipes";
import { BaseLayout } from "../../components/layouts";
import Head from "next/head";
import { IResearcher } from "../../ts/typing/interfaces";
import useResearchers from "../../hooks/useResearchers";
import Search from "../../components/forms/search";
import { useState } from "react";
import Dropdown from "../../components/forms/dropdown";
import Paginations from "../../components/pagination/paginations";

const ListResearcher = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limitData, setLimitData] = useState(10);
  const handleLimit = (value: any) => {
    setLimitData(value);
  };

  const { researchers } = useResearchers(
    `/list-researcher/limit=${limitData}&page=${currentPage}`
  );

  // Pagination
  const lastPage = researchers?.totalPages;

  // Search and filter
  const [keywords, setKeywords] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const handleKeyword = (e: any) => {
    setKeywords(e.target.value);
  };
  const handleSelected = (value: any) => {
    setStatusFilter(value);
  };

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Researchers</title>
      </Head>
      <h1 className="text-2xl font-black">Researchers</h1>
      {/* <p className="mb-4">List of researchers.</p> */}
      <div className="flex justify-between gap-6 my-4">
        <div className="w-2/6 mb-4">
          <Search
            name="search"
            placeholder="Enter name"
            onChange={(e: any) => handleKeyword(e)}
          />
        </div>
        {/* <div className="w-1/6">
          <Dropdown
            name="status"
            objects={[
              { value: "", label: "All" },
              { value: "UNPUBLISHED", label: "Unpublished" },
              { value: "PUBLISHED", label: "Published" },
              { value: "DRAFT", label: "Draft" },
              { value: "CLOSED", label: "Closed" },
            ]}
            onSelected={handleSelected}
          />
        </div> */}

        {/* <div className="flex">
          <h2>Total : {researchers.length}</h2>
        </div> */}
      </div>
      <div className="overflow-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
            <tr>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                No.
              </th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Name
              </th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Email
              </th>
              {/* <th scope="col" className="py-3 px-6 whitespace-nowrap w-full">
                Role
              </th> */}
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Last Login
              </th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Created At
              </th>
              <th scope="col" className="py-3 px-6 whitespace-nowrap">
                Update At
              </th>
            </tr>
          </thead>
          {researchers
            ?.data!.filter(
              (keys) =>
                keys.fullName?.toLowerCase().includes(keywords.toLowerCase()) ||
                keys.email?.toLowerCase().includes(keywords.toLowerCase())
            )
            .map((data: IResearcher, index) => {
              return (
                <tbody key={data.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {(currentPage - 1) * limitData + index + 1}
                    </th>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {data.fullName}
                    </td>
                    <td className="py-4 px-6">{data.email}</td>
                    {/* <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.capitalizeAndDelUnderscores(data.role)}
                    </td> */}
                    <td className="py-4 px-6">
                      {Pipes.capitalizeFirst(data.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.lastLogin)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.createdAt)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.updatedAt)}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      <div className="flex justify-between items-center w-full mt-2">
        <div className="w-1/12">
          <Dropdown
            name="limit"
            objects={[
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" },
            ]}
            onSelected={handleLimit}
          />
        </div>
        <Paginations
          currentPage={currentPage}
          lastPage={lastPage!}
          maxLength={7}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </BaseLayout>
  );
};

export default ListResearcher;
