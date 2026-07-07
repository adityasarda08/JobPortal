import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setallappliedjobs } from "../redux/jobslice";
import { Application_Api } from "../Utils/data.js";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchappliedjobs = async () => {
      try {
        const res = await axios.get(`${Application_Api}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setallappliedjobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchappliedjobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
