import React, { useState } from 'react';
import { QuestionBank } from '../data/questionBank';
import { useExamState } from '../hooks/useExamState';
import { WelcomeScreen } from './WelcomeScreen';
import HistoryScreen from './HistoryScreen';
import { ExamScreen } from './ExamScreen';
import ResultsScreen from './ResultsScreen';

export type CodeTheme = 'light' | 'dark';

const ExamApp: React.FC = () => {
  const { state, actions } = useExamState(QuestionBank);
  const [codeTheme, setCodeTheme] = useState<CodeTheme>('dark');

  const toggleCodeTheme = () => {
    setCodeTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleExitExam = () => {
    actions.setExamStarted(false);
    actions.setExamSubmitted(false);
    actions.setResults(null);
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
        onNewExam={actions.startNewExam}
        onBackToHome={handleExitExam}
      />
    );
  }

  // Exam Screen
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <button
          onClick={toggleCodeTheme}
          className="text-sm px-3 py-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100"
        >
          Code theme: <span className="font-semibold ml-1">{codeTheme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
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
    </div>
  );
};

export default ExamApp;
