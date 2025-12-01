import React, { useState } from 'react';
import { History } from 'lucide-react';
import { EXAM_CONSTANTS, MODULE_NAMES } from '../types/exam.types';
import type { ExamMode } from '../types/exam.types';

interface WelcomeScreenProps {
  onStartExam: (examMode: ExamMode, moduleNumber: number | null) => void;
  onShowHistory: () => void;
  hasHistory: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartExam,
  onShowHistory,
  hasHistory
}) => {
  const [selectedExamType, setSelectedExamType] = useState<string>('full');

  const handleStartExam = () => {
    if (selectedExamType === 'full') {
      onStartExam('full', null);
    } else {
      const moduleNumber = parseInt(selectedExamType.replace('module-', ''));
      onStartExam('module', moduleNumber);
    }
  };

  const isModuleExam = selectedExamType.startsWith('module-');
  const selectedModuleNumber = isModuleExam ? parseInt(selectedExamType.replace('module-', '')) : null;

  // Sort module entries numerically so options appear as Module 1 .. Module 9
  const sortedModuleEntries = Object.entries(MODULE_NAMES).sort(
    ([a], [b]) => parseInt(a, 10) - parseInt(b, 10)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">C++ Advanced Mock Exam</h1>
          <p className="text-xl text-gray-600 mb-8">CPP Certification Practice Test</p>

          {/* Exam Type Selection */}
          <div className="mb-8">
            <label htmlFor="exam-type" className="block text-lg font-semibold text-gray-700 mb-3">
              Select Exam Type:
            </label>
            <select
              id="exam-type"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="full">Full Mock Exam (All Modules)</option>
              {sortedModuleEntries.map(([moduleNum, moduleName]) => (
                <option key={moduleNum} value={`module-${moduleNum}`}>
                  Module {moduleNum}: {moduleName}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Exam Information</h2>
            {isModuleExam && selectedModuleNumber ? (
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Module:</strong> Module {selectedModuleNumber} - {MODULE_NAMES[selectedModuleNumber]}</li>
                <li>• <strong>Total Questions:</strong> {EXAM_CONSTANTS.MODULE_QUESTIONS} questions</li>
                <li>• <strong>Question Types:</strong> Mix of single-choice and multiple-choice questions</li>
                <li>• <strong>Format:</strong> Single-choice (radio buttons) or multiple-choice (checkboxes - count shown)</li>
                <li>• <strong>Duration:</strong> {EXAM_CONSTANTS.MODULE_DURATION_MINUTES} minutes</li>
                <li>• <strong>Passing Score:</strong> {EXAM_CONSTANTS.PASSING_PERCENTAGE}% ({Math.ceil(EXAM_CONSTANTS.MODULE_QUESTIONS * EXAM_CONSTANTS.PASSING_PERCENTAGE / 100)}/{EXAM_CONSTANTS.MODULE_QUESTIONS} correct)</li>
              </ul>
            ) : (
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Total Questions:</strong> {EXAM_CONSTANTS.TOTAL_QUESTIONS} questions (randomly selected from question bank)</li>
                <li>• <strong>Question Types:</strong> Mix of single-choice and multiple-choice questions</li>
                <li>• <strong>Format:</strong> Single-choice (radio buttons) or multiple-choice (checkboxes - count shown)</li>
                <li>• <strong>Duration:</strong> {EXAM_CONSTANTS.DURATION_MINUTES} minutes</li>
                <li>• <strong>Passing Score:</strong> {EXAM_CONSTANTS.PASSING_PERCENTAGE}% ({Math.ceil(EXAM_CONSTANTS.TOTAL_QUESTIONS * EXAM_CONSTANTS.PASSING_PERCENTAGE / 100)}/{EXAM_CONSTANTS.TOTAL_QUESTIONS} correct)</li>
                <li>• <strong>Coverage:</strong> 9 modules covering STL containers, algorithms, I/O, and templates</li>
              </ul>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleStartExam}
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
