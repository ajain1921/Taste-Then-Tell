import React from "react";
import { useAuth } from "../contexts/context";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return JSON.stringify(user, null, 2);
};

export default Profile;
