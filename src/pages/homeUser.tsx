import React from "react";
import Navbar from "../components/sidebar/sidebar";
import { Heading, Stack } from "@chakra-ui/react";

const HomeUser = () => {
  return (
    <Navbar>
      <Stack spacing="6" textAlign="center">
        <Heading fontSize="50" fontFamily="Inter" fontWeight="400">
          A R B O R E T T O
        </Heading>
        <img
          src="/logo.png"
          alt="Logo(Árvore)"
          width="600"
          height="800"
          style={{
            right: "0",
            top: "10px",
            left: "370px",
            position: "relative",
            display: "block",
          }}
        /> 
      </Stack>
    </Navbar>
  );
};

export default HomeUser;