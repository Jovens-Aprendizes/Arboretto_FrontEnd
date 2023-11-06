import { useState } from "react";
import {
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
interface Props {
  solicitacoesData: any;
}

const tabelaSolicitacoes = ({ solicitacoesData }: Props) => {
  const [dataFromAPI, setDataFromAPI] = useState(solicitacoesData);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar"
      );
      setDataFromAPI(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  async function atualizaSolicitacao(item, novoStatus: string) {
    const data = item;
    data.status = novoStatus;
    try {
      await axios.put(
        "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/atualizar",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      window.location.reload()
    } catch (error) {
      console.error("Erro ao atualizar o status da solicitação", error);
    }
  }

  const getBadgeColor = {
    pendente: "yellow",
    permitido: "green",
    negado: "red",
  };
  return (
    <Box width="100%">
      <Heading>Solicitações de agendamento</Heading>
      <Table variant="unstyled" bg="white">
        <Thead>
          <Tr>
            <Td>Status</Td>
            <Td>Descrição</Td>
            <Td>Condômino</Td>
            <Td>Espaço</Td>
            <Td>Data</Td>
            <Td>Ação</Td>
          </Tr>
        </Thead>
        <Tbody>
          {dataFromAPI.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Badge
                  p="5px 10px"
                  borderRadius="8px"
                  colorScheme={getBadgeColor[item.status]}
                >
                  {item.status ? item.status : "Pendente"}
                </Badge>
              </Td>
              <Td>{item.observacao}</Td>
              <Td>{item.nomeUsuario}</Td>
              <Td>{item.nomeSpace}</Td>
              <Td>{new Date(item.dataMarcada).toLocaleDateString("pt-BR")}</Td>
              <Td>
                <Button
                  marginRight="10px"
                  colorScheme="green"
                  onClick={() => atualizaSolicitacao(item, "permitido")}
                >
                  Permitir
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => atualizaSolicitacao(item, "negado")}
                >
                  Negar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
  // return (
  //   <Box width="100%">
  //     <Heading>Solicitações de agendamento</Heading>
  //     <Table variant="unstyled" bg="white">
  //       <Thead>
  //         <Tr>
  //           <Td>Status</Td>
  //           <Td>Descrição</Td>
  //           <Td>Condômino</Td>
  //           <Td>Espaço</Td>
  //           <Td>Data</Td>
  //           <Td>Ação</Td>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         {dataFromAPI.map((item, index) => (
  //           <Tr key={index}>
  //             <Td>
  //               <Badge
  //                 p="5px 10px"
  //                 borderRadius="8px"
  //                 colorScheme={getBadgeColor[item.status]}
  //               >
  //                 {item.status}
  //               </Badge>
  //             </Td>
  //             <Td>{item.observacao}</Td>
  //             <Td>{item.nomeUsuario}</Td>
  //             <Td>{item.nomeSpace}</Td>
  //             <Td>{new Date(item.dataMarcada).toLocaleDateString("pt-BR")}</Td>
  //             <Td>
  //               <Button
  //                 marginRight="10px"
  //                 colorScheme="green"
  //                 onClick={() => atualizaSolicitacao(item, "permitido")}
  //               >
  //                 Permitir
  //               </Button>
  //               <Button
  //                 colorScheme="red"
  //                 onClick={() => atualizaSolicitacao(item, "negado")}
  //               >
  //                 Negar
  //               </Button>
  //             </Td>
  //           </Tr>
  //         ))}
  //       </Tbody>
  //     </Table>
  //   </Box>
  // );
};

export default tabelaSolicitacoes;
