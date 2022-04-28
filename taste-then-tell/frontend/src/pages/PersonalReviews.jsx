import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../contexts/context";
import "./Profile.css";
import { instance } from "../api";

import { Spoiler } from "react-spoiler-tag";
import "react-spoiler-tag/dist/index.css";

const PersonalReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);

  const [editModalReviewId, setEditModalReviewId] = useState(null);
  const [deleteModalReviewId, setDeleteModalReviewId] = useState(null);
  const [editedRating, setEditedRating] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState(null);
  const [refresh, setRefresh] = useState(null);

  console.log("ACTUAL REVIEWS: ", userReviews);
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(
        `/reviews/user_reviews/${user.email}/${user.password}`
      );
      console.log("USER REVIEWS", res.data.result[0]);
      const userReviews = res.data.result[0].filter(
        (review) => !Object.values(review).some((r) => r === null)
      );
      setUserReviews(userReviews);
    };
    fetchData();
  }, [refresh, user.email, user.password]);

  const editReview = async () => {
    const bodyRating = {
      review_id: editModalReviewId,
      rating: editedRating,
    };
    const bodyFeedback = {
      review_id: editModalReviewId,
      review: editedFeedback,
    };
    if (editedRating)
      await instance.put("/reviews/edit_review_rating", bodyRating);
    if (editedFeedback)
      await instance.put("/reviews/edit_review_text", bodyFeedback);
    setEditModalReviewId(null);
    setRefresh(!refresh);
  };

  const deleteReview = async () => {
    await instance.delete(`/reviews/delete/${deleteModalReviewId}`);
    setDeleteModalReviewId(null);
    setRefresh(!refresh);
  };

  const truncate = (input) =>
    input.length > 20 ? `${input.substring(0, 20)}...` : input;

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
                <Th w="10px" isNumeric>
                  Rating
                </Th>
                <Th>Reviews</Th>
                <Th w="20px">Edit</Th>
                <Th w="20px">Delete</Th>
              </Tr>
              {/* <Tr>
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
              </Tr> */}

              {userReviews.map((userReviews) => (
                <Tr>
                  <Td>
                    <Text isTruncated w="250px">
                      {userReviews.food_name}
                    </Text>
                  </Td>
                  <Td>
                    <Text isTruncated w="200px">
                      {userReviews.dining_hall_name}
                    </Text>
                  </Td>
                  <Td isNumeric>{userReviews.rating.toFixed(0)}</Td>
                  {userReviews.contains_profanity == 1 && (
                    <Td maxW="300px">
                      <Box maxW="300px">
                        <Spoiler
                          text={truncate(userReviews.feedback)}
                        ></Spoiler>
                      </Box>
                    </Td>
                  )}

                  {!userReviews.contains_profanity && (
                    <Td>
                      <Text isTruncated w="300px">
                        {userReviews.feedback}
                      </Text>
                    </Td>
                  )}

                  <Td>
                    <Fragment>
                      <Button
                        mb={1}
                        colorScheme="blue"
                        onClick={() =>
                          setEditModalReviewId(userReviews.review_id)
                        }
                      >
                        <EditIcon w={4} h={4} />
                      </Button>
                      <Modal
                        isOpen={userReviews.review_id === editModalReviewId}
                        onClose={() => setEditModalReviewId(null)}
                        autoFocus={false}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Edit Review</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Textarea
                              defaultValue={userReviews.feedback}
                              onChange={(e) =>
                                setEditedFeedback(e.target.value)
                              }
                            ></Textarea>
                            <Select
                              mr="15px"
                              flex="1"
                              bg="gray.100"
                              placeholder="Select your rating..."
                              onChange={(e) => setEditedRating(e.target.value)}
                              defaultValue={userReviews.rating.toFixed(0)}
                            >
                              <option value="5">5 stars</option>
                              <option value="4">4 stars</option>
                              <option value="3">3 stars</option>
                              <option value="2">2 stars</option>
                              <option value="1">1 star</option>
                              <option value="0">0 star</option>
                            </Select>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              onClick={() => editReview()}
                            >
                              Save
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Fragment>
                  </Td>

                  <Td>
                    <Fragment>
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          setDeleteModalReviewId(userReviews.review_id)
                        }
                      >
                        {<DeleteIcon />}
                      </Button>
                      <Modal
                        isOpen={userReviews.review_id === deleteModalReviewId}
                        onClose={() => setDeleteModalReviewId(null)}
                        autoFocus={false}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete Review</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            Are you sure you want to delete your review?
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              variant="ghost"
                              mr={3}
                              // TODO
                              onClick={() => setDeleteModalReviewId(null)}
                            >
                              Cancel
                            </Button>
                            {/* TODO: Add delete review functionality */}
                            <Button
                              colorScheme="red"
                              onClick={() => deleteReview()}
                            >
                              Delete
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Fragment>
                    {/* <DeleteIcon w={4} h={4} ml={4} /> */}
                  </Td>
                </Tr>
              ))}
            </Thead>
          </Table>
        </TableContainer>
      </Box>
    </Center>
  );
};

export default PersonalReviews;
