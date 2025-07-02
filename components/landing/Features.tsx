import React from 'react'
import { Section } from "./Section";
import Image from "next/image";

const data = [
  {
    thumbnail: "/assets/images/f1.jpg",
    heading: "LSRW Skill-Based Learning",
    content:
      "Focused modules for Listening, Speaking, Reading, and Writing to build strong English communication from the ground up.",
  },
  {
    thumbnail: "/assets/images/f2.jpg",
    heading: "AI-Powered Performance Analysis",
    content:
      "Smart analytics to track your strengths, weaknesses, and improvements across each skill  with personalized insights.",
  },
  {
    thumbnail: "/assets/images/f3.jpg",
    heading: "Skill-Specific Learning Paths",
    content:
      "Customized content and exercises tailored to your individual skill gaps, so you focus only where it matters most.",
  },
];

const Features = () => {
  return (
    <Section id="features">
      <div className="relative flex flex-col justify-center gap-[4rem]">
        <div className="relative inline-flex flex-col justify-center -space-y-1">
          <h2 className="text-4xl text-center font-semibold">Our Features</h2>
          <svg
            className="max-w-[15rem] mx-auto"
            width="294"
            height="14"
            viewBox="0 0 294 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10.0059C117.436 2.40925 180.223 1.59534 290.5 10.0059"
              stroke="#F97316"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center gap-5 lg:flex-row lg:gap-0 lg:justify-evenly">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-primary rounded-3xl px-[2rem] py-[2rem] gap-[2rem] justify-center max-w-[20rem] mx-auto"
            >
              <div className="overflow-hidden rounded-3xl h-[11rem] w-[16rem] mx-auto relative">
                <Image
                  src={item.thumbnail}
                  alt={item.heading}
                  fill
                  className="object-cover object-top rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div>
                <h3 className="text-xl text-white font-medium text-center">
                  {item.heading}
                </h3>
                <p className="text-white text-sm text-center">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;