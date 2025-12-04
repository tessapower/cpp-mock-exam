import type { Question, ExamResult, ModuleScores, SelectedAnswers } from '../types/exam.types';

/**
 * Select random questions from the question bank
 */
export const selectRandomQuestions = (questionBank: Question[], count: number): Question[] => {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Select random questions from a specific module
 */
export const selectModuleQuestions = (questionBank: Question[], moduleNumber: number, count: number): Question[] => {
  const moduleQuestions = questionBank.filter(q => q.module === moduleNumber);
  const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, moduleQuestions.length));
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Check if an answer is correct
 */
export const isAnswerCorrect = (userAnswer: number[], correctAnswer: number[]): boolean => {
  return userAnswer.length === correctAnswer.length &&
    userAnswer.every(ans => correctAnswer.includes(ans));
};

/**
 * Calculate exam results
 */
export const calculateResults = (
  examQuestions: Question[],
  selectedAnswers: SelectedAnswers,
  examMode?: 'full' | 'module',
  selectedModule?: number | null
): ExamResult => {
  let correct = 0;
  const moduleScores: ModuleScores = {};

  examQuestions.forEach(question => {
    const userAnswer = selectedAnswers[question.id] || [];
    const correctAnswer = question.correct;

    const isCorrect = isAnswerCorrect(userAnswer, correctAnswer);

    if (isCorrect) correct++;

    if (!moduleScores[question.module]) {
      moduleScores[question.module] = { correct: 0, total: 0 };
    }
    moduleScores[question.module].total++;
    if (isCorrect) moduleScores[question.module].correct++;
  });

  return {
    score: correct,
    total: examQuestions.length,
    percentage: Math.round((correct / examQuestions.length) * 100),
    moduleScores,
    timestamp: new Date().toISOString(),
    questions: examQuestions.map(q => ({
      id: q.id,
      question: q.question,
      userAnswer: selectedAnswers[q.id] || [],
      correctAnswer: q.correct,
      explanation: q.explanation,
      options: q.options
    })),
    examMode,
    selectedModule
  };
};

/**
 * Get answered questions count
 */
export const getAnsweredCount = (selectedAnswers: SelectedAnswers): number => {
  return Object.keys(selectedAnswers).filter(id => selectedAnswers[parseInt(id)]?.length > 0).length;
};

