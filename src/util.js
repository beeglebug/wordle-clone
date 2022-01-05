export function padEnd(arr, len, value) {
  while (arr.length < len) arr.push(value);
  return arr;
}

export function countLetter(str, letter) {
  return str.split('').filter((l) => l === letter).length;
}

export function calculateKeyboardState(guesses, answer) {
  const letters = guesses
    .map((guess) => guess.split(''))
    .flat()
    .reduce((map, letter) => {
      map[letter] = 'miss';
      return map;
    }, {});

  guesses.forEach((guess) => {
    guess.split('').forEach((letter, ix) => {
      if (letters[letter] === 'correct') return;
      if (answer.indexOf(letter) > -1) {
        letters[letter] = 'present';
      }
      if (answer[ix] === guess[ix]) {
        letters[letter] = 'correct';
      }
    });
  });

  return letters;
}
