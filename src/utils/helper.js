const _ = require("lodash");

const isHttpValid = (str) => {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

const omitEmptyKeys = (obj) => {
  return _.omitBy(obj, (value) => value === (null || "" || undefined));
};

export { isHttpValid, omitEmptyKeys };
