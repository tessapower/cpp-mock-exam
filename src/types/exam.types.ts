export interface Question {
  id: number;
  type: 'single' | 'multiple';
  module: number;
  question: string;
  options: string[];
  correct: number[];
  explanation: string;
}

export interface SelectedAnswers {
  [questionId: number]: number[];
}

export interface ModuleScore {
  correct: number;
  total: number;
}

export interface ModuleScores {
  [moduleId: number]: ModuleScore;
}

export interface QuestionResult {
  id: number;
  question: string;
  userAnswer: number[];
  correctAnswer: number[];
  explanation: string;
  options: string[];
}

export interface ExamResult {
  score: number;
  total: number;
  percentage: number;
  moduleScores: ModuleScores;
  timestamp: string;
  questions: QuestionResult[];
}

export interface ExamState {
  examStarted: boolean;
  currentQuestion: number;
  selectedAnswers: SelectedAnswers;
  markedForReview: Set<number>;
  timeRemaining: number;
  examSubmitted: boolean;
  showHistory: boolean;
  examQuestions: Question[];
  results: ExamResult | null;
  resultsHistory: ExamResult[];
}

export const MODULE_NAMES: Record<number, string> = {
  1: "STL Sequential containers",
  2: "Associative STL containers",
  3: "Non-modifying operations",
  4: "Modifying STL algorithms",
  5: "Sorting STL algorithms",
  6: "Merging STL algorithms",
  7: "Utilities and functional tools",
  8: "Advanced input and output",
  9: "Templates"
};

export const EXAM_CONSTANTS = {
  TOTAL_QUESTIONS: 40,
  DURATION_MINUTES: 65,
  PASSING_PERCENTAGE: 70
} as const;

