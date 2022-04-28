import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Heading,
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

const Universities = () => {
  const [avgRatings, setavgRatings] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(
        "/universities/get_average_ratings_for_universities/"
      );
      setUniversityData(res.data.result);
      console.log(res.data.result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/reviews/average_ratings");
      setavgRatings(res.data.result);
    };
    fetchData();
  }, []);

  return (
    <Center
      m="auto"
      direction={"row"}
      align={"center"}
      pt="30px"
      flexDir="column"
    >
      <TableContainer border="1px solid #E2E8F0" borderRadius="12px" w="60%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>University</Th>
              <Th>Average Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* TODO: change to have avgrating of university */}
            {universityData.map(({ name, average_rating }) => (
              <Tr>
                <Td>{name}</Td>
                <Td textAlign="center">{average_rating.toFixed(1)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

export default Universities;
