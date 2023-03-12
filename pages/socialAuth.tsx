import Router from "next/router";
import { useEffect, useState } from "react";
import {Global} from '../config/Global';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth0 } from '@auth0/auth0-react'


const sleep = (ms: number | undefined) =>
new Promise((resolve) => setTimeout(resolve, ms));

// CALLBACK FROM AUTH0
export default function socialAuth() {
  const { user, isAuthenticated, isLoading  } = useAuth0();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const init = async () => {
        if(isAuthenticated){
            handleApi();
        } else {
            Router.push("/login");
        }
    }

  const handleApi = () => {
    let email = user?.email;
    if(!email){
      email = user?.sub?.split('facebook|').join('')+'@facebook.com';
    }

    axios.post(Global.url+"auth/verifysocialauth", {
        email: email,
        fullName: user?.name,
        method:'social'
      })
      .then(async (result) => {
        localStorage.setItem("authToken", result.data.responses.token);
        localStorage.setItem("fullName", result.data.responses.user.fullname);
        localStorage.setItem("email", result.data.responses.user.email);
        localStorage.setItem("isVerified", 'true');
        Router.push("/office/home");
      })
      .catch((error) => {
        console.log(error);
        Router.push("/login");
      });
  };

  useEffect(() => {    
    if (!isLoading) init();
  }, [isLoading, isAuthenticated]);
}
