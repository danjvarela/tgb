import {
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import * as User from "services/User";
import CreditCard from "./components/CreditCard";
import TransactionTable from "./components/TransactionTable";

const UserDashboardPage = () => {
  const {id} = useParams();
  const user = User.findById(id);

  return (
    <MainLayout>
      <VStack w="full" flexGrow={1} gap={3}>
        <Heading as="h1" size="lg" textAlign="left" w="full">
          {user.firstName} {user.lastName}
        </Heading>
        <CreditCard user={user} />
        <Heading as="h2" size="md" w="full" textAlign="left">
          Transactions
        </Heading>
        <TransactionTable />
        <Heading as="h2" size="md" w="full" textAlign="left">
          Expenses
        </Heading>
        <TableContainer borderWidth={1} w="full" maxH="md" borderRadius="lg">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>232334535434534</Td>
                <Td>Withdraw</Td>
                <Td>120</Td>
                <Td>{Date.now()}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </MainLayout>
  );
};

export default UserDashboardPage;
