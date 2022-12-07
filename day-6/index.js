const { promises: { readFile } } = require('fs');

const findStartOfPacket = (input, packetSize) => {
  const currentSet = [];
  for (let i = 0; i < input.length; i++) {

    const duplicateIndex = currentSet.indexOf(input[i]);
    if (duplicateIndex !== -1) {
      currentSet.splice(0, duplicateIndex + 1);
    }

    currentSet.push(input[i]);

    if (currentSet.length === packetSize) {
      return i + 1;
    }
  }
  return -1;
};

const run = async () => {

  const input = await readFile('day-6/input.txt', 'utf8');
  const startOfPacketMarker = findStartOfPacket(input, 4);
  const startOfMessageMarker = findStartOfPacket(input, 14);

  return {
    part1: startOfPacketMarker,
    part2: startOfMessageMarker
  };
};

module.exports = {
  run,
};