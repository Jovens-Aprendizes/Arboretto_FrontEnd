import React, { useContext, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
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

interface Props { solicitacoesData:any };

const SeuFormulario = ({solicitacoesData}:Props) => {
  const [dataFromAPI, setDataFromAPI] = useState(solicitacoesData);
  console.log(dataFromAPI);

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