const getRun = (number) => {

  if (number === undefined || isNaN(number)) {
    console.log('PLEASE PROVIDE A NUMERIC DAY TO RUN');
    process.exit();
  }

  try {
    const { run } = require(`../day-${number}`);
    return run;
  } catch (error) {
    console.log(`DAY ${number} DOES NOT EXIST YET`);
    process.exit();
  }
};

module.exports = getRun;