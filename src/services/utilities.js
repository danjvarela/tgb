const isEmpty = (value) => {
  if (typeof value === "number" || typeof value === "boolean") return false;
  if (typeof value === "undefined" || value === null) return true;
  if (value.length !== undefined) return value.length === 0;
  if (typeof value === "string") return /^\s+$/.test(value);
  if (Object.keys(value).length === 0) return true;
  return false;
};

const toSentenceCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const isValidEmail = (email) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );

const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((x, fn) => fn(x), arg);

const curry = (fn) => {
  return function curried(...args) {
    return args.length < fn.length ? curried.bind(null, ...args) : fn(...args);
  };
};

export {isEmpty, toSentenceCase, isValidEmail, pipe, curry};
