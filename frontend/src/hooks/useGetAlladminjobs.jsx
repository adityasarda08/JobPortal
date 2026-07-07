import { useEffect } from "react";
import axios from "axios";
import { Job_Api } from "../Utils/data";
import { useDispatch } from "react-redux";
import { setalladminjobs } from "@/redux/jobslice";

function useGetAlladminjobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchalladminJobs = async () => {
      try {
        const res = await axios.get(`${Job_Api}/adminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setalladminjobs(res.data.jobs));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchalladminJobs();
  }, [dispatch]);
}

export default useGetAlladminjobs;
