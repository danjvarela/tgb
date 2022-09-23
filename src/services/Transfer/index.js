import {getFromStorage, saveToStorage} from "services/storage";
import {pipe} from "services/utilities";
import {v4 as uuidv4} from "uuid";
import * as User from "services/User";

const create = (props) => {
  const {amount, user, toUser, fromUser} = props;
  return {
    id: uuidv4(),
    userId: user.id,
    toUserId: toUser?.id,
    fromUserId: fromUser?.id,
    amount: amount,
    createdAt: null,
  };
};

const all = () => getFromStorage("transfers") || [];

const findAllByUser = (user) => all().filter((value) => value.userId === user.id);

const save = (transfer) => {
  const transfers = all();
  const completedTransfer = {...transfer, createdAt: Date.now()};
  const receiveTransfer = {
    ...completedTransfer,
    userId: transfer.toUserId,
  };
  saveToStorage("transfers", [...transfers, completedTransfer, receiveTransfer]);
  return completedTransfer;
};

export {create, findAllByUser, save};
