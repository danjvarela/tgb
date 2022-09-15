import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";

const FormGroup = (props) => {
  const {formControlProps, formLabel, inputProps, formErrorMessage} = props;
  const colorModeAlpha = useColorModeValue("blackAlpha.", "whiteAlpha.");

  return (
    <FormControl {...formControlProps}>
      <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
        {formLabel}
      </FormLabel>
      <Input variant="filled" size="sm" {...inputProps} />
      <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormGroup;
