const dayNumber = process.argv[2];
if(dayNumber === undefined) {
  console.log('please provide a day to run');
  return;
}

const { run } = require(`./day-${dayNumber}`);
console.log(`STARTING DAY ${dayNumber}`);
run()
  .then(result => console.log({result}))
  .then(() => console.log('FINISHED'))
  .catch(error => console.error(`ERROR OCCURRED:`, error))