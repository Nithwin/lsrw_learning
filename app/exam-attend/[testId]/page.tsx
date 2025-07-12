"use client";
import { db, auth } from "@/lib/firebaseConfig";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExamHeader from "@/components/ExamAttend/ExamHeader";
import SectionSwitcher from "@/components/ExamAttend/SectionSwitcher";
import MCQNavigation from "@/components/ExamAttend/MCQNavigation";
import MCQQuestion from "@/components/ExamAttend/MCQQuestion";
import EssaySection from "@/components/ExamAttend/EssaySection";
import BottomNavigation from "@/components/ExamAttend/BottomNavigation";

const ExamAttend = () => {
  const { testId } = useParams();
  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<"mcq" | "writing">("mcq");
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!testId) return;
      const docRef = doc(db, "tests", testId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setExam({ id: docSnap.id, ...data });
        setSelectedOptions(new Array(data.mcq.length).fill(-1));
        setEssayAnswers(new Array(data.writing?.length || 0).fill(""));
      }
      setLoading(false);
    }
    fetchDetails();
  }, [testId]);

  useEffect(() => {
    if (timer <= 0 && !submitted) {
      setSubmitted(true);
      handleFinishTest();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, submitted]);

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedOptions((prev) =>
      prev.map((val, idx) => (idx === currentIndex ? optionIdx : val))
    );
  };

  const handleFinishTest = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to submit the test.");
      return;
    }

    const confirmSubmit = window.confirm("Are you sure you want to submit the test?");
    if (!confirmSubmit) return;

    setSubmitting(true);

    const responseDoc = {
      testId: testId,
      userId: user.uid,
      submittedAt: new Date(),
      evaluated: false,
      mcqAnswers: selectedOptions,
      writingAnswers: essayAnswers.map((ans) => ({ answer: ans }))
    };

    try {
      await addDoc(collection(db, "responses"), responseDoc);
      setTimeout(() => {
        setSubmitting(false);
        router.push("/student-dashboard/exam/" + testId); // Redirect to locked view
      }, 2000);
    } catch (err) {
      console.error("Error submitting test:", err);
      setSubmitting(false);
      alert("Failed to submit. Try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;
  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Submitting your test, please wait...
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <ExamHeader title={exam.title} timer={timer} onFinish={handleFinishTest} />
      <SectionSwitcher
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        hasWriting={!!exam.writing?.length}
        mcqCount={exam.mcq.length}
        writingCount={exam.writing?.length || 0}
      />

      {activeSection === "mcq" ? (
        <div className="flex-1 flex flex-col lg:flex-row w-full">
          <MCQNavigation
            selectedOptions={selectedOptions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <MCQQuestion
            question={exam.mcq[currentIndex]}
            currentIndex={currentIndex}
            total={exam.mcq.length}
            selected={selectedOptions[currentIndex]}
            onSelect={handleOptionSelect}
          />
        </div>
      ) : (
        <EssaySection
          questions={exam.writing}
          answers={essayAnswers}
          setAnswers={setEssayAnswers}
        />
      )}

      {activeSection === "mcq" && (
        <BottomNavigation
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          max={exam.mcq.length}
        />
      )}
    </main>
  );
};

export default ExamAttend;
