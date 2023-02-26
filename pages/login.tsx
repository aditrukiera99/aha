import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import loginLogo from "../public/assets/images/bglogin.png";
import loginFormLogo from "../public/assets/images/logo-blue.png";
import { toast, ToastContainer } from "react-toastify";

const sleep = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Login() {
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  // Redirect to home if logged in
  if (getToken !== null) {
    Router.push("/office/home");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tokenUser, setTokenUser] = useState<any>("");

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleApi = () => {
    axios
      .post("https://app.vinprotocol.com/api/v1/user-office/login-admin", {
        username: username,
        password: password,
      })
      .then(async (result) => {
        localStorage.setItem("authToken", result.data.data.token);
        localStorage.setItem("fullName", result.data.data.user.fullName);
        await sleep(3000);
        // Redirect to home if username and password matched up
        Router.push("/office/home");
      })
      .catch((error) => {
        toast.error("Invalid username and/or password", {
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
  };

  useEffect(() => {
    async function init() {
      const token = await localStorage.getItem("authToken");
      if (token && token !== "") {
        setTokenUser(token);
        // Redirect to home if logged in
        Router.push("/office/home");
      } else {
        setTokenUser("");
      }
    }
    init();
  }, []);

  return (
    <>
      <Head>
        <title>Vin Office - Login</title>
      </Head>
      <div className="h-screen w-screen">
        <ToastContainer />
        <div className="grid sm:grid-cols-2 h-screen w-screen">
          <div className="grid bg-[#1e12ad] content-center">
            <div className="mx-auto max-w-sm lg:max-w-md text-center text-chroma-white lg:text-2xl p-4">
              <div className="relative w-72 h-48 md:w-auto md:h-72 object-cover mx-auto">
                <Image
                  src={loginLogo}
                  fill
                  alt="Vin Protocol"
                  placeholder="blur"
                />
              </div>
              <h2>
                The first Indonesia blockchain technology solution for data
                &amp; survey
              </h2>
            </div>
          </div>
          <div className="grid bg-chroma-white-2 content-center">
            <div className="mx-auto xl:max-w-xs py-5">
              <form autoComplete="off">
                <div className="flex justify-center">
                  <div className="relative w-24 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24">
                    <Image
                      src={loginFormLogo}
                      fill
                      alt="Vin Protocol"
                      placeholder="blur"
                      sizes="33vw"
                    />
                  </div>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <h1 className="text-lg text-center font-semibold mx-4 mb-0">
                    LOGIN
                  </h1>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    className="form-control block w-full px-3 py-0.5 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="form-control block w-full px-3 py-0.5 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleApi()}
                    disabled={!username || !password ? true : false}
                    className="inline-block px-5 py-2 sm:px-7 sm:py-3 bg-[#1e12ad] text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
