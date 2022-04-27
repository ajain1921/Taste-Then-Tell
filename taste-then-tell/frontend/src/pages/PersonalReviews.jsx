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
  Table,
  TableCaption,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/context";
import "./Profile.css";
import { instance } from "../api";

const PersonalReviews = () => {
  const { user } = useAuth();
  console.log(user);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const body = {
      email: user.email,
      password: user.password,
    };

    const fetchData = async () => {
      const res = await instance.get(`/reviews/user_reviews`, body);
      console.log(body);
      setUserReviews(res.data.result);
      console.log(res.data.result);
    };
    fetchData();
  }, []);

  // TODO: refresh on delete?

  return (
    <Center mx="20px" flexDir="column">
      <Heading my={10}>Your Reviews</Heading>
      <Box maxW="100%" overflowY="auto">
        <TableContainer maxW="100%" overflowX="hidden">
          <Table>
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Dining Hall</Th>
                <Th w="20px" isNumeric>
                  Rating
                </Th>
                <Th>Reviews</Th>
                <Th w="20px">Edit</Th>
                <Th w="20px">Delete</Th>
              </Tr>
              <Tr>
                <Td>
                  <Text isTruncated w="250px">
                    FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD
                    FOOD FOOD
                  </Text>
                </Td>
                <Td>
                  <Text isTruncated w="300px">
                    DINING HALL DINING HALL DINING HALL DINING HALL DINING HALL
                    DINING HALL
                  </Text>
                </Td>
                <Td isNumeric>4.44</Td>
                <Td>
                  <Text isTruncated w="300px">
                    REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS
                    REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS
                  </Text>
                </Td>
                <Td>
                  <EditIcon w={4} h={4} ml={2} />
                </Td>
                <Td>
                  {" "}
                  <DeleteIcon w={4} h={4} ml={4} />
                </Td>
              </Tr>

              {/* {userReviews.map(() => {
                <Tr>
                <Td>
                  <Text isTruncated w="250px">
                    FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD FOOD
                    FOOD FOOD
                  </Text>
                </Td>
                <Td>
                  <Text isTruncated w="300px">
                    DINING HALL DINING HALL DINING HALL DINING HALL DINING HALL
                    DINING HALL
                  </Text>
                </Td>
                <Td isNumeric>4.44</Td>
                <Td>
                  <Text isTruncated w="300px">
                    REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS
                    REVIEWS REVIEWS REVIEWS REVIEWS REVIEWS
                  </Text>
                </Td>
                <Td>
                  <EditIcon w={4} h={4} ml={2} />
                </Td>
                <Td>
                  {" "}
                  <DeleteIcon w={4} h={4} ml={4} />
                </Td>
              </Tr>
            })} */}
            </Thead>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default PersonalReviews;
