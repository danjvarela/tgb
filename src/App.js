import React, {useState} from "react";
import {ChakraProvider, VStack} from "@chakra-ui/react";
import {Routes, Route, useNavigate} from "react-router-dom";
import CreateAdminPage from "pages/CreateAdminPage";
import LoginAdminPage from "pages/LoginAdminPage";
import UsersPage from "pages/UsersPage";
import UserDashboardPage from "pages/UserDashboardPage";
import theme from "theme";
import * as User from "services/User";
import * as Admin from "services/Admin";

const App = () => {
  const [loggedAdmin, setLoggedAdmin] = useState(Admin.findLoggedIn());
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (loggedAdmin) {
      Admin.logOut(loggedAdmin);
      setLoggedAdmin(null);
      navigate("/login");
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh" overflow="scroll">
        <Routes>
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route
            path="login"
            element={
              <LoginAdminPage onLogin={setLoggedAdmin} loggedAdmin={loggedAdmin} />
            }
          />
          <Route
            path="users"
            element={<UsersPage onLogOut={handleLogOut} loggedAdmin={loggedAdmin} />}
          />
          <Route
            path="users/:id"
            element={
              <UserDashboardPage onLogOut={handleLogOut} loggedAdmin={loggedAdmin} />
            }
          />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
