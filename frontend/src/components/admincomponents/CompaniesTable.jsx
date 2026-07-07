import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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

const CompaniesTable = ({ search }) => {
  const companies = useSelector((store) => store.company.companies);
  

  const navigate = useNavigate();


  const filteredcompanies = companies.filter((company) => {
    return company.companyName.toLowerCase().includes(search.toLowerCase());
  });

  if (!companies) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredcompanies?.length ?? 0) === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filteredcompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt="company logo" />
                  </Avatar>
                </TableCell>

                <TableCell>{company.companyName}</TableCell>

                <TableCell>{company.createdAt.split("T")[0]}</TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-32">
                        <div onClick = {() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
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

export default CompaniesTable;
