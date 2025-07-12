"use client";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ChevronsRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ExamDetails = () => {
  const { testId } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchExam() {
      if (!testId) return;
      const docRef = doc(db, "tests", testId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExam({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    }
    fetchExam();
  }, [testId]);
  if (loading) return <div>Loading...</div>;
  if (!exam) return <div>Exam not found</div>;

  let startDateStr = "";
  if (exam?.startDate?.seconds) {
    const date = new Date(exam.startDate.seconds * 1000);
    startDateStr = date.toLocaleDateString();
  }
  let endDateStr = "";
  if (exam?.endDateStr?.seconds) {
    const date = new Date(exam.endDateStr.seconds * 1000);
    endDateStr = date.toLocaleDateString();
  }
  return (
    <section className="min-h-svh w-full bg-gray-200 p-8 lg:p-12">
      <div className="">
        <div className="bg-white rounded-lg">
          <div className="p-5">
            <p className="text-2xl font-semibold">{exam?.title}</p>
            <p className="text-gray-500 text-sm">{exam?.examDescription}</p>
          </div>
          <div className="p-3 lg:p-5 flex flex-col lg:flex-row lg:gap-10 gap-4 border-y-1 border-gray-400">
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm">Total Marks</p>
              <p className="text-3xl text-primary font-semibold">{exam?.totalMarks}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm">Duration</p>
              <p className="text-3xl font-semibold">{exam?.duration} minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-sm">Total Questions</p>
              <p className="text-3xl font-semibold">{exam?.totalQuestions}</p>
            </div>
          </div>
          <div className="p-4 flex flex-col lg:flex-row items-center lg:justify-between lg:px-[2rem] w-full gap-3">
            <div className="w-full lg:w-fit">
              <p className="text-lg font-semibold">Ready to Start ?</p>
              <p className="text-gray-500 text-sm">Make sure you're in quet environment before you start.</p>
            </div>
            <div className="w-full lg:w-fit">
              <button onClick={() => router.push("/exam-attend/"+testId)} className="mx-auto lg:mx-0 bg-primary text-white font-semibold px-5 py-2 rounded-full flex gap-2">Start Test <ChevronsRight/> </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamDetails;
