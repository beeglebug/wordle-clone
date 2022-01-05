import cx from 'classnames';

const layout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill="#fff"
  >
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>
);

export default function Keyboard({ onKeyPress, state }) {
  return (
    <div className="keyboard">
      {layout.map((row, ix) => {
        return (
          <div key={ix} className="keyboard-row">
            {row.map((key) => {
              return (
                <button
                  key={key}
                  className={cx('key', state[key])}
                  onClick={() => onKeyPress(key)}
                >
                  {key === 'backspace' ? <Icon /> : key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
