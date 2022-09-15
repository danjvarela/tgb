import {
  HStack,
  Center,
  VStack,
  Text,
  useColorModeValue,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";
import {ColorModeSwitcher} from "ColorModeSwitcher";

const FormTemplate = ({title, inputs, buttonText, otherLink, ...otherProps}) => {
  const blackOrWhite = useColorModeValue("blackAlpha.", "whiteAlpha.");

  return (
    <Box w="full" h="full">
      <HStack justifyContent="flex-end" px={{base: 3, md: 9}} py={1} w="full">
        <ColorModeSwitcher />
      </HStack>
      <Center w="full" h="full" px={3}>
        <VStack
          w="full"
          maxW="sm"
          borderWidth={{base: 0, md: 1}}
          borderColor={`${blackOrWhite}300`}
          borderRadius="lg"
          px={5}
          py={9}
          gap={5}
          as="form"
          {...otherProps}
        >
          <Heading size="lg" textAlign="center" color={`${blackOrWhite}800`}>
            {title}
          </Heading>
          <VStack w="full">{inputs}</VStack>
          <VStack w="full">
            <Button w="full" colorScheme="blue" size="sm" type="submit">
              {buttonText}
            </Button>
            {otherLink ? <Text fontSize="sm">or {otherLink}</Text> : <></>}
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default FormTemplate;
