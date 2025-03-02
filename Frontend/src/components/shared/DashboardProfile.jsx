import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userslice";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import { useToast } from "@/hooks/use-toast";


function DashboardProfile() {
  //REDUX-HOOKS
  const { currentUser } = useSelector((state) => state.user);
  const profilePicRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast()
  

  const [imageFile, SetImageFile] = useState(null);
  const [imageFileUrl, SetImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});

  // console.log(formData)

  //  console.log(imageUrl)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)

    if (file) {
      SetImageFile(file);
      SetImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) return currentUser.profilePicture;
  
    try {
      const uploadImage = await uploadFile(imageFile); 
      const profilePictureUrl = getFilePreview(uploadImage.$id);
      return profilePictureUrl;
    } catch (error) {
      toast({ title: "Update user failed. Please try again!" });
      console.log("Image upload failed: ", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      //Wait for Image Upload
      const profilePicture = await uploadImage();

      const updateProfile = {
        ...formData,
        profilePicture,
      };

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProfile),
      });

      const data = await res.json();

      if (data.success === false) {
        toast({ title: "Update user failed. Please try again!" });
        dispatch(updateFailure(data.message));
      } else {
        // console.log("I am running")
        dispatch(updateSuccess(data));
        toast({ title: "User updated successfully." });
      }
    } catch (error) {
      toast({ title: "Update user failed. Please try again!" });
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Update Your Profile
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={profilePicRef}
          onChange={handleImageChange}
        />

        <div className="w-32 h-32 self-center cursor-pointer  overflow-hidden">
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt=""
            className="rounded-full w-full h-full object-cover border-8 border-gray-300"
            onClick={() => profilePicRef.current.click()}
          />
        </div>

        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="h-12 border border-slate-400 rounded-s
           focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="h-12 border border-slate-400 rounded-s
           focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className="h-12 border border-slate-400 rounded-s
           focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleChange}
        />

        <Button type="submit" className="h-12 bg-green-600">
          Update Profile
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5 cursor-pointer">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default DashboardProfile;
