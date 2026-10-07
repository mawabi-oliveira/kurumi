import React from 'react';
import { LetterStatus } from '../utils/wordle';

interface Props {
  onKey: (key: string) => void;
  keyStatuses: Record<string, LetterStatus>;
}

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

const Keyboard: React.FC<Props> = ({ onKey, keyStatuses }) => (
  <div className="mt-4 bg-black bg-opacity-60 p-4 rounded-xl">
    {rows.map((row, i) => (
      <div key={i} className="flex justify-center mb-1">
        {row.split('').map((char) => {
          const status = keyStatuses[char] || null;
          const bg = status
            ? status === 'correct'
              ? 'bg-green-500 text-white'
              : status === 'present'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-500 text-white'
            : 'bg-gray-200 text-black';
          return (
            <button
              key={char}
              onClick={() => onKey(char)}
              className={`${bg} m-1 px-3 py-2 rounded font-bold uppercase`}
            >
              {char}
            </button>
          );
        })}
        {i === 2 && (
          <>
            <button
              onClick={() => onKey('ENTER')}
              className="bg-red-600 text-white m-1 px-4 py-2 rounded font-bold"
            >
              ENTER
            </button>
            <button
              onClick={() => onKey('DEL')}
              className="bg-red-600 text-white m-1 px-4 py-2 rounded font-bold"
            >
              DEL
            </button>
          </>
        )}
      </div>
    ))}
  </div>
);

export default Keyboard;
