import Head from "next/head";
import Router from "next/router";
import {Global} from '../config/Global';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import loginFormLogo from "../public/assets/images/logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useAuth0 } from '@auth0/auth0-react'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Landing() {
  const { loginWithRedirect, user, isAuthenticated, logout  } = useAuth0();

  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [loading, isLoading]      = useState(false);
  const [tokenUser, setTokenUser] = useState<any>("");
  const buttonLogin = useRef<any>(null)

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      buttonLogin.current?.click()
    }
  } 

  const handleApi = () => {
    isLoading(true)
    axios.post(Global.url+"auth/login", {
        email: username,
        password: password,
      })
      .then(async (result) => {
        localStorage.setItem("authToken", result.data.responses.token);
        localStorage.setItem("fullName", result.data.responses.user.fullname);
        localStorage.setItem("email", result.data.responses.user.email);
        localStorage.setItem("isVerified", result.data.responses.user.isVerified);
        await sleep(1000);

        if(!result.data.responses.user.isVerified){          
          // Redirect to verify_email page if account is not verified
          Router.push("/verify_email");
        } else {
          // Redirect to home page if username and password matched up and account is already verified
          Router.push("/office/home");
        }
        isLoading(false)
        
      })
      .catch((error) => {
        isLoading(false)
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
      const isVerified = await localStorage.getItem("isVerified");
      if ((token && token !== "") && (isVerified && isVerified === "true")) {
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
        <title>AHA Office - Landing Page</title>
      </Head>
      <div className="h-screen w-screen">
        <ToastContainer />
        <div className="grid h-screen w-screen">
        <div className="pt-20 w-full flex flex-row"style={{ backgroundImage: 'url(../assets/images/bg-web.jpg)', backgroundSize:'cover' }}>
            <div className="sm:w-4/12 w-1/12"></div>
            <div className="sm:w-4/12 w-10/12 px-12 bg-[#000] h-fit rounded-lg">
              <form autoComplete="off">
              <div className="flex justify-center">
                  <div className="relative mt-4 w-24 h-24 sm:w-24 sm:h-24 lg:w-24 lg:h-24">
                    <Image
                      src={loginFormLogo}
                      fill
                      alt="Work at AHA"
                      placeholder="blur"
                      sizes="33vw"
                    />
                  </div>
                </div>
                <div className="text-center mt-10 mb-10">


                  <button
                    type="button"
                    onClick={() => Router.push("/login")}
                    className="inline-block w-full px-5 py-2 sm:px-7 sm:py-3 bg-[#FFF] text-black font-bold text-xl leading-snug rounded shadow-md hover:bg-[#ccc] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>


                  
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <h1 className="text-lg text-center font-semibold mx-4 mb-0 text-white">
                      OR
                    </h1>
                  </div>

                  <button
                    type="button"
                    onClick={() => Router.push("/register")}
                    className="inline-block w-full px-5 py-2 sm:px-7 sm:py-3 bg-[#003666] text-white font-bold text-xl leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
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
