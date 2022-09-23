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
import * as Transfer from "services/Transfer";
import {pipe} from "services/utilities";
import * as User from "services/User";

const TransferForm = ({user, onTransferChange}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const createTransfer = (values) => {
    pipe(
      Transfer.create,
      Transfer.save
    )({
      ...values,
      user: user,
      toUser: User.findById(values.toUserId),
      fromUser: user,
    });
    if (onTransferChange) onTransferChange(Transfer.findAllByUser(user));
    onClose();
  };

  const recipientUserIds = User.all().map((value) => value.id);

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="sm">
        Transfer
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            amount: "",
            toUserId: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .min(0, "Should be at least 0")
              .required("Amount is required"),
            toUserId: Yup.number()
              .required("Please input Recipient ID")
              .oneOf(recipientUserIds, "User with the given ID does not exist")
              .test(
                "toUserId",
                "Cannot send to the same user",
                (value, _) => value !== user.id
              ),
          })}
          onSubmit={createTransfer}
        >
          <Center as={Form} w="full">
            <ModalContent>
              <ModalHeader>Withdraw</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CustomInput label="Enter Amount" name="amount" type="number" />
                <CustomInput
                  label="Transfer to"
                  name="toUserId"
                  type="number"
                  placeholder="Recipient User ID"
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

export default TransferForm;
