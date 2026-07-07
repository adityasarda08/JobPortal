import Navbar from "../componentlite/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useState } from "react";


const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();

  const [input, setInput] = useState("");

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="filter by company name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/add")}>
            Add Company
          </Button>
        </div>
        <div className="my-5">
          <CompaniesTable search={input}/>
        </div>
      </div>
    </div>
  );
};

export default Companies;
