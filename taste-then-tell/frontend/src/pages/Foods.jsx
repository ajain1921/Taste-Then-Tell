import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";

const Foods = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("foods/get_random/food_id");
      setRandomFood(res.data.result[0]);
      console.log(res.data.result[0]);
    };
    fetchData();
  }, []);

  const getRandomLink = async () => {
    return `/foods/${randomFood.food_id}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/foods");
      setFoods(res.data.result);
    };
    fetchData();
  }, []);

  const searchHandler = async (e) => {
    const query = new URLSearchParams({ q: e.target.value }).toString();
    const res = await instance.get(`/foods/search?${query}`);
    setFoods(res.data.result);
    console.log(res);
  };

  console.log(foods);
  return (
    <Center
      m="auto"
      direction={"row"}
      align={"center"}
      pt="30px"
      flexDir="column"
    >
      <Link mb={3} href={`/foods/${randomFood.food_id}`}>
        Surprise me!
      </Link>
      <VStack spacing="5" w="60%">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search foods by"
            onChange={(e) => searchHandler(e)}
          />
        </InputGroup>
        <TableContainer border="1px solid #E2E8F0" borderRadius="12px" w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Food ID</Th>
                <Th>Food Name</Th>
                <Th>Allergens</Th>
              </Tr>
            </Thead>
            <Tbody>
              {foods.map(({ food_id, name, allergens }) => (
                <Tr
                  onClick={() => navigate(`/foods/${food_id}`)}
                  _hover={{
                    color: "teal.500",
                    cursor: "pointer",
                  }}
                >
                  <Td isNumeric>{food_id}</Td>
                  <Td>{name}</Td>
                  <Td>{allergens}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  );
};

export default Foods;
