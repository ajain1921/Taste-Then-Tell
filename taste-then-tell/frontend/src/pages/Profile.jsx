import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/context";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return <Center py={6}>{JSON.stringify(user, null, 2)}</Center>;
};

export default Profile;
