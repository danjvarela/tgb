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
import * as Expense from "services/Expense";
import {pipe} from "services/utilities";

const NewExpenseForm = ({user, onExpenseCreated}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const createExpense = (values) => {
    const saved = pipe(Expense.create, Expense.save)({...values, user: user});
    if (onExpenseCreated) onExpenseCreated(saved);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" size="sm">
        New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            description: "",
            amount: "",
          }}
          validationSchema={Yup.object({
            description: Yup.string().required("Description is required"),
            amount: Yup.number()
              .min(0, "Should be at least 0")
              .required("Amount is required"),
          })}
          onSubmit={createExpense}
        >
          <Center as={Form} w="full">
            <ModalContent>
              <ModalHeader>New Expense</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CustomInput label="Description" name="description" type="text" />
                <CustomInput label="Amount" name="amount" type="number" />
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

export default NewExpenseForm;
