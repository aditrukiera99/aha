import axios from "axios";
import { type } from "os";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type EditVendor = {
  name: string;
  vendorId: string;
};

export default function EditVendor(props: EditVendor) {
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const authAxios = axios.create({
    baseURL: "https://app.vinprotocol.com/api/v1/user-office/vendors",
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
  } = useForm<EditVendor>();
  const onSubmit: SubmitHandler<EditVendor> = async (data) => {
    // check payload before submit
    // console.log(data.point);
    // console.log(data.point);
    // return;

    const payload: EditVendor = data as unknown as EditVendor;
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
        // setModalState(false);
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
    // setLoading(false);
  };

  console.log(props.name);
  return (
    <div>
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
                  Vendor Id
                </label>
                <input
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  {...register("vendorId", {
                    required: "*Vendor id is required",
                  })}
                  disabled
                />
                <p className="text-sm text-red-600 italic">
                  {errors.vendorId?.message}
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3 space-y-2">
                <label
                  htmlFor="last-name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  className="mt-1 block w-full rounded-md border p-1 shadow-sm focus:outline-gray-500 sm:text-sm"
                  type="number"
                  {...register("name", {
                    required: "*Name is required",
                  })}
                />
                <p className="text-sm text-red-600 italic">
                  {errors.name?.message}
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
    </div>
  );
}
