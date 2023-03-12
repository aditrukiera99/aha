import Head from "next/head";
import Router from "next/router";
import {Global} from '../config/Global';
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import Button from '../components/forms/button';

const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));
const getToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
const getEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;
const getVerified = typeof window !== "undefined" ? localStorage.getItem("isVerified") : null;

export default function Verify_email() {
  
  // Redirect to home if logged in
  if (getToken !== null && getVerified == "true") { 
    Router.push("/office/home");
  }

  const [tokenUser, setTokenUser] = useState<any>("");
  const [emailUser, setEmailUser] = useState<any>("");
  const [timeLeft, setTimeLeft] = useState(0);
  
  const resendEmail = () => {
    axios.post(Global.url+'auth/resend-verification-link', {
      token: getToken
    }).then(result => {
      toast.success('Verification email sent', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
      setTimeLeft(60)
    }).catch(error => {
      setTimeLeft(60)
    })
  }

  useEffect(() => {
    async function init() {
      const token = await localStorage.getItem("authToken");
      const email = await localStorage.getItem("email");
      if (token && token !== "") {
        setTokenUser(token);
      } else {
        setTokenUser("");
      }

      if (email && email !== "") {
        setEmailUser(email);
      } else {
        setEmailUser("");
      }
    }
    init();
  }, []);

  useEffect(() => {
    if(timeLeft===0){
       setTimeLeft(0)
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      <Head>
        <title>AHA Office - Verify Email</title>
      </Head>
      <div className="h-screen w-screen">
        <ToastContainer />
        <div className="grid h-screen w-screen">
        <div className="bg-[#000] pt-20 w-full flex flex-row">
            <div className="sm:w-4/12 w-1/12"></div>
            <div className="sm:w-4/12 w-10/12 px-12 bg-[#fff] h-fit rounded-lg">
                <div className="flex justify-center">
                  <div className="relative mt-4 w-24 h-24 sm:w-24 sm:h-24 lg:w-24 lg:h-24">
                    <Image
                      src="/assets/images/check-image.png" 
                      fill
                      alt="Work at AHA"
                      sizes="33vw"
                    />
                  </div>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <h1 className="text-lg text-center font-semibold mx-4 mb-0">
                  You’re ready now
                  </h1>
                </div>

                <div className="flex flex-col items-center justify-center">    
                    <p className="pb-3 text-center">Please check your email and activate your account.</p>
                </div>

                <div className='flex flex-col items-center justify-center pb-8'>
                    <Button
                        className="mt-2  w-full"
                    >
                        Verification email has been sent to : {'\n'} {emailUser}
                    </Button>

                    <p>Not receiving the email ?</p>
                    <p>Check your spam folder or 
                        {timeLeft > 0 &&
                        <b className='cursor-pointer'> resend verification email ({timeLeft}s)</b>}

                        {timeLeft === 0 &&
                        <b className='cursor-pointer' style={{color:'#00205b'}} onClick={() => resendEmail()}> resend verification email</b>}
                    </p>

                </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
