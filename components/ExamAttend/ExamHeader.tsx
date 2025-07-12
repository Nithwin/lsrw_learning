"use client";
import React from "react";

interface Props {
  title: string;
  timer: number;
  onFinish: () => void;
}

const ExamHeader = ({ title, timer, onFinish }: Props) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="p-2 px-3 lg:px-[2rem] lg:pt-[1rem] flex justify-between items-center border-b pb-3 border-gray-500">
      <p className="hidden lg:block lg:text-xl font-semibold">{title}</p>
      <p className="text-sm lg:text-lg text-center">Time Remaining: {formatted}</p>
      <button
        onClick={onFinish}
        className="cursor-pointer text-sm lg:text-lg font-semibold bg-primary text-white px-2 lg:px-[1.5rem] py-2 rounded"
      >
        Finish Test
      </button>
    </div>
  );
};

export default ExamHeader;