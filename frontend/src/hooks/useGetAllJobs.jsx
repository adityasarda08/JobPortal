import { useEffect } from "react";
import axios from "axios";
import { Job_Api } from "../Utils/data";
import { useDispatch } from "react-redux";
import { setalljobs } from "@/redux/jobslice";
import { useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { setSearchQuery } = useSelector((store) => store.jobs);

  useEffect(() => {
    const fetchallJobs = async () => {
      try {
        const res = await axios.get(
          `${Job_Api}/get?KeyWord=${setSearchQuery}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          dispatch(setalljobs(res.data.jobs));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchallJobs();
  }, [dispatch, setSearchQuery]);
}

export default useGetAllJobs;
