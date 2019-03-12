export const Timer = initialValue => {
  let counter = initialValue;
  return (status, intervalObj = null) => {
    if (status === "start") {
      let interval = setInterval(() => {
        counter += 1;
      }, 1000);
      return interval;
    }
    if (status === "restart") {
      counter = 0;
      console.log(counter);
      clearInterval(intervalObj);
    }
    if (status === "stop") {
      console.log(counter);
      clearInterval(intervalObj);
      let ret = counter;
      counter = 0;
      return ret;
    }
  };
};
