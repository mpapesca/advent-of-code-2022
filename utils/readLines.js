const { promises: { readFile } } = require('fs');

const readLines = async (inputPath) => {
  const input = await readFile(inputPath, 'utf-8');
  return input.split(/\n/);
};

module.exports = readLines;