import { useNavigate } from "react-router-dom";
import Navbar from "../componentlite/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { Company_Api } from "../../Utils/data";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCompany } from "../../redux/companyslice";

const Addcompanies = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `${Company_Api}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(res.data);
      if (res.data.success) {
        dispatch(setCompany(res.data.company));
        toast.success(res.data.message || "Company registered successfully");
        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <div className="my-10">
          <h1 className="text-2xl font-bold"> Company Name</h1>
          <p className="text-gray-500">company Description</p>
        </div>
        <Label>Company Name</Label>
        <input
          type="text"
          className="my-2 w-full"
          placeholder="company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-centre gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            cancel
          </Button>
          <Button onClick={registerCompany}>continue</Button>
        </div>
      </div>
    </div>
  );
};

export default Addcompanies;
