import {Heading, VStack} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as User from "services/User";
import * as Transaction from "services/Transaction";
import CreditCard from "./components/CreditCard";
import TransactionTable from "./components/TransactionTable";
import ExpensesTable from "./components/ExpensesTable";

const UserDashboardPage = () => {
  const {id} = useParams();

  const [user, setUser] = useState(User.findById(id));
  const [transactions, setTransactions] = useState(Transaction.findAllByUser(user));
  const [newTransaction, setNewTransaction] = useState();

  useEffect(() => setTransactions(Transaction.findAllByUser(user)), [newTransaction]);
  useEffect(() => {
    const transactionsTotal = transactions.reduce((acc, transaction) => {
      const typeMap = {withdrawal: -1, deposit: 1, transfer: -1};
      acc += transaction.amount * typeMap[transaction.type];
      return acc;
    }, 0);
    User.update(user, {balance: user.balance + transactionsTotal});
    setUser(User.find(user));
  }, [transactions]);

  return (
    <MainLayout>
      <VStack w="full" flexGrow={1} gap={3}>
        <Heading as="h1" size="lg" textAlign="left" w="full">
          {user.firstName} {user.lastName}
        </Heading>
        <CreditCard user={user} onTransactionChange={setNewTransaction} />
        <VStack w="full">
          <Heading as="h2" size="md" w="full" textAlign="left">
            Transactions
          </Heading>
          <TransactionTable transactions={transactions} />
        </VStack>
        <VStack w="full">
          <Heading as="h2" size="md" w="full" textAlign="left">
            Expenses
          </Heading>
          <ExpensesTable />
        </VStack>
      </VStack>
    </MainLayout>
  );
};

export default UserDashboardPage;
