const { getRun } = require("./utils");

const dayNumber = process.argv[2];

const run = getRun(dayNumber);

console.log(`STARTING DAY ${dayNumber}`);
run()
  .then(result => console.log({result}))
  .then(() => console.log('FINISHED'))
  .catch(error => console.error(`ERROR OCCURRED:`, error))