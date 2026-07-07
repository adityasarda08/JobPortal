import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companyslice";
import { Company_Api } from "@/Utils/data";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${Company_Api}/getall`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
