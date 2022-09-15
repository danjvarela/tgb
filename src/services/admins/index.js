import {getFromStorage, saveToStorage} from "services/storage";
import {isEmpty, isValidEmail, toSentenceCase} from "services/utilities";

const newAdmin = (props) => {
  const {username, email, password, confirmPassword} = props;
  return Object.freeze({
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    errors: {},
    createdAt: null,
    loggedIn: false,
  });
};

const allAdmins = () => getFromStorage("admins") || [];

const findAdmin = (props) => {
  const {email, username} = props;
  const admins = allAdmins();
  return admins.find(
    (admin) =>
      admin.email === email?.toLowerCase() || admin.username === username?.toLowerCase()
  );
};

const hasError = (admin) =>
  !isEmpty(admin.errors) &&
  Object.keys(admin.errors).some((key) => !isEmpty(admin.errors[key]));

const hasErrorAt = (key, admin) => !isEmpty(admin.errors) && !isEmpty(admin.errors[key]);

const validateAdmin = (admin) => {
  const {email, password, errors, username, confirmPassword} = admin;
  const newAdmin = {...admin};

  // validate blank or empty values
  const blankErrors = ["username", "email", "password"].reduce((acc, key) => {
    if (isEmpty(admin[key]))
      acc[key] = [...(acc[key] || []), `${toSentenceCase(key)} can't be blank`];
    return acc;
  }, {});
  newAdmin.errors = blankErrors;

  // check if email is valid
  if (!isValidEmail(email))
    newAdmin.errors.email = [...(errors.email || []), "Email is invalid"];

  // check if password has the right amount of characters
  if (password.length < 6)
    newAdmin.errors.password = [
      ...(errors.password || []),
      "Password must be at least 6 characters long",
    ];

  // check for existing admin in localstorage
  if (findAdmin({email: email}))
    newAdmin.errors.email = [
      ...(errors.email || []),
      "An Admin with the same email already exists",
    ];

  if (findAdmin({username: username}))
    newAdmin.errors.username = [
      ...(errors.username || []),
      "An Admin with the same username already exists",
    ];

  // check if confirm password is the same as the password
  if (confirmPassword !== password)
    newAdmin.errors.confirmPassword = [
      ...(errors.confirmPassword || []),
      "Password confirmation does not match the Password",
    ];

  // remove duplicate errors
  Object.keys(newAdmin.errors).forEach(
    (key) => (newAdmin.errors[key] = [...new Set(newAdmin.errors[key])])
  );

  return newAdmin;
};

const saveAdmin = (admin) => {
  const validatedAdmin = validateAdmin(admin);
  if (hasError(validatedAdmin)) return validatedAdmin;
  const completedAdmin = {
    ...admin,
    createdAt: new Date(),
    email: admin.email?.toLowerCase(),
    username: admin.username?.toLowerCase(),
  };
  saveToStorage("admins", [...allAdmins(), completedAdmin]);
  return completedAdmin;
};

const updateAdmin = (admin, props) => {
  const admins = allAdmins();

  const findThe = (key, criteria) => {
    if (key === "value") return admins.find(criteria);
    if (key === "index") return admins.findIndex(criteria);
    return {};
  };

  const criteria = (value) =>
    value.email === admin.email?.toLowerCase() ||
    value.username === admin.username?.toLowerCase();

  const adminFromStorage = {
    value: findThe("value", criteria),
    index: findThe("index", criteria),
  };

  if (!adminFromStorage) return false;
  admins[adminFromStorage.index] = {...admin, ...props};
  saveToStorage("admins", admins);
  return true;
};

const logInAdmin = (admin) => {
  const adminFromStorage = findAdmin(admin);
  const newAdmin = {...admin, errors: {}};

  if (isEmpty(admin.email) && isEmpty(admin.username))
    newAdmin.errors.base = [
      ...(newAdmin.errors.base || []),
      "Username or Email can't be blank",
    ];

  if (!adminFromStorage) {
    newAdmin.errors.base = [
      ...(newAdmin.errors.base || []),
      "Admin with the given username or email does not exist",
    ];
  }

  if (adminFromStorage?.password !== admin.password) {
    newAdmin.errors.password = [
      ...(newAdmin.errors.password || []),
      "Incorrect Password",
    ];
  }
  if (hasError(newAdmin)) return newAdmin;

  updateAdmin(admin, {loggedIn: true});
  return findAdmin(admin);
};

const logOutAdmin = (admin) => {
  const newAdmin = {...admin};
  if (!findAdmin(admin)) {
    newAdmin.errors.base = [...(admin.errors.base || []), "Admin does not exists"];
    return newAdmin;
  }
  updateAdmin(admin, {loggedIn: false});
  return findAdmin(admin);
};

const Admin = {
  new: newAdmin,
  validate: validateAdmin,
  save: saveAdmin,
  find: findAdmin,
  all: allAdmins,
  hasError: hasError,
  hasErrorAt: hasErrorAt,
  logIn: logInAdmin,
  logOut: logOutAdmin,
  update: updateAdmin,
};

export default Admin;
