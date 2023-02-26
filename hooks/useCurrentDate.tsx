import { useEffect, useState } from "react";
import moment from "moment";

function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let currentDate = moment().toISOString();
    setCurrentDate(currentDate);
  }, []);
  return { currentDate };
}

export default useCurrentDate;
