import React, {useEffect, useState} from "react";
import {ChakraProvider, VStack} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import CreateAdminPage from "pages/CreateAdminPage";
import LoginAdminPage from "pages/LoginAdminPage";
import UsersPage from "pages/UsersPage";
import theme from "theme";
import * as User from "services/User";

const App = () => {
  const [loggedAdmin, setLoggedAdmin] = useState();
  const [users, setUsers] = useState(User.all());
  console.log(loggedAdmin);

  // seed users
  useEffect(() => {
    if (loggedAdmin) {
      User.seed(10, loggedAdmin);
      setUsers(User.all());
    }
  }, [loggedAdmin]);

  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh" overflow="scroll">
        <Routes>
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route path="login" element={<LoginAdminPage onLogin={setLoggedAdmin} />} />
          <Route path="users" element={<UsersPage users={users} />} />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
