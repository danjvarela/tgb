import validate from "services/Validator";

const validateUserFunc = () => {
  const schema = {
    firstName: {required: true},
    lastName: {required: true},
    balance: {required: true},
  };
  return {
    validate: (user) => {
      validate();
    },
  };
};

export default validateUserFunc;
