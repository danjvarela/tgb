import {FormControl, FormLabel, Input, useColorModeValue, Link} from "@chakra-ui/react";
import FormTemplate from "components/FormTemplate";

const LoginAdminPage = () => {
  const colorModeAlpha = useColorModeValue("blackAlpha.", "whiteAlpha.");
  const linkColorAlpha = useColorModeValue("500", "200");

  const inputs = (
    <>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Username or Email
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Password
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
    </>
  );

  const otherLink = (
    <Link color={`blue.${linkColorAlpha}`}>Create new Admin Account</Link>
  );

  return (
    <FormTemplate
      title="Login to an Admin Account"
      buttonText="Login"
      inputs={inputs}
      otherLink={otherLink}
    />
  );
};

export default LoginAdminPage;
