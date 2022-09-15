import React from "react";
import {ChakraProvider, Box, HStack, extendTheme, VStack} from "@chakra-ui/react";
import {ColorModeSwitcher} from "ColorModeSwitcher";
import {Routes, Route} from "react-router-dom";
import LoginAdminPage from "scenes/LoginAdminPage";
import CreateAdminPage from "scenes/CreateAdminPage";
import Home from "scenes/Home";

const theme = extendTheme({
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh">
        <HStack justifyContent="flex-end" px={9} py={1} w="full">
          <ColorModeSwitcher />
        </HStack>
        <Box w="full" h="full" px={3}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create-admin" element={<CreateAdminPage />} />
            <Route path="login" element={<LoginAdminPage />} />
          </Routes>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
