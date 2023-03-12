import axios from 'axios'
import Head from "next/head";
import React, { useEffect, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import { Card } from '../../components/card/card'
import { Pipes } from '../../components/tools/pipes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '../../config/Global'
import Password from '../../components/forms/password'

interface Organization {
  id: string;
  name: string;
  nickName?: any;
  address?: any;
  phone?: any;
  email?: any;
  taxNumber?: any;
  directorID?: any;
  registeredNumber?: any;
  image?: any;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const getToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  const authAxios = axios.create({
    baseURL: Global.url,
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  })

  const [modalEditData, setModalEditData] = useState(false);
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>([])
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isAlphaNumeric, setIsAlphaNumeric] = useState(false)
  const [isSymbol, setIsSymbol] = useState(false)
  const [isLengthMatch, setIsLengthMatch] = useState(false)
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [isLowerCase, setIsLowerCase] = useState(false)
  const [counter, setCounter] = useState(0)
  const [counterLabel, setCounterLabel] = useState('Weak')
  const [progressClass, setProgressClass] = useState('w-0')


  const fetchData = async () => {
    try {
        const userProfile = await authAxios.get(`/users/show`)
        setUserData(userProfile.data.responses)
        setEmail(userProfile.data.responses.email)
        setFullName(userProfile.data.responses.fullname)
      } catch (error) {
      } 
  }

  const handleNewPassword = (e: any) => {
    let pass: string = e.target.value;
    // console.log(pass)
    setNewPassword(e.target.value)
    // console.log(e.target.value)
    let counter1: number = 0;
    let counter2: number = 0;
    let counter3: number = 0;
    let counter4: number = 0;
    let counter5: number = 0;

    if (pass.length >= 8) {
      setIsLengthMatch(true)
      counter1 = 1;
    } else {
      setIsLengthMatch(false)
      counter1 = 0;
    }

    if ((/[a-z]/.test(pass)) && (/[0-9]/.test(pass))) {
      setIsAlphaNumeric(true)
      counter2 = 1;
    } else {
      setIsAlphaNumeric(false)
      counter2 = 0;
    }

    if ((/[A-Z]/.test(pass))) {
      setIsUpperCase(true)
      counter3 = 1;
    } else {
      setIsUpperCase(false)
      counter3 = 0;
    }

    if ((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass))) {
      setIsSymbol(true)
      counter4 = 1;
    } else {
      setIsSymbol(false)
      counter4 = 0;
    }

    if ((/[a-z]/.test(pass))) {
        setIsLowerCase(true)
        counter5 = 1;
      } else {
        setIsLowerCase(false)
        counter5 = 0;
      }

    let total = counter1 + counter2 + counter3 + counter4 + counter5;
    if (total == 1) {
      setProgressClass('w-3/12 bg-[#F7195A]')
      setCounterLabel('Weak')
    } else if (total == 2) {
      setProgressClass('w-6/12 bg-[#F7195A]')
      setCounterLabel('So-so')
    } else if (total == 3) {
      setProgressClass('w-9/12 bg-[#FFBB00]')
      setCounterLabel('Almost')
    } else if (total == 4) {
        setProgressClass('w-9/12 bg-[#FFBB00]')
        setCounterLabel('Almost')
    } else if (total == 5) {
      setProgressClass('w-full bg-[#00C897]')
      setCounterLabel('Perfect!')
    }

    setCounter(total)
  }

  const handleOldPassword = (e: any) => {
    setOldPassword(e.target.value)
  }

  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value)
  }


  const handleSubmitProfile = () => {
    setLoading(true)
    authAxios.post(Global.url+"users/edit", {
        fullName: fullName,
      }).then(async (result) => {
        localStorage.setItem("fullName", result.data.responses.fullname);
        toast.success("Your profile have been saved", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setTimeout(() => {
            window.location.reload()
        }, 1000);

      }).catch((err) => {        
        setModalEditData(false);
        setLoading(false)
        toast.error("Error occured", {
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
  }

  const handleApiChangePassword = () => {

    if(counter < 5){
        toast.error('The new password must follow the conditions', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        return;
    } else if (confirmPassword !== newPassword) {
        toast.error('The new password should be the same with its retyped text', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        return;
    } 

    authAxios.post(Global.url+"users/changePassword", {
      password: oldPassword,
      newPassword: newPassword,
      confirmnewPassword: confirmPassword,
    }).then(async result => {
        toast.success('Password changed succesfully', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          setModalChangePassword(false)

    }).catch(error => {
        toast.error(error.response.data.responses, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      })
  }

  useEffect(() => {
    fetchData(); 
  }, [])

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>AHA - Profile</title> 
      </Head>
      <ToastContainer />
      {/** 3 Widget */}
      <div className='w-full mx-auto'>
        <h5 className="text-2xl font-bold mb-4">My Profile</h5>
        <div className='flex flex-col lg:flex-row md:flex-col sm:flex-col gap-4'>
          <div className='w-full '>
            <Card className='lg:min-h-[29rem]'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col sm:flex-row gap-y-3'>

                    <button className='bg-chroma-lightest rounded-sm py-1 px-2 min-w-fit text-sm self-baseline' 
                    onClick={() => {
                      setModalEditData(true)
                    }}
                    >Edit Data</button>

                  <button className='sm:ml-3 bg-chroma-lightest rounded-sm py-1 px-2 min-w-fit text-sm self-baseline'
                  onClick={() => setModalChangePassword(true)}>
                    Change Password
                  </button>
                </div>
              </div>
              <div className='grid grid-cols-12 border-b border-solid border-b-chroma-disabled gap-x-4 my-8'>
                <div className='col-span-6'>
                  <p className='text-sm text-chroma-darker'>Email Address</p>
                  <p className='text-[16px] font-normal'>{Pipes.emptyChecker(userData?.email)}</p>
                </div>
                <div className='col-span-6'>
                  <p className='text-sm text-chroma-darker'>Fullname</p>
                  <p className='text-[16px] font-normal'>{Pipes.emptyChecker(userData?.fullname)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
        
        {/* MODAL */}
        {modalEditData &&
            <div className='bg-[#0000005a] fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className="absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12">
                <Card className="" padding="p-0">
                <div className="font-bold text-lg text-center border-b border-dotted border-b-chroma-disabled py-5">
                Edit Profile
                </div>
                <div className=" py-5 px-4">
                <div className='w-full'>
                    <form className='block'>
                    <div className='grid  gap-4'>
                        <div className=''>
                            <div className="formInput">
                                <label>Email</label>
                                <input
                                type="text"
                                id='email'
                                disabled
                                value={email}
                                placeholder='Your email'
                                className='border border-solid border-slate-400 rounded-sm py-1 px-2 w-full'
                                />
                            </div>
                        </div>

                        <div className=''>
                            <div className="formInput">
                                <label>Fullname</label>
                                <input
                                type="text"
                                value={fullName}
                                onChange={(e:any) => setFullName(e.target.value)}
                                id='fullname'
                                placeholder='Your fullname'
                                className='border border-solid border-slate-400 rounded-sm py-1 px-2 w-full'
                                />
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
                <div className="text-right border-t border-dotted border-t-chroma-disabled items-center p-4 rounded-md flex flex-row gap-2 justify-end">
                    <button
                    onClick={() => setModalEditData(false)}
                    className="text-base py-1 px-2 font-normal bg-chroma-lightest rounded-md w-fit">
                        Cancel
                    </button>
                    <button
                    onClick={() => handleSubmitProfile()}
                    disabled={loading}
                    className="text-base py-1 px-2 font-normal bg-vin-bright text-white rounded-md w-fit">
                        Save Profile
                    </button>
                </div>
                </Card>
            </div>
            </div>
        }

        {modalChangePassword &&
            <div className='bg-[#0000005a] fixed top-0 left-0 right-0 bottom-0 z-50'>
            <div className="absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/12">
                <Card className="" padding="p-0">
                <div className="font-bold text-lg text-center border-b border-dotted border-b-chroma-disabled py-5">
                Edit Password
                </div>
                <div className=" py-5 px-4">
                    <div className='w-full'>
                        <div>
                        <Password
                            name="oldPassword"
                            placeholder="Enter your old password"
                            label="Old Password"
                            type="password"
                            onKeyUp={handleOldPassword}
                        />
                        <Password
                            name="newPassword"
                            placeholder="Password must meet the requirement below"
                            label="New Password"
                            type="password"
                            onKeyUp={handleNewPassword}
                        />
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className="w-3/12 mt-1">
                                <div className='w-full bg-chroma-disabled h-2' style={{ borderRadius: 4 }}>
                                <div className={progressClass + ' h-2'} style={{ borderRadius: 4 }}></div>
                                </div>
                            </div>

                            <div className="w-9/12 mb-2 mx-4">
                                <p className="text-[16px] -mt-1">{counterLabel}</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col'>                            
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

                        <Password
                        name="confirmPassword"
                        placeholder="Rewrite your password"
                        label="Re-enter New Password"
                        type="password"
                        onKeyUp={handleConfirmPassword}
                        />

                    </div>
                </div>
                <div className="text-right border-t border-dotted border-t-chroma-disabled items-center p-4 rounded-md flex flex-row gap-2 justify-end">
                    <button
                    onClick={() => setModalChangePassword(false)}
                    className="text-base py-1 px-2 font-normal bg-chroma-lightest rounded-md w-fit">
                        Cancel
                    </button>
                    <button
                    onClick={() => handleApiChangePassword()}
                    disabled={loading}
                    className="text-base py-1 px-2 font-normal bg-vin-bright text-white rounded-md w-fit">
                        Save Password
                    </button>
                </div>
                </Card>
            </div>
            </div>
        }
    </BaseLayout>
  )
}

export default Profile
