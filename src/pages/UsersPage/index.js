import {Table, Tbody, TableContainer} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import UserItem from "./components/UserItem";

const UsersPage = ({users}) => {
  console.log(users);
  return (
    <MainLayout>
      <TableContainer w="full" maxH="full" overflowY="auto">
        <Table variant="simple">
          <Tbody>
            {users
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((user) => (
                <UserItem user={user} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default UsersPage;
