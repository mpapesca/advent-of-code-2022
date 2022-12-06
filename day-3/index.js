const { readLines } = require('../utils');

const getLetterForPriority = (priority) => {
  let charCode;
  if (0 < priority && priority < 27) {
    charCode = priority + 'a'.charCodeAt(0) - 1;
  } else if (26 < priority && priority < 53) {
    charCode = priority + 'A'.charCodeAt(0) - 27;
  } else {
    throw new Error('Invalid priority for letter');
  }
  return String.fromCharCode(charCode);
}

const getPriorityForLetter = (letter) => {
  const charCode = letter.charCodeAt(0);
  if (96 < charCode && charCode < 123) {
    return charCode - 'a'.charCodeAt(0) + 1;
  } else if (64 < charCode && charCode < 91) {
    return charCode - 'A'.charCodeAt(0) + 27;
  } else {
    throw new Error('Invalid letter for priority');
  }
}

const findMatch = (source, targets) => {
  return source.find(entry => targets.every(target => target.indexOf(entry) !== -1));
};

const run = async () => {

  const input = await readLines('day-3/input.txt');
  const ruckSacks = input.map(line => {
    const contents = line.split('');
    const compartmentSize = contents.length / 2;
    return [
      contents.slice(0, compartmentSize),
      contents.slice(compartmentSize),
    ];
  });
  const sharedItems = ruckSacks.map(ruckSack => findMatch(ruckSack[0], [ruckSack[1]]));
  console.log({ sharedItems });
  const sharedItemPrioritySum = sharedItems.reduce((acc, sharedItem) => acc + getPriorityForLetter(sharedItem), 0);

  const groupedRuckSacks = [];
  for (let i = 0; i < ruckSacks.length; i += 3) {
    groupedRuckSacks.push([
      [...ruckSacks[i][0], ...ruckSacks[i][1]],
      [...ruckSacks[i + 1][0], ...ruckSacks[i + 1][1]],
      [...ruckSacks[i + 2][0], ...ruckSacks[i + 2][1]],
    ]);
  }


  const badges = groupedRuckSacks.map(group => {
    const match = findMatch(group[0], [group[1], group[2]]);
    console.log({ group, match, priority: getPriorityForLetter(match) });
    return match;
  });
  const badgePrioritySum = badges.reduce((acc, badge) => acc + getPriorityForLetter(badge), 0);
  console.log({ total: ruckSacks.length, groups: groupedRuckSacks.length });
  return {
    part1: sharedItemPrioritySum,
    part2: badgePrioritySum
  };
};

module.exports = {
  run,
};