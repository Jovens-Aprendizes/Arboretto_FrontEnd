import {
  Badge,
  Card,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Space } from "../../../types/agendamento";

interface Props {
  space: Space;
  setSelectedSpace: Dispatch<SetStateAction<Space>>;
}

export const EspacoCard = ({ space, setSelectedSpace }: Props) => {
  const background = useColorModeValue("gray.100", "gray.600");
  const [spaceStatus, setSpaceStatus] = useState("Livre");

  setTimeout(async () => {
    const res = await axios.get(
      "https://api-arboretto-production.up.railway.app/api-arboretto-dev/v1/sensor/churrasqueira"
    );
    setSpaceStatus(res.data.status === "false" ? "Ocupado" : "Livre");
  }, 30000);

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
        <Badge
          alignSelf="flex-end"
          colorScheme={spaceStatus === "Ocupado" ? "red" : "green"}
        >
          {spaceStatus}
        </Badge>
      </Flex>
      <Text textAlign="justify" overflow="15px" textOverflow="ellipsis">
        {space.description}
      </Text>
    </Card>
  );
};
