import React from 'react';
import { LetterStatus } from '../utils/wordle';

interface Props {
  guesses: string[];
  statuses: LetterStatus[][];
}

const GuessGrid: React.FC<Props> = ({ guesses, statuses }) => {
  const rows = Array.from({ length: 6 }).map((_, i) => {
    const guess = guesses[i] || '';
    const status = statuses[i] || [];
    return (
      <div key={i} className="flex justify-center gap-3 mb-2">
        {Array.from({ length: 5 }).map((_, j) => {
          const char = guess[j] || '';
          const tileStatus = status[j];
          const baseClasses = 'w-14 h-14 flex items-center justify-center text-xl font-semibold rounded-md transition-colors duration-150 ease-in-out';
          const dynamicClasses = tileStatus
            ? tileStatus === 'correct'
              ? 'bg-green-500 text-white'
              : tileStatus === 'present'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-700 text-white'
            : 'bg-white border border-gray-400 text-black';
          return (
            <div
              key={j}
              className={`${baseClasses} ${dynamicClasses}`}
            >
              {char}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="bg-black bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-inner">
      {rows}
    </div>
  );
};

export default GuessGrid;
