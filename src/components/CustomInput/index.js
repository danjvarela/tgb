import React from "react";
import {useField} from "formik";
import {FormControl, FormErrorMessage, Input} from "@chakra-ui/react";

const CustomInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      {label ? <label htmlFor={props.id || props.name}>{label}</label> : null}
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
