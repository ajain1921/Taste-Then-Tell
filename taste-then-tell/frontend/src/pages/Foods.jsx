import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
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
import { instance } from "../api";

const Foods = () => {
  const [foods, setFoods] = useState([]);
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
    <Center m="auto" direction={"row"} align={"center"} pt="30px">
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
                <Tr>
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
