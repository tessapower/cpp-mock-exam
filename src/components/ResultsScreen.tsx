import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Copy, Check, Sun, Moon, History } from 'lucide-react';
import type { ExamResult } from '../types/exam.types';
import { MODULE_NAMES } from '../types/exam.types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeTheme = 'light' | 'dark';

interface ResultsScreenProps {
  results: ExamResult;
  resultsHistory: ExamResult[];
  onRetakeExam: () => void;
  onBackToHome: () => void;
  onShowHistory: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  resultsHistory,
  onRetakeExam,
  onBackToHome,
  onShowHistory
}) => {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<string>>(new Set());
  const [localCodeThemes, setLocalCodeThemes] = useState<Map<string, CodeTheme>>(new Map());
  const codeTheme: CodeTheme = 'dark';

  // Filter history for this specific exam type
  // Note: Only properly submitted exams are saved to history (via submitExam()),
  // so exited exams are automatically excluded from this list
  const examSpecificHistory = resultsHistory.filter(r => {
    // Additional safety check: ensure the result has valid data
    if (!r || typeof r.score !== 'number' || typeof r.total !== 'number') {
      return false; // Skip invalid/incomplete results
    }

    // Match by exam mode and module
    if (results.examMode === 'module' && results.selectedModule !== null) {
      // Module exam - match by module number
      return r.examMode === 'module' && r.selectedModule === results.selectedModule;
    } else {
      // Full exam - match by exam mode being 'full' or undefined (for backwards compatibility)
      return r.examMode === 'full' || r.examMode === undefined;
    }
  });

  const hasExamHistory = examSpecificHistory.length > 1; // More than just current result

  const handleCopyCode = (code: string, blockId: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedBlocks(prev => new Set(prev).add(blockId));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockId);
          return newSet;
        });
      }, 2000);
    });
  };

  const toggleBlockTheme = (blockId: string) => {
    setLocalCodeThemes(prev => {
      const newMap = new Map(prev);
      const currentTheme = newMap.get(blockId) || codeTheme;
      newMap.set(blockId, currentTheme === 'dark' ? 'light' : 'dark');
      return newMap;
    });
  };

  const createCodeRenderer = (questionId: number) => {
    let codeBlockIndex = 0;

    return (codeProps: any) => {
      const { inline, children, className } = codeProps;
      const languageMatch = /language-(\w+)/.exec(className || '');

      if (inline || !languageMatch) {
        return (
          <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
            {children}
          </code>
        );
      }

      const language = languageMatch[1];
      const codeContent = String(children).replace(/\n$/, '');
      const blockId = `q${questionId}-b${codeBlockIndex++}`;
      const blockTheme = localCodeThemes.get(blockId) || codeTheme;
      const codeStyle = blockTheme === 'dark' ? oneDark : oneLight;
      const isCopied = copiedBlocks.has(blockId);

      return (
        <div className="relative text-sm font-mono my-2">
          <div className="absolute top-2 right-2 flex gap-1 z-10 pointer-events-auto">
            <button
              onClick={() => toggleBlockTheme(blockId)}
              className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-colors"
              title={blockTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {blockTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => handleCopyCode(codeContent, blockId)}
              className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-colors"
              title="Copy code"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <SyntaxHighlighter
            style={codeStyle}
            language={language}
            PreTag="div"
            customStyle={{ margin: 0 }}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>
      );
    };
  };

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
              onClick={onRetakeExam}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <RotateCcw size={20} />
              Retake Exam
            </button>
            <button
              onClick={onBackToHome}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Back to Home
            </button>
            <button
              onClick={onShowHistory}
              disabled={!hasExamHistory}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
                hasExamHistory
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={hasExamHistory ? 'View history for this exam' : 'No previous attempts for this exam'}
            >
              <History size={20} />
              View Exam History ({examSpecificHistory.length})
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
                      {index + 1}.{' '}
                      <ReactMarkdown
                        components={{
                          code: createCodeRenderer(result.id),
                          p: ({ children }) => <span>{children}</span>
                        }}
                      >
                        {result.question}
                      </ReactMarkdown>
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
                              <ReactMarkdown
                                components={{
                                  code: createCodeRenderer(result.id + 2000 + i),
                                  p: ({ children }) => <span>{children}</span>
                                }}
                              >
                                {option}
                              </ReactMarkdown>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm font-semibold text-blue-900 mb-1">Explanation:</div>
                      <div className="text-sm text-blue-800">
                        <ReactMarkdown
                          components={{
                            code: createCodeRenderer(result.id + 1000),
                            p: ({ children }) => <span>{children}</span>
                          }}
                        >
                          {result.explanation}
                        </ReactMarkdown>
                      </div>
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
