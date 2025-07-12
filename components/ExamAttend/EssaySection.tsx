"use client";
import React from "react";

interface Props {
  questions: any[];
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

const EssaySection = ({ questions, answers, setAnswers }: Props) => {
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      {questions.map((q, idx) => (
        <div
          key={idx}
          className="w-full lg:px-[3rem] flex flex-col lg:flex-row gap-8 bg-white rounded-2xl p-8"
        >
          <div className="lg:w-1/2 flex justify-center">
            <p className="font-semibold text-2xl">{`Q${idx + 1}. ${q.question}`}</p>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-4">
            <textarea
              className="w-full border-2 border-blue-300 rounded-xl p-6 min-h-[300px] text-xl resize-none focus:outline-blue-500 transition"
              value={answers[idx]}
              onChange={(e) => {
                const val = e.target.value;
                setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
              }}
              placeholder="Type your answer here..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EssaySection;