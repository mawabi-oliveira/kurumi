export type LetterStatus = 'correct' | 'present' | 'absent';

export function evaluateGuess(guess: string, solution: string): LetterStatus[] {
  const result: LetterStatus[] = Array(guess.length).fill('absent');
  const solutionLetters = solution.split('');

  // primeira passagem: letras corretas
  guess.split('').forEach((char, i) => {
    if (char === solution[i]) {
      result[i] = 'correct';
      solutionLetters[i] = '_';
    }
  });

  // segunda passagem: letras presentes em outra posição
  guess.split('').forEach((char, i) => {
    if (result[i] === 'correct') return;
    const idx = solutionLetters.indexOf(char);
    if (idx > -1) {
      result[i] = 'present';
      solutionLetters[idx] = '_';
    }
  });

  return result;
}
