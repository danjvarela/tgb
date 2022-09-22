import {getFromStorage, saveToStorage} from "services/storage";
import {curry, isEmpty} from "services/utilities";

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
const findById = (id) => findBy("id")(parseInt(id));
const findByEmail = (email) => findBy("email")(email.toLowerCase());
const findByUsername = (username) => findBy("username")(username.toLowerCase());

const find = (admin) =>
  findById(admin.id) || findByEmail(admin.email) || findByUsername(admin.username);

const save = (admin) => {
  const {username, email} = admin;
  const admins = all();
  const lastId = isEmpty(admins) ? -1 : Math.max(...admins.map((admin) => admin.id));

  const completedAdmin = {
    ...admin,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    id: lastId + 1,
    createdAt: Date.now(),
  };

  saveToStorage("admins", [...admins, completedAdmin]);
  return completedAdmin;
};

const update = curry((admin, newValues) => {
  const admins = all();
  const index = admins.findIndex((value) => value.id === admin.id);
  admins[index] = {...admins[index], ...newValues};
  saveToStorage("admins", admins);
  return admins[index];
});

const logIn = (admin) => update(admin, {isLoggedIn: true});
const logOut = (admin) => update(admin, {isLoggedIn: false});

export {
  all,
  find,
  findBy,
  findById,
  findByEmail,
  findByUsername,
  save,
  create,
  update,
  logIn,
  logOut,
};
