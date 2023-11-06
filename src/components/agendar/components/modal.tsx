import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
  Text,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { es } from "date-fns/locale";
import { ChurrasqueiraContratc } from "./spaceContracts/churrasqueira";
import { SalaoContratc } from "./spaceContracts/salao";

interface Props {
  modalCtrl: UseDisclosureReturn;
  saveFunction: () => void;
  espacoType: "churrasqueira" | "salao";
}

export const AgendamentoModal = ({
  modalCtrl,
  saveFunction,
  espacoType,
}: Props) => {
  return (
    <Modal size="lg" isOpen={modalCtrl.isOpen} onClose={modalCtrl.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Termos de reserva Espaço-lazer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {espacoType === "churrasqueira" ? (
            <ChurrasqueiraContratc />
          ) : (
            <SalaoContratc />
          )}
        </ModalBody>
        <ModalFooter display="flex" flexDir="column" gap="15px">
          <Text fontWeight="bold">
          Clicando em Confirmar declaro TER LIDO E ACEITO toda a regulamentação especificada no termo de
        responsabilidade.
          </Text>
          <Flex>
            <Button variant="ghost" mr={3} onClick={modalCtrl.onClose}>
              Canclear
            </Button>
            <Button
              padding="15px"
              colorScheme="teal"
              onClick={() => { saveFunction(); setTimeout(() => modalCtrl.onClose(), 5000)}}
            >
              Confirmar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
