import Head from "next/head";
import { Card } from "../../components/card/card";
import { BaseLayout } from "../../components/layouts";
import Image from "next/image";
import totalSurveysIcon from "../../public/assets/images/icons/total-survey.png";
import totalAudiencesIcon from "../../public/assets/images/icons/audience.png";
import totalResearchers from "../../public/assets/images/icons/researcher.png";
import totalUserInvited from "../../public/assets/images/icons/user-invited.png";
import totalUserPending from "../../public/assets/images/icons/users-pending.png";
import totalUserVerified from "../../public/assets/images/icons/users-verified.png";
import pointUsed from "../../public/assets/images/icons/token-used.png";
import pointEarned from "../../public/assets/images/icons/token-earned.png";
import totalResponses from "../../public/assets/images/icons/response.png";
import useAnalytics from "../../hooks/useAnalytics";
import { Pipes } from "../../components/tools/pipes";
import useCurrentDate from "../../hooks/useCurrentDate";
import IconCalendar from "../../public/icons/icon-calendar";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const firstDay = moment().startOf("month").format("YYYY-MM-DD");
const endDay = moment().endOf("month").format("YYYY-MM-DD");

// console.log("end day", endDay);

const Home = () => {
  const { currentDate } = useCurrentDate();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { analytics, reFetch } = useAnalytics(`/statistic`);

  // console.log(analytics);

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // console.log("First date", firstDay);
  // console.log(
  //   Pipes.dateYMDWithDashed(startDate),
  //   Pipes.dateYMDWithDashed(endDate)
  // );

  // useQuery

  return (
    <BaseLayout parent="/office" layout="withHeader">
      <Head>
        <title>Vin Admin - Homepage</title>
      </Head>
      <h1 className="text-2xl font-black mb-6">
        Vin Analytics - {Pipes.dateMY(currentDate)}
      </h1>
      {/* <p className="mb-4">Create, update and edit coupons data.</p> */}

      <div className="flex-row flex w-full gap-4">
        <div className="sm:w-3/12 w-full">
          {/* <DateTime name="datetime" placeholder="All time" onChange={console.log()} /> */}
          <div className="mb-4 flex gap-3">
            <div className="relative">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                className="w-full border rounded-md border-grey placeholder:text-neutral-400 px-3 py-1.5 pr-10 text-secondary"
                selected={startDate}
                onChange={onChangeDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Select date"
              />
              <button
                onClick={() =>
                  reFetch(
                    `/statistic/startdate=${startDate || firstDay}&enddate=${
                      endDate || endDay
                    }`
                  )
                }
                className="border-0 bg-transparent text-neutral-400 absolute top-2.5 right-3"
              >
                {<IconCalendar />}
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                reFetch(
                  `/statistic/startdate=${startDate || firstDay}&enddate=${
                    endDate || endDay
                  }`
                )
              }
              className="inline-block p-2 bg-primary-blue-1 hover:bg-primary-blue-2 text-white font-medium text-sm leading-snug rounded shadow-md active:shadow-lg transition duration-150 ease-in-out"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalAudiencesIcon}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.respondent}</p>
              <h2>Audiences</h2>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalResearchers}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.researcher}</p>
              <h2>Researchers</h2>
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
                src={totalSurveysIcon}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.survey}</p>
              <h2>Surveys</h2>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalResponses}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.response}</p>
              <h2>Responses</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.response}</p>
            <h2>Responses</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={pointEarned}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.pointEarned}</p>
              <h2>Point Earned</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.pointEarned}</p>
            <h2>Point Earned</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={pointUsed}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.pointUsed}</p>
              <h2>Point Used</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.pointUsed}</p>
            <h2>Point Used</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalUserInvited}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.userInvited}</p>
              <h2>User Invited</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.userInvited}</p>
            <h2>User Invited</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalUserVerified}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.userVerified}</p>
              <h2>User Verified</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.userInvited}</p>
            <h2>User Invited</h2>
          </div> */}
        </Card>
        <Card>
          <div className="flex gap-3 lg:gap-8 justify-center">
            <div className="flex justify-center items-center">
              <Image
                src={totalUserPending}
                placeholder="blur"
                alt="image"
                width="48"
                height="48"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{analytics?.userPending}</p>
              <h2>User Pending</h2>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{analytics?.userInvited}</p>
            <h2>User Invited</h2>
          </div> */}
        </Card>
      </div>

      {/* <div className="flex justify-end mt-4">
        <button
          type="button"
          // onClick={() => toggleAddModal()}
          className="inline-block p-2 bg-primary-blue-1 hover:bg-primary-blue-2 text-white font-medium text-sm leading-snug rounded shadow-md active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Survey
        </button>
      </div> */}
    </BaseLayout>
  );
};

export default Home;
