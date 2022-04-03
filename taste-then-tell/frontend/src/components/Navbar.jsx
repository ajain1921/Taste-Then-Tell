import React from "react";
import { UnorderedList, ListItem, Link, chakra, Flex } from "@chakra-ui/react";
import { useAuth } from "../contexts/context";

// Chakra UI navbar for the application
export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <chakra.nav m={0} p={0}>
      <UnorderedList
        color="blue"
        backgroundColor="white"
        listStyleType="none"
        m={0}
        height="60px"
        p={5}
        display="flex"
        alignItems="center"
      >
        <ListItem>Taste Then Tell</ListItem>
        <Flex justifyContent="right" flexGrow="1">
          <ListItem mr={5}>
            <Link onClick={() => logout()}>Logout</Link>
          </ListItem>
        </Flex>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Navbar;
