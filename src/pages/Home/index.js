import {Box, HStack} from "@chakra-ui/react";
import {ColorModeSwitcher} from "ColorModeSwitcher";

const Home = () => {
  return (
    <Box w="full" h="full">
      <HStack justifyContent="flex-end" px={{base: 3, md: 9}} py={1} w="full">
        <ColorModeSwitcher />
      </HStack>
      This is home
    </Box>
  );
};

export default Home;
