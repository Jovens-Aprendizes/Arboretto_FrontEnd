import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  MenuItem,
} from '@chakra-ui/react';

import axios from 'axios';
import { stat } from 'fs';

const tabelaSolicitacoes: React.FC = () => {
  useEffect(() => {
    fetchData(); // Chama a função de busca de dados quando o componente é montado
  }, []);

const [dataFromAPI, setDataFromAPI] = useState([]);
async function fetchData() {
  try {
    const response = await axios.get('https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar');
    setDataFromAPI(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

async function buscarIDAndAtualizarStatus(item, novoStatus) {
  try {
    const response = await axios.get(`https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/filter-id?id=${item.id}`);
    const dataId = response.data;

    if (!dataId) {
      console.error('ID não encontrado na API');
      return;
    }

    await AtualizaSolicitacao(dataId, novoStatus);

  } catch (error) {
    console.error('Erro ao buscar o ID e atualizar o status:', error);
  }
}

async function AtualizaSolicitacao(dataId, novoStatus) {
  const jsonData = {
    id: dataId.id,
    usuarioId: dataId.usuarioId,
    spaceId: dataId.spaceId,
    dataMarcada: dataId.dataMarcada,
    observacao: dataId.observacao,
    status: novoStatus,
  };

  try {
    const atualizaStatus = await axios.put(
      'https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/atualizar',
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      }
    );
        // Atualize o status localmente
        const teste = dataFromAPI.map(solicitacao => {
          if (solicitacao.id === dataId.id) {
            return { ...solicitacao, status: novoStatus };
          }
          return solicitacao;
        });
        setDataFromAPI(teste);

        const updatedData = dataFromAPI.map(item => {
          if (item.id === dataId.id) {
            return { ...item, status: novoStatus };
          }
          return item;
        });

    setDataFromAPI(updatedData);
    console.log('Status atualizado com sucesso:', atualizaStatus.data);
  } catch (error) {
    console.error('Erro ao atualizar o status da solicitação', error);
  }
}

  return (
    <Center>
      <Box width="100%">
      <FormControl marginLeft="3px">
        <FormLabel>Solicitações de agendamento</FormLabel>
      </FormControl>
        <form >
          <Table variant="unstyled" bg="white">
            <Thead>
              <Tr>
                <Th>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                  </FormControl>
                </Th>
                <Th>
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                  </FormControl>
                </Th>
                <Th>
                  <FormControl>
                    <FormLabel>Condômino</FormLabel>
                  </FormControl>
                </Th>
                <Th>
                  <FormControl>
                    <FormLabel>Espaço</FormLabel>
                  </FormControl>
                </Th>
                <Th>
                  <FormControl>
                    <FormLabel>Data</FormLabel>
                  </FormControl>
                </Th>
                <Th>
                  <FormControl>
                    <FormLabel>Ação</FormLabel>
                  </FormControl>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataFromAPI.map((item, index)=>
                <Tr key={index}>
                  <Td>
                    <FormControl>
                      <Input
                          defaultValue={
                            item.status === null
                              ? 'Pendente'
                              : item.status
                              ? 'Permitido'
                              : 'Negado'
                          }
                          readOnly
                          textAlign="center"
                          w="105px"
                          bg={
                            item.status
                              ? 'green.500'
                              : item.status === false
                              ? 'red.500'
                              : '#009CA6'
                          }
                          color="white"
                          _hover={{
                            bg: item.status
                              ? 'green.600'
                              : item.status === false
                              ? 'red.600'
                              : '#009CA6',
                          }}
                          _focus={{
                            borderColor: 'transparent',
                          }}
                      />
                </FormControl>
                  </Td>
              <Td>
                <FormControl>
                  <Input value={item.observacao} border="none" width='350px'/>
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input value={item.nomeUsuario} border="none"/>
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input value={item.nomeSpace} border="none"/>
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input border="none" value={new Date(item.dataMarcada).toLocaleDateString('pt-BR')} readOnly/>
                </FormControl>
              </Td>
              <Td>
                <FormControl display="flex">
                  <Button
                    marginRight="10px"
                    colorScheme="green"
                    onClick={() => {buscarIDAndAtualizarStatus(item, true), fetchData()}}
                  >
                    Permitir
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {buscarIDAndAtualizarStatus(item, false), fetchData()}}
                  >
                    Negar
                  </Button>
                </FormControl>
              </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </form>
      </Box>
    </Center>
  );
};

export default tabelaSolicitacoes;