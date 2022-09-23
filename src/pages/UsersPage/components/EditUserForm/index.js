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
  Link,
} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import CustomInput from "components/CustomInput";
import * as User from "services/User";
import {pipe} from "services/utilities";

const EditUserForm = ({user, onUserUpdate}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const editUser = (values) => {
    pipe(User.update(user), onUserUpdate)(values);
    onClose();
  };

  return (
    <>
      <Link fontSize="sm" onClick={onOpen}>
        Update
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
          })}
          onSubmit={editUser}
        >
          <Center as={Form} w="full">
            <ModalContent>
              <ModalHeader>Update User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CustomInput label="First Name" name="firstName" type="text" />
                <CustomInput label="Last Name" name="lastName" type="text" />
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

export default EditUserForm;
