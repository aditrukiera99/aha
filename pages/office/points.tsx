import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseLayout } from "../../components/layouts";
import { Modal } from "../../components/modal/modal";
import { Pipes } from "../../components/tools/pipes";
import { IRewards } from "../../ts/typing/interfaces";
import { ToastContainer, toast } from "react-toastify";
import usePoints from "../../hooks/usePoints";

type ChangePoint = {
  point: number;
  type: string;
};

const Points = (props: IRewards) => {
  const { rewards } = usePoints();
  const [loading, setLoading] = useState(true);

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/point-setting",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  // useForm
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePoint>();

  const onSubmit: SubmitHandler<ChangePoint> = async (data) => {
    // check payload before submit
    // console.log(data.point);
    // console.log(data.point);
    // return;

    const payload: ChangePoint = data as unknown as ChangePoint;
    authAxios
      .post(`/change`, payload)
      .then(() => {
        toast.success("Point changed succesfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setModalState(false);
        window.location.reload();
      })
      .catch(() => {
        toast.error("Sorry, there is an error occured", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setLoading(false);
  };
  // console.log(errors, "errors");

  // Modal
  const [isModalOpen, setModalState] = useState(false);
  const toggleModal = () => setModalState(!isModalOpen);

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Points</title>
      </Head>
      <div className="flex flex-wrap gap-2">
        <ToastContainer />
        {/* begin: */}
        <div className="grid gap-4 w-full text-black overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  No.
                </th>
                <th scope="col" className="py-3 px-6">
                  Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Point
                </th>
                <th scope="col" className="py-3 px-6">
                  Created at
                </th>
                <th scope="col" className="py-3 px-6">
                  Updated at
                </th>
                <th scope="col" className="py-3 px-6">
                  Edit
                </th>
              </tr>
            </thead>
            {rewards.map((data, index) => {
              return (
                <tbody key={data.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="py-4 px-6">
                      {Pipes.capitalizeAndDelUnderscores(data.type)}
                    </td>
                    <td className="py-4 px-6">{data.point}</td>
                    <td className="py-4 px-6">
                      {Pipes.dateDMY(data.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      {Pipes.dateDMY(data.updatedAt)}
                    </td>
                    <td className="py-4 px-6">
                      {/* <button onClick={() => handleChange(data)}>Change</button> */}
                      <button
                        className="text-white text-sm bg-primary-blue-1 hover:bg-primary-blue-2 p-1 rounded"
                        onClick={() => {
                          setValue("point", Pipes.emptyChecker(data.point));
                          setValue("type", Pipes.emptyChecker(data.type));
                          setModalState(true);
                        }}
                      >
                        Change
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        {/* end: */}
      </div>

      <Modal title="Change Points" isOpen={isModalOpen} onClose={toggleModal}>
        {/* No need useState hook for set values manually on useForm hook.
            Use setValue instead on function call
        */}
        {/* <input defaultValue={currentType} />
        <input defaultValue={currentPoint} /> */}
        {/* Form to update point */}
        <form
          className="mt-2"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="overflow-hidden sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3 space-y-2">
                  <label
                    htmlFor="first-name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                    {...register("type", {
                      required: "*Type is required",
                    })}
                    disabled
                  />
                  <p className="text-sm text-red-600 italic">
                    {errors.type?.message}
                  </p>
                </div>

                <div className="col-span-6 sm:col-span-3 space-y-2">
                  <label
                    htmlFor="last-name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Point
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                    type="number"
                    {...register("point", {
                      required: "*Address is required",
                      pattern: /^\d+$/,
                      valueAsNumber: true,
                    })}
                  />
                  <p className="text-sm text-red-600 italic">
                    {errors.point?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <input
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-blue-1 hover:bg-primary-blue-2 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              />
            </div>
          </div>
        </form>
      </Modal>
    </BaseLayout>
  );
};

export default Points;
