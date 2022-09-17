import {getFromStorage, saveToStorage} from "services/storage";
import validate from "services/Validator";
import schema from "services/Admin/schema";
import {v4 as uuidv4} from "uuid";
import {isEmpty, curry} from "services/utilities";

/**
 * Creates a new admin
 */
const newAdmin = (props) => {
  const {username, email, password, confirmPassword} = props;
  return Object.freeze({
    username,
    email,
    password,
    confirmPassword,
    isLoggedIn: false,
    createdAt: null,
    id: uuidv4(),
  });
};

const hasError = (admin) => !isEmpty(admin.errors);

/**
 * Gets all admins from localstorage
 */
const allAdmins = () => getFromStorage("admins") || [];

/**
 * Finds an admin using a key
 */
const findBy = (admin, key) =>
  allAdmins().find((value) =>
    key !== "id"
      ? value[key]?.toLowerCase() === admin[key]?.toLowerCase()
      : value[key] === admin[key]
  );

/**
 * validates an admin object
 */
const validateAdmin = (admin) => {
  const adminWithErr = {...admin, errors: validate(admin, schema)};

  // check if confirm password is the same as the password
  const {password, confirmPassword} = admin;
  if (password !== confirmPassword)
    adminWithErr.errors.confirmPassword = [
      ...(adminWithErr.errors.confirmPassword || []),
      `Password confirmation does not match the password`,
    ];

  // check if the admin already exists
  const findByKey = curry(findBy)(admin);
  const keys = ["email", "username", "id"];
  const existingKey = keys.find((key) => !!findByKey(key));
  if (existingKey)
    adminWithErr.errors[existingKey] = [
      ...(adminWithErr.errors[existingKey] || []),
      `Admin with the same ${existingKey} already exists`,
    ];

  return adminWithErr;
};

const saveAdmin = (admin) => {
  const validatedAdmin = validateAdmin(admin);
  if (hasError(validatedAdmin)) return validatedAdmin;
  const {email, username} = admin;
  const completedAdmin = {
    ...admin,
    createdAt: Date.now(),
    email: email.toLowerCase(),
    username: username.toLowerCase(),
  };
  saveToStorage("admins", [...allAdmins(), completedAdmin]);
  return completedAdmin;
};

const updateAdmin = (admin, newProps) => {
  const findAdminBy = curry(findBy)(admin);
  const adminFromStorage =
    findAdminBy("email") || findAdminBy("username") || findAdminBy("id");

  if (isEmpty(adminFromStorage))
    return {...admin, errors: {base: `Admin does not exist`}};

  const admins = allAdmins();
  const index = admins.findIndex((admin) => admin.id === adminFromStorage.id);
  admins[index] = {...admin, ...newProps};
  saveToStorage("admins", admins);
  return admins[index];
};

const deleteAdmin = (admin) => {
  const findAdminBy = curry(findBy)(admin);
  const adminFromStorage =
    findAdminBy("email") || findAdminBy("username") || findAdminBy("id");

  if (isEmpty(adminFromStorage))
    return {...admin, errors: {base: `Admin does not exist`}};

  const remainingAdmins = allAdmins().filter((admin) => admin.id !== adminFromStorage.id);
  saveToStorage("admins", remainingAdmins);
  return true;
};

const logInAdmin = (loginProps) => {
  const {usernameOrEmail, password} = loginProps;
  const schema = {
    usernameOrEmail: {required: true},
    password: {required: true},
  };

  let validatedLoginProps = validate(loginProps, schema);

  if (!isEmpty(validatedLoginProps)) {
    if (validatedLoginProps.usernameOrEmail)
      return {
        errors: {
          ...validatedLoginProps,
          usernameOrEmail: ["Username or email can't be empty"],
        },
      };
  }

  const adminFromStorage = allAdmins().find(
    (admin) =>
      admin.email.toLowerCase() === usernameOrEmail.toLowerCase() ||
      admin.username.toLowerCase() === usernameOrEmail.toLowerCase()
  );

  if (!adminFromStorage)
    return {
      errors: {
        ...validatedLoginProps,
        usernameOrEmail: [
          ...(validatedLoginProps.usernameOrEmail || []),
          `Admin with the given username or email does not exist`,
        ],
      },
    };

  if (adminFromStorage.password !== password)
    return {
      errors: {
        ...validatedLoginProps,
        password: [...(validatedLoginProps.password || []), `Incorrect password`],
      },
    };

  return updateAdmin(adminFromStorage, {isLoggedIn: true});
};

const logOutAdmin = (admin) => updateAdmin(admin, {isLoggedIn: false});

export default {
  new: newAdmin,
  all: allAdmins,
  validate: validateAdmin,
  all: allAdmins,
  findBy: findBy,
  save: saveAdmin,
  hasError: hasError,
  update: updateAdmin,
  delete: deleteAdmin,
  logIn: logInAdmin,
  logOut: logOutAdmin,
};
