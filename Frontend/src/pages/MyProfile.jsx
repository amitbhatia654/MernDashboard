import { useEffect } from "react";
import axiosInstance from "../ApiManager";

const MyProfile = () => {
  useEffect(() => {
    getProfileDetails();
  });

  const getProfileDetails = async () => {
    const result = await axiosInstance.get("/api/auth/profile");
    console.log("result of profile", result);
  };
  return <>Hello Profile Page</>;
};

export default MyProfile;
