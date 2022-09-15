import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import {render} from "@testing-library/react";
import FormTemplate from "components/FormTemplate";
import {useEffect, useState} from "react";
import Admin from "services/admins";
import {isEmpty, pipe} from "services/utilities";

const CreateAdminPage = () => {
  const colorModeAlpha = useColorModeValue("blackAlpha.", "whiteAlpha.");
  const linkColorAlpha = useColorModeValue("500", "200");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [admin, setAdmin] = useState({});
  const [renderInvalidInputs, setRenderInvalidInputs] = useState(false);

  useEffect(() => pipe(Admin.new, Admin.validate, setAdmin)(formData), [formData]);

  const hasErrorAt = (key) =>
    renderInvalidInputs && !isEmpty(admin.errors) && !isEmpty(admin.errors[key]);

  const errorAt = (key) => (hasErrorAt(key) ? admin.errors[key][0] : "");

  const handleChange = ({target: {name, value}}) => {
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Admin.hasError(admin)) setRenderInvalidInputs(true);
    Admin.save(admin);
  };

  const inputs = (
    <>
      <FormControl isRequired isInvalid={hasErrorAt("username")}>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Username
        </FormLabel>
        <Input
          variant="filled"
          size="sm"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <FormErrorMessage>{errorAt("username")}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={hasErrorAt("email")}>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Email
        </FormLabel>
        <Input
          variant="filled"
          size="sm"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <FormErrorMessage>{errorAt("email")}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={hasErrorAt("password")}>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Password
        </FormLabel>
        <Input
          variant="filled"
          size="sm"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <FormErrorMessage>{errorAt("password")}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={hasErrorAt("confirmPassword")}>
        <FormLabel color={`${colorModeAlpha}700`} fontSize="sm">
          Confirm Password
        </FormLabel>
        <Input
          variant="filled"
          size="sm"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <FormErrorMessage>{errorAt("confirmPassword")}</FormErrorMessage>
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
      onSubmit={handleSubmit}
      noValidate
    />
  );
};

export default CreateAdminPage;
