import React, {useState} from "react";
import {ChakraProvider, VStack} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import CreateAdminPage from "pages/CreateAdminPage";
import LoginAdminPage from "pages/LoginAdminPage";
import theme from "theme";

const App = () => {
  const [loggedAdmin, setLoggedAdmin] = useState();
  console.log(loggedAdmin);

  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh">
        <Routes>
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route path="login" element={<LoginAdminPage onLogin={setLoggedAdmin} />} />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
