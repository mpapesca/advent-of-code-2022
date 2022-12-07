const { readLines } = require('../utils');

const COUNT = 0;
const FROM = 1;
const TO = 2;

const addToBottomOfStack = (stack, container) => {
  stack.unshift(container);
};

const getCode = (stacks) => {
  return stacks.map(stack => stack.slice(stack.length - 1, stack.length)[0]).join('');
};

const printStacks = (stacks) => {
  const structuredStack = Object.fromEntries(stacks.map((stack, index) => [index + 1, stack.join(' ')]));
  console.log({ structuredStack });
};

const liftContainersOneByOne = (stack, count) => {
  const liftedContainers = [];

  for (let i = 0; i < count; i++) {
    liftedContainers.push(stack.pop());
  }

  return liftedContainers;
};

const liftContainersAtOnce = (stack, count) => {
  return stack.splice(stack.length - count);
};

const placeContainers = (stack, containers) => {
  stack.push(...containers);
};

const updateStacks = (stacks, instruction, updated = false) => {
  const stackCopy = JSON.parse(JSON.stringify(stacks));
  const sourceStack = stackCopy[instruction[FROM] - 1];
  const targetStack = stackCopy[instruction[TO] - 1];
  const movingContainers = updated ?
    liftContainersAtOnce(sourceStack, instruction[COUNT]) :
    liftContainersOneByOne(sourceStack, instruction[COUNT]);
  placeContainers(targetStack, movingContainers);
  return stackCopy;
};

const run = async () => {

  const input = await readLines('day-5/input.txt');

  const breakPoint = input.indexOf('');
  const initialStacksDiagram = input.slice(0, breakPoint);
  const formattedLevels = initialStacksDiagram.map(levels => levels.split(''));
  const columnCount = (formattedLevels[0].length + 1) / 4;

  const stacks = [...new Array(columnCount)].map(() => []);

  formattedLevels.slice(0, formattedLevels.length - 1).forEach(level => {
    for (let i = 0; i < columnCount; i++) {
      const container = level[(i * 4) + 1];
      if (container !== ' ') {
        addToBottomOfStack(stacks[i], container);
      }
    }
  });

  const instructionStrings = input.slice(breakPoint + 1);
  const instructions = instructionStrings.map(instructionString => instructionString.split(' ').filter((x, index) => index % 2 === 1));
  const updatedStacks9000 = instructions.reduce((acc, instruction) => {
    return updateStacks(acc, instruction);
  }, stacks);

  const updatedStacks9001 = instructions.reduce((acc, instruction) => {
    return updateStacks(acc, instruction, true);
  }, stacks);



  const code9000 = getCode(updatedStacks9000);
  const code9001 = getCode(updatedStacks9001);

  return {
    part1: code9000,
    part2: code9001
  };
};

module.exports = {
  run,
};