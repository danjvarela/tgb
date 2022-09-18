import {getFromStorage} from "services/utilities";

const findUserFunc = () => {
  return {
    find: (id) => getFromStorage("users").find((user) => user.id === id),
  };
};

export default findUserFunc;
