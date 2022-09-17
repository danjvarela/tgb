import {HStack, Center, VStack} from "@chakra-ui/react";
import {ColorModeSwitcher} from "components/ColorModeSwitcher";

const FormsLayout = ({children}) => {
  return (
    <VStack w="full" h="full">
      <HStack justifyContent="flex-end" px={{base: 3, md: 9}} py={1} w="full">
        <ColorModeSwitcher />
      </HStack>
      <Center w="full" h="full" px={3} flexGrow={1}>
        {children}
      </Center>
    </VStack>
  );
};

export default FormsLayout;
