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

  totals.sort((a, b) => b - a);
  const maxTotal = totals[0]
  const max3TotalsCombined = sumArray(totals.slice(0, 3));

  return { part1: maxTotal, part2: max3TotalsCombined };
};

module.exports = {
  run,
};