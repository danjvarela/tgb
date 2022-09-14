import {getFromStorage, saveToStorage} from "services/storage";
import {isEmpty, isValidEmail, toSentenceCase} from "services/utilities";

const newAdmin = (props) => {
  const {username, email, password} = props;
  return Object.freeze({
    username: username,
    email: email,
    password: password,
    errors: {},
    createdAt: null,
  });
};

const allAdmins = () => getFromStorage("admins") || [];

const findAdmin = (props) => {
  const {email, username} = props;
  const admins = allAdmins();
  return admins.find(
    (admin) =>
      admin.email === email.toLowerCase() || admin.username === username.toLowerCase()
  );
};

const hasError = (admin) =>
  Object.keys(admin.errors).some((key) => !isEmpty(admin.errors[key]));

const validateAdmin = (admin) => {
  const {email, password, errors} = admin;
  const newAdmin = {...admin};

  // validate blank or empty values
  const blankErrors = ["username", "email", "password"].reduce((acc, key) => {
    if (isEmpty(admin[key]))
      acc[key] = [...acc[key], `${toSentenceCase(key)} can't be blank`];
    return acc;
  }, {});
  newAdmin.errors = blankErrors;

  // check if email is valid
  if (!isValidEmail(email)) newAdmin.errors.email = [...(errors.email || []), "Email is invalid"];

  // check if password has the right amount of characters
  if (password.length < 6)
    newAdmin.errors.password = [
      ...(errors.password || []),
      "Password must be more than 6 characters",
    ];

  // check for existing admin in localstorage
  if(findAdmin(admin)) newAdmin.errors.base = [...(errors.base || []), "Admin with the same username or email already exists"]

  return newAdmin;
};

const saveAdmin = (admin) => {
  const validatedAdmin = validateAdmin(admin);
  if (hasError(validatedAdmin)) return validatedAdmin;
  const completedAdmin = {...admin, createdAt: new Date()};
  saveToStorage("admins", [...allAdmins(), completedAdmin]);
  return completedAdmin;
};

const Admin = {
  new: newAdmin,
  validate: validateAdmin,
  save: saveAdmin,
  find: findAdmin,
  all: allAdmins,
  hasError: hasError
};

export default Admin;
