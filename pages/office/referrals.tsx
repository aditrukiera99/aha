import Head from "next/head";
import React, { useState } from "react";
import Search from "../../components/forms/search";
import { BaseLayout } from "../../components/layouts";
import { Pipes } from "../../components/tools/pipes";
import useReferrals from "../../hooks/useReferrals";
import { IReferrals } from "../../ts/typing/interfaces";

const Referrals = () => {
  const { referrals } = useReferrals();

  // Search and filter
  const [keywords, setKeywords] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const handleKeyword = (e: any) => {
    setKeywords(e.target.value);
  };
  const handleSelected = (value: any) => {
    setStatusFilter(value);
  };

  // console.log(referrals);

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Referrals</title>
      </Head>
      <h1 className="text-2xl font-black mb-6">Referrals</h1>
      {/* <p className="mb-4">Create, update and edit coupons data.</p> */}
      <div className="flex justify-between gap-6 my-4">
        <div className="w-2/6 mb-4">
          <Search
            name="search"
            placeholder="Enter inviter name"
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
        <div className="flex ">
          <h2>Total : {referrals.length}</h2>
        </div>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 tracking-wider">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Code
              </th>
              <th scope="col" className="py-3 px-6">
                Invited Count
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
            </tr>
          </thead>
          {referrals

            .filter((keys) =>
              keys.userInviter_fullName
                .toLowerCase()
                .startsWith(keywords.toLowerCase())
            )
            .map((data: IReferrals, index) => {
              return (
                <tbody key={data.userInviter_id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="py-4 px-6 whitespace-nowrap capitalize">
                      {Pipes.capitalizeEachWord(data.userInviter_fullName)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.userInviter_email}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.userInviter_referralCode}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {data.invitedcount}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.dateDMY(data.userInviter_createdAt)}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </BaseLayout>
  );
};

export default Referrals;
