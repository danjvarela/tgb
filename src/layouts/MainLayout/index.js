import {Center, VStack} from "@chakra-ui/react";
import Header from "./components/Header";

const MainLayout = ({children}) => {
  return (
    <VStack w="full" h="full">
      <Header />
      <Center w="full" h="full" px={{base: 3, md: 9}} flexGrow={1}>
        {children}
      </Center>
    </VStack>
  );
};

export default MainLayout;
