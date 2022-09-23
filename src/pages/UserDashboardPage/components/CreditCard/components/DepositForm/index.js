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
import * as Transaction from "services/Transaction";
import {pipe} from "services/utilities";

const DepositForm = ({user, onTransactionChange}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const createTransaction = (values) => {
    const saved = pipe(
      Transaction.create,
      Transaction.save
    )({
      ...values,
      type: "deposit",
      user: user,
    });
    if (onTransactionChange) onTransactionChange(saved);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" size="sm">
        Deposit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .min(0, "Should be at least 0")
              .required("Amount is required"),
          })}
          onSubmit={createTransaction}
        >
          <Center as={Form} w="full">
            <ModalContent>
              <ModalHeader>Deposit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CustomInput label="Enter Amount" name="amount" type="number" />
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

export default DepositForm;
