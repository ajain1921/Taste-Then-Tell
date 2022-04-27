import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/context";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    // <Center py={6}>{JSON.stringify(user, null, 2)}</Center>
    <Flex mt={10} mb={10} flexDir="column" align="center" mx={20}>
      <Heading mb={10}>Profile</Heading>
      {/* <Flex flexDir="row"> */}
      <Flex flexDir="row" mx={10} mb={10}>
        {/* <Flex flex={0.5} /> */}
        <Flex flexDir="column" flex={1} w="600px">
          <Text fontSize="20px" fontWeight="bold" mb={6}>
            First Name:
            <Text
              fontWeight="normal"
              display="inline"
            >{` ${user.first_name}`}</Text>
          </Text>
          <Text fontSize="20px" fontWeight="bold" mb={6}>
            E-Mail:
            <Text fontWeight="normal" display="inline">{` ${user.email}`}</Text>
          </Text>
        </Flex>
        <Flex flex={0.25} />

        <Flex flexDir="column" flex={1}>
          <Text fontSize="20px" fontWeight="bold" mb={6}>
            Last Name:
            <Text
              fontWeight="normal"
              display="inline"
            >{` ${user.last_name}`}</Text>
          </Text>
          {/* TODO: Fix! */}
          <Text fontSize="20px" fontWeight="bold" mb={6}>
            University:
            <Text
              fontWeight="normal"
              display="inline"
            >{` ${user.university_id}`}</Text>
          </Text>
        </Flex>
      </Flex>

      {/* TODO: Link up this link */}
      <Link
        href="/profile/reviews"
        fontSize="22px"
        background="#EDF2F7"
        p={5}
        borderRadius={10}
      >
        View your past reviews
      </Link>
    </Flex>
  );
};

export default Profile;
