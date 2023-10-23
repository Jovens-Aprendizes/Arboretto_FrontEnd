import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Navbar from "../components/sidebar/sidebar";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/agendar.module.css";

const Agendar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [value, onChange] = useState(new Date());
  const formBackground = useColorModeValue("gray.50", "gray.900");
  const cardBackground = useColorModeValue("gray.100", "gray.600");
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
          <Flex
            flexDir="column"
            gap="15px"
            maxH="100%"
            overflowY="scroll"
            p="0 5px"
          >
            <Card backgroundColor={cardBackground} w="100%" p="15px">
              <Flex justifyContent="space-between" mb="15px">
                <Heading size="sm">Churrasqueira 1</Heading>
                <Badge bg="green.300" p="2px 8px" borderRadius="8px">
                  Livre
                </Badge>
              </Flex>
              <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
                urna non arcu mollis sodales. Nam at elementum orci, vel
                bibendum turpis.
              </Text>
            </Card>
            <Card backgroundColor={cardBackground} w="100%" p="15px">
              <Flex justifyContent="space-between" mb="15px">
                <Heading size="sm">Churrasqueira 1</Heading>
                <Badge bg="green.300" p="2px 8px" borderRadius="8px">
                  Livre
                </Badge>
              </Flex>
              <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
                urna non arcu mollis sodales. Nam at elementum orci, vel
                bibendum turpis.
              </Text>
            </Card>
            <Card backgroundColor={cardBackground} w="100%" p="15px">
              <Flex justifyContent="space-between" mb="15px">
                <Heading size="sm">Churrasqueira 1</Heading>
                <Badge bg="green.300" p="2px 8px" borderRadius="8px">
                  Livre
                </Badge>
              </Flex>
              <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
                urna non arcu mollis sodales. Nam at elementum orci, vel
                bibendum turpis.
              </Text>
            </Card>
            <Card backgroundColor={cardBackground} w="100%" p="15px">
              <Flex justifyContent="space-between" mb="15px">
                <Heading size="sm">Churrasqueira 1</Heading>
                <Badge bg="green.300" p="2px 8px" borderRadius="8px">
                  Livre
                </Badge>
              </Flex>
              <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
                urna non arcu mollis sodales. Nam at elementum orci, vel
                bibendum turpis.
              </Text>
            </Card>
          </Flex>
        </Flex>
        <Flex
          borderRadius="8px"
          backgroundColor={formBackground}
          flexDir="column"
          gap="15px"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          p="15px"
          w="75%"
          minH="calc(100vh - 85px)"
          maxH="calc(100vh - 85px)"
        >
          <Heading size="md">Churrasqueira 1</Heading>
          <Flex justifyContent="space-around">
            <Image
              style={{ borderRadius: "8px" }}
              src="/churrasqueira.jpg"
              alt="Churrasqueira de prédio"
              width={300}
              height={300}
            ></Image>
            <Calendar
              className={styles.reactCalendar}
              onChange={onChange}
              value={value}
            />
          </Flex>
          <Flex justifyContent="space-around">
            <Textarea
              background="white"
              width="300px"
              placeholder="Escreva aqui as observações da sua reserva"
            ></Textarea>
            <Flex
              width="350px"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Button colorScheme="blue" onClick={() => onOpen()}>
                Termos de reserva
              </Button>
              <Button onClick={() => onOpen()} colorScheme="teal">
                Reservar
              </Button>
              <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Termos de reserva Espaço-lazer</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec pharetra urna tellus, id varius diam feugiat ac.
                    Aliquam eget ornare lorem, sit amet mollis magna. Donec
                    facilisis metus vitae augue auctor laoreet. Ut blandit
                    ornare fringilla. Sed purus leo, fermentum vitae mauris
                    eget, vestibulum ultricies mi. Phasellus quis ligula tempor,
                    fermentum dolor nec, pellentesque velit. Duis eget nunc ex.
                    Ut pretium augue a justo luctus efficitur. Aenean et ex
                    imperdiet, ultrices mi nec, eleifend velit. Ut pharetra
                    sodales turpis, non lobortis urna condimentum et. Donec
                    vestibulum euismod porta. Maecenas viverra nisi vestibulum
                    viverra aliquet. Proin tristique elit sed congue elementum.
                    Pellentesque non feugiat enim, vel congue risus. Integer
                    quis augue iaculis, viverra ligula vel, consectetur ipsum.
                    In nec orci enim. Fusce ut euismod diam, eget pharetra
                    velit. Donec non ex sed ante sagittis tempus et fringilla
                    neque. Nam dictum, nisl sed lobortis sollicitudin, odio diam
                    egestas libero, ut volutpat arcu odio facilisis dui. Donec
                    tristique aliquet lectus ac eleifend. Donec ut lectus in
                    odio vehicula semper. Morbi in varius libero. Phasellus et
                    metus ut risus tincidunt tincidunt a ut tellus. Donec
                    ornare, odio vitae scelerisque pellentesque, metus ligula
                    tincidunt enim, sit amet tincidunt nulla neque eget diam.
                    Donec ac laoreet dui. Mauris pretium nisi sit amet magna
                    pharetra, luctus molestie nibh consequat. Nunc commodo
                    semper dolor eu tristique. Sed nec volutpat sapien.
                    Curabitur placerat mauris vitae consequat laoreet. Sed
                    bibendum odio nisl, et varius felis mollis et. Sed vehicula
                    porttitor mauris, ut consectetur lorem mattis quis.
                  </ModalBody>
                  <ModalFooter display="flex" flexDir="column" gap="15px">
                    <Text fontWeight="bold">
                      Confirmo que li e estou de acordo com o temos acima
                    </Text>
                    <Flex>
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        Fechar
                      </Button>
                      <Button padding="15px" colorScheme="teal">
                        Confirmar
                      </Button>
                    </Flex>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Flex>
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

  return {
    props: {},
  };
};
