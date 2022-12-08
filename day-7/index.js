const { readLines } = require('../utils');

const findClosestDirToSize = (dir, desiredSize) => {
  let size = null;

  if (dir._size >= desiredSize) {
    size = dir._size;
  } else {
    return null;
  }

  Object.entries(dir).forEach(([key, value]) => {
    if (key !== '_parentDir' && value !== 'number') {
      const childrenSize = findClosestDirToSize(value, desiredSize);
      if (childrenSize !== null) {
        size = Math.min(size, childrenSize);
      }
    }
  });

  return size;
};

const sumUpDirectorySizeInLimit = (dir, limit) => {
  let size = 0;

  if (dir._size <= limit) {
    size += dir._size;
  }

  Object.entries(dir).forEach(([key, value]) => {
    if (key !== '_parentDir' && value !== 'number') {
      size += sumUpDirectorySizeInLimit(value, limit);
    }
  });

  return size;
};

const sumUpDirectorySize = (dir) => {
  let size = 0;

  Object.entries(dir).forEach(([key, value]) => {
    if (typeof value === 'number') {
      size += value;
    } else if (key !== '_parentDir') {
      size += sumUpDirectorySize(value);
      delete value._parentDir;
    }
  });


  dir._size = size;

  return size;
};

const createDirectoryStructure = (lines) => {
  const root = {};

  let currentDir = root;
  lines.forEach(line => {
    if (line[0] === '$') {
      if (line[1] === 'cd') {
        if (line[2] === '/') {
          currentDir = root;
        } else if (line[2] === '..') {
          currentDir = currentDir._parentDir ?? currentDir;
        } else if (currentDir[line[2]] !== undefined) {
          currentDir = currentDir[line[2]];
        } else {
          const newDir = {
            _parentDir: currentDir,
          };
          currentDir[line[2]] = newDir;
          currentDir = newDir;
        }
      }
    } else {
      if (line[0] === 'dir') {
        if (currentDir[line[1]] === undefined) {
          currentDir[line[1]] = {
            _parentDir: currentDir,
          };
        }
      } else {
        currentDir[line[1]] ??= Number.parseInt(line[0]);
      }
    }
  });

  return root;
};

const run = async () => {

  const inputLines = await readLines('day-7/input.txt');
  const parsedLines = inputLines.map(line => line.split(' '));

  const root = createDirectoryStructure(parsedLines);
  sumUpDirectorySize(root);
  const totalSize = sumUpDirectorySizeInLimit(root, 100000);

  const neededSpace = 30000000 - (70000000 - root._size);

  const directorySize = findClosestDirToSize(root, neededSpace);

  return {
    part1: totalSize,
    part2: directorySize
  };
};

module.exports = {
  run,
};