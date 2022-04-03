import {
  Button,
  Divider,
  Flex,
  Heading,
  List,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../api";

import { StarOutline, StarRate } from "@mui/icons-material";

const FoodItem = () => {
  const [foods, setFoods] = useState([]);
  const [currFood, setCurrFood] = useState([]);
  const { pathname } = useLocation();
  const foodId = Number(pathname.match(/\/foods\/(\d+)/)?.[1]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/foods");
      setFoods(res.data.result);
    };
    fetchData();
  }, []);
  console.log(foods);
  console.log(currFood);

  return (
    // <Center flexDirection="column" w="80%" m="auto" pt="20px">
    //     {foods.map(({ food_id, name, allergens }) => (
    //       food_id === 1 && <Text>{food_id} {name} {allergens}</Text>
    //     ))}
    // </Center>

    <Flex flexDirection="column" w="75%" m="auto" pt="20px" display="flex">
      {/* TODO: Connect with food Name */}
      <Heading align="center">Food Name</Heading>

      <Flex flexDir="row">
        <Flex mt={5} flexDir="column" flex="1">
          <Heading size="lg" align="center">
            Information
          </Heading>
          {/* TODO: Need name of university that offers this dish (or we remove this) */}
          <Heading size="md" mt={3}>
            University Name
          </Heading>
          <List mt={3} spacing={1}>
            <Text>Offered by the following Dining Halls:</Text>
            {/* TODO: Map function to display the dining halls this is served at */}
            <Text>Field of Greens at Lincon/Allen (LAR)</Text>
            <Text>Field of Greens at Lincon/Allen (LAR)</Text>
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
          <Flex mt={3} align="center">
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />: 200
          </Flex>
          <Flex mt={3} align="center">
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
            <StarOutline />: 50
          </Flex>
          <Flex mt={3} align="center">
            <StarRate />
            <StarRate />
            <StarRate />
            <StarOutline />
            <StarOutline />: 22
          </Flex>
          <Flex mt={3} align="center">
            <StarRate />
            <StarRate />
            <StarOutline />
            <StarOutline />
            <StarOutline />: 18
          </Flex>
          <Flex mt={3} align="center">
            <StarRate />
            <StarOutline />
            <StarOutline />
            <StarOutline />
            <StarOutline />: 79
          </Flex>
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
          >
            {/* TODO: Map the dining halls here again */}
            <option value="dining_hall_id">
              Field of Greens at Lincon/Allen (LAR)
            </option>
            <option value="dining_hall_id">
              Field of Greens at Lincon/Allen (LAR)
            </option>
          </Select>
          <Select
            mr="15px"
            flex="1"
            bg="gray.100"
            placeholder="Select your rating..."
          >
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </Select>
          <Button colorScheme="blue">Add Review</Button>
        </Flex>
        {/* TODO: Some type of onSubmit to add into the DB */}
        <Textarea
          mt={3}
          variant="filled"
          height="80px"
          placeholder="Write your feedback here..."
        ></Textarea>
      </Flex>

      <Divider borderColor="darkgrey" mt={5} mb={5} />

      {/* TODO: Add number of reviews*/}
      <Heading align="center" size="lg">
        Published Reviews (55)
      </Heading>
      <List spacing={1}>
        <Flex flexDir="row" mt={5} mb={5}>
          <Flex flexDir="column" width="200px">
            {/* TODO: Populate reviews via mapping */}
            <Text>username</Text>
            <Text>3 stars</Text>
            <Text isTruncated>Field of Greens at Lincon/Allen (LAR)</Text>
          </Flex>
          <Flex flexDir="column" ml="15px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Flex>
        </Flex>
        <Divider borderColor="darkgrey" mb={5} />

        <Flex flexDir="row" mb={5}>
          <Flex flexDir="column" width="200px">
            <Text>username</Text>
            <Text>3 stars</Text>
            <Text isTruncated>Field of Greens at Lincon/Allen (LAR)</Text>
          </Flex>
          <Flex flexDir="column" ml="15px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Flex>
        </Flex>
      </List>
    </Flex>
  );
};

export default FoodItem;
