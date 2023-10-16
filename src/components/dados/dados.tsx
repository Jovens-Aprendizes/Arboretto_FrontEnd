import { Button, FormControl, FormLabel, Input, VStack, Box, Center } from "@chakra-ui/react";
import React, { useState } from "react";

export default function MyForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    confirmarEmail: "",
    bloco: "",
    senha: "",
    apto: "",
    confirmarSenha: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["nome", "email", "confirmarEmail", "bloco", "senha", "confirmarSenha"];
    const errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "Campo obrigatório";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Center>
      <Box
        width="991px"
        height="720px"
        flexShrink="0"
        borderRadius="34px"
        border="1px solid #EFF0F6"
        background="#C0C9DB"
        boxShadow="0px 5px 16px 0px rgba(8, 15, 52, 0.06"
        p="20px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={formErrors.nome} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                NOME
              </FormLabel>
              <Input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.email} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                E-MAIL
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.cpf} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                CPF
              </FormLabel>
              <Input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.confirmarEmail} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                CONFIRME SEU E-MAIL
              </FormLabel>
              <Input
                type="email"
                name="confirmarEmail"
                value={formData.confirmarEmail}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.bloco} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                BLOCO
              </FormLabel>
              <Input
                type="text"
                name="bloco"
                value={formData.bloco}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.senha} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                SENHA
              </FormLabel>
              <Input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.apto} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                APTO
              </FormLabel>
              <Input
                type="text"
                name="apto"
                value={formData.apto}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <FormControl isRequired isInvalid={formErrors.confirmarSenha} style={{ width: "284px", height: "66px" }}>
              <FormLabel
                style={{
                  color: "#170F49",
                  fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                CONFIRME SUA SENHA
              </FormLabel>
              <Input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                style={{
                  width: "284px",
                  height: "66px",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  background: "#FFF",
                  boxShadow: "0px 2px 6px 0px rgba(19, 18, 66, 0.07",
                }}
              />
            </FormControl>

            <Button colorScheme="teal" type="submit">
              Confirmar
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}