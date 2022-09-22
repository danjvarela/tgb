import {HStack, VStack} from "@chakra-ui/react";
import Header from "./components/Header";
import CustomSearchInput from "components/CustomSearchInput";
import CustomBreadcrumb from "./components/CustomBreadcrumb";

const MainLayout = ({children}) => {
  return (
    <VStack w="full" h="full">
      <Header />
      <VStack w="full" h="full" flexGrow={1} px={{base: 3, md: 9}}>
        <HStack justifyContent="space-between" w="full" gap={2}>
          <CustomBreadcrumb />
          <CustomSearchInput />
        </HStack>
        {children}
      </VStack>
    </VStack>
  );
};

export default MainLayout;
