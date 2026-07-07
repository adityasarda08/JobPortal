import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { GiPostOffice } from "react-icons/gi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";

function Header() {
  const [query, setquery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobhandler =()=> {
    dispatch(setSearchQuery(query))
    navigate("/Browse")
  }
  return (
    <div>
      <div className=" text-center ">
        <div className="flex flex-col gap-5 my-10 ">
          <h2 className="px-4 py-2 rounded-full bg-gray-200 text-red-600 font-medium mx-auto flex items-center gap-2 w-max">
            <GiPostOffice className=" text-black"/>
            <span> No.1 Job Portal</span>
          </h2>
          <h2 className="text-5xl font-bold mt-4">
            Search Apply & <br />
            Get Your <span className="text-[#6B3AC2]">Dream Job</span>
          </h2>
          <p>
            Start your career Hunt with us!, find the perfect opportunity for
            you <br /> and get Hired Quickly{" "}
          </p>

          <div className="flex items-center w-[40%] shadow-lg border border-gray-300 rounded-full mx-auto gap-4">
            <input
            onChange={(e) => setquery(e.target.value)}
              type="text"
              placeholder="Search for jobs, companies, and more..."
              className="border-none outline-none  w-full px-4 py-2"
            />
            <Button onClick = {searchjobhandler} className="rounded-r-full">
              <Search className="w-5 h-5 *:" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
