import { countLetter, padEnd } from './util';
import cx from 'classnames';

function calculateState(word, answer) {
  const letters = padEnd(word.split(''), 5, null);

  const state = letters.map((letter, ix) => ({
    letter,
    correct: answer[ix] === letter,
  }));

  letters.forEach((letter, ix) => {
    const total = countLetter(answer, letter);
    const existing = state.filter((s) => s.letter === letter);
    const existingCorrect = existing.filter((s) => s.correct);
    const existingPresent = existing.filter((s) => s.present);
    if (existingCorrect.length >= total) return;
    if (existingPresent.length >= total) return;
    state[ix].present = answer.indexOf(letter) > -1;
  });

  return state;
}

export default function Row({ word = '', answer, validate }) {
  const state = calculateState(word, answer);
  return (
    <div className="letter-row">
      {state.map(({ letter, present, correct }, ix) => {
        return (
          <div
            key={ix}
            className={cx(
              'letter',
              validate && { present, correct, miss: !present && !correct }
            )}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
