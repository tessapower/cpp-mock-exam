import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ExamResult } from '../types/exam.types';
import { MODULE_NAMES } from '../types/exam.types';

interface HistoryScreenProps {
  resultsHistory: ExamResult[];
  onBack: () => void;
  onClearHistory: () => void;
}

interface ExamTypeGroup {
  label: string;
  results: ExamResult[];
  key: string;
}

const RESULTS_PER_PAGE = 10;

const ResultsGraph: React.FC<{
  results: ExamResult[];
  label: string;
  pageOffset: number;
  onPageChange: (offset: number) => void;
}> = ({ results, label, pageOffset, onPageChange }) => {
  // Get the results for the current page (reverse chronological, then show oldest to newest on graph)
  const reversedResults = [...results].reverse(); // Newest first
  const startIndex = pageOffset;
  const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, results.length);
  const pageResults = reversedResults.slice(startIndex, endIndex).reverse(); // Show oldest to newest on graph

  const canGoPrevious = startIndex > 0;
  const canGoNext = endIndex < results.length;

  if (results.length === 0) {
    return (
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">{label}</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
          <span className="text-gray-400 text-lg">No attempts</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{label}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pageOffset - RESULTS_PER_PAGE)}
            disabled={!canGoPrevious}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Earlier attempts"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600 min-w-[100px] text-center">
            {pageResults.length === 0 ? 'No data' : `Showing ${startIndex + 1}-${endIndex} of ${results.length}`}
          </span>
          <button
            onClick={() => onPageChange(pageOffset + RESULTS_PER_PAGE)}
            disabled={!canGoNext}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
            title="Later attempts"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="relative h-64 bg-gray-50 rounded p-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Graph area */}
        <div className="ml-12 h-full relative">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map(value => (
              <div
                key={value}
                className="absolute w-full border-t border-gray-200"
                style={{ bottom: `${value}%` }}
              />
            ))}
            {/* Pass line at 70% */}
            <div className="absolute w-full border-t-2 border-green-300" style={{ bottom: '70%' }} />
          </div>

          {/* Data points and line */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Line connecting points */}
              {pageResults.length > 1 && (
                <polyline
                  points={pageResults.map((result, i) => {
                    const x = (i / (pageResults.length - 1)) * 100;
                    const y = 100 - result.percentage;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>

            {/* Data points */}
            {pageResults.map((result, i) => {
              const x = pageResults.length === 1 ? 50 : (i / (pageResults.length - 1)) * 100;
              const passed = result.percentage >= 70;

              return (
                <div
                  key={result.timestamp}
                  className="absolute group"
                  style={{
                    left: `${x}%`,
                    bottom: `${result.percentage}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                >
                  <div className={`w-3 h-3 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'} border-2 border-white shadow-md cursor-pointer hover:scale-150 transition-transform`} />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      <div className="font-semibold">{result.percentage}%</div>
                      <div className="text-gray-300">{result.score}/{result.total}</div>
                      <div className="text-gray-400">{new Date(result.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
            {pageResults.map((result) => (
              <span key={result.timestamp} className="text-center" style={{ width: `${100 / pageResults.length}%` }}>
                #{results.length - reversedResults.indexOf(result)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">{results.length}</div>
          <div className="text-xs text-gray-600">Total Attempts</div>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)}%
          </div>
          <div className="text-xs text-gray-600">Average Score</div>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <div className="text-2xl font-bold text-purple-600">
            {Math.max(...results.map(r => r.percentage))}%
          </div>
          <div className="text-xs text-gray-600">Best Score</div>
        </div>
      </div>
    </div>
  );
};

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  resultsHistory,
  onBack,
  onClearHistory
}) => {
  const [pageOffsets, setPageOffsets] = useState<Record<string, number>>({});

  // Filter and group results by exam type
  const validHistory = resultsHistory.filter(r =>
    r && typeof r.score === 'number' && typeof r.total === 'number' && r.timestamp
  );

  const examGroups = useMemo(() => {
    const groups: ExamTypeGroup[] = [];

    // Group by exam type
    const fullExamResults = validHistory.filter(r => r.examMode === 'full' || r.examMode === undefined);
    if (fullExamResults.length > 0) {
      groups.push({
        label: 'Full Mock Exam',
        results: fullExamResults.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
        key: 'full'
      });
    }

    // Group by module
    for (let moduleNum = 1; moduleNum <= 9; moduleNum++) {
      const moduleResults = validHistory.filter(
        r => r.examMode === 'module' && r.selectedModule === moduleNum
      );
      if (moduleResults.length > 0) {
        groups.push({
          label: `Module ${moduleNum}: ${MODULE_NAMES[moduleNum]}`,
          results: moduleResults.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
          key: `module-${moduleNum}`
        });
      }
    }

    return groups;
  }, [validHistory]);

  const handlePageChange = (groupKey: string, newOffset: number) => {
    setPageOffsets(prev => ({
      ...prev,
      [groupKey]: Math.max(0, newOffset)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Exam History - Performance Over Time</h2>
            <div className="flex gap-2">
              {validHistory.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Clear History
                </button>
              )}
              <button
                onClick={onBack}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Back
              </button>
            </div>
          </div>

          {examGroups.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No exam history yet.</p>
              <p className="text-sm mt-2">Complete and submit an exam to see your progress here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {examGroups.map(group => (
                <ResultsGraph
                  key={group.key}
                  results={group.results}
                  label={group.label}
                  pageOffset={pageOffsets[group.key] || 0}
                  onPageChange={(offset) => handlePageChange(group.key, offset)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;

