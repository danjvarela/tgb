import {getFromStorage, saveToStorage} from "services/storage";
import {isEmpty, pipe} from "services/utilities";
import {faker} from "@faker-js/faker";

const create = (props) => {
  const {firstName, lastName, balance, createdBy} = props;
  return {
    firstName,
    lastName,
    balance,
    createdBy,
    createdAt: null,
    id: null,
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
      balance: 4500,
      createdBy: currentAdmin.id,
    })
  );
};

export {create, all, find, findById, save, seed};
