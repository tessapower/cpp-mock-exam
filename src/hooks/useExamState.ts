import { useState, useEffect, useCallback } from 'react';
import type { Question, ExamResult, SelectedAnswers, ExamState } from '../types/exam.types';
import { EXAM_CONSTANTS } from '../types/exam.types';
import { storageService } from '../services/storage.service';
import { selectRandomQuestions, calculateResults } from '../utils/exam.utils';

export const useExamState = (questionBank: Question[]) => {
  const [state, setState] = useState<ExamState>({
    examStarted: false,
    currentQuestion: 0,
    selectedAnswers: {},
    markedForReview: new Set<number>(),
    timeRemaining: EXAM_CONSTANTS.DURATION_MINUTES * 60,
    examSubmitted: false,
    showHistory: false,
    examQuestions: [],
    results: null,
    resultsHistory: []
  });

  // Load results history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await storageService.loadResults();
      setState(prev => ({ ...prev, resultsHistory: history }));
    };
    loadHistory();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!state.examStarted || state.examSubmitted || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - submit exam
          submitExam(prev);
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.examStarted, state.examSubmitted, state.timeRemaining]);

  const submitExam = useCallback((currentState: ExamState = state) => {
    const newResults = calculateResults(currentState.examQuestions, currentState.selectedAnswers);

    setState(prev => {
      const newHistory = [...prev.resultsHistory, newResults];

      // Save to storage asynchronously
      storageService.saveResults(newHistory).catch(error => {
        console.error('Failed to save results:', error);
      });

      return {
        ...prev,
        results: newResults,
        examSubmitted: true,
        resultsHistory: newHistory
      };
    });
  }, [state]);

  const startNewExam = useCallback(() => {
    if (state.examStarted && !state.examSubmitted) {
      if (!confirm('Are you sure you want to start a new exam? Current progress will be lost.')) {
        return;
      }
    }

    setState(prev => ({
      ...prev,
      examQuestions: selectRandomQuestions(questionBank, EXAM_CONSTANTS.TOTAL_QUESTIONS),
      currentQuestion: 0,
      selectedAnswers: {},
      markedForReview: new Set<number>(),
      timeRemaining: EXAM_CONSTANTS.DURATION_MINUTES * 60,
      examSubmitted: false,
      results: null,
      examStarted: true,
      showHistory: false
    }));
  }, [questionBank, state.examStarted, state.examSubmitted]);

  const setCurrentQuestion = useCallback((index: number) => {
    setState(prev => ({ ...prev, currentQuestion: index }));
  }, []);

  const toggleAnswer = useCallback((optionIndex: number) => {
    setState(prev => {
      const questionId = prev.examQuestions[prev.currentQuestion].id;
      const questionType = prev.examQuestions[prev.currentQuestion].type;
      const current = prev.selectedAnswers[questionId] || [];

      let newAnswers: SelectedAnswers;
      if (questionType === 'single') {
        newAnswers = {
          ...prev.selectedAnswers,
          [questionId]: [optionIndex]
        };
      } else {
        if (current.includes(optionIndex)) {
          newAnswers = {
            ...prev.selectedAnswers,
            [questionId]: current.filter(i => i !== optionIndex)
          };
        } else {
          newAnswers = {
            ...prev.selectedAnswers,
            [questionId]: [...current, optionIndex]
          };
        }
      }

      return { ...prev, selectedAnswers: newAnswers };
    });
  }, []);

  const toggleMarkReview = useCallback(() => {
    setState(prev => {
      const newMarked = new Set(prev.markedForReview);
      if (newMarked.has(prev.currentQuestion)) {
        newMarked.delete(prev.currentQuestion);
      } else {
        newMarked.add(prev.currentQuestion);
      }
      return { ...prev, markedForReview: newMarked };
    });
  }, []);

  const setShowHistory = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showHistory: show }));
  }, []);

  const setExamStarted = useCallback((started: boolean) => {
    setState(prev => ({ ...prev, examStarted: started }));
  }, []);

  const setExamSubmitted = useCallback((submitted: boolean) => {
    setState(prev => ({ ...prev, examSubmitted: submitted }));
  }, []);

  const setResults = useCallback((results: ExamResult | null) => {
    setState(prev => ({ ...prev, results }));
  }, []);

  const clearHistory = useCallback(async () => {
    if (confirm('Clear all exam history?')) {
      await storageService.clearResults();
      setState(prev => ({ ...prev, resultsHistory: [] }));
    }
  }, []);

  return {
    state,
    actions: {
      startNewExam,
      submitExam: () => submitExam(state),
      setCurrentQuestion,
      toggleAnswer,
      toggleMarkReview,
      setShowHistory,
      setExamStarted,
      setExamSubmitted,
      setResults,
      clearHistory
    }
  };
};

