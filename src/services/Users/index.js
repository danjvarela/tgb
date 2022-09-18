import findUserFunc from "./find";
import newUserFunc from "./new";

const User = {
  ...newUserFunc(),
  ...findUserFunc(),
};

export default User;
