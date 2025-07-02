import React from 'react'
import { Section } from "./Section";
import { Button } from "../ui/button";
import Image from "next/image";

const GetInTouch = () => {
  return (
    <Section id="contact">
      <div className="flex flex-col lg:flex-row gap-[2.5rem] lg:justify-between lg:px-[2rem]">
        <div className="px-[1rem] lg:w-2/5 ">
          <div className="px-[1rem] lg:px-[2.5rem] py-[1.5rem] lg:py-[2rem] border-2 rounded-3xl flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-semibold">Get in Touch</p>
              <p className="text-xs">Any questions or remarks ? Let us know</p>
            </div>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border-1 rounded-lg px-[1rem] py-[0.5rem]"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border-1 rounded-lg px-[1rem] py-[0.5rem]"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="w-full h-[6rem] px-[1rem] py-[0.7rem] border-1 rounded-lg resize-none"
                  placeholder="Your Message"
                />
              </div>
              <div>
                <Button className="w-full py-[1rem] text-white">Send Message</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-3/5 lg:border-1 rounded-3xl px-[1rem] py-[0.5rem] lg:px-[2rem] lg:py-[1.5rem]">
          <div className="rounded-3xl overflow-hidden h-[20rem] lg:h-full lg:max-h-[29rem] w-[20rem] lg:w-full mx-auto relative">
            <Image
              src="/assets/images/contact.jpg"
              alt="Contact"
              fill
              className="object-contain lg:object-top lg:object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GetInTouch;