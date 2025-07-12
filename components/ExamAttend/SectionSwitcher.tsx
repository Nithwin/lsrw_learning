"use client";
import React from "react";

interface Props {
  activeSection: "mcq" | "writing";
  setActiveSection: (val: "mcq" | "writing") => void;
  hasWriting: boolean;
  mcqCount: number;
  writingCount: number;
}

const SectionSwitcher = ({
  activeSection,
  setActiveSection,
  hasWriting,
  mcqCount,
  writingCount,
}: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex gap-4 justify-center py-4">
      <button
        className={`px-6 py-2 rounded font-semibold border transition ${
          activeSection === "mcq"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-blue-600 border-blue-600"
        }`}
        onClick={() => setActiveSection("mcq")}
      >
        MCQ ({mcqCount})
      </button>
      <button
        className={`px-6 py-2 rounded font-semibold border transition ${
          activeSection === "writing"
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-blue-600 border-blue-600"
        }`}
        onClick={() => setActiveSection("writing")}
        disabled={!hasWriting}
      >
        Writing ({writingCount})
      </button>
    </div>
  );
};

export default SectionSwitcher;
