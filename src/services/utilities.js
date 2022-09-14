const isEmpty = (value) => {
  if (typeof value === "number" || typeof value === "boolean") return false;
  if (typeof value === "undefined" || value === null) return true;
  if (typeof value === "string") return /^\s+$/.test(value);
  if (value.length !== undefined) return value.length === 0;
  if (Object.keys(value).length === 0) return true;
  return false;
};

const toSentenceCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const isValidEmail = (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)

export {isEmpty, toSentenceCase, isValidEmail};
