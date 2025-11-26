import React from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import type { ExamResult } from '../types/exam.types';
import { MODULE_NAMES } from '../types/exam.types';

interface ResultsScreenProps {
  results: ExamResult;
  onNewExam: () => void;
  onBackToHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  onNewExam,
  onBackToHome
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Exam Results</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600">{results.score}/{results.total}</div>
              <div className="text-gray-600 mt-2">Questions Correct</div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600">{results.percentage}%</div>
              <div className="text-gray-600 mt-2">Score</div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className={`text-4xl font-bold ${results.percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                {results.percentage >= 70 ? 'PASSED' : 'FAILED'}
              </div>
              <div className="text-gray-600 mt-2">Result</div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Performance by Module</h2>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(results.moduleScores).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([module, scores]) => {
              const percentage = ((scores.correct / scores.total) * 100).toFixed(0);
              return (
                <div key={module} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-700">
                      Module {module}: {MODULE_NAMES[parseInt(module)]}
                    </div>
                    <div className="text-sm text-gray-600">
                      {scores.correct}/{scores.total} ({percentage}%)
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${percentage >= '70' ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onNewExam}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <RotateCcw size={20} />
              Take Another Exam
            </button>
            <button
              onClick={onBackToHome}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Question Review</h2>
          {results.questions.map((result, index) => {
            const isCorrect = result.userAnswer.length === result.correctAnswer.length &&
              result.userAnswer.every(ans => result.correctAnswer.includes(ans));

            return (
              <div key={result.id} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  ) : (
                    <XCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-2">
                      {index + 1}. {result.question}
                    </div>

                    <div className="space-y-2 mb-3">
                      {result.options.map((option, i) => {
                        const isUserAnswer = result.userAnswer.includes(i);
                        const isCorrectAnswer = result.correctAnswer.includes(i);

                        return (
                          <div
                            key={i}
                            className={`p-3 rounded ${
                              isCorrectAnswer
                                ? 'bg-green-50 border-2 border-green-500'
                                : isUserAnswer
                                  ? 'bg-red-50 border-2 border-red-500'
                                  : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectAnswer && <CheckCircle size={16} className="text-green-600" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle size={16} className="text-red-600" />}
                              <span>{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm font-semibold text-blue-900 mb-1">Explanation:</div>
                      <div className="text-sm text-blue-800">{result.explanation}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;

