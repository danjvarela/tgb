import {getFromStorage, saveToStorage} from "services/storage";
import {v4 as uuidv4} from "uuid";

const create = (props) => {
  const {type, amount, user, toUser} = props;
  return {
    id: uuidv4(),
    userId: user.id,
    toUserId: toUser?.id,
    type: type,
    amount: amount,
    createdAt: null,
  };
};

const all = () => getFromStorage("transactions") || [];

const findAllByUser = (user) => all().filter((value) => value.userId === user.id);

const save = (transaction) => {
  const completedTransaction = {...transaction, createdAt: Date.now()};
  saveToStorage("transactions", [...all(), completedTransaction]);
  return completedTransaction;
};

export {create, findAllByUser, save};
