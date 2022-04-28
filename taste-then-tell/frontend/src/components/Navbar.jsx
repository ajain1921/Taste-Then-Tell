import React from "react";
import {
  UnorderedList,
  ListItem,
  Link,
  chakra,
  Flex,
  Box,
  Stack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/context";
import { useLocation } from "react-router-dom";

const NavLink = ({ path, title }) => {
  const location = useLocation();
  return (
    <Link href={path}>
      {location.pathname === path ? <strong>{title}</strong> : title}
    </Link>
  );
};

export const Navbar = () => {
  const { logout, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Taste Then Tell</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7} alignItems={"center"}>
            {user && (
              <>
                <NavLink path="/foods" title="Foods" />
                <NavLink path="/universities" title="Universities" />
                <NavLink path="/dininghalls" title="Dining Halls" />
                <NavLink path="/schedule" title="Schedule" />
              </>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {user && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={`https://api.multiavatar.com/${user.first_name} ${user.last_name}.svg`}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={`https://api.multiavatar.com/${user.first_name} ${user.last_name}.svg`}
                    />
                  </Center>

                  <Center pb="5px" pt="10px">
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                  </Center>

                  <MenuDivider />
                  <MenuItem as="a" href="/profile">
                    Your Profile
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
