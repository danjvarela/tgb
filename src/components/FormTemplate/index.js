import {Center, VStack, Text, useColorModeValue, Heading, Button} from "@chakra-ui/react";

const FormTemplate = ({title, inputs, buttonText, otherLink}) => {
  const blackOrWhite = useColorModeValue("blackAlpha.", "whiteAlpha.");
  return (
    <Center w="full" h="full">
      <VStack
        w="full"
        maxW="sm"
        borderWidth={{base: 0, md: 1}}
        borderColor={`${blackOrWhite}300`}
        borderRadius="lg"
        px={5}
        py={9}
        gap={5}
      >
        <Heading size="lg" color={`${blackOrWhite}800`}>
          {title}
        </Heading>
        <VStack w="full">{inputs}</VStack>
        <VStack w="full">
          <Button w="full" colorScheme="blue" size="sm">
            {buttonText}
          </Button>
          {otherLink ? <Text fontSize="sm">or {otherLink}</Text> : <></>}
        </VStack>
      </VStack>
    </Center>
  );
};

export default FormTemplate;
