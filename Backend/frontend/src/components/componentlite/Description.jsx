import { useParams } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Job_Api } from "@/Utils/data";
import { setSinglejob } from "@/redux/jobslice";
import { toast } from "sonner";
import { Application_Api } from "@/Utils/data";

const Description = () => {
  const params = useParams();
  const jobid = params.id;
  const Singlejob = useSelector((state) => state.jobs.singleJob);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const isInitiallyApplied =
    Singlejob?.applications?.some(
      (application) => application.applicant?._id === user?.id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${Application_Api}/apply/${jobid}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatesinglejob = {
        ...Singlejob,
        applications: [
          ...(Singlejob?.applications || []),
          {
            applicant: {
              _id: user.id,
            },
          },
        ],
      };

      dispatch(setSinglejob(updatesinglejob));

      console.log(res.data);
      toast.success(res.data.message);
      } else {
        alert("Application Failed");
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchsingleJobs = async () => {
      setloading(true);
      seterror(null);
      try {
        const res = await axios.get(`${Job_Api}/get/${jobid}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSinglejob(res.data.job));
          const alreadyApplied = res.data.job.applications.some(
            (application) => application.applicant?._id === user?.id,
          );
          setIsApplied(alreadyApplied);
        } else {
          seterror("failed to fetch job");
        }
      } catch (error) {
        console.error("Fetch Error :", error);
        seterror(error.message || "An Error Occurred");
      } finally {
        setloading(false);
      }
    };
    fetchsingleJobs();
  }, [dispatch, jobid, user?.id]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl">{Singlejob?.title}</h1>
            <div className="flex flex-row gap-2 items-center mt-4">
              <Badge variant={"ghost"} className=" text-black font-bold">
                {Singlejob?.position}
              </Badge>
              <Badge className=" text-blue-900 font-bold">
                {Singlejob?.salary} LPA
              </Badge>
              <Badge className=" text-orange-300 font-bold">
                {Singlejob?.location}
              </Badge>
              <Badge className=" text-red-900 font-bold ">
                {Singlejob?.jobType}
              </Badge>
            </div>
          </div>

          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#6B3AC2]"}`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-bold py-4">
          {Singlejob?.description}
        </h1>
        <div>
          <h1 className="font-bold my-1">
            Role :
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.position}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location :
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary :
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience :
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.experience} years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job Type :
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Post Date:
            <span className="pl-4 font-normal text-gray-800">
              {Singlejob?.createdAt?.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
