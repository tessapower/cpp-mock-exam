import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../utils/exam.utils';

interface ExamHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  moduleNumber: number;
  timeRemaining: number;
  onSubmit: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  moduleNumber,
  timeRemaining,
  onSubmit
}) => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <div className="text-sm text-gray-600">
              Module {moduleNumber}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 font-semibold ${
              timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'
            }`}>
              <Clock size={20} />
              {formatTime(timeRemaining)}
            </div>

            <button
              onClick={onSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;

