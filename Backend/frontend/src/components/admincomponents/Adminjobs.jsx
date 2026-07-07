import Navbar from "../componentlite/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminjobsTable from "./Adminjobstable";
import useGetAlladminjobs from "@/hooks/useGetAlladminjobs";


const Adminjobs = () => {
  const navigate = useNavigate();
  useGetAlladminjobs();
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
          <Button onClick={() => navigate("/admin/jobs/add")}>
            Post New Jobs
          </Button>
        </div>
        <div className="my-5">
          < AdminjobsTable search={input} />
        </div>
      </div>
    </div>
  );
};

export default Adminjobs;
