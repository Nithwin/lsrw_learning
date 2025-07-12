"use client";

import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const ExamAttend = () => {
  const { testId } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<"mcq" | "writing">("mcq");
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!testId) return;
      const docRef = doc(db, "tests", testId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExam({ id: docSnap.id, ...docSnap.data() });
        setSelectedOptions(new Array(docSnap.data().mcq.length).fill(-1));
        setEssayAnswers(
          new Array(docSnap.data().writing?.length || 0).fill("")
        );
        setTimer(docSnap.data().duration * 60);
      }
      setLoading(false);
    }
    fetchDetails();
  }, [testId]);

  useEffect(() => {
    if (!timerRef.current && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [timer]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You must stay in fullscreen mode to continue the test.");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedOptions((prev) =>
      prev.map((val, idx) => (idx === currentIndex ? optionIdx : val))
    );
  };

  const handleFinish = async () => {
    const confirmed = confirm("Are you sure you want to submit the test?");
    if (!confirmed) return;
    const resultData = {
      testId,
      submittedAt: new Date(),
      mcqAnswers: selectedOptions,
      essayAnswers: essayAnswers,
    };
    await setDoc(doc(db, "results", `${testId}-user`), resultData);
    alert("Test submitted successfully!");
  };

  if (loading) return <div>Loading</div>;
  if (!exam) return <div>Exam not found</div>;

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const currentQuestion = exam.mcq[currentIndex];

  return (
    <main className="min-h-svh flex flex-col" onClick={enterFullScreen}>
      <div className="p-2 px-3 lg:px-[2rem] lg:pt-[1rem] flex justify-between items-center border-b pb-3 border-gray-500">
        <p className="hidden lg:block lg:text-xl font-semibold">{exam?.title}</p>
        <p className="text-sm lg:text-lg text-center">Time Remaining: {formattedTime}</p>
        <button onClick={handleFinish} className="cursor-pointer text-sm lg:text-lg font-semibold bg-primary text-white px-2 lg:px-[1.5rem] py-2 rounded">
          Finish Test
        </button>
      </div>
      <div className="w-full max-w-3xl mx-auto flex gap-4 justify-center py-4">
        <button
          className={`px-6 py-2 rounded font-semibold border transition ${
            activeSection === "mcq"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600"
          }`}
          onClick={() => setActiveSection("mcq")}
        >
          MCQ ({exam.mcq.length})
        </button>
        <button
          className={`px-6 py-2 rounded font-semibold border transition ${
            activeSection === "writing"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600"
          }`}
          onClick={() => setActiveSection("writing")}
          disabled={!exam.writing || exam.writing.length === 0}
        >
          Writing ({exam.writing?.length || 0})
        </button>
      </div>
      {activeSection === "mcq" && (
        <div className="flex-1 flex flex-col lg:flex-row w-full">
          <div className="px-3 py-4 lg:py-8 lg:px-2 lg:w-32 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto bg-gray-600/10">
            <ul className="flex gap-2 lg:flex-wrap lg:gap-3 lg:mx-auto">
              {exam?.mcq.map((item: any, index: number) => (
                <li key={index}>
                  <button
                    className={`rounded-full h-8 w-8 text-sm flex items-center justify-center font-bold border-2 ${
                      selectedOptions[index] !== -1 ? "bg-green-500 text-white" : "bg-white text-gray-700"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 p-3 w-full max-w-3xl mx-auto flex flex-col justify-center">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-lg font-semibold mb-2">
                  Question {currentIndex + 1} of {exam.mcq.length}
                </p>
                <p className="text-2xl">{currentQuestion.question}</p>
              </div>
              <ul className="flex flex-col gap-3 mt-4">
                {currentQuestion.options.map((item: string, idx: number) => (
                  <li key={idx}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded border transition-all duration-150 font-medium ${
                        selectedOptions[currentIndex] === idx
                          ? "bg-blue-500 text-white border-blue-500 shadow"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                      }`}
                      onClick={() => handleOptionSelect(idx)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {activeSection === "writing" && exam.writing && exam.writing.length > 0 && (
        <div className="flex flex-col gap-8 items-center w-full">
          {exam.writing.map((q: any, idx: number) => (
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
                  value={essayAnswers[idx]}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEssayAnswers((ans) => ans.map((a, i) => (i === idx ? val : a)));
                  }}
                  placeholder="Type your answer here..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between py-8 px-4 max-w-3xl mx-auto w-full">
        <button
          className="bg-yellow-600 px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="bg-orange-600 px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => Math.min(i + 1, exam.mcq.length - 1))}
          disabled={currentIndex === exam.mcq.length - 1}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default ExamAttend;