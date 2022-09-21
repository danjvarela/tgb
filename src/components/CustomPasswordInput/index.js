import React, {useState} from "react";
import {useField} from "formik";
import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const CustomInput = ({label, iconButton, ...props}) => {
  const [field, meta] = useField(props);
  const [type, setType] = useState("password");

  const handleIconClick = () =>
    setType((prevType) => (prevType === "password" ? "text" : "password"));

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      {label ? <label htmlFor={props.id || props.name}>{label}</label> : null}
      <InputGroup>
        <Input type={type} {...field} {...props} />
        <InputRightElement
          children={
            <IconButton
              icon={type === "password" ? <FaEye /> : <FaEyeSlash />}
              variant="ghost"
              isRound
              onClick={handleIconClick}
              {...iconButton}
            />
          }
        />
      </InputGroup>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
