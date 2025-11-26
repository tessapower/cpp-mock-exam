import React from 'react';
import type { Question, SelectedAnswers } from '../types/exam.types';
import { getAnsweredCount } from '../utils/exam.utils';

interface QuestionNavigatorProps {
  examQuestions: Question[];
  currentQuestion: number;
  selectedAnswers: SelectedAnswers;
  markedForReview: Set<number>;
  onQuestionSelect: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  examQuestions,
  currentQuestion,
  selectedAnswers,
  markedForReview,
  onQuestionSelect
}) => {
  const answeredCount = getAnsweredCount(selectedAnswers);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-base">Questions:</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Marked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
            <span>Not Answered</span>
          </div>
          <div className="ml-4 font-semibold">
            {answeredCount} / {examQuestions.length} answered
            {markedForReview.size > 0 && (
              <span className="text-yellow-600 ml-2">
                ({markedForReview.size} marked)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}>
        {examQuestions.map((_, index) => {
          const isAnswered = selectedAnswers[examQuestions[index].id]?.length > 0;
          const isMarked = markedForReview.has(index);
          const isCurrent = index === currentQuestion;

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`aspect-square rounded flex items-center justify-center text-xs font-semibold transition-colors ${
                isCurrent
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : isMarked
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : isAnswered
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionNavigator;

