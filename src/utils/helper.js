const _ = require("lodash");

const isHttpValid = (str) => {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

const omitEmptyKeys = (obj) => _.omitBy(obj, (value) => value === "" || value === undefined || value === null);

const pickExactObjKeys = (obj, pickObj) => _.pick(pickObj, Object.keys(obj));

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}

export { isHttpValid, omitEmptyKeys, pickExactObjKeys, formatBytes };
