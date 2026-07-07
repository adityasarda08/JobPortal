import Navbar from "../componentlite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { User_Api } from "../../Utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoding } from "../../redux/authslice";
import { useEffect } from "react";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoding(true));
      const res = await axios.post(`${User_Api}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
      finally {
        dispatch(setLoding(false));
      }
  };

   const { user } = useSelector((store) => store.auth);
  
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto py-10">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
          <div className="my-2">
            <Label>Name</Label>
            <Input
              type="text"
              value={input.name}
              onChange={changeEventHandler}
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="my-2">
            <Label>Phone</Label>
            <Input
              type="tel"
              value={input.phone}
              onChange={changeEventHandler}
              name="phone"
              placeholder="Enter your phone number "
            />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r1"
                  value="Student"
                  name="role"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  id="r2"
                  value="Employer"
                  checked={input.role === "Employer"}
                  onChange={changeEventHandler}
                  name="role"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Employer</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label >Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <button className="block w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md">
              Register
            </button>
          )}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
