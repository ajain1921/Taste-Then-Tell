import React from "react";
import { useAuth } from "../contexts/context";

const Profile = () => {
  const { auth } = useAuth();

  return JSON.stringify(auth, null, 2);
};

export default Profile;
