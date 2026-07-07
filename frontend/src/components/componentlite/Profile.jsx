import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJob from "./Appliedjob";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const haveresume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  useGetAllAppliedJobs();

  return (
    <div>
      <Navbar />
      <div
        className="max-w-7xl mx-auto bg-White border  border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400
        hover:shadow-amber-400 "
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src={ user?.profile?.ProfilePhoto || "https://github.com/shadcn.png"} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.name}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>
              <a href={`tel:${user?.phone}`}>{user?.phone}</a>
            </span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex gap-2 my-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="bg-black text-white px-2 py-1">
                    {item}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Resume</Label>
            <div>
              {haveresume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  className="text-blue-500 hover:underline"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>No resume found</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
        <AppliedJob />

        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
