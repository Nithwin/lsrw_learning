"use client";
import React from "react";

interface Props {
  selectedOptions: number[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
}

const MCQNavigation = ({ selectedOptions, currentIndex, setCurrentIndex }: Props) => {
  return (
    <div className="px-3 py-4 lg:py-8 lg:px-2 lg:w-32 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto bg-gray-600/10">
      <ul className="flex gap-2 lg:flex-wrap lg:gap-3 lg:mx-auto">
        {selectedOptions.map((option, index) => (
          <li key={index}>
            <button
              className={`rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold border-2 ${
                option !== -1 ? "bg-green-500 text-white" : "bg-white text-gray-700"
              } ${index === currentIndex ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQNavigation;