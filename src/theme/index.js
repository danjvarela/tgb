import {extendTheme} from "@chakra-ui/react";
import Card from "./Card.js";
import breakpoints from "./breakpoints.js";

const theme = extendTheme({
  breakpoints,
  components: {
    Card,
  },
});

export default theme;
