module.exports = {
  start: () => {
    console.log("step1Service start called");
    var step1Promise = new Promise((resolve, reject) => {
      resolve({ data: "data from backend", emit: true });
    });
    return step1Promise;
  }
};
