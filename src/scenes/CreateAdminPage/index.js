import {FormControl, FormLabel, Input, useColorModeValue, Link} from "@chakra-ui/react";
import FormTemplate from "components/FormTemplate";

const CreateAdminPage = () => {
  const colorModeAlpha = useColorModeValue("blackAlpha.", "whiteAlpha.");
  const linkColorAlpha = useColorModeValue("500", "200");

  const inputs = (
    <>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Username
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Email
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Password
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Confirm Password
        </FormLabel>
        <Input variant="filled" size="sm" />
      </FormControl>
    </>
  );

  const otherLink = (
    <Link color={`blue.${linkColorAlpha}`}>Login to existing Admin account</Link>
  );

  return (
    <FormTemplate
      title="Create new Admin account"
      buttonText="Create"
      inputs={inputs}
      otherLink={otherLink}
    />
  );
};

export default CreateAdminPage;
