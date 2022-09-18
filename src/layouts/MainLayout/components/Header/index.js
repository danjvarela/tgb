import {HStack, Image, Text} from "@chakra-ui/react";
import {ColorModeSwitcher} from "components/ColorModeSwitcher";
import grapes from "assets/grapes.svg";

const Header = () => {
  return (
    <HStack
      justifyContent="space-between"
      px={{base: 3, md: 9}}
      py={2}
      w="full"
      borderBottomWidth={1}
      borderBottomColor="gray.600"
    >
      <HStack>
        <Image src={grapes} boxSize={5} />
        <Text fontWeight="bold" fontSize="lg">
          The Grape Bank
        </Text>
      </HStack>
      <ColorModeSwitcher />
    </HStack>
  );
};

export default Header;
