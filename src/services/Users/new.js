import {v4 as uuidv4} from "uuid";

const newUserFunc = () => ({
  new: (props) => {
    const {firstName, lastName, balance, createdBy} = props;
    return {
      id: `user${uuidv4}`,
      firstName: firstName,
      lastName: lastName,
      balance: balance,
      createdby: createdBy,
      createdAt: null,
    };
  },
});

export default newUserFunc;
