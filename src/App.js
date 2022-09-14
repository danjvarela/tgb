import React from "react";
import {ChakraProvider, Box, HStack, theme, VStack} from "@chakra-ui/react";
import {ColorModeSwitcher} from "ColorModeSwitcher";
// import CreateAdminPage from "scenes/CreateAdminPage";
import LoginAdminPage from "scenes/LoginAdminPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack w="full" h="100vh">
        <HStack justifyContent="flex-end" px={9} py={1} w="full">
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <Box w="full" h="full" px={3}>
          <LoginAdminPage />
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
