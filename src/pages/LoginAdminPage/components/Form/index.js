import {
  Button,
  useColorModeValue,
  VStack,
  FormControl,
  FormErrorMessage,
  Text,
  Link,
} from "@chakra-ui/react";
import ControlledInput from "components/ControlledInput";
import {useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import Admin from "services/Admin";
import {isEmpty} from "services/utilities";

export default () => {
  const [renderErrors, setRenderErrors] = useState(false);
  const [loginProps, setLoginProps] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  // const [loggedAdmin, setLoggedAdmin] = useState();

  const handleChange = ({target: {name, value}}) =>
    setLoginProps((prev) => ({...prev, [name]: value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const tryLogin = Admin.logIn(loginProps);
    if (Admin.hasError(tryLogin)) {
      setRenderErrors(true);
      setErrors(tryLogin.errors);
    } else {
      setRenderErrors(false);
    }
  };

  const hasErrorAt = (key) => renderErrors && !isEmpty(errors) && !isEmpty(errors[key]);

  const errorAt = (key) => hasErrorAt(key) && errors[key][0];

  const inputProps = {variant: "filled", borderWidth: 1};
  const linkColor = useColorModeValue("purple.600", "purple.400");

  return (
    <VStack as="form" w="full" gap={5} onSubmit={handleSubmit}>
      <VStack w="full">
        <FormControl isInvalid={hasErrorAt("usernameOrEmail")}>
          <ControlledInput
            placeholder="Username or Email"
            name="usernameOrEmail"
            onChange={handleChange}
            {...inputProps}
          />
          <FormErrorMessage>{errorAt("usernameOrEmail")}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={hasErrorAt("password")}>
          <ControlledInput
            placeholder="Password"
            name="password"
            onChange={handleChange}
            {...inputProps}
          />
          <FormErrorMessage>{errorAt("password")}</FormErrorMessage>
        </FormControl>
      </VStack>
      <VStack w="full">
        <Button type="submit" w="full" colorScheme="purple">
          Login
        </Button>
        <Text fontSize="sm">
          or{" "}
          <Link as={RouterLink} to="/create-admin" color={linkColor}>
            Create a new Admin Account
          </Link>
        </Text>
      </VStack>
    </VStack>
  );
};
