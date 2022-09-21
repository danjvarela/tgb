import {useStyleConfig, VStack} from "@chakra-ui/react";

const Card = (props) => {
  const {baseStyle, ...rest} = props;
  const styles = useStyleConfig("Card", {baseStyle});
  return <VStack __css={styles} {...rest} />;
};

export default Card;
