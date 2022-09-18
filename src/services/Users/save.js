const saveUserFunc = () => {
  return {
    save: (user) => {
      validate(user);
    },
  };
};

export default saveUserFunc;
