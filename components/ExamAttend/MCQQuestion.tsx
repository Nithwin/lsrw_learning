"use client";
import React from "react";

interface Props {
  question: any;
  currentIndex: number;
  total: number;
  selected: number;
  onSelect: (idx: number) => void;
}

const MCQQuestion = ({ question, currentIndex, total, selected, onSelect }: Props) => {
  return (
    <div className="flex-1 p-3 w-full max-w-3xl mx-auto flex flex-col justify-center">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-lg font-semibold mb-2">
            Question {currentIndex + 1} of {total}
          </p>
          <p className="text-2xl">{question.question}</p>
        </div>
        <ul className="flex flex-col gap-3 mt-4">
          {question.options.map((opt: string, idx: number) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-4 py-3 rounded border transition-all duration-150 font-medium ${
                  selected === idx
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                }`}
                onClick={() => onSelect(idx)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MCQQuestion;
