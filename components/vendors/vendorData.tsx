import { Pipes } from "../tools/pipes";
import { VendorDataType } from "../../ts/typing/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../modal/modal";
import { useState } from "react";
import axios from "axios";
import Vendors from "../../pages/office/vendor";

interface IVendorProps {
  vendorsData: VendorDataType[];
}

const VendorData = (props: IVendorProps) => {
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/vendors",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  const [isEditModalOpen, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!isEditModalOpen);
  const [isDelModalOpen, setDelModal] = useState(false);
  const toggleDelModal = () => setDelModal(!isDelModalOpen);

  // Save selected id to state
  let [selectedID, setSelectedID] = useState("");
  let [selectedName, setSelectedName] = useState("");

  // useForm
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VendorDataType>();
  const editVendor: SubmitHandler<VendorDataType> = async (data) => {
    // check payload before submit
    console.log(data);
    return;
  };

  const watchData = watch();

  return (
    <>
      <div className="overflow-x-auto relative my-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6 min-w-[160px]">Logo</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
              <th className="py-3 px-6">Modify</th>
            </tr>
          </thead>
          {props.vendorsData.map((vendor, index) => {
            return (
              <tbody key={vendor.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="py-4 px-6 whitespace-nowrap">{vendor.name}</td>
                  <td className="flex justify-center py-4 px-6">
                    <img
                      className="object-contain h-24"
                      src={vendor.logo}
                      alt="Logo"
                    />
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {vendor.address}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {Pipes.dateDMY(vendor.createdAt)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {Pipes.dateDMY(vendor.updatedAt)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      className="mr-2"
                      onClick={() => {
                        setValue("id", Pipes.emptyChecker(vendor.id));
                        setValue("name", Pipes.emptyChecker(vendor.name));
                        setValue("logo", Pipes.emptyChecker(vendor.logo));
                        setEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedID(vendor.id);
                        setSelectedName(vendor.name);
                        setDelModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <Modal
        title="Edit Vendor"
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
      >
        <form
          className="mt-2"
          onSubmit={handleSubmit(editVendor)}
          autoComplete="off"
        >
          <div className="overflow-hidden sm:rounded-md">
            <div className="bg-white p-1">
              <div className="grid grid-cols-12 gap-6">
                {/* <div className="col-span-6 sm:col-span-3 space-y-2 hidden">
                  <label
                    htmlFor="first-name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Vendor Id
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                    {...register("id", {
                      required: "*Vendor id is required",
                    })}
                  />
                  <p className="text-sm text-red-600 italic">
                    {errors.id?.message}
                  </p>
                </div> */}

                <div className="col-span-12 space-y-2">
                  <label
                    htmlFor="last-name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                    {...register("name", {
                      required: "*Name is required",
                    })}
                  />
                  <p className="text-sm text-red-600 italic">
                    {errors.name?.message}
                  </p>
                </div>
                {/* logo */}
                <div className="col-span-12 space-y-2">
                  <label
                    htmlFor="last-name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Logo
                  </label>
                  <div className="flex justify-center">
                    <img
                      className="object-cover h-32"
                      src={watchData.logo}
                      alt="logo"
                    />
                  </div>

                  <input
                    className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                    type="file"
                    {...register("logo")}
                  />
                  <p className="text-sm text-red-600 italic">
                    {errors.logo?.message}
                  </p>
                </div>
                {/* end logo */}
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

      <Modal
        title="Delete Vendor"
        isOpen={isDelModalOpen}
        onClose={toggleDelModal}
      >
        <div className="p-1">
          <h2>Delete {Pipes.capitalizeEachWord(selectedName)}</h2>
          <div className="flex justify-end">
            <button
              onClick={() => deleteVendor()}
              className="inline-flex justify-center mt-3 rounded-md border border-transparent bg-rose-800 hover:bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );

  async function deleteVendor() {
    // Uncomment line below for testing
    // return console.log(selectedID);
    await authAxios
      .delete("/delete", {
        data: {
          vendorId: selectedID,
        },
      })
      .then((result) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toggleDelModal();
      })
      .catch((error) => {
        toggleDelModal();
        console.log(error);
      });
  }
};

export default VendorData;
