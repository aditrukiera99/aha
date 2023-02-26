import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type AddCoupon = {
  vendorId: string;
  couponName: string;
  couponDesc: string;
  couponExpiredAt: string;
  couponPrice: number;
  couponTerm: string;
};

export default function AddCoupon() {
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
  const onSubmit: SubmitHandler<AddCoupon> = (data) => {
    console.log(data);
    return;
    authAxios
      .post("/create", data)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(watch("name"));
    // console.log(watch("address"));
    // console.log(errors, "errors");
  };

  return (
    <div className="sm:w-[500px]">
      <form
        className="mt-2"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="overflow-hidden">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid gap-2">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Vendor
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  placeholder="vendor id"
                  {...register("vendorId", {
                    required: "*vendor id is required",
                  })}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  placeholder="Coupon name"
                  {...register("couponName", {
                    required: "*Coupon Name is required",
                  })}
                />
                <p className="text-sm text-red-600 italic">
                  {errors.couponName?.message}
                </p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Description
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  placeholder="Coupon description"
                  {...register("couponDesc", {
                    required: "*Coupon description is required",
                  })}
                />
                <p className="text-sm text-red-600 italic">
                  {errors.couponDesc?.message}
                </p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Price
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  placeholder="Coupon price"
                  {...register("couponPrice", {
                    required: "*Coupon price is required",
                    valueAsNumber: true,
                  })}
                />
                <p className="text-sm text-red-600 italic">
                  {errors.couponPrice?.message}
                </p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coupon Term
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  placeholder="Coupon term"
                  {...register("couponTerm", {
                    required: "*Address is required",
                  })}
                />
                <p className="text-sm text-red-600 italic">
                  {errors.couponTerm?.message}
                </p>
              </div>
            </div>
            {/* <div className="grid grid-cols-6 mt-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Vendor Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-48 w-full overflow-hidden rounded-sm bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="space-y-2">
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Change Image
                  </label>
                  <div className="relative">
                    <input
                      {...register("logo")}
                      type="file"
                      className="w-full rounded-md border border-form-stroke p-1 text-[#929DA7] outline-none transition file:mr-4 file:rounded file:border-[.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-[10px] file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                    />
                  </div>
                </div>
                <p className="text-gray-400 text mt-4">*max file size 2MB</p>
                <p className="text-gray-400 text">*png,jpg file</p>
              </div>
            </div> */}
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <input
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent  bg-primary-blue-1 hover:bg-primary-blue-2 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
