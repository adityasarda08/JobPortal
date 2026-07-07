import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useSelector, useDispatch } from "react-redux";
import { User_Api } from "../../Utils/data";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../../redux/authslice";
import { Loader2 } from "lucide-react";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skills) => skills),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("phone", input.phone);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.put(`${User_Api}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-125"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <form onSubmit={handleFileChange}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Name" className="text-right">
                    Name
                  </Label>
                  <input
                    type="text"
                    id="Name"
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Email" className="text-right">
                    Email
                  </Label>
                  <input
                    type="email"
                    id="Email"
                    value={input.email}
                    onChange={handleChange}
                    name="email"
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Phone" className="text-right">
                    Phone
                  </Label>
                  <input
                    type="tel"
                    id="Phone"
                    value={input.phone}
                    name="phone"
                    onChange={handleChange}
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Bio" className="text-right">
                    Bio
                  </Label>
                  <input
                    type="text"
                    id="Bio"
                    value={input.bio}
                    onChange={handleChange}
                    name="bio"
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Skills" className="text-right">
                    Skills
                  </Label>
                  <input
                    type="text"
                    id="Skills"
                    value={input.skills}
                    onChange={handleChange}
                    name="skills"
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
                {/* Resume File Upload */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Resume
                  </Label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="border col-span-3 border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Loader2 variant="primary" disabled>
                    Loading...
                  </Loader2>
                ) : (
                  <Button
                    variant="primary"
                    className="bg-black text-white rounded-2xl mx-auto px-6 "
                  >
                    Update Profile
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
