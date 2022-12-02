const dayNumber = process.argv[2];

if (dayNumber === undefined || isNaN(dayNumber)) {
  console.log('PLEASE PROVIDE A NUMERIC DAY TO RUN');
  return;
}

let run;
try {
  const { run: dayRun } = require(`./day-${dayNumber}`);
  run = dayRun;
} catch (error) {
  console.log(`DAY ${dayNumber} DOES NOT EXIST YET`);
  process.exit();
}

console.log(`STARTING DAY ${dayNumber}`);
run()
  .then(result => console.log({result}))
  .then(() => console.log('FINISHED'))
  .catch(error => console.error(`ERROR OCCURRED:`, error))