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

  const getStatus = (autorizacao: boolean | null) => {
    return autorizacao === null ? "Pendente" : autorizacao ? "Permitido" : "Negado";
  };
  const getBadgeColor = {
    pendente: "yellow",
    permitido: "green",
    negado: "red",
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
                  colorScheme={getBadgeColor[getStatus(item.autorizacao)]}
                >
                  {getStatus(item.autorizacao)}
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
