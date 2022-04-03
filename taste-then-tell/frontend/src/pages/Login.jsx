import { Box, Button, Center, Heading, Input, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { instance } from "../api";

const Home = () => {
  const [foods, setFoods] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/reviews");
      setFoods(res.data);
    };
    fetchData();
  }, []);

  return (
    <Box h="100vh">
      <Center flexDirection="column" marginTop="100px">
        <Stack spacing={4}>
          <Center>
            <Heading>Login</Heading>
          </Center>
          <Stack>
            <Input placeholder="username" size="xs" />
            <Input placeholder="password" size="xs" />
          </Stack>
          <Button colorScheme="teal" size="xs">
            Login
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
