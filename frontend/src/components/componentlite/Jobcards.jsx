import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Jobcards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/Description/${job._id}`)}} className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
      <div>
        <h1 className="text-lg font-medium">{job?.company?.companyName}</h1>
        <p className="text-sm text-gray-700">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-700">{job?.description}</p>
      </div>
      <div className="flex flex-row gap-2 items-center mt-4">
        <Badge variant={"ghost"} className="text-black font-bold">
          {job?.position} open Position
        </Badge>
        <Badge className="text-blue-900 font-bold">{job?.salary} LPA</Badge>
        <Badge className="text-orange-300 font-bold">{job?.location}</Badge>
        <Badge className="text-red-900 font-bold">{job?.jobType}</Badge>
      </div>
    </div>
  );
};

export default Jobcards;
