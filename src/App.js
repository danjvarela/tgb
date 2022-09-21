import React from "react";
import {ChakraProvider, VStack} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import CreateAdminPage from "pages/CreateAdminPage";
import LoginAdminPage from "pages/LoginAdminPage";
import UsersPage from "pages/UsersPage";
import theme from "theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh">
        <Routes>
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route path="login" element={<LoginAdminPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
