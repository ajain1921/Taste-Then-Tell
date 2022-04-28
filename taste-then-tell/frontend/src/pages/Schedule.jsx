import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api";
import { useAuth } from "../contexts/context";

const Schedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [DH, setDH] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedDH, setSelectedDH] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(
        `/schedules/dining_halls?days=M&dining_hall_id=${selectedDH}`
      );
      setFoods(res.data.result);
      console.log(res.data.result);
    };
    if (selectedDH) {
      fetchData();
    }
  }, [selectedDH]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(
        `/universities/dining_halls/${user.university_id}`
      );
      setDH(res.data.result);
    };
    fetchData();
  }, [user.university_id]);

  const selectHandler = async (dh) => {
    setSelectedDH(dh);
  };

  return (
    <Flex w="100%" flexDirection="column" padding="20px" gap="30px">
      <Flex dir="row" justifyContent="space-between">
        <Heading>Today's Menu</Heading>
        <VStack>
          <Text>{`University: ${
            DH[0] ? DH[0].university : "University"
          }`}</Text>
          <Select
            placeholder="Select Dining Hall"
            onChange={(e) => selectHandler(e.target.value)}
          >
            {DH.map((dh) => (
              <option value={dh.dining_Hall_id}>{dh.dining_Hall}</option>
            ))}
          </Select>
        </VStack>
      </Flex>
      <HStack justifyContent="center" alignItems="flex-start">
        <VStack w="33%">
          <Heading size="lg">Breakfast</Heading>
          <TableContainer
            border="1px solid #E2E8F0"
            borderRadius="12px"
            w="100%"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Average Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {foods
                  .filter(({ meal_type }) => meal_type === "Breakfast")
                  .map(({ name, avg_rating, food_id }) => (
                    <Tr
                      onClick={() => navigate(`/foods/${food_id}`)}
                      _hover={{
                        color: "teal.500",
                        cursor: "pointer",
                      }}
                    >
                      <Td w="80%">{name}</Td>
                      <Td w="20%">{avg_rating.toFixed(1)}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
        <VStack w="33%">
          <Heading size="lg">Lunch</Heading>
          <TableContainer
            border="1px solid #E2E8F0"
            borderRadius="12px"
            w="100%"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Average Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {foods
                  .filter(({ meal_type }) => meal_type === "Lunch")
                  .map(({ name, avg_rating, food_id }) => (
                    <Tr
                      onClick={() => navigate(`/foods/${food_id}`)}
                      _hover={{
                        color: "teal.500",
                        cursor: "pointer",
                      }}
                    >
                      <Td>{name}</Td>
                      <Td>{avg_rating.toFixed(1)}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
        <VStack w="33%">
          <Heading size="lg">Dinner</Heading>
          <TableContainer
            border="1px solid #E2E8F0"
            borderRadius="12px"
            w="100%"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Average Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {foods
                  .filter(({ meal_type }) => meal_type === "Dinner")
                  .map(({ name, avg_rating, food_id }) => (
                    <Tr
                      onClick={() => navigate(`/foods/${food_id}`)}
                      _hover={{
                        color: "teal.500",
                        cursor: "pointer",
                      }}
                    >
                      <Td>{name}</Td>
                      <Td>{avg_rating.toFixed(1)}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Schedule;
