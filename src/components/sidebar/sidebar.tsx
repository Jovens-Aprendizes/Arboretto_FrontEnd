import React, { ReactNode, useContext } from "react";

import {
  IconButton,
  Link,
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
import { AuthContext, CargoEnum, CargoType } from "../../context/authContext";

type Link = {
  name: string;
  path: string;
  role: CargoType[];
};

const PagesMap: Link[] = [
  {
    name: "Inicio",
    path: "/home",
    role: [
      CargoEnum.ADMINISTRADOR,
      CargoEnum.PROPRIETARIO,
      CargoEnum.INQUILINO,
    ],
  },
  {
    name: "Cadastro",
    path: "/cadastro",
    role: [CargoEnum.ADMINISTRADOR],
  },
  {
    name: "Solicitações",
    path: "/solicitacoes",
    role: [CargoEnum.ADMINISTRADOR],
  },
  {
    name: "Agendar",
    path: "/agendar",
    role: [CargoEnum.INQUILINO, CargoEnum.PROPRIETARIO],
  },
  {
    name: "Minhas Solicitações",
    path: "/minhas-solicitacoes",
    role: [CargoEnum.INQUILINO, CargoEnum.PROPRIETARIO],
  },
];
type NavbarProps = {
  children: ReactNode;
};
export default function Navbar({ children } : NavbarProps) {
  const { user, logout } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const mappedPages = PagesMap.filter((page) =>
    page.role.includes(user?.cargo)
  );

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        px={{ base: 4, md: 4 }}
        height="8vh"
        alignItems="center"
        bg={useColorModeValue("#C0C9DB", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between" }}
      >
        <Flex flexDirection="row" align="left">
          <img src="/logo.png" alt="Logo(Árvore)" width="50px" />
          <Heading fontSize="18" fontFamily="Inter" fontWeight="400" mt="3">
            A R B O R E T T O
          </Heading>
        </Flex>

        <Flex flexDirection="row" align="left" gap="60px">
          {mappedPages.map((page) => (
            <a href={page.path} key={page.name} style={{}}>
              <Heading fontSize="lg">{page.name}</Heading>
            </a>
          ))}
        </Flex>
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
      <Box padding="15px" minH="92vh" w="100vw">
        {children}
      </Box>
    </Box>
  );
}
