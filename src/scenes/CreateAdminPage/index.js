import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import FormGroup from "components/FormGroup";
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
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("username")}}
        formLabel="Username"
        inputProps={{name: "username", onChange: handleChange, value: formData.username}}
        formErrorMessage={errorAt("username")}
      />
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("email")}}
        formLabel="Email"
        inputProps={{name: "email", onChange: handleChange, value: formData.email}}
        formErrorMessage={errorAt("email")}
      />
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("password")}}
        formLabel="Password"
        inputProps={{name: "password", onChange: handleChange, value: formData.password}}
        formErrorMessage={errorAt("password")}
      />
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("confirmPassword")}}
        formLabel="ConfirmPassword"
        inputProps={{
          name: "confirmPassword",
          onChange: handleChange,
          value: formData.confirmPassword,
        }}
        formErrorMessage={errorAt("confirmPassword")}
      />
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
