export default {
  username: {
    required: true,
  },
  email: {
    required: true,
    pattern:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    required: true,
    length: {min: 6},
  },
  confirmPassword: {
    required: true,
  },
};
