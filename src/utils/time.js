const checkTimeIsExpired = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - process.env.REACT_APP_TIME_BUFFER;
  return time < currentTime;
};

const calculateRemainingTime = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - process.env.REACT_APP_TIME_BUFFER;
  const remainingTime = time - currentTime;
  return remainingTime;
};

export { checkTimeIsExpired, calculateRemainingTime };
