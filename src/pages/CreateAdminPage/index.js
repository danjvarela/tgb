import {Button, HStack, Link, VStack, Text, Alert, AlertIcon} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {Formik, Form} from "formik";
import {useState} from "react";
import FormsLayout from "layouts/FormsLayout";
import * as Yup from "yup";
import CustomPasswordInput from "components/CustomPasswordInput";
import CustomInput from "components/CustomInput";
import * as Admin from "services/Admin";

const CreateAdminPage = () => {
  const [adminExists, setAdminExists] = useState(false);

  const createAdmin = (values) => {
    const admin = Admin.create(values);
    const adminFromStorage = Admin.find(admin);
    if (adminFromStorage) return setAdminExists(true);
    Admin.save(admin);
  };

  return (
    <FormsLayout title="Create new Admin Account">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid Email").required("Email is required"),
          username: Yup.string().required("Username is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password should be atleast 6 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password confirmation must match the password")
            .required("Retype the Password for confirmation"),
        })}
        onSubmit={createAdmin}
      >
        <VStack as={Form} w="full" gap={5}>
          {adminExists ? (
            <Alert status="error">
              <AlertIcon />
              Admin with the same username or email already exists
            </Alert>
          ) : null}
          <VStack w="full">
            <CustomInput name="username" type="text" placeholder="Username" />
            <CustomInput name="email" type="text" placeholder="Email" />
            <CustomPasswordInput
              iconButton={{"aria-label": "Show Password", size: "sm"}}
              placeholder="Password"
              name="password"
            />
            <CustomPasswordInput
              iconButton={{"aria-label": "Show Password", size: "sm"}}
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </VStack>
          <VStack w="full">
            <Button colorScheme="purple" type="submit" w="full">
              Create
            </Button>
            <HStack>
              <Text opacity={0.6}>or</Text>
              <Link as={RouterLink} to="/login">
                Login to an existing Admin Account
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Formik>
    </FormsLayout>
  );
};

export default CreateAdminPage;
