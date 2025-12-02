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

export type ExamMode = 'full' | 'module';

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
  examMode: ExamMode;
  selectedModule: number | null;
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

export const MODULE_TOPICS: Record<number, string[]> = {
  1: ["vector", "deque", "list", "forward_list", "array", "Container adapters (stack, queue, priority_queue)"],
  2: ["set", "multiset", "map", "multimap", "unordered_set", "unordered_map", "Hash tables"],
  3: ["find", "count", "search", "for_each", "equal", "mismatch", "all_of/any_of/none_of"],
  4: ["copy", "transform", "replace", "remove", "unique", "reverse", "rotate", "partition"],
  5: ["sort", "stable_sort", "partial_sort", "nth_element", "binary_search", "lower_bound", "upper_bound"],
  6: ["merge", "inplace_merge", "set operations", "includes", "Heap operations", "min/max algorithms"],
  7: ["Function objects", "std::function", "std::bind", "Lambdas", "std::reference_wrapper", "Deprecated adapters"],
  8: ["Stream manipulators", "File I/O", "String streams", "Stream state", "Formatting", "Binary vs text mode"],
  9: ["Function templates", "Class templates", "Template specialization", "Variadic templates", "SFINAE", "Concepts"]
};

export const EXAM_CONSTANTS = {
  TOTAL_QUESTIONS: 40,
  DURATION_MINUTES: 65,
  PASSING_PERCENTAGE: 70,
  MODULE_QUESTIONS: 10,
  MODULE_DURATION_MINUTES: 15
} as const;
