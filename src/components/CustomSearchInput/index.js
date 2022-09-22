import {
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";

const CustomSearchInput = () => {
  const lightTheme = {
    borderColor: "gray.300",
  };
  const darkTheme = {
    borderColor: "gray.700",
  };
  const themeColors = useColorModeValue(lightTheme, darkTheme);

  return (
    <InputGroup w="25%" minW="2xs">
      <Input placeholder="Search Users" size="md" borderRadius="full" {...themeColors} />
      <InputRightElement>
        <IconButton
          aria-label="Search Users"
          icon={<FaSearch />}
          size="xs"
          variant="ghost"
          isRound
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default CustomSearchInput;
