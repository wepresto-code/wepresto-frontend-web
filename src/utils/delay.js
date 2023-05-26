 const delay = (ms) => {
  const timeToWait = ms || parseInt(process.env.NEXT_PUBLIC_DELAY_TIME, 10);

  return new Promise((resolve) => {
    setTimeout(resolve, timeToWait);
  });
};
  export default delay;
