import React from "react";
import {ChakraProvider, extendTheme, VStack} from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import CreateAdminPage from "pages/CreateAdminPage";
import LoginAdminPage from "pages/LoginAdminPage";

const theme = extendTheme({
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh">
        <Routes>
          <Route path="create-admin" element={<CreateAdminPage />} />
          <Route path="login" element={<LoginAdminPage />} />
        </Routes>
      </VStack>
    </ChakraProvider>
  );
};

export default App;
