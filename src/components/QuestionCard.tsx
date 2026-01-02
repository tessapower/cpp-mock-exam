import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag, Copy, Check, Sun, Moon } from 'lucide-react';
import type { Question } from '../types/exam.types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CodeTheme } from './ExamApp';

interface QuestionCardProps {
  question: Question;
  userAnswers: number[];
  onAnswerToggle: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onMarkReview: () => void;
  isMarked: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  codeTheme: CodeTheme;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswers,
  onAnswerToggle,
  onPrevious,
  onNext,
  onMarkReview,
  isMarked,
  canGoPrevious,
  canGoNext,
  codeTheme
}) => {
  const isSingleChoice = question.type === 'single';
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set());
  const [localCodeThemes, setLocalCodeThemes] = useState<Map<number, CodeTheme>>(new Map());

  const handleCopyCode = (code: string, blockIndex: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedBlocks(prev => new Set(prev).add(blockIndex));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockIndex);
          return newSet;
        });
      }, 2000);
    });
  };

  const toggleBlockTheme = (blockIndex: number) => {
    setLocalCodeThemes(prev => {
      const newMap = new Map(prev);
      const currentTheme = newMap.get(blockIndex) || codeTheme;
      newMap.set(blockIndex, currentTheme === 'dark' ? 'light' : 'dark');
      return newMap;
    });
  };

  let codeBlockIndex = 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <ReactMarkdown
            components={{
              code(codeProps: any) {
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
                const currentBlockIndex = codeBlockIndex++;
                const blockTheme = localCodeThemes.get(currentBlockIndex) || codeTheme;
                const codeStyle = blockTheme === 'dark' ? oneDark : oneLight;
                const isCopied = copiedBlocks.has(currentBlockIndex);

                return (
                  <div className="relative text-sm font-mono my-2">
                    <div className="absolute top-2 right-2 flex gap-1 z-10 pointer-events-auto">
                      <button
                        onClick={() => toggleBlockTheme(currentBlockIndex)}
                        className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-colors"
                        title={blockTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                      >
                        {blockTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                      </button>
                      <button
                        onClick={() => handleCopyCode(codeContent, currentBlockIndex)}
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
              }
            }}
          >
            {question.question}
          </ReactMarkdown>
        </h2>

        <div className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold mb-6 ${
          question.type === 'single'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}>
          {question.type === 'single'
            ? 'Select one answer'
            : `Select all that apply (${question.correct.length} correct answers)`}
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = userAnswers.includes(index);
          const maxSelections = question.correct.length;
          const isLimitReached = !isSingleChoice && userAnswers.length >= maxSelections && !isSelected;

          return (
            <button
              key={index}
              onClick={() => onAnswerToggle(index)}
              disabled={isLimitReached}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : isLimitReached
                  ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-${isSingleChoice ? 'full' : 'md'} border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : isLimitReached
                    ? 'border-gray-300 bg-gray-100'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    isSingleChoice ? (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <button
          onClick={onMarkReview}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
            isMarked
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <Flag size={20} />
          {isMarked ? 'Marked' : 'Mark for Review'}
        </button>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
