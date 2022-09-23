import {Table, Tbody, TableContainer} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import UserItem from "./components/UserItem";

const UsersPage = ({users, onLogOut, loggedAdmin}) => {
  return (
    <MainLayout onLogOut={onLogOut} loggedAdmin={loggedAdmin}>
      <TableContainer w="full" maxH="full" overflowY="auto">
        <Table variant="simple">
          <Tbody>
            {users
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default UsersPage;
