import {Button, Heading, VStack, HStack} from "@chakra-ui/react";
import MainLayout from "layouts/MainLayout";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as User from "services/User";
import * as Transaction from "services/Transaction";
import * as Transfer from "services/Transfer";
import * as Expense from "services/Expense";
import CreditCard from "./components/CreditCard";
import TransactionTable from "./components/TransactionTable";
import TransferTable from "./components/TransferTable";
import ExpenseTable from "./components/ExpenseTable";
import NewExpenseForm from "./components/ExpenseTable/components/NewExpenseForm";

const UserDashboardPage = ({onLogOut}) => {
  const {id} = useParams();

  const [user, setUser] = useState(User.findById(id));

  const [transactions, setTransactions] = useState(Transaction.findAllByUser(user));
  const [newTransaction, setNewTransaction] = useState();

  const [transfers, setTransfers] = useState(Transfer.findAllByUser(user));
  const [newTransfer, setNewTransfer] = useState();

  const [expenses, setExpenses] = useState(Expense.findAllByUser(user));
  const [newExpense, setNewExpense] = useState();

  useEffect(() => setTransactions(Transaction.findAllByUser(user)), [newTransaction]);
  useEffect(() => setTransfers(Transfer.findAllByUser(user)), [newTransfer]);
  useEffect(() => setExpenses(Expense.findAllByUser(user)), [newExpense]);

  // calculate user balance and update the current user
  useEffect(() => {
    // accumulate transaction amounts
    let newBalance = transactions.reduce((acc, transaction) => {
      const typeMap = {withdrawal: -1, deposit: 1};
      acc += transaction.amount * typeMap[transaction.type];
      return acc;
    }, user.startingBalance);

    //accumulate transfer amounts
    newBalance = transfers.reduce((acc, transfer) => {
      acc =
        transfer.fromUserId === user.id ? acc - transfer.amount : acc + transfer.amount;
      return acc;
    }, newBalance);

    // accumulate expense amounts
    newBalance = expenses.reduce((acc, expense) => {
      acc -= expense.amount;
      return acc;
    }, newBalance);

    User.update(user, {balance: newBalance});
    setUser(User.find(user));
  }, [transactions, transfers, expenses]);

  return (
    <MainLayout onLogOut={onLogOut}>
      <VStack w="full" flexGrow={1} gap={3} pb={5}>
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
          <HStack w="full" justifyContent="space-between">
            <Heading as="h2" size="md" textAlign="left">
              Expenses
            </Heading>
            <NewExpenseForm user={user} onExpenseCreated={setNewExpense} />
          </HStack>
          <ExpenseTable expenses={expenses} onExpenseChange={setNewExpense} />
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
