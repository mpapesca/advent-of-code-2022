const { readLines } = require('../utils');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const LOSS = 'LOSS';
const DRAW = 'DRAW';
const WIN = 'WIN';


const leftHands = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const rightHands = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const resultCodeMap = {
  X: LOSS,
  Y: DRAW,
  Z: WIN,
};

const POINTS = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
  [LOSS]: 0,
  [DRAW]: 3,
  [WIN]: 6,
};

const losingHands = {
  [ROCK]: SCISSORS,
  [SCISSORS]: PAPER,
  [PAPER]: ROCK,
};

const winningHands = Object.keys(losingHands).reduce((acc, key) => {
  return {
    ...acc,
    [losingHands[key]]: key,
  };
}, {});

const saysShoot = (leftCode, rightCode) => {
  const [leftHand, rightHand] = [leftHands[leftCode], rightHands[rightCode]];
  let result = LOSS;

  if (leftHand === rightHand) {
    result = DRAW;
  } else if (winningHands[leftHand] === rightHand) {
    result = WIN;
  }

  return POINTS[result] + POINTS[rightHand];
};

const getDeterminedPoints = (leftCode, resultCode) => {
  const leftHand = leftHands[leftCode];
  const result = resultCodeMap[resultCode];
  let rightHand = leftHand;

  if (result === LOSS) {
    rightHand = losingHands[leftHand];
  } else if (result === WIN) {
    rightHand = winningHands[leftHand];
  }

  return POINTS[result] + POINTS[rightHand];
};


const run = async () => {
  const inputLines = await readLines('day-2/input.txt');
  const plays = inputLines.map(line => line.split(' '));
  const totalPoints = plays.reduce((acc, [leftCode, rightCode]) => {
    return acc + saysShoot(leftCode, rightCode);
  }, 0);

  const plannedTotalPoints = plays.reduce((acc, [leftCode, resultCode]) => {
    return acc + getDeterminedPoints(leftCode, resultCode);
  }, 0);

  return { part1: totalPoints, part2: plannedTotalPoints };
};

module.exports = {
  run,
};