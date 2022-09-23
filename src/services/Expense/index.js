import {getFromStorage, saveToStorage} from "services/storage";
import {v4 as uuidv4} from "uuid";
import {curry} from "services/utilities";

const all = () => getFromStorage("expenses") || [];

const create = (props) => {
  const {description, amount, user} = props;
  return {
    description,
    amount,
    userId: user.id,
    id: uuidv4(),
    createdAt: null,
  };
};

const findAllByUser = (user) => all().filter((value) => value.userId === user.id);

const save = (expense) => {
  const completedExpense = {...expense, createdAt: Date.now()};
  saveToStorage("expenses", [...all(), completedExpense]);
  return completedExpense;
};

const update = curry((expense, newValues) => {
  const expenses = all();
  const index = expenses.findIndex((value) => value.id === expense.id);
  expenses[index] = {...expenses[index], ...newValues};
  saveToStorage("expenses", expenses);
  return expenses[index];
});

const deleteExpense = (expense) => {
  const remainingExpenses = all().filter((value) => value.id !== expense.id);
  saveToStorage("expenses", remainingExpenses);
};

export {create, save, all, deleteExpense as delete, update, findAllByUser};
