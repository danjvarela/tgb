import {useState} from "react";
import {useColorModeValue, Link} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import FormGroup from "components/FormGroup";
import FormTemplate from "components/FormTemplate";
import Admin from "services/admins";
import {isEmpty} from "services/utilities";

const LoginAdminPage = () => {
  const linkColorAlpha = useColorModeValue("500", "200");

  const [loggedInAdmin, setLoggedInAdmin] = useState({});
  const [errors, setErrors] = useState({});
  const [renderErrors, setRenderErrors] = useState(false);

  const hasErrorAt = (key) => renderErrors && !isEmpty(errors) && !isEmpty(errors[key]);
  const errorAt = (key) => (hasErrorAt(key) ? errors[key][0] : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {usernameOrEmail, password} = Object.fromEntries(formData.entries());
    const admin = Admin.logIn({
      email: usernameOrEmail,
      username: usernameOrEmail,
      password: password,
    });

    if (Admin.hasError(admin)) {
      setRenderErrors(true);
      setErrors(admin.errors);
    }

    setLoggedInAdmin(admin);
    setRenderErrors(false);
  };

  const inputs = (
    <>
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("base")}}
        formLabel="Username or Email"
        inputProps={{name: "usernameOrEmail"}}
        formErrorMessage={errorAt("base")}
      />
      <FormGroup
        formControlProps={{isRequired: true, isInvalid: hasErrorAt("password")}}
        formLabel="Password"
        inputProps={{name: "password"}}
        formErrorMessage={errorAt("password")}
      />
    </>
  );

  const otherLink = (
    <Link as={RouterLink} to="/create-admin" color={`blue.${linkColorAlpha}`}>
      Create new Admin Account
    </Link>
  );

  return (
    <FormTemplate
      title="Log in to TGB"
      buttonText="Login"
      inputs={inputs}
      otherLink={otherLink}
      onSubmit={handleSubmit}
      noValidate
    />
  );
};

export default LoginAdminPage;
