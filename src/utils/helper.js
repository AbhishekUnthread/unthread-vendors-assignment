const _ = require("lodash");

const isHttpValid = (str) => {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

const omitEmptyKeys = (obj) =>
  _.omitBy(
    obj,
    (value) => value === "" || value === undefined || value === null
  );

const pickExactObjKeys = (obj, pickObj) => _.pick(pickObj, Object.keys(obj));

export { isHttpValid, omitEmptyKeys, pickExactObjKeys };
