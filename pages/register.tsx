import Head from "next/head";
import {Global} from '../config/Global';
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import loginFormLogo from "../public/assets/images/logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useAuth0 } from '@auth0/auth0-react'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const sleep = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Login() {
  const { loginWithRedirect, user, isAuthenticated, logout  } = useAuth0();
  const getToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const getVerified = typeof window !== "undefined" ? localStorage.getItem("isVerified") : null;
  // Redirect to home if logged in
  if (getToken !== null && getVerified == "true") {
    Router.push("/office/home");
  }

  const [loading, isLoading]   = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenUser, setTokenUser] = useState<any>("");
  const [isAlphaNumeric, setIsAlphaNumeric] = useState(false)
  const [isSymbol, setIsSymbol] = useState(false)
  const [isLengthMatch, setIsLengthMatch] = useState(false)
  const [isLowerCase, setIsLowerCase] = useState(false)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [counter, setCounter] = useState(0)
  const [counterLabel, setCounterLabel] = useState('Weak')
  const [progressClass, setProgressClass] = useState('w-0')

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleFullname = (e: any) => {
    setFullname(e.target.value);
  };

  const handlePassword = (e:any) => {
    let pass:string = e.target.value;
    setPassword(e.target.value)
    let counter1:number = 0;
    let counter2:number = 0;
    let counter3:number = 0;
    let counter4:number = 0;
    let counter5:number = 0;
    if (pass.length >= 8){
      setIsLengthMatch(true)
      counter1 = 1;
    } else {
      setIsLengthMatch(false)
      counter1 = 0;
    }
    
    if ((/[a-z]/.test(pass)) && (/[0-9]/.test(pass))){
      setIsAlphaNumeric(true)
      counter2 = 1;
    } else {
      setIsAlphaNumeric(false)
      counter2 = 0;
    }

    if ((/[A-Z]/.test(pass))){
      setIsUpperCase(true)
      counter3 = 1;
    } else {
      setIsUpperCase(false)
      counter3 = 0;
    }
      
    if ((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass))){
      setIsSymbol(true)
      counter4 = 1;
    } else {
      setIsSymbol(false)
      counter4 = 0;
    }

    if ((/[a-z]/.test(pass))){ 
        setIsLowerCase(true)
        counter5 = 1;
      } else {
        setIsLowerCase(false)
        counter5 = 0;
      }

    let total = counter1 + counter2 + counter3 + counter4 + counter5;
    if(total == 1){
      setProgressClass('w-3/12 bg-[#F7195A]')
      setCounterLabel('Weak')
    } else if(total == 2){
      setProgressClass('w-6/12 bg-[#F7195A]')
      setCounterLabel('So-so')
    } else if(total == 3){
      setProgressClass('w-9/12 bg-[#FFBB00]')
      setCounterLabel('Almost')
    } else if(total == 4){
      setProgressClass('w-9/12 bg-[#FFBB00]')
      setCounterLabel('Almost')
    } else if(total == 5){
      setProgressClass('w-full bg-[#00C897]')
      setCounterLabel('Perfect!')
    }

    setCounter(total)
  }

  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value);
  };

  const handleApi = () => {
    isLoading(true)
    axios.post(Global.url+"auth/register", {
        email: username,
        password: password,
        repassword:password2,
        fullName:fullname,
        method:'manual'
      })
      .then(async (result) => {
        localStorage.setItem("authToken", result.data.responses.token);
        localStorage.setItem("email", username);
        localStorage.setItem("fullName", fullname);
        localStorage.setItem("isVerified", 'false');
        await sleep(1000);
        // Redirect verification email page
        Router.push("/verify_email");
      })
      .catch((error) => {
        isLoading(false)
        toast.error(error.response.data.responses, {
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
        <title>AHA Office - Signup</title>
      </Head>
      <div className="h-screen bg-[#000]">
        <ToastContainer />
        <div className="h-screen">
        <div className="w-full flex flex-row py-10" style={{ backgroundImage: 'url(../assets/images/bg-web.jpg)', backgroundSize:'cover' }}>
            <div className="sm:w-4/12 w-1/12"></div>
            <div className="sm:w-4/12 w-10/12 px-12 bg-[#fff] h-fit rounded-lg">
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
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <h1 className="text-lg text-center font-semibold mx-4 mb-0">
                    SIGN UP
                  </h1>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={handleFullname}
                    className="form-control block w-full px-3 py-2 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Your fullname"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    className="form-control block w-full px-3 py-2 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="form-control block w-full px-3 py-2 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                
                {password.length > 0 &&
                <>
                <div className='w-full flex flex-row'>
                    <div className="w-11/12 mt-3">
                        <div className='w-full bg-chroma-disabled h-2' style={{borderRadius:4}}>
                        <div className={progressClass+' h-2'} style={{borderRadius:4}}></div>
                        </div>
                    </div>

                    <div className="w-9/12 mb-2 mx-4 mt-2">
                    <p className="text-[16px] -mt-1">{counterLabel}</p>
                    </div>
                </div>

                <div className='w-10/12 flex flex-col'>
                    <div className="w-full mb-2 flex flex-row">
                    <span className={isLowerCase?'bg-vin-bright w-4 h-4 rounded-full':'bg-chroma-disabled w-4 h-4 rounded-full'}></span>
                    <p className="text-[16px] mx-2 -mt-1">contains at least one lower character .</p>
                    </div>

                    <div className="w-full mb-2 flex flex-row">
                    <span className={isUpperCase?'bg-vin-bright w-4 h-4 rounded-full':'bg-chroma-disabled w-4 h-4 rounded-full'}></span>
                    <p className="text-[16px] mx-2 -mt-1">contains at least one upper character </p>
                    </div>

                    <div className="w-full mb-2 flex flex-row">
                    <span className={isAlphaNumeric?'bg-vin-bright w-4 h-4 rounded-full':'bg-chroma-disabled w-4 h-4 rounded-full'}></span>
                    <p className="text-[16px] mx-2 -mt-1">contains at least one digit character</p>
                    </div>

                    <div className="w-full mb-2 flex flex-row">
                    <span className={isSymbol?'bg-vin-bright w-4 h-4 rounded-full':'bg-chroma-disabled w-4 h-4 rounded-full'}></span>
                    <p className="text-[16px] mx-2 -mt-1">contains at least one special character</p>
                    </div>                    

                    <div className="w-full mb-2 flex flex-row">
                    <span className={isLengthMatch?'bg-vin-bright w-4 h-4 rounded-full':'bg-chroma-disabled w-4 h-4 rounded-full'}></span>
                    <p className="text-[16px] mx-2 -mt-1">contains at least 8 characters</p>
                    </div>

                </div>
                </>}
                
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={handlePassword2}
                    className="form-control block w-full px-3 py-2 lg:px-4 lg:py-1 lg:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Re-enter your password"
                  />
                </div>

                <div className="text-center">
                  {!loading &&
                  <button
                    type="button"
                    onClick={() => handleApi()}
                    disabled={!username || !password || !fullname || !password2 ? true : false || loading}
                    className="inline-block w-full px-5 py-2 sm:px-7 sm:py-3 bg-[#0072DD] text-white font-medium text-xl leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Continue
                  </button>}

                  {loading &&
                  <button
                    type="button"
                    disabled={true}
                    className="inline-block w-full px-5 py-2 sm:px-7 sm:py-3 bg-[#666] text-white font-medium text-xl leading-snug rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Continue ...
                  </button>}
                  
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <h1 className="text-lg text-center font-semibold mx-4 mb-0">
                      OR
                    </h1>
                  </div>

                  <div className="">
                    <GoogleLoginButton 
                      onClick={() => loginWithRedirect({authorizationParams: {connection: "google-oauth2"}})}
                      text="Sign Up with Google"
                    />
                  </div>

                  <div className="my-4">
                    <FacebookLoginButton 
                      onClick={() => loginWithRedirect({authorizationParams: {connection: "facebook"}})} 
                      text="Sign Up with Facebook
                    "/>                  
                  </div>
                </div>
              </form>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}
