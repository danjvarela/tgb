import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {useRef} from "react";
import * as User from "services/User";
import {pipe} from "services/utilities";

const DeleteUserDialog = ({user, onUserDelete}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = () => {
    pipe(User.delete, onUserDelete)(user);
    onClose();
  };

  return (
    <>
      <Link fontSize="sm" onClick={onOpen}>
        Delete
      </Link>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteUserDialog;
