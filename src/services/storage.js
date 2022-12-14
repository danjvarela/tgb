const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));

const saveToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export {getFromStorage, saveToStorage};
