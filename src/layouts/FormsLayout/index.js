import {HStack, Center, VStack, Heading} from "@chakra-ui/react";
import Card from "components/Card";
import {ColorModeSwitcher} from "components/ColorModeSwitcher";

const FormsLayout = ({title, children}) => {
  return (
    <VStack w="full" h="full">
      <HStack justifyContent="flex-end" px={{base: 3, md: 9}} py={1} w="full">
        <ColorModeSwitcher />
      </HStack>
      <Center w="full" h="full" px={3} flexGrow={1}>
        <Card w="full" maxW="sm">
          <Heading as="h1" fontSize="xl">
            {title}
          </Heading>
          {children}
        </Card>
      </Center>
    </VStack>
  );
};

export default FormsLayout;
