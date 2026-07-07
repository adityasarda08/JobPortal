import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job1 = ({ job }) => {
  const navigate = useNavigate();


  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const diff = currentTime.getTime() - createdAt.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          {daysAgo(job?.createdAt) == 0
            ? "today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full " size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 rounded-full" size="icon" variant="outline">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="company logo" />
          </Avatar>
        </Button>

        <div>
          <h1 className="text-lg font-medium">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-700">India</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-700">{job?.description}</p>
      </div>
      <div className="flex flex-row gap-1.5 items-center mt-4 flex-nowrap overflow-x-auto scrollbar-hide">
        <Badge className="bg-gray-100 text-gray-800 font-semibold text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {job?.position} opnen Position
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 font-semibold text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {job?.salary} LPA
        </Badge>
        <Badge className="bg-orange-100 text-orange-600 font-semibold text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {job?.location}
        </Badge>
        <Badge className="bg-red-100 text-red-700 font-semibold text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {job?.jobType}
        </Badge>
      </div>
      <div className="flex gap-2 items-center mt-4 flex-wrap">
        <Button
          onClick={() => navigate(`/Description/${job._id}`)}
          variant="outline"
          className="rounded-sm font-bold text-blue-700 flex-1 min-w-0"
        >
          Details
        </Button>
        <Button
          variant="outline"
          className="rounded-sm font-bold text-red-700 flex-1 min-w-0"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
