import { Box } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/context";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return <Box></Box>;
};

export default Profile;
