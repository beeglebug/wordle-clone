import { useCallback, useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import Row from "./Row";
import "./styles.css";
import { calculateKeyboardState, padEnd } from "./util";
import { all, selected } from "./words";

const pickRandomAnswer = () =>
  selected[Math.floor(Math.random() * selected.length)];

export default function App() {
  const [answer, setAnswer] = useState(pickRandomAnswer());
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [message, setMessage] = useState(null);
  const timer = useRef(null);

  const showMessage = (message) => {
    setMessage(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const restart = () => {
    setGameOver(false);
    setAnswer(pickRandomAnswer());
    setGuesses([]);
    setCurrent("");
  };

  const submit = useCallback(() => {
    if (guesses.length > 5) return;
    if (all.indexOf(current) === -1) {
      return showMessage("Invalid word");
    }
    setGuesses([...guesses, current]);
    setCurrent("");
    if (guesses.length === 5 || current === answer) {
      setTimeout(() => setGameOver(true), 500);
    }
  }, [current, guesses, answer]);

  const keyPressed = useCallback(
    (key) => {
      if (key === "enter") {
        if (current.length < 5) {
          return showMessage("Enter 5 letters");
        }

        return submit();
      }

      if (key === "backspace") {
        return setCurrent(current.substring(0, current.length - 1));
      }

      if (key.match(/^[a-z]{1}$/i)) {
        if (current.length >= 6) return;
        setCurrent(current + key);
      }
    },
    [submit, current]
  );

  useEffect(() => {
    const keyDown = (e) => keyPressed(e.key.toLowerCase());
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, [keyPressed]);

  const rows = padEnd([...guesses, current], 6, "").slice(0, 6);

  const keyboardState = calculateKeyboardState(guesses, answer);

  const boxWidth = (Math.min(window.innerWidth, 480) - 62) / 5;
  const height = boxWidth * 6 + 30;

  const hasWon = guesses[guesses.length - 1] === answer;

  return (
    <div className="game">
      {message && <div className="message">{message}</div>}
      {gameOver && (
        <div className="modal-container">
          <div className="modal">
            {hasWon && <h3>Well done!</h3>}
            {!hasWon && <h3>Oh no :(</h3>}
            <p>
              The word was <strong>{answer}</strong>
            </p>
            <button onClick={restart}>Play Again</button>
          </div>
        </div>
      )}
      <div className="board" style={{ height }}>
        {rows.map((word, ix) => (
          <Row
            word={word}
            answer={answer}
            key={ix}
            validate={ix < guesses.length}
          />
        ))}
      </div>
      <Keyboard onKeyPress={keyPressed} state={keyboardState} />
    </div>
  );
}
