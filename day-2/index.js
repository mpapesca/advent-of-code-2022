const { readLines } = require('../utils');

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

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

const POINTS = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

const saysShoot = (leftCode, rightCode) => {
  const [leftHand, rightHand] = [leftHands[leftCode], rightHands[rightCode]];
  const handPoints = POINTS[rightHand];

  let resultPoints = POINTS.WIN;

  if (leftHand === rightHand) {
    resultPoints = POINTS.DRAW;
  } else {
    const didLose = (
      (leftHand === ROCK && rightHand === SCISSORS) ||
      (leftHand === SCISSORS && rightHand === PAPER) ||
      (leftHand === PAPER && rightHand === ROCK)
    );
    if (didLose) {
      resultPoints = POINTS.LOSS;
    }
  }

  return resultPoints + handPoints;
};


const run = async () => {
  const inputLines = await readLines('day-2/input.txt');
  const plays = inputLines.map(line => line.split(' '));
  const totalPoints = plays.reduce((acc, [leftCode, rightCode]) => {
    const points = saysShoot(leftCode, rightCode);
    return acc + points;
  }, 0);

  return totalPoints;
};

module.exports = {
  run,
};