"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { fetchAllTests } from "@/utils/fetchTestsDetails";
import { useRouter } from "next/navigation";

const Exam = () => {
  const [tests, setTests] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getTests() {
      const data = await fetchAllTests();
      setTests(data);
    }
    getTests();
  }, []);

  return (
    <section className="p-3 w-full pt-[2rem]">
      <div className="flex flex-col w-full items-center gap-5">
        <div className="w-full px-[2rem]">
          <p className="text-3xl font-semibold text-start">All Exams</p>
          <p className="text-start text-sm text-gray-400">
            View and manage all your exams
          </p>
        </div>
        <div className="border-2 border-gray-500 rounded-3xl px-2 flex items-center max-w-[18rem] lg:max-w-[44rem]">
          <input
            placeholder="Search Exam..."
            type="search"
            className="outline-0 px-2 py-1 w-full lg:text-xl"
          />
          <Search className="text-gray-600 " />
        </div>
        <div className="py-[2rem]">
          <ul className="flex flex-col gap-[2rem] lg:flex-row">
            {tests.map((item, index) => {
              // Convert Firestore Timestamp to JS Date, then to string
              let startDateStr = "";
              if (item?.startDate?.seconds) {
                const date = new Date(item.startDate.seconds * 1000);
                startDateStr = date.toLocaleDateString();
              }
              let endDateStr = "";
              if (item?.startDate?.seconds) {
                const date = new Date(item.endDate.seconds * 1000);
                endDateStr = date.toLocaleDateString();
              }
              return (
                <li
                  onClick={() => router.push(`exam/` + item.id)}
                  className="cursor-pointer border-1 border-gray-300 rounded-lg shadow-xl p-[1rem] lg:px-[2rem] lg:min-w-[25rem] flex flex-col gap-2 min-w-[20rem]"
                  key={item.id}
                >
                  <p className="text-xl font-medium">{item?.title}</p>

                  <div className="flex flex-col  w-full gap-1">
                    <p className="text-sm flex items-center text-gray-500">
                      Start Date:<span>{startDateStr}</span>
                    </p>
                    <p className="text-sm flex items-center text-gray-500">
                      End Date:<span>{endDateStr}</span>
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className={`w-0 bg-highlight h-2.5 rounded-full`}></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 text-end">
                      <span>0% </span>complete
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Exam;
