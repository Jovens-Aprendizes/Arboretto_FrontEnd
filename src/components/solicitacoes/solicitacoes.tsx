import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import axios from 'axios';
import { stat } from 'fs';

const SeuFormulario: React.FC = () => {
  useEffect(() => {
    fetchData(); // Chama a função de busca de dados quando o componente é montado
  }, []);

async function fetchData() {
  try {
    const response = await axios.get('https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/listar');
    setDataFromAPI(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

  
  const [status, setStatus] = useState(null);
  const [dataFromAPI, setDataFromAPI] = useState([]);

  const handleAcao = (action: string) => {
    let novoStatus = null;

    if (action === 'permitir') {
      novoStatus = true;
    } else if (action === 'negar') {
      novoStatus = false;
    }

    setStatus(novoStatus);
  };

  if (dataFromAPI.status === null) {
    setStatus('Pendente');
  }
  async function AtualizaSolicitacao() {
    try {
      const atualizaStatus = await axios.put('https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/usuario-space/atualizar', {
        status:status
      })
      
    } catch (error) {
      console.error('Erro ao atualizar o status da solicitação', error)
    }
  }

  return (
    <Center>
      <Box width="100%">
      <FormControl marginLeft="3px">
        <FormLabel>Solicitações de agendamento</FormLabel>
      </FormControl>
        <form>
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
                  <Input value={item.observacao} />
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input value={item.nomeUsuario} />
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input value={item.nomeSpace} />
                </FormControl>
              </Td>
              <Td>
                <FormControl>
                  <Input value={new Date(item.dataMarcada).toLocaleDateString('pt-BR')} readOnly/>
                </FormControl>
              </Td>
              <Td>
                <FormControl display="flex">
                  <Button
                    marginRight="10px"
                    colorScheme="green"
                    onClick={() => {
                      handleAcao('permitir');
                      AtualizaSolicitacao();
                    }}
                  >
                    Permitir
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {handleAcao('negar');
                    AtualizaSolicitacao();
                  }}
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

export default SeuFormulario;