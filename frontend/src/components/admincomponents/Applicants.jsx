import { useEffect } from "react";
import Navbar from "../componentlite/Navbar";
import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "../ui/table";
import axios from "axios";
import { Application_Api } from "../../Utils/data";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setApplications } from "../../redux/applicationslice";
import { useSelector } from "react-redux";

const status = ["Accepted", "Rejected"];

const Applicants = () => {
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();

  const { applications } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchapplicants = async () => {
      try {
        const res = await axios.get(`${Application_Api}/${id}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplications(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchapplicants();
  }, [id, dispatch]);

  const statushandler = async (status, id) => {
    console.log("status", status, id);
    try {
      const res = await axios.post(
        `${Application_Api}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-boldtext-xl my-10">Applicants</h1>
        <div>
          <Table>
            <TableCaption>List of your recent applied users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Applied on</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(applications?.length ?? 0) === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No applicants yet
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>{application.applicant?.name}</TableCell>
                    <TableCell>{application.applicant?.email}</TableCell>
                    <TableCell>{application.applicant?.phone}</TableCell>
                    <TableCell>
                      {application.applicant?.profile?.resume ? (
                        <a
                          href={application.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {"View Resume"}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {application.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreHorizontal className="cursor-pointer ml-auto" />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 px-1">
                          {status.map((s, index) => {
                            return (
                              <div
                                onClick={() =>
                                  statushandler(s, application._id)
                                }
                                key={index}
                                className="flex gap-1  items-center  cursor-pointer"
                              >
                                <input type="radio" name="status" value={s} />
                                {s}
                              </div>
                            );
                          })}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
