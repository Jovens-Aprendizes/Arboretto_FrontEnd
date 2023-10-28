import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Badge,
} from "@chakra-ui/react";

interface Props {
  solicitacoesData: any;
}

const SeuFormulario: React.FC<Props> = ({ solicitacoesData }) => {
  const [dataFromAPI] = useState(solicitacoesData);

  const getStatus = (status: boolean | null) => {
    return status === null ? "Pendente" : status ? "Permitido" : "Negado";
  };
  const getBadgeColor = {
    Pendente: "yellow",
    Permitido: "green",
    Negado: "red",
  };

  return (
    <Box width="100%">
      <Heading mb={4}>Solicitações de agendamento</Heading>
      <Table variant="unstyled" bg="white">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Descrição</Th>
            <Th>Condômino</Th>
            <Th>Espaço</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataFromAPI.map((item: any, index: number) => (
            <Tr key={index}>
              <Td>
                <Badge
                  p="5px 10px"
                  borderRadius="8px"
                  colorScheme={getBadgeColor[getStatus(item.status)]}
                >
                  {getStatus(item.status)}
                </Badge>
              </Td>
              <Td>{item.observacao}</Td>
              <Td>{item.nomeUsuario}</Td>
              <Td>{item.nomeSpace}</Td>
              <Td>{new Date(item.dataMarcada).toLocaleDateString("pt-BR")}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SeuFormulario;
