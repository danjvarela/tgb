import {Input, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";

export default ({onChange, ...otherProps}) => {
  const [value, setValue] = useState("");
  const lightTheme = {
    borderColor: "gray.300",
    _hover: {borderColor: "gray.400"},
    focusBorderColor: "purple.500",
    bg: "gray.200",
  };
  const darkTheme = {
    borderColor: "gray.600",
    _hover: {borderColor: "gray.500"},
    focusBorderColor: "purple.300",
  };
  const themeColors = useColorModeValue(lightTheme, darkTheme);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return <Input value={value} onChange={handleChange} {...themeColors} {...otherProps} />;
};
