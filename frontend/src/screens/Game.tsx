import React, { useState, useEffect } from 'react';
import GuessGrid from '../components/GuessGrid';
import Keyboard from '../components/Keyboard';
import { TUPI_WORDS } from '../utils/words';
import { evaluateGuess, LetterStatus } from '../utils/wordle';

const MAX_TURNS = 6;
const WORD_LENGTH = 5;
const RESTART_DELAY_MS = 2500;

const pickWord = () => TUPI_WORDS[Math.floor(Math.random() * TUPI_WORDS.length)];

const Game: React.FC = () => {
  const [solution, setSolution] = useState(pickWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<LetterStatus[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [keyStatuses, setKeyStatuses] = useState<Record<string, LetterStatus>>({});

  const newGame = () => {
    setSolution(pickWord());
    setGuesses([]);
    setStatuses([]);
    setCurrentGuess('');
    setGameOver(false);
    setMessage('');
    setKeyStatuses({});
  };

  // Quando a partida termina, começa uma nova depois de alguns segundos (sem recarregar a página).
  useEffect(() => {
    if (!gameOver) return;
    const timer = setTimeout(newGame, RESTART_DELAY_MS);
    return () => clearTimeout(timer);
  }, [gameOver]);

  // Sem lista de dependências: o listener é recriado a cada render e sempre enxerga o estado atual.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Não interfere em atalhos do navegador (Ctrl+R, Ctrl+C, Cmd+L...)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-ZÇ]$/.test(key)) {
        e.preventDefault();
        handleKey(key === 'BACKSPACE' ? 'DEL' : key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleKey = (key: string) => {
    if (gameOver) return;
    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) return;
      const evals = evaluateGuess(currentGuess, solution);
      const turnsUsed = guesses.length + 1;
      setGuesses([...guesses, currentGuess]);
      setStatuses([...statuses, evals]);

      const newKeyStatuses = { ...keyStatuses };
      currentGuess.split('').forEach((char, i) => {
        const prev = newKeyStatuses[char];
        const curr = evals[i];
        if (prev === 'correct') return;
        if (prev === 'present' && curr === 'absent') return;
        newKeyStatuses[char] = curr;
      });
      setKeyStatuses(newKeyStatuses);

      if (currentGuess === solution) {
        setGameOver(true);
        setMessage('Você acertou!');
      } else if (turnsUsed >= MAX_TURNS) {
        setGameOver(true);
        setMessage(`A palavra era ${solution}`);
      }
      setCurrentGuess('');
    } else if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-ZÇ]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">

      <div
        className="p-4 rounded-xl mb-6"
        style={{ backgroundColor: 'hsla(219, 49.20%, 11.60%, 0.32)' }}
      >
        <GuessGrid guesses={[...guesses, currentGuess]} statuses={statuses} />
      </div>

      <div className="opacity-80">
        <Keyboard onKey={handleKey} keyStatuses={keyStatuses} />
      </div>

      {message && (
        <div
          role="status"
          className="absolute bottom-32 px-6 py-3 text-center text-xl font-semibold bg-green-600/90 text-white rounded-2xl shadow-lg transition-all z-50"
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Game;
