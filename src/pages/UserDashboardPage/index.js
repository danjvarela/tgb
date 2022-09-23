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
import ExpensesTable from "./components/ExpensesTable";

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
        <ExpensesTable />
      </VStack>
    </MainLayout>
  );
};

export default UserDashboardPage;
