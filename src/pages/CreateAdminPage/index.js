import {Button, Heading, VStack} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import FormsLayout from "layouts/FormsLayout";
import * as Yup from "yup";
import CustomPasswordInput from "components/CustomPasswordInput";
import CustomInput from "components/CustomInput";

const CreateAdminPage = () => {
  return (
    <FormsLayout>
      <Heading as="h1" fontSize="xl">
        Create new Admin Account
      </Heading>
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
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <VStack as={Form} w="full">
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
          <Button colorScheme="purple" type="submit" w="full" mt={9}>
            Create
          </Button>
        </VStack>
      </Formik>
    </FormsLayout>
  );
};

export default CreateAdminPage;
