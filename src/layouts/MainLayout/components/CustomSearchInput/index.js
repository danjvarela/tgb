import {InputGroup, InputRightElement, Input, useColorModeValue} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";

const CustomSearchInput = (props) => {
  const lightTheme = {
    borderColor: "gray.300",
  };
  const darkTheme = {
    borderColor: "gray.700",
  };
  const themeColors = useColorModeValue(lightTheme, darkTheme);

  return (
    <InputGroup w="25%" minW="2xs">
      <Input
        placeholder="Search Users"
        size="md"
        borderRadius="full"
        {...themeColors}
        {...props}
      />
      <InputRightElement>
        <FaSearch />
      </InputRightElement>
    </InputGroup>
  );
};

export default CustomSearchInput;
