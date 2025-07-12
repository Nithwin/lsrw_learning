"use client";
import React from "react";

interface Props {
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  max: number;
}

const BottomNavigation = ({ currentIndex, setCurrentIndex, max }: Props) => {
  return (
    <div className="flex justify-between py-8 px-4 max-w-3xl mx-auto w-full">
      <button
        className="bg-yellow-600 px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
        onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <button
        className="bg-orange-600 px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
        onClick={() => setCurrentIndex(Math.min(currentIndex + 1, max - 1))}
        disabled={currentIndex === max - 1}
      >
        Next
      </button>
    </div>
  );
};

export default BottomNavigation;

