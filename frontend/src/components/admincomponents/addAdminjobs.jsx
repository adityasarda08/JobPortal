import Navbar from "../componentlite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import axios from "axios";
import { Job_Api } from "@/Utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddAdminJobs = () => {
  const [loading, setloading] = useState(false);
  const [input, setinput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    position: "",
    requirements: "",
    jobType: "",
    experience: "",
  });
  const companies = useSelector((store) => store.company.companies);

  const navigate = useNavigate();

  const changeEventhandler = (e) => {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.companyName.toLowerCase() === value,
    );
    setinput({
      ...input,
      company: selectedCompany ? selectedCompany._id : "",
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`${Job_Api}/Post`, input, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Job added successfully");
        navigate("/admin/jobs");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Job not added");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submithandler}
          action=""
          className="p-8 max-w-4xl border border-gray-500 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                placeholder="Enter description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                placeholder="Enter salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                placeholder="Enter position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Enter jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                placeholder="Enter experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={changeEventhandler}
              />
            </div>

            <div>
              <Label>Company</Label>
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem
                            key={company._id}
                            value={company.companyName.toLowerCase()}
                          >
                            {company.companyName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-sm text-white rounded-md transition
      ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-black hover:bg-blue-700"
      }`}
            >
              {loading ? "Adding Job..." : "Add Job"}
            </button>
          </div>
          {companies.length === 0 && (
            <p className=" text-sm font-bold my-3 text-red-600 text-center">
              *please register a company first to add a job*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAdminJobs;
