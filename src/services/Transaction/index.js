import {faker} from "@faker-js/faker";
import {getFromStorage} from "services/storage";

const create = (props) => {
  const {type, amount, user} = props;
  return {
    id: faker.finance.iban(false, "PH"),
    userId: user.id,
    type: type,
    amount: amount,
    createdAt: null,
  };
};

const all = getFromStorage("transactions") || [];

const findAllByUser = (user) => all().filter((value) => value.userId === user.id);

export {create, findAllByUser};
