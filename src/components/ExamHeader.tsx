import React from 'react';
import { Clock, CheckCircle, Home } from 'lucide-react';
import { formatTime } from '../utils/exam.utils';
import { MODULE_NAMES } from '../types/exam.types';

interface ExamHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  moduleNumber: number;
  timeRemaining: number;
  onSubmit: () => void;
  onExitExam: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  moduleNumber,
  timeRemaining,
  onSubmit,
  onExitExam
}) => {
  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  const handleExitExam = () => {
    if (confirm('Are you sure you want to exit the exam? Your progress will be lost.')) {
      onExitExam();
    }
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-800">
              C++ Mock Exam
            </h1>
            <div className="text-sm text-gray-600">
              Module {moduleNumber}: {MODULE_NAMES[moduleNumber]}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isLowTime ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock size={18} />
              <span className="font-mono font-bold text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>

            <button
              onClick={handleExitExam}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              <Home size={18} />
              Exit
            </button>

            <button
              onClick={onSubmit}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <CheckCircle size={18} />
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
