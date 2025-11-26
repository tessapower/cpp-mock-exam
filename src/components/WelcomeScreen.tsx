import React from 'react';
import { History } from 'lucide-react';
import { EXAM_CONSTANTS } from '../types/exam.types';

interface WelcomeScreenProps {
  onStartExam: () => void;
  onShowHistory: () => void;
  hasHistory: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartExam,
  onShowHistory,
  hasHistory
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">C++ Advanced Mock Exam</h1>
          <p className="text-xl text-gray-600 mb-8">CPP Certification Practice Test</p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Exam Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Total Questions:</strong> {EXAM_CONSTANTS.TOTAL_QUESTIONS} questions (randomly selected from question bank)</li>
              <li>• <strong>Question Types:</strong> Mix of single-choice and multiple-choice questions</li>
              <li>• <strong>Format:</strong> Single-choice (radio buttons) or multiple-choice (checkboxes - count shown)</li>
              <li>• <strong>Duration:</strong> {EXAM_CONSTANTS.DURATION_MINUTES} minutes</li>
              <li>• <strong>Passing Score:</strong> {EXAM_CONSTANTS.PASSING_PERCENTAGE}% ({Math.ceil(EXAM_CONSTANTS.TOTAL_QUESTIONS * EXAM_CONSTANTS.PASSING_PERCENTAGE / 100)}/{EXAM_CONSTANTS.TOTAL_QUESTIONS} correct)</li>
              <li>• <strong>Coverage:</strong> 9 modules covering STL containers, algorithms, I/O, and templates</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onStartExam}
              className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Exam
            </button>

            {hasHistory && (
              <button
                onClick={onShowHistory}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                <History size={20} />
                View History
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

