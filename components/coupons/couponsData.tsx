import React from "react";
import { ICoupons } from "../../ts/typing/interfaces";
import { Card } from "../card/card";
import { Pipes } from "../tools/pipes";

interface ICouponsProps {
  couponsData: ICoupons[];
}

function CouponsData(props: ICouponsProps) {
  return (
    <>
      <div className="overflow-x-auto relative my-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6 min-w-[100px]">Logo</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Term</th>
              {/* <th className="py-3 px-6">Code</th> */}
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Expired At</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
              <th className="py-3 px-6">Modify</th>
            </tr>
          </thead>
          {props.couponsData.map((coupon, index) => {
            return (
              <tbody key={coupon.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {coupon.couponName}
                  </td>
                  <td className="py-4 px-6">
                    <img
                      className="object-cover"
                      src={coupon.couponImageUrl}
                      alt="Logo"
                    />
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {coupon.couponDesc}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {coupon.couponTerm}
                  </td>
                  {/* <td className="py-4 px-6 whitespace-nowrap">
                    {coupon.couponName}
                  </td> */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {coupon.couponPrice}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {Pipes.dateDMY(coupon.couponExpiredAt)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {Pipes.dateDMY(coupon.createdAt)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {Pipes.dateDMY(coupon.updatedAt)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default CouponsData;
