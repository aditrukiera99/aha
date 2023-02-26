import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddVendor from "../../components/forms/add-vendor";
import { BaseLayout } from "../../components/layouts";
import { Modal } from "../../components/modal/modal";
import VendorData from "../../components/vendors/vendorData";
import useVendors from "../../hooks/useVendors";
import { VendorDataType } from "../../ts/typing/interfaces";

const Vendors = () => {
  const [isAddModalOpen, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!isAddModalOpen);

  const { vendors } = useVendors();

  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/vendors",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Vendors</title>
      </Head>
      <h1 className="text-2xl font-black">Vendors</h1>
      <p className="mb-4">Create, update and edit vendors data.</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => toggleAddModal()}
          className="inline-block p-2 bg-primary-blue-1 hover:bg-primary-blue-2 text-white font-medium text-sm leading-snug rounded shadow-md active:shadow-lg transition duration-150 ease-in-out"
        >
          Add vendor
        </button>
      </div>

      <VendorData vendorsData={vendors} />

      <Modal
        title="Add New Vendor"
        isOpen={isAddModalOpen}
        onClose={toggleAddModal}
      >
        <AddVendor />
      </Modal>
    </BaseLayout>
  );
};

export default Vendors;
