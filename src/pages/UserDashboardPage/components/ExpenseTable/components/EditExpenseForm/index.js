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
  IconButton,
} from "@chakra-ui/react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import CustomInput from "components/CustomInput";
import * as Expense from "services/Expense";
import {MdEdit} from "react-icons/md";
import {pipe} from "services/utilities";

const EditExpenseForm = ({expense, onExpenseChange}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const editExpense = (values) => {
    if (onExpenseChange) pipe(Expense.update(expense), onExpenseChange)(values);
    onClose();
  };

  return (
    <>
      <IconButton icon={<MdEdit />} variant="ghost" isRound size="sm" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            description: expense.description,
            amount: expense.amount,
          }}
          validationSchema={Yup.object({
            description: Yup.string().required("Description is required"),
            amount: Yup.number()
              .min(0, "Should be at least 0")
              .required("Amount is required"),
          })}
          onSubmit={editExpense}
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

export default EditExpenseForm;
