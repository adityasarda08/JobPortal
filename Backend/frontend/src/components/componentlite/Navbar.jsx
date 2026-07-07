import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { User_Api } from "../../Utils/data";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../../redux/authslice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${User_Api}/logout`, null, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logged out successfully");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to logout");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#6B3AC2]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Home">Home</Link>{" "}
                </li>
                <li>
                  <Link to="/Browse">Browse Jobs</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  variant="outline"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.ProfilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="profile"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 items-center space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.ProfilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="profile"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user?.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Link to="/Profile">
                        <Button variant="Link">view Profile</Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="Link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
