import React, { useContext } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../../context/authContext";
import { Logo } from "../login/Logo";

export default function Navbar({ children }) {
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        px={{ base: 4, md: 4 }}
        height="50"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
      >
        <Text
          fontSize="16px"
          fontFamily="monospace"
          fontWeight="bold"
        >
          <Flex flexDirection="row" align="left">
            <Logo viewBox="none" mt="16px" mr={3} width="50px" />
            <Heading
              fontSize="18"
              fontFamily="Inter"
              fontWeight="400"
            >
              A R B O R E T T O
            </Heading>
          </Flex>
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <BsMoonFill /> : <BsSun />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user?.nome}</Text>
                    <Text fontSize="xs" color="gray.600">
                      beta tester
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Box p="4">{children}</Box>
    </Box>
  );
}