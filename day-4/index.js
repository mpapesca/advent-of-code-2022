const { readLines } = require('../utils');

const MIN = 0;
const MAX = 1

const fullyContains = (inner, outer) => {
  return outer[MIN] <= inner[MIN] &&
    inner[MAX] <= outer[MAX];
};

const overlaps = (first, second) => {
  return first[MIN] <= second[MIN] &&
    second[MIN] <= first[MAX];
};

const run = async () => {

  const input = await readLines('day-4/input.txt');
  const pairs = input.map(line => {
    return line.split(',')
      .map(range => {
        return range.split('-')
          .map(limit => Number.parseInt(limit));
      });
  });

  const containedPairs = pairs.filter(pair => fullyContains(pair[0], pair[1]) || fullyContains(pair[1], pair[0]));
  const overlappedPairs = pairs.filter(pair => overlaps(pair[0], pair[1]) || overlaps(pair[1], pair[0]));
  return {
    part1: containedPairs.length,
    part2: overlappedPairs.length
  };
};

module.exports = {
  run,
};