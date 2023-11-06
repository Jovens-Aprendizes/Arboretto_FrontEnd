import React, { useState } from "react";
import {
  useColorModeValue,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export type UserForm = {
  nome: string;
  email: string;
  cpf: string;
  confirmarEmail: string;
  bloco: string;
  senha: string;
  numeroApartamento: string;
  confirmarSenha: string;
  dataNascimento: Date;
  cargo: string;
};

const formFields = [
  { name: "nome", label: "NOME", type: "text" },
  { name: "cpf", label: "CPF", type: "text" },
  { name: "email", label: "E-MAIL", type: "email" },
  { name: "confirmarEmail", label: "CONFIRME SEU E-MAIL", type: "email" },
  { name: "bloco", label: "BLOCO", type: "text" },
  { name: "numeroApartamento", label: "APTO", type: "text" },
  { name: "senha", label: "SENHA", type: "password" },
  { name: "confirmarSenha", label: "CONFIRME SUA SENHA", type: "password" },
  { name: "dataNascimento", label: "Data de Nascimento", type: "date" },
  // { name: "cargo", type: "hidden" },
];

export default function MyForm() {
  const [formData, setFormData] = useState<UserForm>({} as UserForm);
  const [formErrors, setFormErrors] = useState({});
  const formBackground = useColorModeValue("gray.50", "gray.900");
  const buttonColor = useColorModeValue("teal", "green");
  const toast = useToast();

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setFormErrors({});
    const errors = {} as any;

    formFields.forEach(({ name }) => {
      //@ts-ignore
      if (!formData[name]) {
        errors[name] = "Campo obrigatório";
      }
    });

    if (formData.email !== formData.confirmarEmail) {
      errors.confirmarEmail = "Os e-mails não coincidem";
    }

    if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Erro ao enviar o formulário.",
        description: "Por favor, corrija os erros antes de enviar novamente.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const jsonData = {
      "nome": formData.nome,
      "senha": formData.senha,
      "cpf": formData.cpf,
      "email": formData.email,
      "numeroApartamento": formData.numeroApartamento,
      "bloco": formData.bloco,
      "dataNascimento":formData.dataNascimento,
      "cargo":"proprietário"
    }

    try {
      const reponse = await axios.post('https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario/salvar',
      jsonData,{
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });
      if(reponse.status === 200){
        alert("Usuário cadastro com sucesso!");
      }
      window.location.reload();
    } catch (error) {
      console.error('Ocorreu algum erro ao salvar o usuário', error);
      alert('Erro salvar Usuário');
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //@ts-ignore
  const renderField = ({ name, label, type }) => (
    //@ts-ignore
    <FormControl isRequired isInvalid={!formErrors[name]} w="35%">
      <FormLabel fontSize={14}>{label}</FormLabel>
      <Input
        backgroundColor={formBackground}
        colorScheme="teal"
        type={type}
        name={name}
        //@ts-ignore
        value={formData[name] || ""}
        onChange={handleChange}
      />
      
      {//@ts-ignore
      formErrors[name] && (
        //@ts-ignore
        <FormErrorMessage>{formErrors[name]}</FormErrorMessage>
      )}
    </FormControl>
  );

  return (
    <Box
      w="100%"
      padding="5%"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={formBackground}
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" mb="5%">
          <Flex flexWrap="wrap" justifyContent="space-around" mb="5%">
            {formFields.map((field) => renderField(field))}
          </Flex>
          <Button colorScheme={buttonColor} alignSelf="end" type="submit">
            Confirmar
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
