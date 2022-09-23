import {Heading, VStack} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as User from "services/User";
import * as Transaction from "services/Transaction";
import * as Transfer from "services/Transfer";
import CreditCard from "./components/CreditCard";
import TransactionTable from "./components/TransactionTable";
import TransferTable from "./components/TransferTable";
import ExpensesTable from "./components/ExpensesTable";

const UserDashboardPage = () => {
  const {id} = useParams();

  const [user, setUser] = useState(User.findById(id));

  const [transactions, setTransactions] = useState(Transaction.findAllByUser(user));
  const [newTransaction, setNewTransaction] = useState();

  const [transfers, setTransfers] = useState(Transfer.findAllByUser(user));
  const [newTransfer, setNewTransfer] = useState();

  useEffect(() => setTransactions(Transaction.findAllByUser(user)), [newTransaction]);
  useEffect(() => setTransfers(Transfer.findAllByUser(user)), [newTransfer]);

  // calculate user balance and update the current user
  useEffect(() => {
    const partialBalance = transactions.reduce((acc, transaction) => {
      const typeMap = {withdrawal: -1, deposit: 1};
      acc += transaction.amount * typeMap[transaction.type];
      return acc;
    }, user.startingBalance);

    const newBalance = transfers.reduce((acc, transfer) => {
      acc =
        transfer.fromUserId === user.id ? acc - transfer.amount : acc + transfer.amount;
      return acc;
    }, partialBalance);

    console.log(newBalance);

    User.update(user, {balance: newBalance});
    setUser(User.find(user));
  }, [transactions, transfers]);

  return (
    <MainLayout>
      <VStack w="full" flexGrow={1} gap={3}>
        <Heading as="h1" size="lg" textAlign="left" w="full">
          {user.firstName} {user.lastName}
        </Heading>
        <CreditCard
          user={user}
          onTransactionChange={setNewTransaction}
          onTransferChange={setNewTransfer}
        />
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
        <VStack w="full">
          <Heading as="h2" size="md" w="full" textAlign="left">
            Transfers
          </Heading>
          <TransferTable transfers={transfers} user={user} />
        </VStack>
      </VStack>
    </MainLayout>
  );
};

export default UserDashboardPage;
