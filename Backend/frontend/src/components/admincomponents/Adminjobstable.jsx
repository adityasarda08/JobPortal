import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminjobsTable = ({ search }) => {
  const { alladminjobs } = useSelector((store) => store.jobs);

  const navigate = useNavigate();

  const filteredadminjobs = alladminjobs.filter((job) => {
    return job.company.companyName.toLowerCase().includes(search.toLowerCase());
  });

  if (!alladminjobs) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredadminjobs?.length ?? 0) === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filteredadminjobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.company.companyName}</TableCell>

                <TableCell>{job.title}</TableCell>

                <TableCell>{job.createdAt.split("T")[0]}</TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        <div
                          onClick={() => navigate(`/admin/jobs/add`)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminjobsTable;
