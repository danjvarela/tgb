import {
  Button,
  useColorModeValue,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import ControlledInput from "components/ControlledInput";
import {useEffect, useState} from "react";
import Admin from "services/Admin";
import {isEmpty, pipe} from "services/utilities";

export default () => {
  const [renderErrors, setRenderErrors] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    pipe(Admin.new, Admin.validate, setAdmin)(formData);
  }, [formData]);

  const handleChange = ({target: {name, value}}) =>
    setFormData((prev) => ({...prev, [name]: value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedAdmin = Admin.save(admin);
    setAdmin(savedAdmin);
    if (Admin.hasError(savedAdmin)) return setRenderErrors(true);
    return setRenderErrors(false);
  };

  const hasErrorAt = (key) =>
    renderErrors && Admin.hasError(admin) && !isEmpty(admin.errors[key]);

  const errorAt = (key) => hasErrorAt(key) && admin.errors[key][0];

  const inputProps = {variant: "filled", borderWidth: 1, onChange: handleChange};

  return (
    <VStack as="form" w="full" gap={5} onSubmit={handleSubmit}>
      <VStack w="full">
        <FormControl isInvalid={hasErrorAt("username")}>
          <ControlledInput placeholder="Username" name="username" {...inputProps} />
          <FormErrorMessage>{errorAt("username")}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={hasErrorAt("email")}>
          <ControlledInput placeholder="Email" name="email" {...inputProps} />
          <FormErrorMessage>{errorAt("email")}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={hasErrorAt("password")}>
          <ControlledInput placeholder="Password" name="password" {...inputProps} />
          <FormErrorMessage>{errorAt("password")}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={hasErrorAt("confirmPassword")}>
          <ControlledInput
            placeholder="Confirm Password"
            name="confirmPassword"
            {...inputProps}
          />
          <FormErrorMessage>
            {errorAt("confirmPassword")
              ? "Password confirmation does not match the password"
              : ""}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button type="submit" w="full" colorScheme="purple">
        Create Account
      </Button>
    </VStack>
  );
};
