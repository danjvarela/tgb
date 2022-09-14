import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const LoginAdminPage = () => {
  const colorModeAlpha = useColorModeValue("blackAlpha.", "whiteAlpha.");

  return (
    <Center w="full" h="full">
      <VStack
        w="full"
        maxW="sm"
        borderWidth={1}
        borderColor={`${colorModeAlpha}300`}
        borderRadius="lg"
        px={5}
        py={9}
        gap={[3, 5]}
      >
        <Heading size="lg" color={`${colorModeAlpha}800`}>
          Login to Admin Account
        </Heading>
        <VStack w="full">
          <FormControl isRequired>
            <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
              Username or Email
            </FormLabel>
            <Input variant="filled" size="sm" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
              Password
            </FormLabel>
            <Input variant="filled" size="sm" />
          </FormControl>
        </VStack>
        <Button w="full" colorScheme="blue" size="sm">
          Create
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginAdminPage;
