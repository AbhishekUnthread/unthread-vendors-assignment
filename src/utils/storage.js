const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocal = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

const removeFromLocal = (key) => {
  localStorage.removeItem(key);
};

const saveAuthToLocal = (value) => {
  saveToLocal("auth", value);
};

const getAuthFromLocal = () => {
  return getFromLocal("auth");
};

const removeAuthFromLocal = () => {
  removeFromLocal("auth");
};

const saveUserToLocal = (value) => {
  saveToLocal("user", value);
};

const getUserFromLocal = () => {
  return getFromLocal("user");
};

const removeUserFromLocal = () => {
  removeFromLocal("user");
};

export {
  saveToLocal,
  getFromLocal,
  removeFromLocal,
  saveAuthToLocal,
  getAuthFromLocal,
  removeAuthFromLocal,
  saveUserToLocal,
  getUserFromLocal,
  removeUserFromLocal,
};
