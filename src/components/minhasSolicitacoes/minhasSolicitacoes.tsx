import React, { useState } from 'react';
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

const SeuFormulario: React.FC = () => {
  const [status, setStatus] = useState('Pendente'); // Status padrão
  const [acao, setAcao] = useState('');

  const handleAcao = (action: string) => {
    if (action === 'permitir') {
      setStatus('Permitido');
    } else if (action === 'negar') {
      setStatus('Negado');
    }
  };

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
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <FormControl>
                    <Input
                      value={status}
                      readOnly
                      textAlign="center"
                      w="105px"
                      bg={
                        status === 'Permitido'
                          ? 'green.500'
                          : status === 'Negado'
                          ? 'red.500'
                          : '#009CA6'
                      }
                      color="white"
                      _hover={{
                        bg:
                          status === 'Permitido'
                            ? 'green.600'
                            : status === 'Negado'
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
                    <Input placeholder="Insira a descrição" />
                  </FormControl>
                </Td>
                <Td>
                  <FormControl>
                    <Input placeholder="Nome do condômino" />
                  </FormControl>
                </Td>
                <Td>
                  <FormControl>
                    <Input placeholder="Nome do espaço" />
                  </FormControl>
                </Td>
                <Td>
                  <FormControl>
                    <Input type="date" />
                  </FormControl>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </form>
      </Box>
    </Center>
  );
};

export default SeuFormulario;