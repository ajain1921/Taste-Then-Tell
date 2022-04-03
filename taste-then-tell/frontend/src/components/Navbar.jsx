import React from "react";
import { UnorderedList, ListItem, Link, chakra, Flex } from "@chakra-ui/react";
import { useAuth } from "../contexts/context";

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <chakra.nav m={0} p={0}>
      <UnorderedList
        color="white"
        backgroundColor="rgb(67, 134, 145)"
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
            <Link href="/universities">Universities</Link>
          </ListItem>
          <ListItem mr={5}>
            <Link href="/dininghalls">Dining Halls</Link>
          </ListItem>
          <ListItem mr={5}>
            <Link href="/profile">Profile</Link>
          </ListItem>
          <ListItem mr={5}>
            <Link onClick={() => logout()}>Logout</Link>
          </ListItem>
        </Flex>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Navbar;
