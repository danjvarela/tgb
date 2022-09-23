import React from "react";
import {useField} from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

const CustomInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      {label ? <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel> : null}
      <Input variant="filled" {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
