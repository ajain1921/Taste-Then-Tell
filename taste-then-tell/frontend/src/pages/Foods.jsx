import {
  Center,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
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
  console.log(foods);
  return (
    <Center flexDirection="column" w="80%" m="auto" pt="20px">
      <Input pb="20px" />
      <TableContainer w="80%" maxHeight="70vh" overflowY="scroll">
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
    </Center>
  );
};

export default Foods;
