import {Button, HStack, Link, VStack, Text, Alert, AlertIcon} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import FormsLayout from "layouts/FormsLayout";
import * as Yup from "yup";
import CustomPasswordInput from "components/CustomPasswordInput";
import CustomInput from "components/CustomInput";
import * as Admin from "services/Admin";

const LoginAdminPage = ({onLogin, loggedAdmin}) => {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate("/users");

  // navigate to users if there is a logged admin
  useEffect(() => {
    if (loggedAdmin) navigate("/users");
  }, [loggedAdmin]);

  const login = (values) => {
    const {usernameOrEmail, password} = values;
    const adminFromStorage =
      Admin.findByUsername(usernameOrEmail) || Admin.findByEmail(usernameOrEmail);
    if (!adminFromStorage)
      return setErrorMsg("Admin with the given username or email does not exist");
    if (adminFromStorage.password !== password) return setErrorMsg("Incorrect password");
    onLogin(Admin.logIn(adminFromStorage));
    setErrorMsg(null);
  };

  return (
    <FormsLayout title="Login to TGB">
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        validationSchema={Yup.object({
          usernameOrEmail: Yup.string().required("Username or email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={login}
      >
        <VStack as={Form} w="full" gap={5}>
          {errorMsg ? (
            <Alert status="error">
              <AlertIcon />
              {errorMsg}
            </Alert>
          ) : null}
          <VStack w="full">
            <CustomInput name="usernameOrEmail" placeholder="Username or Email" />
            <CustomPasswordInput
              iconButton={{"aria-label": "Show Password", size: "sm"}}
              placeholder="Password"
              name="password"
            />
          </VStack>
          <VStack w="full">
            <Button colorScheme="purple" type="submit" w="full">
              Login
            </Button>
            <HStack>
              <Text opacity={0.6}>or</Text>
              <Link as={RouterLink} to="/create-admin">
                Create a new Admin Account
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Formik>
    </FormsLayout>
  );
};

export default LoginAdminPage;
