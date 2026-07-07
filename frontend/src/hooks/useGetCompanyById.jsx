import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/companyslice";
import { Company_Api } from "@/Utils/data";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${Company_Api}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
