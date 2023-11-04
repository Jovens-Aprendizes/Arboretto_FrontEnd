import { Card, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Space } from "../../../types/agendamento";

interface Props {
  space: Space;
  setSelectedSpace: Dispatch<SetStateAction<Space>>;
}

export const EspacoCard = ({space, setSelectedSpace}: Props) => {
  const background = useColorModeValue("gray.100", "gray.600");
  return (
    <Card
      cursor="pointer"
      backgroundColor={background}
      w="100%"
      p="15px"
      onClick={() => setSelectedSpace(space)}
    >
      <Flex justifyContent="space-between" mb="15px">
        <Heading size="sm">{space.name}</Heading>
      </Flex>
      <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
        {space.description}
      </Text>
    </Card>
  );
};
