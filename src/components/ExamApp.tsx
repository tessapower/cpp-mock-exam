import React from 'react';
import { QuestionBank } from '../data/questionBank';
import { useExamState } from '../hooks/useExamState';
import { WelcomeScreen } from './WelcomeScreen';
import HistoryScreen from './HistoryScreen';
import { ExamScreen } from './ExamScreen';
import ResultsScreen from './ResultsScreen';

export type CodeTheme = 'light' | 'dark';

const ExamApp: React.FC = () => {
  const { state, actions } = useExamState(QuestionBank);
  const codeTheme: CodeTheme = 'dark'; // Default theme for code blocks

  const handleExitExam = () => {
    actions.setExamStarted(false);
    actions.setExamSubmitted(false);
    actions.setResults(null);
  };

  const handleRetakeExam = () => {
    // Retake the same exam type (full or module) with the same module if applicable
    actions.startNewExam(state.examMode, state.selectedModule);
  };

  // Welcome Screen
  if (!state.examStarted) {
    return (
      <WelcomeScreen
        onStartExam={actions.startNewExam}
        onShowHistory={() => actions.setShowHistory(true)}
        hasHistory={state.resultsHistory.length > 0}
      />
    );
  }

  // History Screen
  if (state.showHistory) {
    return (
      <HistoryScreen
        resultsHistory={state.resultsHistory}
        onBack={() => actions.setShowHistory(false)}
        onClearHistory={actions.clearHistory}
      />
    );
  }

  // Results Screen
  if (state.examSubmitted && state.results) {
    return (
      <ResultsScreen
        results={state.results}
        onRetakeExam={handleRetakeExam}
        onBackToHome={handleExitExam}
      />
    );
  }

  // Exam Screen
  return (
    <ExamScreen
      examQuestions={state.examQuestions}
      currentQuestion={state.currentQuestion}
      selectedAnswers={state.selectedAnswers}
      markedForReview={state.markedForReview}
      timeRemaining={state.timeRemaining}
      onSetCurrentQuestion={actions.setCurrentQuestion}
      onToggleAnswer={actions.toggleAnswer}
      onToggleMarkReview={actions.toggleMarkReview}
      onSubmit={actions.submitExam}
      onExitExam={handleExitExam}
      codeTheme={codeTheme}
    />
  );
};

export default ExamApp;
