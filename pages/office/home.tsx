import axios from 'axios'
import Head from "next/head";
import React, { useEffect, useState } from 'react'
import { Card } from "../../components/card/card";
import { BaseLayout } from "../../components/layouts";
import Image from "next/image";
import { Global } from '../../config/Global'
import { Pipes } from "../../components/tools/pipes";
import moment from 'moment'
import Icon1 from "../../public/assets/images/icons/audience.png";
import Icon2 from "../../public/assets/images/icons/researcher.png";
import Icon3 from "../../public/assets/images/icons/user-invited.png";

const Home = () => {

  const getToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  const authAxios = axios.create({
    baseURL: Global.url,
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  })

  const [totalSignUp, setTotalSignUp] = useState(0)
  const [totalActiveSession, setTotalActiveSession] = useState(0)
  const [averageSessionWeekly, setAverageSessionWeekly] = useState(0)
  const [userList, setUserList] = useState([])

  const fetchData = async () => {
    try {
        const statitics = await authAxios.get(`/users/statitics`)
        setTotalSignUp(statitics.data.responses.number_of_signup)
        setTotalActiveSession(statitics.data.responses.number_of_activeSessions)
        setAverageSessionWeekly(statitics.data.responses.number_of_avg_activeSessions)
    } catch (error) {
    }

    try {
        const userList = await authAxios.get(`/users/list`)
        setUserList(userList.data.responses)
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchData(); 
  }, [])

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>AHA - Homepage</title> 
      </Head>
      <h1 className="text-2xl font-black mb-6">
        AHA Analytics
      </h1>
      {/* <p className="mb-4">Create, update and edit coupons data.</p> */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={Icon1}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{totalSignUp}</p>
              <h2>Number of Sign Up</h2>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={Icon3}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{totalActiveSession}</p>
              <h2>Active Sessions Today</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.researcher}</p>
            <h2>Researchers</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={Icon2}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{averageSessionWeekly}</p>
              <h2>AVG Active Sessions Last 7 days</h2> 
            </div>
          </div>
        </Card>
      </div>

      
      {/* TABLES */}
      <div className="overflow-x-auto relative mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 tracking-wider">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Fullname
              </th>
              <th scope="col" className="py-3 px-6">
                Registered At
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Login Count
              </th>
              <th scope="col" className="py-3 px-6">
                Last Session
              </th>
            </tr>
          </thead>
          {userList.map((data:any, index) => {
              return (
                <tbody key={data.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.strLimiter(data.email)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {Pipes.strLimiter(data.fullname)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {moment(data.createdAt).format("YYYY/MM/DD kk:mm:ss")}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      {data.loginCount}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                    {moment(data.lastlogin).format("YYYY/MM/DD kk:mm:ss")}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

    </BaseLayout>
  );
};

export default Home;
