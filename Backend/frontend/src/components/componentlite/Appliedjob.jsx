import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { useSelector } from "react-redux";

const Appliedjob = () => {
  const { allappliedjobs } = useSelector((store) => store.jobs);

  

  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allappliedjobs && allappliedjobs.length > 0 ? (
            allappliedjobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{item.job?.title}</TableCell>
                <TableCell>{item.job?.company?.companyName}</TableCell>
                <TableCell className="text-right">
                  <Badge className="text-white bg-black p-1 rounded capitalize">
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No applied jobs yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appliedjob;
