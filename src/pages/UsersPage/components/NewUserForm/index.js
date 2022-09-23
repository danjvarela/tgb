import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import CustomInput from "components/CustomInput";
import * as User from "services/User";
import {pipe} from "services/utilities";

const NewUserForm = ({onNewUser, loggedAdmin}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const createUser = (values) => {
    const saved = pipe(
      User.create,
      User.save
    )({
      ...values,
      admin: loggedAdmin,
    });
    if (onNewUser) onNewUser(saved);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" size="sm">
        New User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            startingBalance: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            startingBalance: Yup.number()
              .min(0, "Should be at least 0")
              .required("Starting balance is required"),
          })}
          onSubmit={createUser}
        >
          <Center as={Form} w="full">
            <ModalContent>
              <ModalHeader>New User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CustomInput label="First Name" name="firstName" type="text" />
                <CustomInput label="Last Name" name="lastName" type="text" />
                <CustomInput
                  label="Starting Balance"
                  name="startingBalance"
                  type="number"
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Center>
        </Formik>
      </Modal>
    </>
  );
};

export default NewUserForm;
