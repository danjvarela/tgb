import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import {MdDelete} from "react-icons/md";
import * as Expense from "services/Expense";
import EditExpenseForm from "./components/EditExpenseForm";

const ExpenseTable = ({expenses, onExpenseChange}) => {
  const deleteExpense = (expense) => () => {
    Expense.delete(expense);
    if (onExpenseChange) onExpenseChange(expense);
  };

  return (
    <TableContainer
      borderWidth={1}
      w="full"
      borderRadius="lg"
      maxH={48}
      overflowY="scroll"
    >
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((expense) => {
              const {description, amount, createdAt, id} = expense;
              return (
                <Tr key={id}>
                  <Td>{description}</Td>
                  <Td>
                    {amount.toLocaleString(undefined, {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </Td>
                  <Td>{new Date(createdAt).toLocaleString()}</Td>
                  <Td>
                    <IconButton
                      icon={<MdDelete />}
                      variant="ghost"
                      isRound
                      size="sm"
                      onClick={deleteExpense(expense)}
                    />
                    <EditExpenseForm
                      expense={expense}
                      onExpenseChange={onExpenseChange}
                    />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
