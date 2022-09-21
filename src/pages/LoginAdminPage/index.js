import {Button, HStack, VStack, Text, Link} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import {Link as RouterLink} from "react-router-dom";
import FormsLayout from "layouts/FormsLayout";
import * as Yup from "yup";
import CustomPasswordInput from "components/CustomPasswordInput";
import CustomInput from "components/CustomInput";

const LoginAdminPage = () => {
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
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <VStack as={Form} w="full" gap={5}>
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
