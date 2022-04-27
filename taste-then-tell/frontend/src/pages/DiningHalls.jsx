import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
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
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { instance } from "../api";

const DiningHalls = () => {
  const [allergens, setAllergens] = useState([]);
  const [allergenDH, setAllergenDH] = useState([]);
  const [ratingDH, setRatingDH] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/food_allergens");
      setAllergens(res.data.result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/reviews/average_ratings");
      setRatingDH(res.data.result);
    };
    fetchData();
  }, []);

  const selectHandler = async (allergen) => {
    const query = new URLSearchParams({
      allergen: allergen,
    }).toString();
    const res = await instance.get(`/foods/filter_out_allergen?${query}`);
    setAllergenDH(res.data.result);
  };

  return (
    <Center m="auto" direction={"row"} align={"center"} pt="30px">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>By Allergen</Tab>
          <Tab>By Rating</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing="5" w="100%">
              <Select
                placeholder="Select allergen"
                onChange={(e) => selectHandler(e.target.value)}
                defaultValue="wheat"
              >
                {allergens.map(({ allergen }) => (
                  <option value={allergen}>{allergen}</option>
                ))}
              </Select>
              <TableContainer
                border="1px solid #E2E8F0"
                borderRadius="12px"
                w="100%"
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Dining Hall</Th>
                      <Th># of Non-Allergen Foods</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {allergenDH.map(({ name, nonAllergenCount }) => (
                      <Tr>
                        <Td>{name}</Td>
                        <Td isNumeric>{nonAllergenCount}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing="5" w="100%">
              <TableContainer
                border="1px solid #E2E8F0"
                borderRadius="12px"
                w="100%"
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>University</Th>
                      <Th>Dining Hall</Th>
                      <Th>Average Rating</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {ratingDH.map(
                      ({ university_name, dining_hall_name, avgRating }) => (
                        <Tr>
                          <Td>{university_name}</Td>
                          <Td>{dining_hall_name}</Td>
                          <Td isNumeric>{avgRating.toFixed(0)}</Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default DiningHalls;
