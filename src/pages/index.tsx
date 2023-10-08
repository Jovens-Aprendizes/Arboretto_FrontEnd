import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { PasswordField } from "../components/login/PasswordField";
import { AuthContext } from "../context/authContext";
const IndexPage = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [fazendoLogin, setFazendoLogin] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    setFazendoLogin(true);
    await signIn(data);
  }

  async function updateUser() {
    handleSignIn({ cpf: cpf, senha: senha });
  }

  return (
    <Container maxW="full" px={{ base: "0", sm: "8" }}>
      <Stack spacing="8" direction={{ base: "column", md: "row" }}>
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#D8F3DC"
          h="100vh"
        >
          <Stack spacing="6" textAlign="center">
            <Heading
              fontSize="50"
              fontFamily="Inter"
              fontWeight="400"
            >
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
                position: "relative",
                display: "flex",
              }}
            />
          </Stack>
        </Box>
        <Box flex="1" py={{ base: "12", md: "24" }}>
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Iniciar sessão</Heading>
            </Stack>
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
              bg="#E7E7E7"
            >
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <Input
                    bg="white"
                    placeholder="Informe seu CPF"
                    id="cpf"
                    value={cpf}
                    onChange={(event) => setCpf(event.target.value)}
                  />
                </FormControl>
                <PasswordField
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </Stack>
              <HStack justify="space-around" margin="5">
                <Checkbox defaultChecked>Lembrar de mim</Checkbox>

                <Button variant="link" size="sm">
                  Esqueceu a senha?
                </Button>
              </HStack>
              <Stack
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                <Button
                  w="320px"
                  h="56px"
                  bg="#4EB68B"
                  borderRadius="19px"
                  isLoading={fazendoLogin}
                  onClick={updateUser}
                >
                  Entrar
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default IndexPage;
