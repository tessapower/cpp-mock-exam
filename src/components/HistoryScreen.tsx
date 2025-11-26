import React from 'react';
import type { ExamResult } from '../types/exam.types';

interface HistoryScreenProps {
  resultsHistory: ExamResult[];
  onBack: () => void;
  onClearHistory: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  resultsHistory,
  onBack,
  onClearHistory
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Exam History</h2>
            <button
              onClick={onBack}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back
            </button>
          </div>

          <div className="space-y-4">
            {resultsHistory.map((result, index) => {
              const date = new Date(result.timestamp);
              const passed = result.percentage >= 70;
              const actualIndex = resultsHistory.length - index;

              return (
                <div key={result.timestamp} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg">
                        Attempt #{actualIndex}
                      </div>
                      <div className="text-sm text-gray-600">
                        {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`text-right ${passed ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="text-3xl font-bold">{result.percentage}%</div>
                      <div className="text-sm">{result.score}/{result.total}</div>
                    </div>
                  </div>
                </div>
              );
            }).reverse()}
          </div>

          {resultsHistory.length > 0 && (
            <button
              onClick={onClearHistory}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;

