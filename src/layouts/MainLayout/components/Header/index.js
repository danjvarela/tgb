import {HStack, Image, Text, useColorModeValue} from "@chakra-ui/react";
import ColorModeSwitcher from "components/ColorModeSwitcher";
import Grapes from "assets/grapes.svg";

const Header = () => {
  const lightTheme = {
    borderBottomColor: "gray.300",
  };
  const darkTheme = {
    borderBottomColor: "gray.700",
  };
  const themeColors = useColorModeValue(lightTheme, darkTheme);

  return (
    <HStack
      justifyContent="space-between"
      px={{base: 3, md: 9}}
      py={1}
      w="full"
      borderBottomWidth={1}
      {...themeColors}
    >
      <HStack>
        <Image boxSize="5" src={Grapes} />
        <Text fontWeight="bold" fontSize="lg">
          The Grape Bank
        </Text>
      </HStack>
      <ColorModeSwitcher />
    </HStack>
  );
};

export default Header;
