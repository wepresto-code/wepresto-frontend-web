 import environment from "@wepresto/environment";

 const delay = (ms) => {
  const timeToWait = ms || parseInt(environment.DELAY_TIME, 10);

  return new Promise((resolve) => {
    setTimeout(resolve, timeToWait);
  });
};
  export default delay;
