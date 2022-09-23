import {Table, Tbody, TableContainer, Heading, HStack} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import UserItem from "./components/UserItem";
import NewUserForm from "./components/NewUserForm";
import {useEffect, useState} from "react";
import * as User from "services/User";

const UsersPage = ({onLogOut, loggedAdmin}) => {
  const [newUser, setNewUser] = useState();
  const [users, setUsers] = useState(User.all());

  useEffect(() => setUsers(User.all()), [newUser]);

  return (
    <MainLayout onLogOut={onLogOut} loggedAdmin={loggedAdmin}>
      <HStack w="full" justifyContent="space-between">
        <Heading as="h1" size="lg">
          Users
        </Heading>
        <NewUserForm onNewUser={setNewUser} loggedAdmin={loggedAdmin} />
      </HStack>
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
