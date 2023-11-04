import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Space, User } from "../types/agendamento";
import { EspacoCard } from "../components/agendar/components/card";
import { AgendamentoModal } from "../components/agendar/components/modal";
import { agendamentoApiService } from "../components/agendar/agendamento.api";

export const spaces: Space[] = [
  {
    name: "Churrasqueira 1",
    image: "/churras1.jpeg",
    description: "Churrasqueira que comporta 20 pessoas",
    id: 1,
    type: "churrasqueira",
  },
  {
    name: "Churrasqueira 2",
    image: "/churras2.jpeg",
    description: "Churrasqueira que comporta 20 pessoas",
    id: 2,
    type: "churrasqueira",
  },
  {
    name: "Salão de festas",
    image: "/salom.jpeg",
    description: "Salão de festas que comporta 20 pessoas",
    id: 3,
    type: "salao",
  },
];

interface Props {
  user: User;
}

const Agendar = ({ user }: Props) => {
  const formBackground = useColorModeValue("gray.50", "gray.900");
  const toast = useToast();
  const modalCtrl = useDisclosure();
  const [selectedSpace, setSelectedSpace] = useState<Space>(spaces[0]);
  const [busydates, setBusyDates] = useState<Date[]>([] as Date[]);
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");

  const getAndSetBusyDates = async () => {
    setBusyDates([] as Date[]);
    const agendamentos = await agendamentoApiService.fetchScheduledEvents(
      selectedSpace.id
    );
    agendamentos
      .filter((agendamentos) => agendamentos.autorizacao != "negado")
      .map((busyDate) => {
        const date = new Date(busyDate.dataMarcada);
        setBusyDates((busydates) => [...busydates, date]);
      });
  };

  useEffect(() => {
    getAndSetBusyDates();
  }, [selectedSpace]);

  const saveSchedulling = async () => {
    const payload = {
      usuarioId: user.id,
      spaceId: selectedSpace.id,
      dataMarcada: format(date, "yyyy/MM/dd HH:mm:ss"),
      observacao: "kitazawa é um japones boliviano",
      status: null,
    };

    try {
      await agendamentoApiService.postScheduling(payload);
      toast({
        title: "Sucesso!",
        description: "Solicitação de agendamento enviada",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setBusyDates((busydates) => [...busydates, date]);
      setDate(new Date());
      setDescription("");
      setTimeout(() => {
        getAndSetBusyDates();
      }, 15000);
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao enviar solicitação de agendamento",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Navbar>
      <Flex w="100%" h="100%" gap="15px">
        <Flex
          borderRadius="8px"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          backgroundColor={formBackground}
          p="15px"
          w="25%"
          minH="calc(100vh - 85px)"
          maxH="calc(100vh - 85px)"
          gap="15px"
          flexDir="column"
        >
          <Heading size="md">Espaço lazer</Heading>
          <Flex flexDir="column" gap="15px" maxH="100%" p="0 5px">
            {spaces.map((space) => (
              <EspacoCard
                space={space}
                setSelectedSpace={setSelectedSpace}
                key={space.id}
              />
            ))}
          </Flex>
        </Flex>
        <Flex
          borderRadius="8px"
          bg={formBackground}
          flexDir="column"
          gap="4" // usando a escala de espaçamento do Chakra UI
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          p="4" // usando a escala de espaçamento do Chakra UI
          w={{ base: "100%", md: "75%" }} // responsividade para dispositivos móveis
          minH="calc(100vh - 85px)"
          maxH="calc(100vh - 85px)"
        >
          <Heading size="md">{selectedSpace.name}</Heading>
          <Flex justifyContent="space-around" flexWrap="wrap">
            <Box pt="4">
              <Image
                borderRadius="8px"
                m="4"
                boxSize="300px"
                objectFit="cover"
                src={selectedSpace.image}
                alt="Churrasqueira de prédio"
              />
            </Box>
            <Flex flexDir="column" align="center" gap="4">
              <DayPicker
                locale={ptBR}
                mode="single"
                disabled={busydates}
                onSelect={setDate}
                selected={date}
              />
              <Textarea
                bg={formBackground}
                w="300px"
                placeholder="Escreva aqui as observações da sua reserva"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Flex
                w="350px"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Button colorScheme="blue" onClick={() => modalCtrl.onOpen()}>
                  Termos de reserva
                </Button>
                <Button onClick={() => modalCtrl.onOpen()} colorScheme="teal">
                  Reservar
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <AgendamentoModal
            espacoType={selectedSpace.type}
            modalCtrl={modalCtrl}
            saveFunction={saveSchedulling}
          />
        </Flex>
      </Flex>
    </Navbar>
  );
};

export default Agendar;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "arboretto-token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const user = await agendamentoApiService.fetchUser(token);

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }

  return {
    props: {},
  };
};
