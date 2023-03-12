import Head from "next/head";
import { useRouter} from 'next/router'
import Router from "next/router";
import {Global} from '../config/Global';
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

const sleep = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Activation() {

  const routers = useRouter()
  
  const verifyUser = async (code:any, email:any) => {
    axios.post(Global.url+"auth/verifyemail", {
        email: email,
        code: code,
      })
      .then(async (result) => {
        localStorage.setItem("authToken", result.data.responses.token);
        localStorage.setItem("fullName", result.data.responses.user.fullname);
        localStorage.setItem("email", result.data.responses.user.email);
        localStorage.setItem("isVerified", 'true');
        // Redirect home if verification is success       
        Router.push("/office/home");
      }) .catch((error) => {
        console.log(error)
        toast.error("Account verification failed", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true, 
            draggable: true,
            progress: undefined,
            theme: "colored", 
        });
        // Router.push("/login");
      });
  }

  useEffect(() => {
    const code = routers.query.verifycode;
    const email = routers.query.email;
    if(code && email){
      verifyUser(code, email)
    } 
  });

  return (
    <>
        <Head>
            <title>AHA Office - Account Activation</title>
        </Head>
        <div className="h-screen bg-[#000]">
        <ToastContainer />
        <div className="h-screen"></div>
        </div>
    </>
  );
}
