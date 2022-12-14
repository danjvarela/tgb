const Card = {
  baseStyle: ({colorMode}) => ({
    borderWidth: 1,
    borderRadius: "lg",
    px: {base: 3, md: 5},
    py: 5,
    gap: 5,
    bg: colorMode === "dark" ? "gray.700" : "whiteAlpha.700",
    borderColor: colorMode === "dark" ? "gray.600" : "gray.300",
  }),
};

export default Card;
