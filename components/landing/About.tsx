import React from 'react'
import { Section } from "./Section";
import Image from "next/image";
import { Mic, BookOpen, Volume2, Headphones } from "lucide-react";

const data = [
  {
    icon: <Mic className="h-full w-full text-white" />,
    label: "Speaking",
  },
  {
    icon: <BookOpen className="h-full w-full text-white" />,
    label: "Reading",
  },
  {
    icon: <Volume2 className="h-full w-full text-white" />,
    label: "Listening",
  },
  {
    icon: <Headphones className="h-full w-full text-white" />,
    label: "Headset",
  },
];

const About = () => {
  return (
    <Section id="about">
      <div className="relative flex flex-col items-center justify-center ">
        <div className="flex flex-col lg:flex-row-reverse gap-[2.5rem]">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <div>
              <h2 className="text-3xl lg:text-4xl text-center font-semibold">
                About Grammoro
              </h2>
              <p className="text-xs lg:text-sm text-center">
                Building Confident Communicators for a Bright Future
              </p>
            </div>
            <div className="px-[0.5rem] lg:px-[2rem]">
              <p className="text-center text-xl">
                Grammoro is an AI-powered platform that helps students at NEC
                enhance their English communication skills through Listening,
                Speaking, Reading, and Writing (LSRW) modules. With personalized
                learning paths and real-time feedback, it prepares students for
                placements by boosting their confidence in interviews and
                workplace communication, making them job-ready.
              </p>
            </div>
            <div className="flex justify-center pt-[1.5rem]">
              <div className="flex gap-[2rem] mx-auto">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="h-[2.4rem] w-[2.4rem] lg:h-[3.4rem] lg:w-[3.4rem] bg-primary rounded-2xl p-2 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title={item.label}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-3xl overflow-hidden h-[20rem] lg:h-[25rem] w-[20rem] lg:w-[25rem] mx-auto relative">
              <Image
                src="/assets/images/about.jpg"
                alt="About"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;