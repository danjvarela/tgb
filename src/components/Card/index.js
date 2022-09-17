import {Center, useColorModeValue} from "@chakra-ui/react";

export default ({children, ...otherProps}) => {
  const darkTheme = {
    borderColor: "gray.600",
    bg: "gray.700",
  };

  const lightTheme = {
    borderColor: "gray.300",
    bg: "gray.50",
  };
  const themeColor = useColorModeValue(lightTheme, darkTheme);

  return (
    <Center {...themeColor} borderWidth={1} borderRadius="lg" p={5} {...otherProps}>
      {children}
    </Center>
  );
};
