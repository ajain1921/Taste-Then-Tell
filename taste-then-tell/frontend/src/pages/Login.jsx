import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/context";

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = async () => {
    try {
      await login(email, password);
      setError(false);
      navigate("/profile");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box>
      <Center flexDirection="column" marginTop="100px">
        <Stack spacing={4} width="275px">
          <Center>
            <Heading>Login</Heading>
          </Center>
          <Stack>
            {error && (
              <Alert status="error" variant="subtle">
                <AlertIcon />

                <AlertDescription>
                  Invalid username and password.
                </AlertDescription>
              </Alert>
            )}

            <Input
              placeholder="Email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              size="sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Button colorScheme="teal" size="sm" onClick={() => submit()}>
            Login
          </Button>
          <Text fontSize="md">
            Don't have an account? Sign up{" "}
            <Link to="/signup">
              <u>here</u>
            </Link>{" "}
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
