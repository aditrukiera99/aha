import axios from "axios";
import { useState } from "react";
import { Pipes } from "../../components/tools/pipes";
import { BaseLayout } from "../../components/layouts";
import Head from "next/head";
import { ISurveyLists } from "../../ts/typing/interfaces";
import Search from "../../components/forms/search";
import Dropdown from "../../components/forms/dropdown";
import Pagination from "../../components/pagination/pagination";
import useSurveys from "../../hooks/useSurveys";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconCalendar from "../../public/icons/icon-calendar";
import Paginations from "../../components/pagination/paginations";

const ListSurvey = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limitData, setLimitData] = useState(10);
  const handleLimit = (value: any) => {
    setLimitData(value);
  };

  const { surveys } = useSurveys(
    `/list-survey/limit=${limitData}&page=${currentPage}`
  );
  const [loading, setLoading] = useState(true);

  // Pagination
  const lastPage = surveys?.totalPages;

  // console.log(surveys?.data);
  // console.log(currentPage);

  // Filter by date (range)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Search and filter
  const [keywords, setKeywords] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleKeyword = (e: any) => {
    setKeywords(e.target.value);
  };
  const handleSelected = (value: any) => {
    setStatusFilter(value);
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Surveys</title>
      </Head>
      <h1 className="text-2xl font-black">Surveys</h1>
      <div className="flex justify-between gap-6 my-4">
        <div className="w-2/6 mb-4">
          <Search
            name="search"
            placeholder="Enter title"
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

        {/* <div className="flex-row flex w-full gap-4">
          <div className="sm:w-4/12 w-full">
            <DateTime
              name="datetime"
              placeholder="All time"
              onChange={console.log()}
            />
            <div className="mb-4">
              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className="w-full border rounded-md border-grey placeholder:text-neutral-400 px-3 py-1.5 pr-10 text-secondary"
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  placeholderText="All time"
                />
                <button className="border-0 bg-transparent text-neutral-400 absolute top-2.5 right-3">
                  {<IconCalendar />}
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 tracking-wider">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                VIS Token
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Quota
              </th>
              <th scope="col" className="py-3 px-6">
                Start Date
              </th>
              <th scope="col" className="py-3 px-6">
                Created at
              </th>
              <th scope="col" className="py-3 px-6">
                Updated at
              </th>
              <th scope="col" className="py-3 px-6">
                Admin Fee
              </th>
              <th scope="col" className="py-3 px-6">
                APR
              </th>
            </tr>
          </thead>

          {surveys
            ?.data!.filter((keys) =>
              keys.title?.toLowerCase().includes(keywords.toLowerCase())
            )
            .map((data: ISurveyLists, index) => {
              return (
                <tbody key={data.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {(currentPage - 1) * limitData + index + 1}
                    </th>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.strLimiter(data.title)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.strLimiter(data.description)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.tokenReward}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.capitalizeFirst(data.status)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.quota}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.startDate)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.createdAt)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.updatedAt)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.adminFee}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">{data.APR}</td>
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

export default ListSurvey;
