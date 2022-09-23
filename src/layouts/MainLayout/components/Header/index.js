import {HStack, IconButton, Image, Text, useColorModeValue} from "@chakra-ui/react";
import ColorModeSwitcher from "components/ColorModeSwitcher";
import Grapes from "assets/grapes.svg";
import {FiLogOut} from "react-icons/fi";

const Header = ({onLogOut, loggedAdmin}) => {
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
      <HStack>
        <Text>{loggedAdmin?.username}</Text>
        <ColorModeSwitcher />
        <IconButton icon={<FiLogOut />} variant="ghost" onClick={onLogOut} />
      </HStack>
    </HStack>
  );
};

export default Header;
