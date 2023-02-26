import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CouponsData from "../../components/coupons/couponsData";
import AddCoupon from "../../components/forms/add-coupon";
import { BaseLayout } from "../../components/layouts";
import { Modal } from "../../components/modal/modal";
import useCoupons from "../../hooks/useCoupons";

type AddCoupon = {
  vendorId: string;
  couponDesc: string;
  couponCode: string;
  couponExpiredAt: string;
  couponPrice: number;
  couponImageUrl?: string | null;
};

const Rewards = () => {
  const { coupons } = useCoupons();
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/coupon",
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  });
  // useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddCoupon>();
  const onSubmit: SubmitHandler<AddCoupon> = (data) => console.log(data);

  // console.log(watch("name"));
  // console.log(watch("address"));
  // console.log(errors, "errors");
  // console.log(coupons);

  const [isModalOpen, setModalState] = useState(false);
  const toggleModal = () => setModalState(!isModalOpen);
  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Coupons</title>
      </Head>
      <h1 className="text-2xl font-black">Coupons</h1>
      <p className="mb-4">Create, update and edit coupons data.</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => toggleModal()}
          className="inline-block p-2 bg-primary-blue-1 hover:bg-primary-blue-2 text-white font-medium text-sm leading-snug rounded shadow-md active:shadow-lg transition duration-150 ease-in-out"
        >
          Add Coupon
        </button>
      </div>
      <CouponsData couponsData={coupons} />
      <Modal title="Add New Vendor" isOpen={isModalOpen} onClose={toggleModal}>
        <AddCoupon />
      </Modal>
    </BaseLayout>
  );
};

export default Rewards;
