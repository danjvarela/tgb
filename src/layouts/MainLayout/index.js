import {HStack, VStack} from "@chakra-ui/react";
import Header from "./components/Header";
import CustomSearchInput from "components/CustomSearchInput";
import CustomBreadcrumb from "./components/CustomBreadcrumb";
import {useResolvedPath} from "react-router-dom";

const MainLayout = ({children, onLogOut}) => {
  const {pathname} = useResolvedPath();
  const atUsersPage = /^\/users[/]{0,1}$/.test(pathname);

  return (
    <VStack w="full" h="full">
      <Header onLogOut={onLogOut} />
      <VStack w="full" h="full" flexGrow={1} px={{base: 3, md: 9}}>
        <HStack justifyContent="space-between" alignItems="center" w="full" gap={2}>
          <CustomBreadcrumb />
          {atUsersPage ? <CustomSearchInput /> : null}
        </HStack>
        {children}
      </VStack>
    </VStack>
  );
};

export default MainLayout;
