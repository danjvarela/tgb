const Card = {
  baseStyle: ({colorMode}) => ({
    borderWidth: 1,
    borderRadius: "lg",
    p: {base: 3, md: 5},
    bg: colorMode === "dark" ? "gray.700" : "gray.50",
    borderColor: colorMode === "dark" ? "gray.600" : "gray.300",
  }),
};

export default Card;
