import React from 'react';
import { QuestionBank } from '../data/questionBank';
import { useExamState } from '../hooks/useExamState';
import { WelcomeScreen } from './WelcomeScreen';
import HistoryScreen from './HistoryScreen';
import { ExamScreen } from './ExamScreen';
import ResultsScreen from './ResultsScreen';

const ExamApp: React.FC = () => {
  const { state, actions } = useExamState(QuestionBank);

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
        onNewExam={actions.startNewExam}
        onBackToHome={() => {
          actions.setExamStarted(false);
          actions.setExamSubmitted(false);
          actions.setResults(null);
        }}
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
    />
  );
};

export default ExamApp;

