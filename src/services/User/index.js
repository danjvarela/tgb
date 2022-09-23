import {getFromStorage, saveToStorage} from "services/storage";
import {isEmpty, pipe, curry} from "services/utilities";
import {faker} from "@faker-js/faker";

const create = (props) => {
  const {firstName, lastName, startingBalance, admin} = props;
  const issuer = faker.finance.creditCardIssuer();
  return {
    firstName,
    lastName,
    startingBalance,
    adminId: admin.id,
    balance: startingBalance,
    createdAt: null,
    id: null,
    cardIssuer: issuer,
    cardNumber: faker.finance.creditCardNumber(issuer),
    cardCVV: faker.finance.creditCardCVV(),
  };
};

const all = () => getFromStorage("users") || [];

const find = (user) => all().find((value) => value.id === parseInt(user.id));
const findById = (id) => all().find((value) => value.id === parseInt(id));

const save = (user) => {
  const users = all();
  const lastId = isEmpty(users) ? 0 : Math.max(...users.map((user) => user.id));
  const completedUser = {...user, createdAt: Date.now(), id: lastId + 1};
  saveToStorage("users", [...users, completedUser]);
  return completedUser;
};

const update = curry((user, newValues) => {
  const users = all();
  const index = users.findIndex((value) => value.id === user.id);
  users[index] = {...users[index], ...newValues};
  saveToStorage("users", users);
  return users[index];
});

const seed = (count, currentAdmin) => {
  saveToStorage("users", []);
  const name = faker.name;
  [...Array(count)].map(() =>
    pipe(
      create,
      save
    )({
      firstName: name.firstName(),
      lastName: name.lastName(),
      startingBalance: 4500,
      adminId: currentAdmin.id,
    })
  );
};

export {create, all, find, findById, save, seed, update};
