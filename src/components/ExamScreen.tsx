import React from 'react';
import type { Question, SelectedAnswers } from '../types/exam.types';
import { ExamHeader } from './ExamHeader';
import { QuestionNavigator } from './QuestionNavigator';
import { QuestionCard } from './QuestionCard';
import type { CodeTheme } from './ExamApp';

interface ExamScreenProps {
  examQuestions: Question[];
  currentQuestion: number;
  selectedAnswers: SelectedAnswers;
  markedForReview: Set<number>;
  timeRemaining: number;
  onSetCurrentQuestion: (index: number) => void;
  onToggleAnswer: (index: number) => void;
  onToggleMarkReview: () => void;
  onSubmit: () => void;
  codeTheme: CodeTheme;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  examQuestions,
  currentQuestion,
  selectedAnswers,
  markedForReview,
  timeRemaining,
  onSetCurrentQuestion,
  onToggleAnswer,
  onToggleMarkReview,
  onSubmit,
  codeTheme
}) => {
  if (!examQuestions || examQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading exam...</div>
        </div>
      </div>
    );
  }

  const question = examQuestions[currentQuestion];
  const userAnswers = selectedAnswers[question.id] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        currentQuestion={currentQuestion}
        totalQuestions={examQuestions.length}
        moduleNumber={question.module}
        timeRemaining={timeRemaining}
        onSubmit={onSubmit}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <QuestionNavigator
          examQuestions={examQuestions}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers}
          markedForReview={markedForReview}
          onQuestionSelect={onSetCurrentQuestion}
        />

        <QuestionCard
          question={question}
          userAnswers={userAnswers}
          onAnswerToggle={onToggleAnswer}
          onPrevious={() => onSetCurrentQuestion(Math.max(0, currentQuestion - 1))}
          onNext={() => onSetCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))}
          onMarkReview={onToggleMarkReview}
          isMarked={markedForReview.has(currentQuestion)}
          canGoPrevious={currentQuestion > 0}
          canGoNext={currentQuestion < examQuestions.length - 1}
          codeTheme={codeTheme}
        />
      </div>
    </div>
  );
};

export default ExamScreen;
