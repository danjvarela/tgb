import {getFromStorage, saveToStorage} from "services/storage";
import {curry} from "services/utilities";

const create = (props) => {
  const {email, username, password} = props;
  return {
    email,
    username,
    password,
    isLoggedIn: false,
    createdAt: null,
    id: null,
  };
};

const all = () => getFromStorage("admins") || [];

const findBy = curry((key, value) => all().find((admin) => admin[key] === value));
const findById = findBy("id");
const findByEmail = (email) => findBy("email")(email.toLowerCase());
const findByUsername = (username) => findBy("username")(username.toLowerCase());

const find = (admin) =>
  findById(admin.id) || findByEmail(admin.email) || findByUsername(admin.username);

const save = (admin) => {
  const {username, email} = admin;
  const admins = all();
  const lastId = Math.max(...admins.map((admin) => admin.id));

  const completedAdmin = {
    ...admin,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    id: lastId + 1,
    createdAt: Date.now(),
  };

  saveToStorage("admins", [...admins, completedAdmin]);
};

export {all, find, findBy, findById, findByEmail, findByUsername, save, create};
