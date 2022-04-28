import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api";
import { useAuth } from "../contexts/context";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [selectedUni, setSelectedUni] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/universities/");
      setUniversities(res.data.result);
    };
    fetchData();
  }, []);

  const submit = async () => {
    try {
      await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        university_id: selectedUni,
      });
      setError(false);
      navigate("/profile");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box>
      <Center flexDirection="column" marginTop="100px">
        <Stack spacing={4} width="350px" textAlign="center">
          <Center>
            <Heading>Sign Up</Heading>
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
              placeholder="First Name"
              size="sm"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              size="sm"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="Email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select
              placeholder="Select University"
              onChange={(e) => setSelectedUni(e.target.value)}
              defaultValue="wheat"
            >
              {universities.map(({ name, university_id }) => (
                <option value={university_id}>{name}</option>
              ))}
            </Select>
            <Input
              placeholder="Password"
              size="sm"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Button colorScheme="teal" size="sm" onClick={() => submit()}>
            Sign Up
          </Button>
          <Text fontSize="md">
            Already have an account? Login{" "}
            <Link to="/">
              <u>here</u>
            </Link>{" "}
          </Text>
        </Stack>
      </Center>
    </Box>
  );
};

export default SignUp;
