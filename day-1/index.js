const {promises: { readFile }} = require('fs');
const { sumArray } = require('../utils');

const run = async () => {
  const input = await readFile('day-1/input.txt', 'utf-8');
  
  const totals = input.split(/\n\n/).reduce((acc, line) => {
    const calories = line.split(/\n/).map(x => parseInt(x));
    return [
      ...acc,
      sumArray(calories),
    ];
  }, []);

  return Math.max(...totals);
};

module.exports = {
  run,
};