import {
  Button,
  Divider,
  Flex,
  Heading,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../api";

import { StarOutline, StarRate } from "@mui/icons-material";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/context";

const FoodItem = () => {
  const [currFood, setCurrFood] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [diningHalls, setDiningHalls] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { food_id } = useParams();
  const { user } = useAuth();

  const [selectedDiningHall, setSelectedDiningHall] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [editModalReviewId, setEditModalReviewId] = useState(null);
  const [deleteModalReviewId, setDeleteModalReviewId] = useState(null);
  const [editedRating, setEditedRating] = useState(null);
  const [editedFeedback, setEditedFeedback] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const createReview = async () => {
    const body = {
      student_id: user.user_id,
      food_id: food_id,
      dining_hall_id: selectedDiningHall,
      rating: selectedRating,
      review: feedback,
    };

    await instance.post("/reviews/add_review/", body);
    setRefresh(!refresh);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(
        `/reviews/get_food_review_stars/${food_id}`
      );
      setRatings(res.data.result);
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/foods/${food_id}`);
      setCurrFood(res.data.result[0]);
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/schedules/foods/${food_id}`);
      setDiningHalls(res.data.result);
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/reviews/foods/${food_id}`);
      setReviews(res.data.result);
    };
    fetchData();
  }, [refresh]);

  return (
    <Flex flexDirection="column" w="75%" m="auto" pt="20px" display="flex">
      <Heading align="center">{currFood.name}</Heading>

      <Flex flexDir="row">
        <Flex mt={5} flexDir="column" flex="1">
          <Heading size="lg" align="center">
            Information
          </Heading>
          <Heading size="md" mt={3}>
            University Name
          </Heading>
          <List mt={3} spacing={1}>
            <Text>Offered by the following Dining Halls:</Text>
            {diningHalls.map((diningHall) => {
              return <Text>{diningHall.dining_hall_name}</Text>;
            })}
          </List>
          <Heading size="md" mt={3}>
            Allergens:
          </Heading>
          {/* TODO: Connect with food Allergens */}
          <List mt={3} spacing={1}>
            <Text>Peanuts</Text>
          </List>
        </Flex>

        {/* TODO: Insert appropriate rating scores */}
        <Flex mt={5} flexDir="column" align="center" flex="1">
          <Heading size="lg">Ratings Overview</Heading>
          {ratings.map((ratings) => (
            <Fragment>
              <Flex mt={3} align="center">
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />: {ratings.num_five_stars}
              </Flex>
              <Flex mt={3} align="center">
                <StarRate />
                <StarRate />
                <StarRate />
                <StarRate />
                <StarOutline />: {ratings.num_four_stars}
              </Flex>
              <Flex mt={3} align="center">
                <StarRate />
                <StarRate />
                <StarRate />
                <StarOutline />
                <StarOutline />: {ratings.num_three_stars}
              </Flex>
              <Flex mt={3} align="center">
                <StarRate />
                <StarRate />
                <StarOutline />
                <StarOutline />
                <StarOutline />: {ratings.num_two_stars}
              </Flex>
              <Flex mt={3} align="center">
                <StarRate />
                <StarOutline />
                <StarOutline />
                <StarOutline />
                <StarOutline />: {ratings.num_one_stars}
              </Flex>
              <Flex mt={3} align="center">
                <StarOutline />
                <StarOutline />
                <StarOutline />
                <StarOutline />
                <StarOutline />: {ratings.num_zero_stars}
              </Flex>
            </Fragment>
          ))}
        </Flex>
      </Flex>

      <Divider mt={5} borderColor="darkgray" />

      <Heading mt={5} align="center" size="lg">
        Write a Review
      </Heading>

      <Flex flexDir="column">
        <Flex mt={3}>
          <Select
            flex="3"
            mr="15px"
            bg="gray.100"
            placeholder="Select your dining hall..."
            onChange={(e) => setSelectedDiningHall(e.target.value)}
          >
            {diningHalls.map((diningHall) => {
              return (
                <option value={diningHall.dining_hall_id}>
                  {diningHall.dining_hall_name}
                </option>
              );
            })}
          </Select>
          <Select
            mr="15px"
            flex="1"
            bg="gray.100"
            placeholder="Select your rating..."
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
            <option value="0">0 star</option>
          </Select>
          <Button colorScheme="green" onClick={() => createReview()}>
            Add Review
          </Button>
        </Flex>
        <Textarea
          mt={3}
          variant="filled"
          height="80px"
          placeholder="Write your feedback here..."
          onChange={(e) => setFeedback(e.target.value)}
        ></Textarea>
      </Flex>

      <Divider borderColor="darkgrey" mt={5} mb={5} />

      <Heading align="center" size="lg">
        Published Reviews
      </Heading>
      <List spacing={1}>
        {reviews.map((review) => {
          return (
            <Fragment>
              <Flex flexDir="row" mt={5} mb={5}>
                <Flex flexDir="column" width="200px">
                  <Text>
                    {review.first_name} {review.last_name}
                  </Text>
                  <Text>{review.rating.toFixed(0)} stars</Text>
                  <Text width="inherit" isTruncated>
                    {review.dining_hall_name}
                  </Text>
                </Flex>
                <Flex flexDir="column" ml="15px" width="1000px">
                  {review.feedback}
                </Flex>
                {user.user_id === review.user_id && (
                  <Flex ml="15px" flexDir="column" width="80px">
                    {/* TODO: Populate reviews via mapping */}
                    <Button
                      mb={1}
                      colorScheme="blue"
                      onClick={() => setEditModalReviewId(review.review_id)}
                    >
                      Edit
                    </Button>
                    <Modal
                      isOpen={review.review_id === editModalReviewId}
                      onClose={() => setEditModalReviewId(null)}
                      autoFocus={false}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Review</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Textarea
                            defaultValue={review.feedback}
                            onChange={(e) => setEditedFeedback(e.target.value)}
                          ></Textarea>
                          <Select
                            mr="15px"
                            flex="1"
                            bg="gray.100"
                            placeholder="Select your rating..."
                            onChange={(e) => setEditedRating(e.target.value)}
                            defaultValue={review.rating.toFixed(0)}
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

                    <Button
                      colorScheme="red"
                      onClick={() => setDeleteModalReviewId(review.review_id)}
                    >
                      {<DeleteIcon />}
                    </Button>
                    <Modal
                      isOpen={review.review_id === deleteModalReviewId}
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
                  </Flex>
                )}
              </Flex>
              <Divider borderColor="darkgrey" mb={5} />
            </Fragment>
          );
        })}
      </List>
    </Flex>
  );
};

export default FoodItem;
